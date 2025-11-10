import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { validateArray, validateString, validateNumber } from '../_shared/validation.ts';
import { isRateLimited, getRateLimitHeaders, createRateLimitResponse } from '../_shared/rateLimit.ts';
import { handleCors, corsHeaders, successResponse, errorResponse } from '../_shared/cors.ts';
import { logError, ValidationError } from '../_shared/errorHandling.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Try to get user from JWT, but don't require it
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );
    
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    if (authHeader) {
      try {
        const jwt = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabaseClient.auth.getUser(jwt);
        userId = user?.id ?? null;
      } catch (error) {
        console.log('No valid auth token, treating as guest');
      }
    }
    
    // Apply different rate limits based on auth status
    let rateLimitResult;
    let rateLimitHeaders;
    
    if (userId) {
      // Authenticated: 40 requests per minute
      rateLimitResult = isRateLimited(userId, { windowMs: 60000, maxRequests: 40 });
      rateLimitHeaders = getRateLimitHeaders(userId, { windowMs: 60000, maxRequests: 40 });
    } else {
      // Guest: 5 requests per minute (IP-based)
      const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      rateLimitResult = isRateLimited(`guest_${clientIp}`, { windowMs: 60000, maxRequests: 5 });
      rateLimitHeaders = getRateLimitHeaders(`guest_${clientIp}`, { windowMs: 60000, maxRequests: 5 });
    }
    
    if (rateLimitResult.limited) {
      return createRateLimitResponse(rateLimitResult.resetAt);
    }
    const { 
      messages, 
      model = 'grok-4-0709',
      stream = false,
      temperature = 0.7,
      max_tokens = 4096,
      tools,
      tool_choice
    } = await req.json();

    // Validate inputs
    validateArray(messages, 'messages', { minLength: 1, maxLength: 100 });
    validateString(model, 'model', { maxLength: 100 });
    validateNumber(temperature, 'temperature', { min: 0, max: 2 });
    validateNumber(max_tokens, 'max_tokens', { min: 1, max: 32000 });

    const grokApiKey = Deno.env.get('XAI_API_KEY');
    if (!grokApiKey) {
      throw new Error('xAI API key not configured');
    }

    console.log(`Using Grok model: ${model}`);

    // Build request body
    const requestBody: any = {
      model,
      messages,
      temperature,
      max_tokens,
      stream,
    };

    // Add tools if provided (function calling)
    if (tools && tools.length > 0) {
      requestBody.tools = tools;
      if (tool_choice) {
        requestBody.tool_choice = tool_choice;
      }
    }

    console.log('Grok request:', JSON.stringify(requestBody, null, 2));

    // Grok API follows OpenAI-compatible format
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${grokApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Grok API error:', error);
      throw new Error(`Grok API error: ${error}`);
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
      headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logError(error, 'grok');
    
    if (error instanceof ValidationError) {
      return errorResponse(error.message, 400);
    }
    
    return errorResponse(error instanceof Error ? error.message : 'Failed to process Grok request', 500);
  }
});
