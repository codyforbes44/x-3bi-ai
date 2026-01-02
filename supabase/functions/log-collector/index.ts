import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { logError, getErrorMessage, getErrorStatus } from '../_shared/errorHandling.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const logEntry = await req.json();

    // Store log entry in database
    const { error } = await supabase
      .from('application_logs')
      .insert({
        timestamp: logEntry.timestamp,
        level: logEntry.level,
        message: logEntry.message,
        context: logEntry.context,
        stack: logEntry.stack,
        correlation_id: logEntry.context.correlationId,
        session_id: logEntry.context.sessionId,
        user_id: logEntry.context.userId,
      });

    if (error) {
      logError(error, 'log-collector-store');
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logError(error, 'log-collector');
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: getErrorStatus(error),
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
