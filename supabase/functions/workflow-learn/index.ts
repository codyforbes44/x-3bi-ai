import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { workflow_id } = await req.json();

    if (!workflow_id) {
      throw new Error('workflow_id is required');
    }

    console.log(`Analyzing workflow performance: ${workflow_id}`);

    // Fetch all executions for this workflow
    const { data: executions, error: execError } = await supabaseClient
      .from('workflow_executions')
      .select('*')
      .eq('workflow_id', workflow_id)
      .order('started_at', { ascending: false })
      .limit(100);

    if (execError) throw execError;

    if (!executions || executions.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'Not enough execution data to analyze',
          executions: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze execution patterns
    const successRate = executions.filter(e => e.status === 'completed').length / executions.length;
    const avgExecutionTime = executions
      .filter(e => e.execution_time_ms)
      .reduce((sum, e) => sum + e.execution_time_ms, 0) / executions.length;

    // Identify common failure points
    const { data: logs, error: logsError } = await supabaseClient
      .from('workflow_execution_logs')
      .select('*')
      .in('execution_id', executions.map(e => e.id))
      .eq('status', 'failed');

    if (logsError) throw logsError;

    const failuresByStep: any = {};
    logs?.forEach(log => {
      const stepId = log.step_id;
      failuresByStep[stepId] = (failuresByStep[stepId] || 0) + 1;
    });

    // Get workflow steps to map IDs to names
    const { data: steps } = await supabaseClient
      .from('workflow_steps')
      .select('*')
      .eq('workflow_id', workflow_id);

    const stepNames: any = {};
    steps?.forEach(step => {
      stepNames[step.id] = step.name;
    });

    const failureAnalysis = Object.entries(failuresByStep).map(([stepId, count]) => ({
      step_id: stepId,
      step_name: stepNames[stepId] || 'Unknown',
      failure_count: count,
    })).sort((a: any, b: any) => b.failure_count - a.failure_count);

    // Generate optimization suggestions using AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    let suggestions = [];
    if (LOVABLE_API_KEY) {
      const analysisPrompt = `Analyze this workflow performance data and suggest optimizations:
      
Success Rate: ${(successRate * 100).toFixed(1)}%
Average Execution Time: ${avgExecutionTime.toFixed(0)}ms
Total Executions: ${executions.length}

Common Failure Points:
${failureAnalysis.slice(0, 3).map(f => `- ${f.step_name}: ${f.failure_count} failures`).join('\n')}

Provide 3-5 specific, actionable optimization suggestions to improve this workflow's reliability and performance.`;

      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: 'You are a workflow optimization expert. Provide concise, actionable suggestions.' },
            { role: 'user', content: analysisPrompt }
          ],
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        const suggestionsText = aiData.choices[0]?.message?.content || '';
        suggestions = suggestionsText.split('\n').filter((s: string) => s.trim().length > 0);
      }
    }

    // Store learning insights
    const insights = {
      analyzed_at: new Date().toISOString(),
      total_executions: executions.length,
      success_rate: successRate,
      avg_execution_time_ms: avgExecutionTime,
      failure_analysis: failureAnalysis,
      optimization_suggestions: suggestions,
    };

    // Update workflow metadata with insights
    await supabaseClient
      .from('workflows')
      .update({
        trigger_config: {
          ...executions[0]?.input_data,
          learning_insights: insights,
        }
      })
      .eq('id', workflow_id);

    console.log(`Learning complete for workflow ${workflow_id}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        insights,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in workflow-learn:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
