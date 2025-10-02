import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { execution_id, workflow_id, steps, input_data } = await req.json();

    console.log('Starting workflow execution:', { execution_id, workflow_id, steps: steps.length });

    let currentData = input_data || {};
    let completedSteps = 0;

    try {
      // Update execution status to running
      await supabase
        .from('workflow_executions')
        .update({ status: 'running' })
        .eq('id', execution_id);

      // Execute each step in order
      for (const step of steps) {
        console.log(`Executing step ${step.step_order}: ${step.name} (${step.type})`);

        // Log step start
        const { data: logData } = await supabase
          .from('workflow_execution_logs')
          .insert({
            execution_id,
            step_id: step.id,
            step_order: step.step_order,
            status: 'running',
            input_data: currentData,
          })
          .select()
          .single();

        let stepResult;
        let stepError = null;

        try {
          // Execute step based on type
          stepResult = await executeStep(step, currentData, supabase);
          currentData = { ...currentData, ...stepResult };
          
          // Log step completion
          if (logData) {
            await supabase
              .from('workflow_execution_logs')
              .update({
                status: 'completed',
                completed_at: new Date().toISOString(),
                output_data: stepResult,
              })
              .eq('id', logData.id);
          }

          completedSteps++;
        } catch (error: any) {
          stepError = error.message;
          console.error(`Step ${step.step_order} failed:`, stepError);
          
          // Log step failure
          if (logData) {
            await supabase
              .from('workflow_execution_logs')
              .update({
                status: 'failed',
                completed_at: new Date().toISOString(),
                error_message: stepError,
              })
              .eq('id', logData.id);
          }

          throw error;
        }
      }

      // Mark execution as completed
      const endTime = new Date();
      const startTime = new Date((await supabase
        .from('workflow_executions')
        .select('started_at')
        .eq('id', execution_id)
        .single()).data?.started_at || endTime);

      await supabase
        .from('workflow_executions')
        .update({
          status: 'completed',
          completed_at: endTime.toISOString(),
          execution_time_ms: endTime.getTime() - startTime.getTime(),
          output_data: currentData,
          steps_completed: completedSteps,
        })
        .eq('id', execution_id);

      // Update workflow stats
      await supabase.rpc('increment', {
        row_id: workflow_id,
        x: 1,
      });

      await supabase
        .from('workflows')
        .update({ last_run_at: new Date().toISOString() })
        .eq('id', workflow_id);

      console.log('Workflow execution completed successfully');

      return new Response(
        JSON.stringify({ success: true, output: currentData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error: any) {
      // Mark execution as failed
      const endTime = new Date();
      const startTime = new Date((await supabase
        .from('workflow_executions')
        .select('started_at')
        .eq('id', execution_id)
        .single()).data?.started_at || endTime);

      await supabase
        .from('workflow_executions')
        .update({
          status: 'failed',
          completed_at: endTime.toISOString(),
          execution_time_ms: endTime.getTime() - startTime.getTime(),
          error_message: error.message,
          steps_completed: completedSteps,
        })
        .eq('id', execution_id);

      throw error;
    }
  } catch (error: any) {
    console.error('Error executing workflow:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function executeStep(step: any, inputData: any, supabase: any) {
  const config = step.config || {};

  switch (step.type) {
    case 'ai_chat':
      return await executeAIChat(config, inputData);
    
    case 'data_transform':
      return await executeDataTransform(config, inputData);
    
    case 'delay':
      await new Promise(resolve => setTimeout(resolve, config.delay_ms || 1000));
      return { delayed: true };
    
    case 'condition':
      return await executeCondition(config, inputData);
    
    case 'http_request':
      return await executeHttpRequest(config, inputData);
    
    default:
      console.log(`Step type ${step.type} not implemented, skipping`);
      return { skipped: true, step_type: step.type };
  }
}

async function executeAIChat(config: any, inputData: any) {
  // Placeholder for AI chat execution
  return {
    ai_response: `Processed: ${JSON.stringify(inputData)}`,
    step_completed: true,
  };
}

async function executeDataTransform(config: any, inputData: any) {
  // Simple data transformation
  return {
    transformed: true,
    original_data: inputData,
    timestamp: new Date().toISOString(),
  };
}

async function executeCondition(config: any, inputData: any) {
  // Evaluate condition
  const result = config.condition ? eval(config.condition) : true;
  return {
    condition_met: result,
    ...inputData,
  };
}

async function executeHttpRequest(config: any, inputData: any) {
  const response = await fetch(config.url, {
    method: config.method || 'GET',
    headers: config.headers || {},
    body: config.method !== 'GET' ? JSON.stringify(inputData) : undefined,
  });

  const data = await response.json();
  return {
    http_response: data,
    status: response.status,
  };
}
