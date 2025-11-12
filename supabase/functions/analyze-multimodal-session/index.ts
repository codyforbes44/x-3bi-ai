import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    const { session_id, image_url, analysis_prompt } = await req.json();

    if (!session_id && !image_url) {
      throw new Error('Either session_id or image_url is required');
    }

    let targetImageUrl = image_url;

    // Fetch session if session_id provided
    if (session_id) {
      const { data: session, error } = await supabaseClient
        .from('multimodal_sessions')
        .select('image_url')
        .eq('id', session_id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (!session?.image_url) throw new Error('Session has no image');
      targetImageUrl = session.image_url;
    }

    // Analyze with Grok Vision
    const GROK_API_KEY = Deno.env.get('GROK_API_KEY');
    if (!GROK_API_KEY) {
      throw new Error('Grok API key not configured');
    }

    const prompt = analysis_prompt || 
      'Analyze this image in detail. Provide: 1) Description, 2) Key objects and entities, 3) Scene context, 4) Suggested tags for categorization, 5) Any text visible in the image. Format as structured JSON.';

    const visionResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-3',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: targetImageUrl } }
            ]
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text();
      console.error('Grok API error:', errorText);
      throw new Error(`Grok API error: ${visionResponse.status}`);
    }

    const visionData = await visionResponse.json();
    const analysisText = visionData.choices[0]?.message?.content || '';

    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch {
      analysis = { raw: analysisText };
    }

    // Extract tags
    let tags: string[] = [];
    if (analysis.tags) {
      tags = Array.isArray(analysis.tags) 
        ? analysis.tags 
        : analysis.tags.split(',').map((t: string) => t.trim());
    }

    // Update session if session_id provided
    if (session_id) {
      const { error: updateError } = await supabaseClient
        .from('multimodal_sessions')
        .update({
          vision_analysis: analysis,
          tags: tags,
        })
        .eq('id', session_id)
        .eq('user_id', user.id);

      if (updateError) console.error('Failed to update session:', updateError);
    }

    console.log('Analysis complete');

    return new Response(
      JSON.stringify({ 
        analysis,
        tags,
        image_url: targetImageUrl,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-multimodal-session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: error.message === 'Unauthorized' ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
