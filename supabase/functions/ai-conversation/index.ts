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
    const { 
      messages, 
      voice = 'Aria',
      model = 'eleven_multilingual_v2',
      provider = 'elevenlabs',
      conversationMode = false 
    } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Starting AI conversation with voice response');

    // Get AI response using Claude Sonnet 4 (most capable for conversations)
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    let aiResponse;
    
    if (anthropicApiKey) {
      console.log('Using Claude Sonnet 4 for conversation');
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          messages,
          max_tokens: 500, // Shorter for voice
        }),
      });

      if (!claudeResponse.ok) {
        throw new Error(`Claude API error: ${await claudeResponse.text()}`);
      }

      const claudeData = await claudeResponse.json();
      aiResponse = claudeData.content[0].text;
    } else {
      // Fallback to OpenAI if Anthropic not configured
      console.log('Falling back to OpenAI GPT-4o-mini');
      const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          max_tokens: 500,
        }),
      });

      if (!chatResponse.ok) {
        throw new Error(`OpenAI API error: ${await chatResponse.text()}`);
      }

      const chatData = await chatResponse.json();
      aiResponse = chatData.choices[0].message.content;
    }

    let audioContent = null;

    // Generate voice if requested and ElevenLabs is available
    if (conversationMode && elevenLabsApiKey && provider === 'elevenlabs') {
      console.log('Generating voice response with ElevenLabs');
      
      const voiceIds = {
        'Aria': '9BWtsMINqrJLrRacOk9x',
        'Roger': 'CwhRBWXzGAHq8TQ4Fs17',
        'Sarah': 'EXAVITQu4vr4xnSDxMaL',
        'Laura': 'FGY2WhTYpPnrIDTdsKH5',
        'Charlie': 'IKne3meq5aSn9XLyUdCD'
      };

      const voiceId = voiceIds[voice] || voiceIds['Aria'];

      const voiceResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey,
        },
        body: JSON.stringify({
          text: aiResponse,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        }),
      });

      if (voiceResponse.ok) {
        const arrayBuffer = await voiceResponse.arrayBuffer();
        audioContent = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: aiResponse,
      audioContent,
      voice,
      provider,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-conversation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});