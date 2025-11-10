import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { action, integration_id, workspace_id, config } = await req.json();

    if (action === 'install') {
      // Check if already installed
      const { data: existing } = await supabase
        .from('user_integrations')
        .select('id')
        .eq('user_id', user.id)
        .eq('integration_id', integration_id)
        .eq('workspace_id', workspace_id)
        .single();

      if (existing) {
        return new Response(JSON.stringify({ error: 'Integration already installed' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Install integration
      const { data: installation, error } = await supabase
        .from('user_integrations')
        .insert({
          user_id: user.id,
          workspace_id,
          integration_id,
          config,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      // Increment install count
      await supabase.rpc('increment', {
        table_name: 'integrations',
        row_id: integration_id,
        column_name: 'install_count',
      });

      return new Response(JSON.stringify({ success: true, installation }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'uninstall') {
      const { data, error } = await supabase
        .from('user_integrations')
        .delete()
        .eq('user_id', user.id)
        .eq('integration_id', integration_id)
        .eq('workspace_id', workspace_id);

      if (error) throw error;

      // Decrement install count
      await supabase.rpc('decrement', {
        table_name: 'integrations',
        row_id: integration_id,
        column_name: 'install_count',
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'configure') {
      const { data, error } = await supabase
        .from('user_integrations')
        .update({ config })
        .eq('user_id', user.id)
        .eq('integration_id', integration_id)
        .eq('workspace_id', workspace_id)
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'list') {
      const { data, error } = await supabase
        .from('user_integrations')
        .select('*, integrations(*)')
        .eq('user_id', user.id)
        .eq('workspace_id', workspace_id);

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in integration-install:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});