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
    console.log('[Grok] Request received');
    
    // Create Supabase client with service role for rate limit management
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    if (authHeader) {
      try {
        const jwt = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabaseClient.auth.getUser(jwt);
        userId = user?.id ?? null;
        console.log(`[Grok] Authenticated user: ${userId}`);
      } catch (error) {
        console.log('[Grok] No valid auth token, treating as guest');
      }
    } else {
      console.log('[Grok] No auth header, treating as guest');
    }
    
    // Apply different rate limits based on auth status
    if (userId) {
      // Authenticated: 5 messages per day (resets at UTC-0)
      const today = new Date().toISOString().split('T')[0]; // UTC date YYYY-MM-DD
      
      const { data: rateLimit } = await supabaseClient
        .from('grok_rate_limits')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .maybeSingle();
      
      const messageCount = rateLimit?.message_count || 0;
      const DAILY_LIMIT = 5;
      
      if (messageCount >= DAILY_LIMIT) {
        // Calculate time until UTC midnight
        const now = new Date();
        const tomorrow = new Date(Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1
        ));
        
        return new Response(
          JSON.stringify({
            error: 'Daily limit reached',
            message: `You've reached your daily limit of ${DAILY_LIMIT} messages. Your limit resets at midnight UTC.`,
            limit: DAILY_LIMIT,
            remaining: 0,
            resetAt: tomorrow.toISOString(),
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': String(DAILY_LIMIT),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': tomorrow.toISOString(),
              'Retry-After': String(Math.ceil((tomorrow.getTime() - now.getTime()) / 1000)),
            },
          }
        );
      }
      
      // Increment counter
      await supabaseClient.from('grok_rate_limits').upsert({
        user_id: userId,
        date: today,
        message_count: messageCount + 1,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,date'
      });
    } else {
      // Guest: 5 requests per minute (IP-based, rolling window)
      const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      const rateLimitResult = isRateLimited(`guest_${clientIp}`, { windowMs: 60000, maxRequests: 5 });
      
      if (rateLimitResult.limited) {
        return createRateLimitResponse(rateLimitResult.resetAt);
      }
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
      console.error('[Grok] XAI_API_KEY not configured');
      throw new Error('xAI API key not configured');
    }

    console.log(`[Grok] Using model: ${model}, stream: ${stream}, userId: ${userId || 'guest'}`);

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

    console.log('[Grok] Request body:', JSON.stringify(requestBody, null, 2));

    // Grok API follows OpenAI-compatible format
    console.log('[Grok] Calling xAI API...');
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${grokApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`[Grok] xAI API response status: ${response.status}`);

    if (!response.ok) {
      const error = await response.text();
      console.error('[Grok] xAI API error:', response.status, error);
      throw new Error(`Grok API error (${response.status}): ${error}`);
    }

    if (stream) {
      console.log('[Grok] Streaming response');
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
    console.log('[Grok] Non-streaming response received');
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logError(error, 'grok');
    
    if (error instanceof ValidationError) {
      return errorResponse(error.message, 400);
    }
    
    return errorResponse(error instanceof Error ? error.message : 'Failed to process Grok request', 500);
  }
});
