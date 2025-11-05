import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { requireAuth } from '../_shared/auth.ts';
import { validateString } from '../_shared/validation.ts';
import { isRateLimited, getRateLimitHeaders, createRateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const user = await requireAuth(req);
    
    // Rate limiting: 15 requests per minute for image generation
    const rateLimitResult = isRateLimited(user.id, { windowMs: 60000, maxRequests: 15 });
    const rateLimitHeaders = getRateLimitHeaders(user.id, { windowMs: 60000, maxRequests: 15 });
    
    if (rateLimitResult.limited) {
      return createRateLimitResponse(rateLimitResult.resetAt);
    }

    const { prompt } = await req.json();
    
    // Validate inputs
    validateString(prompt, 'prompt', { maxLength: 5000 });

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating image with Nano banana model');

    // Use Lovable AI Gateway with Nano banana model (google/gemini-2.5-flash-image-preview)
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          { role: 'user', content: prompt }
        ],
        modalities: ['image', 'text'],
      }),
    });

    // Handle rate limit errors
    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }}
      );
    }

    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: 'AI credits depleted. Please add funds to your Lovable workspace.' }),
        { status: 402, headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }}
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    
    // Extract the image from the response
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      throw new Error('No image generated in response');
    }

    console.log('Image generated successfully');

    return new Response(JSON.stringify({ 
      image_url: imageUrl,
      model: 'google/gemini-2.5-flash-image-preview'
    }), {
      headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-image function:', error);
    return new Response(JSON.stringify({ error: error.message || 'An unexpected error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});