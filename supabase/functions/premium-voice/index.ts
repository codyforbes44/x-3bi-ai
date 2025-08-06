import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { text, voice = 'Aria', model = 'eleven_multilingual_v2', provider = 'elevenlabs' } = await req.json();
    
    if (!text) {
      throw new Error('Text is required');
    }

    console.log(`Generating voice with ${provider}:`, { voice, model, textLength: text.length });

    if (provider === 'elevenlabs') {
      const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');
      
      if (!elevenLabsApiKey) {
        throw new Error('ElevenLabs API key not configured');
      }

      // Voice ID mapping for ElevenLabs
      const voiceIds = {
        'Aria': '9BWtsMINqrJLrRacOk9x',
        'Roger': 'CwhRBWXzGAHq8TQ4Fs17',
        'Sarah': 'EXAVITQu4vr4xnSDxMaL',
        'Laura': 'FGY2WhTYpPnrIDTdsKH5',
        'Charlie': 'IKne3meq5aSn9XLyUdCD',
        'George': 'JBFqnCBsd6RMkjVDRZzb',
        'Callum': 'N2lVS1w4EtoT3dr4eOWO',
        'River': 'SAz9YHcvj6GT2YYXdXww',
        'Liam': 'TX3LPaxmHKxFdv7VOQHJ',
        'Charlotte': 'XB0fDUnXU5powFXDhCwa',
        'Alice': 'Xb7hH8MSUJpSbSDYk0k2',
        'Matilda': 'XrExE9yKIg1WjnnlVkGX',
        'Will': 'bIHbv24MWmeRgasZH58o',
        'Jessica': 'cgSgspJ2msm6clMCkdW9',
        'Eric': 'cjVigY5qzO86Huf0OWal',
        'Chris': 'iP95p4xoKVk53GoZ742B',
        'Brian': 'nPczCjzI2devNBz1zQrb',
        'Daniel': 'onwK4e9ZLuTAKqWW03F9',
        'Lily': 'pFZP5JQG7iQjIQuC4Bku',
        'Bill': 'pqHfZKP75CvOlQylNhV4'
      };

      const voiceId = voiceIds[voice] || voiceIds['Aria'];

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('ElevenLabs API error:', error);
        throw new Error(`ElevenLabs API error: ${error}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      return new Response(JSON.stringify({ 
        audioContent: base64Audio,
        provider: 'elevenlabs',
        voice,
        model 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (provider === 'openai') {
      // Fallback to OpenAI TTS
      const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
      
      if (!openAIApiKey) {
        throw new Error('OpenAI API key not configured');
      }

      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1-hd',
          input: text,
          voice: voice.toLowerCase(),
          response_format: 'mp3',
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI TTS API error: ${error}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      return new Response(JSON.stringify({ 
        audioContent: base64Audio,
        provider: 'openai',
        voice,
        model: 'tts-1-hd'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid provider specified');

  } catch (error) {
    console.error('Error in premium-voice function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});