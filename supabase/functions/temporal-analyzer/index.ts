import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { analyzeType = 'all' } = await req.json();

    console.log(`Analyzing temporal patterns for user ${user.id}`);

    // Get user's historical data from various sources
    const [twinInteractions, workflows, grokMessages] = await Promise.all([
      supabaseClient
        .from('digital_twin_interactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(500),
      supabaseClient
        .from('workflows')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(200),
      supabaseClient
        .from('grok_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(500),
    ]);

    const historicalData = {
      interactions: twinInteractions.data || [],
      workflows: workflows.data || [],
      messages: grokMessages.data || [],
    };

    // Use AI to analyze temporal patterns
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const analysisResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          {
            role: 'system',
            content: `You are a temporal intelligence analyzer. Analyze historical data to find patterns and make predictions.
            
            Look for:
            1. Time-based patterns (daily, weekly, monthly)
            2. Activity clusters and cycles
            3. Seasonal trends
            4. Anomalies and exceptions
            5. Predictive insights for future behavior
            
            Historical data:
            ${JSON.stringify(historicalData, null, 2)}`
          },
          {
            role: 'user',
            content: `Analyze this data and identify:
            1. Key temporal patterns
            2. Recurring events/activities
            3. Best times for different activities
            4. Predictions for next week
            5. Anomalies to watch for`
          }
        ],
        tools: [
          {
            type: 'function',
            name: 'report_temporal_insights',
            description: 'Report temporal patterns and predictions',
            parameters: {
              type: 'object',
              properties: {
                patterns: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      pattern_type: { type: 'string' },
                      pattern_name: { type: 'string' },
                      recurrence_rule: { type: 'string' },
                      confidence_level: { type: 'number' },
                      description: { type: 'string' }
                    }
                  }
                },
                predictions: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      insight_type: { type: 'string' },
                      title: { type: 'string' },
                      description: { type: 'string' },
                      predicted_for: { type: 'string' },
                      confidence_score: { type: 'number' },
                      action_suggestions: { type: 'array', items: { type: 'string' } }
                    }
                  }
                }
              },
              required: ['patterns', 'predictions'],
              additionalProperties: false
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'report_temporal_insights' } }
      }),
    });

    const analysisData = await analysisResponse.json();
    const insights = JSON.parse(analysisData.choices[0].message.tool_calls[0].function.arguments);

    // Store patterns
    for (const pattern of insights.patterns) {
      await supabaseClient
        .from('temporal_patterns')
        .upsert({
          user_id: user.id,
          pattern_type: pattern.pattern_type,
          pattern_name: pattern.pattern_name,
          recurrence_rule: pattern.recurrence_rule,
          confidence_level: pattern.confidence_level,
          historical_data: historicalData,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,pattern_type,pattern_name' });
    }

    // Store predictions
    for (const prediction of insights.predictions) {
      await supabaseClient
        .from('predictive_insights')
        .insert({
          user_id: user.id,
          insight_type: prediction.insight_type,
          title: prediction.title,
          description: prediction.description,
          predicted_for: prediction.predicted_for,
          confidence_score: prediction.confidence_score,
          action_suggestions: prediction.action_suggestions,
          status: 'pending',
        });
    }

    console.log(`Found ${insights.patterns.length} patterns and ${insights.predictions.length} predictions`);

    return new Response(
      JSON.stringify({
        success: true,
        patterns: insights.patterns,
        predictions: insights.predictions,
        dataPoints: {
          interactions: historicalData.interactions.length,
          workflows: historicalData.workflows.length,
          messages: historicalData.messages.length,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in temporal-analyzer:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
