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

    let response;
    let retries = 0;
    const maxRetries = 2;
    
    while (retries <= maxRetries) {
      try {
        response = await fetch('https://api.suno.ai/v1/songs', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SUNO_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(30000), // 30 second timeout
        });

        if (response.ok) {
          break; // Success, exit retry loop
        }

        // Handle specific status codes
        if (response.status === 503) {
          if (retries < maxRetries) {
            console.log(`Suno API temporarily unavailable, retrying... (${retries + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
            retries++;
            continue;
          }
          throw new Error('Suno API is temporarily unavailable. Please try again in a few moments.');
        }

        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
        }

        if (response.status === 401) {
          throw new Error('Invalid Suno API key. Please check your configuration.');
        }

        // For other errors, get the error text
        const errorText = await response.text();
        console.error('Suno API error:', errorText);
        throw new Error(`Suno API error: ${response.status} - ${errorText}`);

      } catch (error) {
        if (error.name === 'TimeoutError') {
          throw new Error('Request timed out. Suno API may be experiencing issues.');
        }
        throw error;
      }
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
    
    // Provide user-friendly error messages
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;
    
    if (error.message) {
      if (error.message.includes('temporarily unavailable')) {
        errorMessage = error.message;
        statusCode = 503;
      } else if (error.message.includes('Rate limit')) {
        errorMessage = error.message;
        statusCode = 429;
      } else if (error.message.includes('API key')) {
        errorMessage = 'Suno AI configuration error. Please contact support.';
        statusCode = 500;
      } else if (error.message.includes('SUNO_API_KEY not configured')) {
        errorMessage = 'Suno AI is not properly configured. Please contact support.';
        statusCode = 500;
      } else {
        errorMessage = error.message;
      }
    }
    
    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: statusCode }
    );
  }
});
