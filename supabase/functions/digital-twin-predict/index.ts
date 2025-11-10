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

    const { scenario, context } = await req.json();

    // Get digital twin profile
    const { data: profile } = await supabaseClient
      .from('digital_twin_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!profile) {
      throw new Error('Digital twin not found. Train your twin first.');
    }

    // Use AI to predict based on profile
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const predictionResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
            content: `You are a digital twin AI trained on this user's behavior patterns.
            
            User Profile:
            ${JSON.stringify(profile, null, 2)}
            
            Based on this profile, predict what the user would do, say, or decide in the given scenario.
            Respond in their style, considering their preferences, behavior patterns, and personality traits.
            
            Provide:
            1. Predicted action/response
            2. Reasoning based on profile
            3. Confidence level (0-1)
            4. Alternative options they might consider`
          },
          {
            role: 'user',
            content: `Scenario: ${scenario}\nContext: ${JSON.stringify(context || {})}`
          }
        ],
      }),
    });

    const predictionData = await predictionResponse.json();
    const prediction = predictionData.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        success: true,
        prediction,
        confidence: profile.confidence_score,
        profile_version: profile.updated_at,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in digital-twin-predict:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
