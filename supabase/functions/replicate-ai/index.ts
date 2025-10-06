import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Replicate from "https://esm.sh/replicate@0.25.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY');
    
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY not configured');
    }

    const replicate = new Replicate({ auth: REPLICATE_API_KEY });
    const body = await req.json();

    // Check status of existing prediction
    if (body.prediction_id) {
      console.log("Checking prediction status:", body.prediction_id);
      const prediction = await replicate.predictions.get(body.prediction_id);
      
      return new Response(
        JSON.stringify(prediction),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Start new generation
    const { model, prompt, image_url } = body;

    let modelName: string;
    let input: any = {};

    switch (model) {
      case 'flux-schnell':
        modelName = "black-forest-labs/flux-schnell";
        input = {
          prompt,
          go_fast: true,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 80,
        };
        break;

      case 'flux-pro':
        modelName = "black-forest-labs/flux-1.1-pro";
        input = {
          prompt,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 90,
        };
        break;

      case 'stable-video':
        modelName = "stability-ai/stable-video-diffusion";
        input = {
          input_image: image_url,
          cond_aug: 0.02,
          decoding_t: 7,
          video_length: "14_frames_with_svd",
          sizing_strategy: "maintain_aspect_ratio",
          motion_bucket_id: 127,
          frames_per_second: 6,
        };
        break;

      case 'runway-gen3':
        modelName = "runwayml/gen-3-alpha";
        input = {
          prompt,
          duration: 5,
        };
        if (image_url) {
          input.image = image_url;
        }
        break;

      case 'real-esrgan':
        modelName = "nightmareai/real-esrgan";
        input = {
          image: image_url,
          scale: 4,
          face_enhance: false,
        };
        break;

      default:
        throw new Error(`Unsupported model: ${model}`);
    }

    console.log("Starting prediction with model:", modelName);
    
    const output = await replicate.run(modelName as any, { input });

    console.log("Prediction started successfully");

    return new Response(
      JSON.stringify({ output }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in Replicate function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
