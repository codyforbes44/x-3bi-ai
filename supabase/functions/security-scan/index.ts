import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function performSecurityScan(supabase: any, workspaceId: string) {
  const findings = [];
  let score = 100;

  // Check 1: RLS policies enabled on all tables
  const { data: tables } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public');

  for (const table of tables || []) {
    const { data: policies } = await supabase.rpc('get_policies', {
      table_name: table.table_name,
    });

    if (!policies || policies.length === 0) {
      findings.push({
        severity: 'high',
        category: 'rls_policy',
        message: `Table ${table.table_name} has no RLS policies`,
        recommendation: 'Enable RLS policies to protect data',
      });
      score -= 10;
    }
  }

  // Check 2: Weak password policies
  const { data: users } = await supabase.auth.admin.listUsers();
  
  const usersWithoutMFA = users?.users.filter(u => !u.factors || u.factors.length === 0) || [];
  if (usersWithoutMFA.length > 0) {
    findings.push({
      severity: 'medium',
      category: 'authentication',
      message: `${usersWithoutMFA.length} users without MFA enabled`,
      recommendation: 'Encourage users to enable multi-factor authentication',
    });
    score -= 5;
  }

  // Check 3: Excessive permissions
  const { data: members } = await supabase
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', workspaceId);

  const adminCount = members?.filter(m => m.role === 'admin').length || 0;
  const totalCount = members?.length || 1;

  if (adminCount / totalCount > 0.3) {
    findings.push({
      severity: 'medium',
      category: 'permissions',
      message: 'Too many users with admin role',
      recommendation: 'Review and restrict admin access to essential personnel only',
    });
    score -= 5;
  }

  // Check 4: Audit logging
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const { count: auditCount } = await supabase
    .from('audit_logs')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneWeekAgo.toISOString());

  if ((auditCount || 0) === 0) {
    findings.push({
      severity: 'low',
      category: 'audit',
      message: 'No audit logs found in the last week',
      recommendation: 'Ensure audit logging is functioning properly',
    });
    score -= 3;
  }

  // Check 5: API key security
  const { data: apiKeys } = await supabase
    .from('api_keys')
    .select('created_at, last_used_at')
    .eq('is_active', true);

  const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);
  const staleKeys = apiKeys?.filter(k => new Date(k.last_used_at || k.created_at) < sixMonthsAgo) || [];

  if (staleKeys.length > 0) {
    findings.push({
      severity: 'medium',
      category: 'api_keys',
      message: `${staleKeys.length} API keys not used in 6 months`,
      recommendation: 'Rotate or revoke unused API keys',
    });
    score -= 5;
  }

  return { findings, score: Math.max(0, score) };
}

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

    const { workspace_id, scan_type = 'full' } = await req.json();

    // Create scan record
    const { data: scan } = await supabase
      .from('security_scans')
      .insert({
        workspace_id,
        scan_type,
        status: 'running',
      })
      .select()
      .single();

    // Perform scan
    const { findings, score } = await performSecurityScan(supabase, workspace_id);

    // Update scan with results
    await supabase
      .from('security_scans')
      .update({
        status: 'completed',
        findings,
        score,
        completed_at: new Date().toISOString(),
      })
      .eq('id', scan.id);

    return new Response(JSON.stringify({
      scan_id: scan.id,
      score,
      findings,
      completed_at: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in security-scan:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});