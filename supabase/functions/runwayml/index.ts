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
    const RUNWAYML_API_KEY = Deno.env.get('RUNWAYML_API_KEY');
    
    if (!RUNWAYML_API_KEY) {
      throw new Error('RUNWAYML_API_KEY not configured');
    }

    const { task_id, prompt, image, model, duration } = await req.json();

    // Check task status
    if (task_id) {
      console.log('Checking task status:', task_id);
      
      const response = await fetch(
        `https://api.runwayml.com/v1/tasks/${task_id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${RUNWAYML_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`RunwayML API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create new video generation task
    if (!prompt && !image) {
      throw new Error('Prompt or image is required');
    }

    console.log('Creating video generation task with RunwayML');

    const requestBody: any = {
      model: model || 'gen3a_turbo',
      prompt_text: prompt,
      duration: duration || 5,
    };

    if (image) {
      const base64Data = image.split(',')[1] || image;
      requestBody.prompt_image = base64Data;
    }

    const response = await fetch(
      'https://api.runwayml.com/v1/tasks',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RUNWAYML_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('RunwayML API error:', errorText);
      throw new Error(`RunwayML API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    console.log('Task created successfully:', data.id);

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in RunwayML function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
