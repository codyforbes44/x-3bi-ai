import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
      model = 'claude-sonnet-4-20250514', 
      provider = 'anthropic',
      stream = false 
    } = await req.json();

    // Validate inputs
    validateArray(messages, 'messages', { minLength: 1, maxLength: 100 });
    validateString(model, 'model', { maxLength: 100 });
    validateString(provider, 'provider', { maxLength: 50 });
    validateBoolean(stream, 'stream');

    console.log(`Using provider: ${provider}, model: ${model}`);

    // Use Anthropic Claude as default (most capable)
    if (provider === 'anthropic') {
      const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
      if (!anthropicApiKey) {
        throw new Error('Anthropic API key not configured');
      }

      // Ensure we're using a Claude model when provider is anthropic
      const anthropicModel = model.includes('claude') ? model : 'claude-sonnet-4-20250514';
      console.log(`Using Anthropic model: ${anthropicModel}`);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: anthropicModel,
          messages,
          max_tokens: 4096,
          stream,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Anthropic API error: ${error}`);
      }

      if (stream) {
        return new Response(response.body, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fallback to OpenAI
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const openaiModel = model.startsWith('gpt') || model.startsWith('o') ? model : 'gpt-4o-mini';
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: openaiModel,
        messages,
        stream,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    if (stream) {
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});