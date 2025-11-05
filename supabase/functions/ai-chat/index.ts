import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { requireAuth } from '../_shared/auth.ts';
import { validateArray, validateString, validateBoolean } from '../_shared/validation.ts';
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
    
    // Rate limiting: 30 requests per minute per user
    const rateLimitResult = isRateLimited(user.id, { windowMs: 60000, maxRequests: 30 });
    const rateLimitHeaders = getRateLimitHeaders(user.id, { windowMs: 60000, maxRequests: 30 });
    
    if (rateLimitResult.limited) {
      return createRateLimitResponse(rateLimitResult.resetAt);
    }

    const { 
      messages, 
      model = 'google/gemini-2.5-flash', // Modern default model
      stream = false 
    } = await req.json();

    // Validate inputs
    validateArray(messages, 'messages', { minLength: 1, maxLength: 100 });
    validateString(model, 'model', { maxLength: 100 });
    validateBoolean(stream, 'stream');

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`AI Chat request with model: ${model}`);

    // Add system prompt for better responses
    const systemPrompt = { 
      role: "system", 
      content: "You are a helpful AI assistant. Keep answers clear and concise." 
    };

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [systemPrompt, ...messages],
        stream,
      }),
    });

    // Handle rate limit errors
    if (response.status === 429) {
      console.error('Rate limit exceeded');
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Handle payment required errors
    if (response.status === 402) {
      console.error('Payment required');
      return new Response(
        JSON.stringify({ error: 'AI credits depleted. Please add funds to your Lovable workspace.' }),
        { 
          status: 402, 
          headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    // Handle streaming response
    if (stream) {
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          ...rateLimitHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Handle non-streaming response
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ error: error.message || 'An unexpected error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});