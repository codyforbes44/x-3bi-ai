import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { logError, getErrorMessage, getErrorStatus } from '../_shared/errorHandling.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice_id = '9BWtsMINqrJLrRacOk9x', model_id = 'eleven_multilingual_v2' } = await req.json();
    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');

    if (!elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    if (!text) {
      throw new Error('Text is required');
    }

    // Log for debugging

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
      method: 'POST',
      headers: {
        'xi-api-key': elevenLabsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logError(new Error(`ElevenLabs API error: ${errorText}`), 'ai-voice');
      throw new Error(`ElevenLabs API error: ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const audio_url = `data:audio/mpeg;base64,${base64Audio}`;

    // Voice generated successfully

    return new Response(JSON.stringify({ audio_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logError(error, 'ai-voice');
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: getErrorStatus(error),
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});