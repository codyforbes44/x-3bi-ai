import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

async function validateApiKey(supabase: any, apiKey: string) {
  const { data: keys } = await supabase
    .from('api_keys')
    .select('id, user_id, is_active')
    .eq('key_hash', await hashApiKey(apiKey))
    .single();

  return keys && keys.is_active ? keys : null;
}

async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkRateLimit(supabase: any, apiKeyId: string, endpoint: string): Promise<boolean> {
  const now = new Date();
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  // Get rate limit for this endpoint
  const { data: limit } = await supabase
    .from('api_rate_limits')
    .select('limit_per_hour')
    .eq('api_key_id', apiKeyId)
    .eq('endpoint', endpoint)
    .single();

  const hourlyLimit = limit?.limit_per_hour || 100;

  // Count requests in last hour
  const { count } = await supabase
    .from('api_requests')
    .select('*', { count: 'exact', head: true })
    .eq('api_key_id', apiKeyId)
    .eq('endpoint', endpoint)
    .gte('created_at', hourAgo.toISOString());

  return (count || 0) < hourlyLimit;
}

async function logRequest(
  supabase: any,
  apiKeyId: string,
  endpoint: string,
  method: string,
  statusCode: number,
  responseTime: number
) {
  await supabase.from('api_requests').insert({
    api_key_id: apiKeyId,
    endpoint,
    method,
    status_code: statusCode,
    response_time_ms: responseTime,
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Extract API key from header
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate API key
    const keyData = await validateApiKey(supabase, apiKey);
    if (!keyData) {
      return new Response(JSON.stringify({ error: 'Invalid API key' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse endpoint from URL
    const url = new URL(req.url);
    const endpoint = url.pathname.replace('/api/v1/', '');

    // Check rate limit
    const withinLimit = await checkRateLimit(supabase, keyData.id, endpoint);
    if (!withinLimit) {
      await logRequest(supabase, keyData.id, endpoint, req.method, 429, Date.now() - startTime);
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': '0',
        },
      });
    }

    // Route to appropriate function
    let response: Response;
    const body = req.method !== 'GET' ? await req.json() : {};

    if (endpoint.startsWith('chat')) {
      const chatResp = await supabase.functions.invoke('grok', { body });
      response = new Response(JSON.stringify(chatResp.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (endpoint.startsWith('workflows/execute')) {
      const workflowResp = await supabase.functions.invoke('execute-workflow', { body });
      response = new Response(JSON.stringify(workflowResp.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (endpoint.startsWith('analytics')) {
      const { data: events } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', keyData.user_id)
        .order('created_at', { ascending: false })
        .limit(100);
      
      response = new Response(JSON.stringify({ data: events }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      response = new Response(JSON.stringify({ error: 'Unknown endpoint' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Log request
    const responseTime = Date.now() - startTime;
    await logRequest(supabase, keyData.id, endpoint, req.method, response.status, responseTime);

    return response;

  } catch (error) {
    console.error('Error in api-gateway:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});