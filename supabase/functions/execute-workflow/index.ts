import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";
import { requireAuth, createAuthErrorResponse } from '../_shared/auth.ts';
import { validateString, createValidationErrorResponse } from '../_shared/validation.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const user = await requireAuth(req);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    
    // Validate required fields
    const execution_id = validateString(body.execution_id, 'execution_id');
    const workflow_id = validateString(body.workflow_id, 'workflow_id');
    const steps = body.steps;
    const input_data = body.input_data || {};
    
    if (!Array.isArray(steps)) {
      return createValidationErrorResponse('steps must be an array');
    }

    console.log('Starting workflow execution:', { execution_id, workflow_id, steps: steps.length, user_id: user.id });

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
    
    // Return appropriate error response
    if (error.message?.includes('Unauthorized')) {
      return createAuthErrorResponse(error.message);
    }
    
    if (error.message?.includes('Validation error') || error.message?.includes('must be')) {
      return createValidationErrorResponse(error.message);
    }
    
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
    
    case 'zapier_webhook':
      return await executeZapierWebhook(config, inputData);
    
    case 'extract_data':
      return await executeExtractData(config, inputData);
    
    case 'filter_data':
      return await executeFilterData(config, inputData);
    
    case 'map_data':
      return await executeMapData(config, inputData);
    
    case 'aggregate_data':
      return await executeAggregateData(config, inputData);
    
    case 'delay':
      await new Promise(resolve => setTimeout(resolve, config.delay_ms || 1000));
      return { delayed: true };
    
    case 'condition':
      return await executeCondition(config, inputData);
    
    case 'http_request':
      return await executeHttpRequest(config, inputData);
    
    // AI Agent Steps
    case 'ai_decision':
    case 'ai_data_analysis':
    case 'ai_content_generation':
    case 'ai_api_orchestration':
    case 'ai_web_scraping':
    case 'ai_agent':
      return await executeAIAgentStep(step.type, config, inputData, supabase);
    
    // Vision and Web Action Steps
    case 'vision_analysis':
      return await executeVisionAnalysis(config, inputData);
    
    case 'web_action':
      return await executeWebAction(config, inputData);
    
    default:
      console.log(`Step type ${step.type} not implemented, skipping`);
      return { skipped: true, step_type: step.type };
  }
}

async function executeAIAgentStep(stepType: string, config: any, inputData: any, supabase: any) {
  try {
    const { data, error } = await supabase.functions.invoke('ai-agent-executor', {
      body: {
        stepType,
        config,
        inputData,
      },
    });

    if (error) throw error;

    return {
      ai_agent_result: data,
      step_type: stepType,
    };
  } catch (error: any) {
    console.error('AI Agent step error:', error);
    throw new Error(`AI Agent execution failed: ${error.message}`);
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
  // Safe condition evaluation using simple comparison operators
  // Format: "field operator value" e.g., "status equals active"
  let result = true;
  
  if (config.condition) {
    const { field, operator, value } = config;
    const fieldValue = getValueByPath(inputData, field);
    
    switch (operator) {
      case 'equals':
        result = fieldValue === value;
        break;
      case 'not_equals':
        result = fieldValue !== value;
        break;
      case 'greater_than':
        result = Number(fieldValue) > Number(value);
        break;
      case 'less_than':
        result = Number(fieldValue) < Number(value);
        break;
      case 'contains':
        result = String(fieldValue).includes(value);
        break;
      case 'exists':
        result = fieldValue !== undefined && fieldValue !== null;
        break;
      default:
        result = true;
    }
  }
  
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

async function executeZapierWebhook(config: any, inputData: any) {
  const webhookUrl = config.webhook_url;
  if (!webhookUrl) {
    throw new Error('Zapier webhook URL is required');
  }

  const payload = {
    ...inputData,
    triggered_at: new Date().toISOString(),
    workflow_metadata: config.metadata || {},
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return {
    zapier_triggered: true,
    status: response.status,
    webhook_url: webhookUrl,
    payload_sent: payload,
  };
}

async function executeExtractData(config: any, inputData: any) {
  const fields = config.fields || [];
  const source = config.source || inputData;
  
  const extracted: any = {};
  
  for (const field of fields) {
    const { name, path, default_value } = field;
    const value = getValueByPath(source, path) ?? default_value;
    extracted[name] = value;
  }
  
  return {
    extracted_data: extracted,
    original_data: inputData,
  };
}

function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

async function executeFilterData(config: any, inputData: any) {
  const dataArray = Array.isArray(inputData.data) ? inputData.data : [inputData];
  const filterRules = config.rules || [];
  
  let filtered = dataArray;
  
  for (const rule of filterRules) {
    const { field, operator, value } = rule;
    
    filtered = filtered.filter((item: any) => {
      const itemValue = getValueByPath(item, field);
      
      switch (operator) {
        case 'equals':
          return itemValue === value;
        case 'not_equals':
          return itemValue !== value;
        case 'contains':
          return String(itemValue).includes(value);
        case 'greater_than':
          return Number(itemValue) > Number(value);
        case 'less_than':
          return Number(itemValue) < Number(value);
        case 'exists':
          return itemValue !== undefined && itemValue !== null;
        case 'not_exists':
          return itemValue === undefined || itemValue === null;
        default:
          return true;
      }
    });
  }
  
  return {
    filtered_data: filtered,
    original_count: dataArray.length,
    filtered_count: filtered.length,
  };
}

async function executeMapData(config: any, inputData: any) {
  const dataArray = Array.isArray(inputData.data) ? inputData.data : [inputData];
  const mappings = config.mappings || [];
  
  const mapped = dataArray.map((item: any) => {
    const mappedItem: any = {};
    
    for (const mapping of mappings) {
      const { target, source, transform } = mapping;
      let value = getValueByPath(item, source);
      
      // Apply transformations
      if (transform) {
        switch (transform.type) {
          case 'uppercase':
            value = String(value).toUpperCase();
            break;
          case 'lowercase':
            value = String(value).toLowerCase();
            break;
          case 'trim':
            value = String(value).trim();
            break;
          case 'number':
            value = Number(value);
            break;
          case 'string':
            value = String(value);
            break;
          case 'date':
            value = new Date(value).toISOString();
            break;
          case 'boolean':
            value = Boolean(value);
            break;
          case 'json':
            try {
              value = JSON.parse(value);
            } catch (e) {
              console.error('JSON parse error:', e);
            }
            break;
        }
      }
      
      mappedItem[target] = value;
    }
    
    return mappedItem;
  });
  
  return {
    mapped_data: mapped,
    count: mapped.length,
  };
}

async function executeAggregateData(config: any, inputData: any) {
  const dataArray = Array.isArray(inputData.data) ? inputData.data : [inputData];
  const aggregations = config.aggregations || [];
  
  const results: any = {};
  
  for (const agg of aggregations) {
    const { name, field, operation } = agg;
    const values = dataArray.map((item: any) => getValueByPath(item, field)).filter((v: any) => v !== undefined && v !== null);
    
    switch (operation) {
      case 'count':
        results[name] = values.length;
        break;
      case 'sum':
        results[name] = values.reduce((sum: number, val: any) => sum + Number(val), 0);
        break;
      case 'avg':
        results[name] = values.reduce((sum: number, val: any) => sum + Number(val), 0) / values.length;
        break;
      case 'min':
        results[name] = Math.min(...values.map(Number));
        break;
      case 'max':
        results[name] = Math.max(...values.map(Number));
        break;
      case 'unique':
        results[name] = [...new Set(values)];
        break;
      case 'concat':
        results[name] = values.join(agg.separator || ', ');
        break;
    }
  }
  
  return {
    aggregated_data: results,
    source_count: dataArray.length,
  };
}

async function executeVisionAnalysis(config: any, inputData: any) {
  const { imageUrl, analysisType = 'describe', customPrompt } = config;
  const imageToAnalyze = imageUrl || inputData.imageUrl;

  if (!imageToAnalyze) throw new Error('No image URL provided');

  const GROK_API_KEY = Deno.env.get('GROK_API_KEY');
  if (!GROK_API_KEY) throw new Error('GROK_API_KEY not configured');

  const prompts: any = {
    describe: 'Describe this image in detail.',
    extract_text: 'Extract all text visible in this image.',
    identify_objects: 'List all objects you can identify in this image.',
    analyze_sentiment: 'Analyze the mood or sentiment conveyed by this image.',
  };

  const prompt = customPrompt || prompts[analysisType] || 'Analyze this image.';

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-2-vision-1212',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageToAnalyze } }
        ]
      }],
    }),
  });

  if (!response.ok) throw new Error(`Vision API error: ${response.status}`);

  const data = await response.json();
  return { 
    analysis: data.choices[0]?.message?.content, 
    imageUrl: imageToAnalyze, 
    analysisType 
  };
}

async function executeWebAction(config: any, inputData: any) {
  const { actionType, selector, value } = config;
  
  return {
    actionType,
    selector,
    value,
    executed: true,
    message: `Would execute ${actionType} on ${selector}`,
    note: 'Browser automation integration required'
  };
}

