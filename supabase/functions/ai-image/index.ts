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
      prompt, 
      model = 'gpt-image-1', // Most capable image model
      size = 'auto', 
      quality = 'auto',
      output_format = 'png',
      background = 'auto'
    } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    console.log(`Generating image with ${model}:`, prompt);

    const requestBody: any = {
      model,
      prompt,
      n: 1,
    };

    // Add model-specific parameters
    if (model === 'gpt-image-1') {
      requestBody.size = size;
      requestBody.quality = quality;
      requestBody.output_format = output_format;
      requestBody.background = background;
      // gpt-image-1 always returns base64
    } else {
      // For DALL-E models
      requestBody.size = size === 'auto' ? '1024x1024' : size;
      requestBody.quality = quality === 'auto' ? 'standard' : quality;
      requestBody.response_format = 'url';
    }

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`Failed to generate image: ${error}`);
    }

    const data = await response.json();
    console.log(`Image generated successfully with ${model}`);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-image function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});