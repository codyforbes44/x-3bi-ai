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

    const { interaction } = await req.json();

    // Get or create digital twin profile
    let { data: profile } = await supabaseClient
      .from('digital_twin_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!profile) {
      const { data: newProfile } = await supabaseClient
        .from('digital_twin_profiles')
        .insert({
          user_id: user.id,
          communication_style: {},
          preferences: {},
          behavior_patterns: {},
          decision_patterns: {},
          expertise_areas: [],
          personality_traits: {},
        })
        .select()
        .single();
      profile = newProfile;
    }

    // Analyze interaction using AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const analysisResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are analyzing user behavior to build a digital twin. Extract patterns from interactions.
            Current profile: ${JSON.stringify(profile)}
            
            Analyze this interaction and return JSON with:
            - communication_style: tone, formality, preferred formats
            - preferences: topics, tools, workflows
            - behavior_patterns: habits, timing, frequency
            - decision_patterns: criteria, priorities, biases
            - expertise_areas: domains of knowledge
            - personality_traits: characteristics observed
            
            Return ONLY valid JSON, no markdown.`
          },
          {
            role: 'user',
            content: JSON.stringify(interaction)
          }
        ],
        tools: [
          {
            type: 'function',
            name: 'update_twin_profile',
            description: 'Update digital twin profile with new patterns',
            parameters: {
              type: 'object',
              properties: {
                communication_style: { type: 'object' },
                preferences: { type: 'object' },
                behavior_patterns: { type: 'object' },
                decision_patterns: { type: 'object' },
                expertise_areas: { type: 'array', items: { type: 'string' } },
                personality_traits: { type: 'object' }
              },
              required: [],
              additionalProperties: false
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'update_twin_profile' } }
      }),
    });

    const analysisData = await analysisResponse.json();
    const toolCall = analysisData.choices[0].message.tool_calls[0];
    const updates = JSON.parse(toolCall.function.arguments);

    // Merge updates with existing profile
    const updatedProfile = {
      communication_style: { ...profile.communication_style, ...updates.communication_style },
      preferences: { ...profile.preferences, ...updates.preferences },
      behavior_patterns: { ...profile.behavior_patterns, ...updates.behavior_patterns },
      decision_patterns: { ...profile.decision_patterns, ...updates.decision_patterns },
      expertise_areas: [...new Set([...(profile.expertise_areas || []), ...(updates.expertise_areas || [])])],
      personality_traits: { ...profile.personality_traits, ...updates.personality_traits },
      total_interactions: (profile.total_interactions || 0) + 1,
      last_trained_at: new Date().toISOString(),
      confidence_score: Math.min(1.0, (profile.confidence_score || 0) + 0.01),
    };

    // Update profile
    await supabaseClient
      .from('digital_twin_profiles')
      .update(updatedProfile)
      .eq('user_id', user.id);

    // Log interaction
    await supabaseClient
      .from('digital_twin_interactions')
      .insert({
        user_id: user.id,
        interaction_type: interaction.type,
        context: interaction.context || {},
        user_input: interaction.input,
        user_decision: interaction.decision,
        metadata: interaction.metadata || {},
      });

    return new Response(
      JSON.stringify({ 
        success: true,
        profile: updatedProfile,
        message: 'Digital twin updated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in digital-twin-train:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
