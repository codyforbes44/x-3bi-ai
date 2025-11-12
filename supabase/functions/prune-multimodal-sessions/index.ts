import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SessionAnalysis {
  session_id: string;
  alias: string;
  relevance_score: number;
  usage_count: number;
  days_since_access: number;
  recommendation: 'keep' | 'archive' | 'delete';
  reasoning: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { 
      action = 'analyze', 
      auto_delete = false,
      min_relevance_threshold = 0.3,
      days_inactive_threshold = 90 
    } = await req.json();

    // Fetch all user sessions
    const { data: sessions, error: fetchError } = await supabaseClient
      .from('multimodal_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    if (!sessions || sessions.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No sessions found',
          analysis: [],
          stats: { total: 0, to_delete: 0, to_keep: 0 }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing ${sessions.length} sessions`);

    // Step 1: Use Gemini to analyze usage patterns
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) throw new Error('Gemini API key not configured');

    const sessionsSummary = sessions.map(s => ({
      id: s.id,
      alias: s.alias,
      modality: s.modality,
      created_at: s.created_at,
      last_accessed_at: s.last_accessed_at,
      tags: s.tags,
      has_embedding: !!s.embedding,
    }));

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze these multi-modal memory sessions for usage patterns. Consider:
1. Access frequency (last_accessed_at vs created_at)
2. Data completeness (tags, embeddings)
3. Session age
4. Content relevance based on modality

Sessions: ${JSON.stringify(sessionsSummary, null, 2)}

Provide a brief analysis of overall patterns and identify sessions that appear low-value (duplicates, incomplete, rarely accessed, very old with no recent access).`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2000,
          }
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const geminiAnalysis = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    console.log('Gemini analysis:', geminiAnalysis);

    // Step 2: Use Claude 4 for intelligent decision-making on each session
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_API_KEY) throw new Error('Anthropic API key not configured');

    const analysisResults: SessionAnalysis[] = [];

    // Process in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < sessions.length; i += batchSize) {
      const batch = sessions.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (session) => {
        const daysSinceCreation = Math.floor(
          (Date.now() - new Date(session.created_at).getTime()) / (1000 * 60 * 60 * 24)
        );
        
        const daysSinceAccess = session.last_accessed_at
          ? Math.floor((Date.now() - new Date(session.last_accessed_at).getTime()) / (1000 * 60 * 60 * 24))
          : daysSinceCreation;

        const claudePrompt = `As an intelligent memory system curator, evaluate this session for pruning:

Session Details:
- Alias: ${session.alias}
- Modality: ${session.modality}
- Created: ${daysSinceCreation} days ago
- Last accessed: ${daysSinceAccess} days ago
- Has embedding: ${!!session.embedding}
- Has tags: ${session.tags?.length || 0}
- Has vision analysis: ${!!session.vision_analysis}
- Content preview: ${JSON.stringify(session.data).substring(0, 200)}

Gemini's Overall Analysis: ${geminiAnalysis.substring(0, 500)}

Thresholds:
- Min relevance: ${min_relevance_threshold}
- Inactive days: ${days_inactive_threshold}

Provide a JSON response with:
{
  "relevance_score": 0.0-1.0,
  "recommendation": "keep" | "archive" | "delete",
  "reasoning": "brief explanation"
}`;

        try {
          const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'x-api-key': ANTHROPIC_API_KEY,
              'anthropic-version': '2023-06-01',
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-5',
              max_tokens: 500,
              messages: [{
                role: 'user',
                content: claudePrompt
              }]
            }),
          });

          if (!claudeResponse.ok) {
            console.error(`Claude error for session ${session.id}`);
            return null;
          }

          const claudeData = await claudeResponse.json();
          const claudeText = claudeData.content[0].text;
          
          // Extract JSON from response
          const jsonMatch = claudeText.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            console.error('Failed to parse Claude response');
            return null;
          }

          const decision = JSON.parse(jsonMatch[0]);

          return {
            session_id: session.id,
            alias: session.alias,
            relevance_score: decision.relevance_score,
            usage_count: 0, // Could be tracked separately
            days_since_access: daysSinceAccess,
            recommendation: decision.recommendation,
            reasoning: decision.reasoning,
          };
        } catch (error) {
          console.error(`Error analyzing session ${session.id}:`, error);
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      analysisResults.push(...batchResults.filter(r => r !== null) as SessionAnalysis[]);
      
      // Small delay between batches
      if (i + batchSize < sessions.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 3: Execute deletion if auto_delete is enabled
    const toDelete = analysisResults.filter(a => 
      a.recommendation === 'delete' && 
      a.relevance_score < min_relevance_threshold &&
      a.days_since_access > days_inactive_threshold
    );

    let deletedCount = 0;
    if (auto_delete && toDelete.length > 0) {
      const deleteIds = toDelete.map(s => s.session_id);
      
      const { error: deleteError } = await supabaseClient
        .from('multimodal_sessions')
        .delete()
        .in('id', deleteIds)
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Delete error:', deleteError);
      } else {
        deletedCount = deleteIds.length;
        console.log(`Deleted ${deletedCount} sessions`);
      }
    }

    const stats = {
      total: sessions.length,
      analyzed: analysisResults.length,
      to_delete: toDelete.length,
      deleted: deletedCount,
      to_keep: analysisResults.filter(a => a.recommendation === 'keep').length,
      to_archive: analysisResults.filter(a => a.recommendation === 'archive').length,
      avg_relevance: analysisResults.reduce((sum, a) => sum + a.relevance_score, 0) / analysisResults.length,
    };

    console.log('Pruning complete:', stats);

    return new Response(
      JSON.stringify({ 
        gemini_analysis: geminiAnalysis,
        session_analysis: analysisResults,
        stats,
        deleted: deletedCount > 0,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in prune-multimodal-sessions:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: error.message === 'Unauthorized' ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
