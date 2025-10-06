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
    const STABILITY_API_KEY = Deno.env.get('STABILITY_API_KEY');
    
    if (!STABILITY_API_KEY) {
      throw new Error('STABILITY_API_KEY not configured');
    }

    const { prompt, negative_prompt, model, aspect_ratio, cfg_scale } = await req.json();

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    console.log('Generating image with Stability AI:', model);

    // Map model to API endpoint
    let endpoint: string;
    switch (model) {
      case 'sd3-large':
        endpoint = 'https://api.stability.ai/v2beta/stable-image/generate/sd3';
        break;
      case 'sd3-medium':
        endpoint = 'https://api.stability.ai/v2beta/stable-image/generate/sd3';
        break;
      case 'stable-image-ultra':
        endpoint = 'https://api.stability.ai/v2beta/stable-image/generate/ultra';
        break;
      case 'stable-image-core':
        endpoint = 'https://api.stability.ai/v2beta/stable-image/generate/core';
        break;
      default:
        endpoint = 'https://api.stability.ai/v2beta/stable-image/generate/sd3';
    }

    const formData = new FormData();
    formData.append('prompt', prompt);
    
    if (negative_prompt) {
      formData.append('negative_prompt', negative_prompt);
    }
    
    if (model === 'sd3-large' || model === 'sd3-medium') {
      formData.append('model', model);
    }
    
    formData.append('aspect_ratio', aspect_ratio || '1:1');
    formData.append('output_format', 'png');
    
    if (cfg_scale) {
      formData.append('cfg_scale', cfg_scale.toString());
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STABILITY_API_KEY}`,
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Stability AI API error:', errorText);
      throw new Error(`Stability AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Convert base64 image to data URL
    const imageBase64 = data.image || data.artifacts?.[0]?.base64;
    
    if (!imageBase64) {
      throw new Error('No image data received from API');
    }

    const imageUrl = `data:image/png;base64,${imageBase64}`;

    console.log('Image generated successfully');

    return new Response(
      JSON.stringify({
        image: imageUrl,
        seed: data.seed,
        finish_reason: data.finish_reason,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in Stability AI function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
