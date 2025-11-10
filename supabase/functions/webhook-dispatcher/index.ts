import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function generateSignature(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function dispatchWebhook(
  supabase: any,
  webhookId: string,
  url: string,
  secret: string,
  eventType: string,
  payload: any,
  deliveryId: string
) {
  const payloadString = JSON.stringify(payload);
  const signature = await generateSignature(payloadString, secret);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Event-Type': eventType,
      },
      body: payloadString,
    });

    // Update delivery status
    await supabase
      .from('webhook_deliveries')
      .update({
        status: response.ok ? 'delivered' : 'failed',
        response_code: response.status,
        response_body: await response.text(),
        last_attempt_at: new Date().toISOString(),
        attempts: supabase.rpc('increment', { row_id: deliveryId, column_name: 'attempts' }),
      })
      .eq('id', deliveryId);

    return response.ok;
  } catch (error) {
    console.error('Webhook delivery error:', error);
    
    await supabase
      .from('webhook_deliveries')
      .update({
        status: 'failed',
        response_body: error.message,
        last_attempt_at: new Date().toISOString(),
      })
      .eq('id', deliveryId);

    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { event_type, payload, workspace_id, user_id } = await req.json();

    console.log('Dispatching webhooks for event:', event_type);

    // Find all active webhooks for this event type
    let query = supabase
      .from('webhooks')
      .select('*')
      .eq('is_active', true)
      .contains('events', [event_type]);

    if (workspace_id) {
      query = query.eq('workspace_id', workspace_id);
    }

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data: webhooks, error } = await query;

    if (error) throw error;

    if (!webhooks || webhooks.length === 0) {
      return new Response(JSON.stringify({ message: 'No webhooks found for this event' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create delivery records and dispatch
    const results = [];
    for (const webhook of webhooks) {
      // Create delivery record
      const { data: delivery } = await supabase
        .from('webhook_deliveries')
        .insert({
          webhook_id: webhook.id,
          event_type,
          payload,
          status: 'pending',
        })
        .select()
        .single();

      if (delivery) {
        // Dispatch webhook
        const success = await dispatchWebhook(
          supabase,
          webhook.id,
          webhook.url,
          webhook.secret,
          event_type,
          payload,
          delivery.id
        );

        results.push({ webhook_id: webhook.id, success });
      }
    }

    return new Response(JSON.stringify({ dispatched: results.length, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in webhook-dispatcher:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});