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
    
    // Rate limiting: 25 requests per minute for multimodal
    const rateLimitResult = isRateLimited(user.id, { windowMs: 60000, maxRequests: 25 });
    const rateLimitHeaders = getRateLimitHeaders(user.id, { windowMs: 60000, maxRequests: 25 });
    
    if (rateLimitResult.limited) {
      return createRateLimitResponse(rateLimitResult.resetAt);
    }

    const { prompt, model, image, video } = await req.json();

    // Validate inputs
    validateString(prompt, 'prompt', { maxLength: 10000 });
    validateString(model, 'model', { maxLength: 100 });

    const GOOGLE_AI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GOOGLE_AI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Validate model
    const validModels = [
      'gemini-3-pro-preview', 'gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite',
      'gemini-2.0-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'
    ];
    
    // Map model IDs to API model names
    const modelMapping: Record<string, string> = {
      'gemini-3-pro-preview': 'gemini-3.0-pro-preview',
      'gemini-2.5-pro': 'gemini-2.5-pro-latest',
      'gemini-2.5-flash': 'gemini-2.5-flash-latest',
      'gemini-2.5-flash-lite': 'gemini-2.5-flash-lite-latest',
      'gemini-2.0-pro': 'gemini-2.0-pro-latest',
      'gemini-1.5-pro': 'gemini-1.5-pro-latest',
      'gemini-1.5-flash': 'gemini-1.5-flash-latest',
    };
    
    const apiModel = modelMapping[model] || model;
    console.log('Processing request with Gemini:', model, '→', apiModel);

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${apiModel}:generateContent?key=${GOOGLE_AI_API_KEY}`;

    // Build content parts
    const parts: any[] = [{ text: prompt }];

    if (image) {
      const base64Data = image.split(',')[1] || image;
      const mimeType = image.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
      
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data,
        },
      });
    }

    if (video) {
      const base64Data = video.split(',')[1] || video;
      const mimeType = video.match(/data:([^;]+);/)?.[1] || 'video/mp4';
      
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data,
        },
      });
    }

    const requestBody = {
      contents: [{
        parts: parts,
      }],
      generationConfig: {
        temperature: 1,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google AI API error:', errorText);
      throw new Error(`Google AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    console.log('Response generated successfully');

    return new Response(
      JSON.stringify({
        text,
        model,
        usage: data.usageMetadata,
      }),
      { headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in Google Gemini function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
