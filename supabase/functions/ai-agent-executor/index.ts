import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AGENT_TOOLS = [
  {
    type: "function",
    function: {
      name: "make_http_request",
      description: "Make an HTTP request to an external API",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "The URL to make the request to" },
          method: { type: "string", enum: ["GET", "POST", "PUT", "DELETE"], description: "HTTP method" },
          headers: { type: "object", description: "Request headers" },
          body: { type: "object", description: "Request body for POST/PUT requests" }
        },
        required: ["url", "method"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "extract_data",
      description: "Extract specific fields from data objects",
      parameters: {
        type: "object",
        properties: {
          data: { type: "object", description: "The data object to extract from" },
          fields: { type: "array", items: { type: "string" }, description: "Field paths to extract (e.g., 'user.name')" }
        },
        required: ["data", "fields"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "analyze_sentiment",
      description: "Analyze sentiment of text data",
      parameters: {
        type: "object",
        properties: {
          text: { type: "string", description: "The text to analyze" }
        },
        required: ["text"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "classify_data",
      description: "Classify data into categories",
      parameters: {
        type: "object",
        properties: {
          data: { type: "string", description: "The data to classify" },
          categories: { type: "array", items: { type: "string" }, description: "Possible categories" }
        },
        required: ["data", "categories"]
      }
    }
  }
];

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

    const { stepType, config, inputData } = await req.json();

    let systemPrompt = '';
    let userPrompt = '';

    switch (stepType) {
      case 'ai_decision':
        systemPrompt = 'You are an AI decision maker. Analyze the input and make a logical decision based on the criteria provided.';
        userPrompt = `Decision criteria: ${JSON.stringify(config.criteria)}\nInput data: ${JSON.stringify(inputData)}`;
        break;
      case 'data_analysis':
        systemPrompt = 'You are a data analyst. Analyze the provided data and extract insights.';
        userPrompt = `Analysis type: ${config.analysisType}\nData: ${JSON.stringify(inputData)}`;
        break;
      case 'content_generation':
        systemPrompt = 'You are a content creator. Generate high-quality content based on the requirements.';
        userPrompt = `Template: ${config.template}\nContext: ${JSON.stringify(inputData)}`;
        break;
      case 'api_orchestration':
        systemPrompt = 'You are an API orchestrator. Determine the sequence of API calls needed to achieve the goal.';
        userPrompt = `Goal: ${config.goal}\nAvailable APIs: ${JSON.stringify(config.apis)}\nInput: ${JSON.stringify(inputData)}`;
        break;
      default:
        systemPrompt = 'You are a helpful AI assistant.';
        userPrompt = JSON.stringify(inputData);
    }

    const GROK_API_KEY = Deno.env.get('GROK_API_KEY');
    if (!GROK_API_KEY) {
      throw new Error('GROK_API_KEY not configured');
    }

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-2-1212',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: AGENT_TOOLS,
        tool_choice: 'auto',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Grok API error:', response.status, errorText);
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices[0]?.message;
    
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolResults = [];
      
      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        let result;
        switch (functionName) {
          case 'make_http_request':
            result = await executeHttpRequest(functionArgs);
            break;
          case 'extract_data':
            result = await executeExtractData(functionArgs);
            break;
          case 'analyze_sentiment':
            result = analyzeSentiment(functionArgs);
            break;
          case 'classify_data':
            result = classifyData(functionArgs);
            break;
          default:
            result = { error: `Unknown tool: ${functionName}` };
        }
        
        toolResults.push({ tool: functionName, result });
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          toolCalls: toolResults,
          message: message.content 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        result: message.content 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-agent-executor:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function executeHttpRequest(args: any) {
  try {
    const { url, method, headers = {}, body } = args;
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { error: error.message };
  }
}

async function executeExtractData(args: any) {
  const { data, fields } = args;
  const extracted: any = {};
  
  for (const field of fields) {
    extracted[field] = getValueByPath(data, field);
  }
  
  return extracted;
}

function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function analyzeSentiment(args: any) {
  const { text } = args;
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'poor', 'disappointing'];
  
  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
  
  let sentiment = 'neutral';
  let score = 0;
  
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
    score = Math.min(positiveCount / (positiveCount + negativeCount), 1);
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
    score = -Math.min(negativeCount / (positiveCount + negativeCount), 1);
  }
  
  return { sentiment, score, positiveCount, negativeCount };
}

function classifyData(args: any) {
  const { data, categories } = args;
  const lowerData = data.toLowerCase();
  const scores: any = {};
  
  for (const category of categories) {
    const lowerCategory = category.toLowerCase();
    scores[category] = lowerData.includes(lowerCategory) ? 1 : 0;
  }
  
  const bestMatch = Object.entries(scores).reduce((a: any, b: any) => a[1] > b[1] ? a : b);
  
  return { 
    category: bestMatch[0],
    confidence: bestMatch[1],
    allScores: scores 
  };
}
