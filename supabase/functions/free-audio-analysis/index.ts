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
    const { audio_url, task = 'automatic-speech-recognition' } = await req.json();

    if (!audio_url) {
      throw new Error('Audio URL is required');
    }

    console.log(`Processing audio analysis task: ${task}`);

    let response;
    let result;

    // Use Hugging Face's free inference API
    const HF_API_URL = 'https://api-inference.huggingface.co/models/';
    
    // Fetch the audio file
    const audioResponse = await fetch(audio_url);
    if (!audioResponse.ok) {
      throw new Error('Failed to fetch audio from URL');
    }
    
    const audioBlob = await audioResponse.blob();
    
    switch (task) {
      case 'automatic-speech-recognition':
        response = await fetch(`${HF_API_URL}openai/whisper-small`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: audioBlob,
        });
        break;
        
      case 'audio-classification':
        response = await fetch(`${HF_API_URL}superb/hubert-base-superb-er`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: audioBlob,
        });
        break;
        
      default:
        throw new Error(`Unsupported task: ${task}`);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Hugging Face API error for ${task}:`, errorText);
      
      // Handle model loading error
      if (response.status === 503) {
        return new Response(
          JSON.stringify({ 
            error: 'Model is loading, please try again in a few moments',
            task: task,
            retry: true
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 503 }
        );
      }
      
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    result = await response.json();
    
    console.log(`${task} completed successfully`);

    return new Response(
      JSON.stringify({ 
        result: result,
        task: task,
        audio_url: audio_url,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in free audio analysis:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        task: 'unknown'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});