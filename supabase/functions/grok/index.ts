import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
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
    // Get user from JWT for rate limiting
    const authHeader = req.headers.get('Authorization');
    let userId = 'anonymous';
    
    if (authHeader) {
      try {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          { global: { headers: { Authorization: authHeader } } }
        );
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user) userId = user.id;
      } catch (e) {
        // Continue with anonymous if auth fails
      }
    }

    // Rate limit: 60 requests per minute per user
    const rateLimitResult = isRateLimited(userId, { windowMs: 60000, maxRequests: 60 });
    const rateLimitHeaders = getRateLimitHeaders(userId, { windowMs: 60000, maxRequests: 60 });
    
    if (rateLimitResult.limited) {
      return createRateLimitResponse(rateLimitResult.resetAt);
    }
    const { 
      messages, 
      model = 'grok-3',
      stream = false,
      temperature = 0.7,
      max_tokens = 4096,
      tools,
      tool_choice
    } = await req.json();

    const grokApiKey = Deno.env.get('GROK_API_KEY');
    if (!grokApiKey) {
      throw new Error('Grok API key not configured');
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
    console.error('Error in grok function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
