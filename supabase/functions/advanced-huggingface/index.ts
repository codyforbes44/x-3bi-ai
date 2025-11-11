import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { fetchWithRetry, handleAPIError } from '../_shared/apiRetry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { task, text, image, audio } = await req.json();

    console.log(`Processing advanced Hugging Face task: ${task}`);

    const HF_API_URL = 'https://router.huggingface.co/hf-inference/models/';
    let modelUrl = '';
    let requestBody: any;
    let requestHeaders: any = {
      'Content-Type': 'application/json',
    };

    // Select model and prepare request based on task
    switch (task) {
      case 'text-to-image':
        modelUrl = `${HF_API_URL}black-forest-labs/FLUX.1-schnell`;
        requestBody = JSON.stringify({ inputs: text });
        break;

      case 'summarization':
        modelUrl = `${HF_API_URL}facebook/bart-large-cnn`;
        requestBody = JSON.stringify({ 
          inputs: text,
          parameters: { max_length: 150, min_length: 40 }
        });
        break;

      case 'translation':
        modelUrl = `${HF_API_URL}facebook/mbart-large-50-many-to-many-mmt`;
        requestBody = JSON.stringify({ inputs: text });
        break;

      case 'question-answering':
        modelUrl = `${HF_API_URL}deepset/roberta-base-squad2`;
        requestBody = JSON.stringify({ inputs: text });
        break;

      case 'code-generation':
        modelUrl = `${HF_API_URL}Salesforce/codegen-350M-mono`;
        requestBody = JSON.stringify({ inputs: text });
        break;

      case 'image-to-text':
        modelUrl = `${HF_API_URL}Salesforce/blip-image-captioning-large`;
        requestHeaders['Content-Type'] = 'application/octet-stream';
        const imageBlob = await fetch(image).then(r => r.blob());
        requestBody = imageBlob;
        break;

      case 'image-classification':
        modelUrl = `${HF_API_URL}google/vit-base-patch16-224`;
        requestHeaders['Content-Type'] = 'application/octet-stream';
        const imageClassBlob = await fetch(image).then(r => r.blob());
        requestBody = imageClassBlob;
        break;

      case 'object-detection':
        modelUrl = `${HF_API_URL}facebook/detr-resnet-50`;
        requestHeaders['Content-Type'] = 'application/octet-stream';
        const objectBlob = await fetch(image).then(r => r.blob());
        requestBody = objectBlob;
        break;

      case 'speech-to-text':
        modelUrl = `${HF_API_URL}openai/whisper-large-v3`;
        requestHeaders['Content-Type'] = 'application/octet-stream';
        const audioBlob = await fetch(audio).then(r => r.blob());
        requestBody = audioBlob;
        break;

      case 'audio-classification':
        modelUrl = `${HF_API_URL}superb/hubert-large-superb-er`;
        requestHeaders['Content-Type'] = 'application/octet-stream';
        const audioClassBlob = await fetch(audio).then(r => r.blob());
        requestBody = audioClassBlob;
        break;

      case 'text-to-speech':
        modelUrl = `${HF_API_URL}facebook/fastspeech2-en-ljspeech`;
        requestBody = JSON.stringify({ inputs: text });
        break;

      default:
        throw new Error(`Unsupported task: ${task}`);
    }

    console.log(`Making request to: ${modelUrl}`);

    const response = await fetchWithRetry(modelUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: requestBody,
    });

    if (!response.ok) {
      // Handle common API errors
      const errorResponse = handleAPIError(response, corsHeaders);
      if (errorResponse) return errorResponse;

      const errorText = await response.text();
      console.error(`Hugging Face API error for ${task}:`, errorText);

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

    // Handle different response types
    let result: any = {};

    if (task === 'text-to-image' || task === 'text-to-speech') {
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      
      if (task === 'text-to-image') {
        result = { image: `data:image/png;base64,${base64}` };
      } else {
        result = { audio: `data:audio/wav;base64,${base64}` };
      }
    } else if (task === 'image-to-text') {
      const data = await response.json();
      result = { text: data[0]?.generated_text || JSON.stringify(data) };
    } else if (task === 'speech-to-text') {
      const data = await response.json();
      result = { text: data.text || JSON.stringify(data) };
    } else {
      result = { data: await response.json() };
    }

    console.log(`Task ${task} completed successfully`);

    return new Response(
      JSON.stringify({
        ...result,
        task: task,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in advanced Hugging Face function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
