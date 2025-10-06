import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, prompt, title, tags, make_instrumental, duration, song_id } = await req.json();

    const SUNO_API_KEY = Deno.env.get('SUNO_API_KEY');
    
    if (!SUNO_API_KEY) {
      throw new Error('SUNO_API_KEY not configured');
    }

    console.log(`Processing Suno AI request: ${action || 'generate'}`);

    // Check status of existing song
    if (action === 'check_status' && song_id) {
      const response = await fetch(`https://api.suno.ai/v1/songs/${song_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${SUNO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Suno API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate new music
    if (!prompt) {
      throw new Error('Prompt is required for music generation');
    }

    const requestBody = {
      prompt: prompt,
      ...(title && { title }),
      ...(tags && { tags }),
      make_instrumental: make_instrumental || false,
      duration: duration || 120,
      wait_audio: false, // Don't wait for audio to be ready
    };

    console.log('Generating music with:', requestBody);

    const response = await fetch('https://api.suno.ai/v1/songs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Suno API error:', errorText);
      throw new Error(`Suno API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    console.log('Music generation started successfully');

    return new Response(
      JSON.stringify({
        songs: Array.isArray(data) ? data : [data],
        message: 'Music generation started. Use check_status to get the audio when ready.',
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in Suno AI function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
