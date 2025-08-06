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
    const { image_url, task = 'image-classification' } = await req.json();

    if (!image_url) {
      throw new Error('Image URL is required');
    }

    console.log(`Processing image analysis task: ${task}`);

    let response;
    let result;

    // Use Hugging Face's free inference API
    const HF_API_URL = 'https://api-inference.huggingface.co/models/';
    
    // Fetch the image
    const imageResponse = await fetch(image_url);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image from URL');
    }
    
    const imageBlob = await imageResponse.blob();
    
    switch (task) {
      case 'image-classification':
        response = await fetch(`${HF_API_URL}google/vit-base-patch16-224`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: imageBlob,
        });
        break;
        
      case 'object-detection':
        response = await fetch(`${HF_API_URL}facebook/detr-resnet-50`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: imageBlob,
        });
        break;
        
      case 'image-segmentation':
        response = await fetch(`${HF_API_URL}facebook/detr-resnet-50-panoptic`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: imageBlob,
        });
        break;
        
      case 'image-to-text':
        response = await fetch(`${HF_API_URL}nlpconnect/vit-gpt2-image-captioning`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: imageBlob,
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
        image_url: image_url,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in free image analysis:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        task: 'unknown'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});