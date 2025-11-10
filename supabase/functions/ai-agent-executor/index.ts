import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const XAI_API_KEY = Deno.env.get('XAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Agent tool definitions
const agentTools = [
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
          body: { type: "object", description: "Request body for POST/PUT" }
        },
        required: ["url", "method"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "extract_data",
      description: "Extract specific fields from complex data structures",
      parameters: {
        type: "object",
        properties: {
          data: { type: "object", description: "The data object to extract from" },
          fields: { type: "array", items: { type: "string" }, description: "Field paths to extract (dot notation)" }
        },
        required: ["data", "fields"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "analyze_sentiment",
      description: "Analyze the sentiment of text",
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
          data: { type: "any", description: "The data to classify" },
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
    const { stepType, config, inputData } = await req.json();

    console.log('AI Agent execution:', { stepType, config });

    if (!XAI_API_KEY) {
      throw new Error('XAI_API_KEY not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';
    let tools = agentTools;

    // Build prompts based on step type
    switch (stepType) {
      case 'ai_decision':
        systemPrompt = `You are an AI decision-making agent. Your job is to analyze the provided data and make an intelligent decision based on the goal and available options.`;
        userPrompt = `Goal: ${config.goal}
        
Available Options: ${JSON.stringify(config.options)}

Input Data: ${JSON.stringify(inputData, null, 2)}

Analyze the data and choose the best option. Explain your reasoning and return your decision.`;
        break;

      case 'ai_data_analysis':
        systemPrompt = `You are an AI data analyst. Your job is to analyze data and provide insights based on the specified analysis type.`;
        userPrompt = `Analysis Type: ${config.analysis_type}
Instructions: ${config.instructions}

Data to analyze: ${JSON.stringify(inputData, null, 2)}

Perform the requested analysis and provide detailed insights.`;
        break;

      case 'ai_content_generation':
        systemPrompt = `You are an AI content generator. Create high-quality ${config.content_type} content based on the template and data provided.`;
        userPrompt = `Template/Instructions: ${config.template}

Available Data: ${JSON.stringify(inputData, null, 2)}

Generate the requested content. Replace any {{fieldName}} placeholders with actual data values.`;
        break;

      case 'ai_api_orchestration':
        systemPrompt = `You are an AI API orchestrator. You can call multiple APIs intelligently to accomplish complex tasks. Use the make_http_request tool to call APIs as needed.`;
        userPrompt = `Goal: ${config.orchestration_goal}

Available APIs: ${JSON.stringify(config.available_apis, null, 2)}

Input Data: ${JSON.stringify(inputData, null, 2)}

Determine which APIs to call, in what order, and how to use the data. Use the make_http_request function to make the calls.`;
        break;

      case 'ai_web_scraping':
        systemPrompt = `You are an AI web scraping agent. Extract structured data from web pages based on user requirements.`;
        userPrompt = `URL to scrape: ${config.url}
Extraction Goal: ${config.extraction_goal}

Use the make_http_request tool to fetch the page, then extract the requested data and structure it properly.`;
        break;

      default:
        throw new Error(`Unknown AI agent step type: ${stepType}`);
    }

    // Call Grok API with tool calling
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${XAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-4-0709',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: tools,
        tool_choice: 'auto',
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Grok API error:', response.status, errorText);
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Grok response:', JSON.stringify(data, null, 2));

    let result: any = {
      agent_response: data.choices[0].message.content,
      step_type: stepType,
    };

    // Handle tool calls if any
    if (data.choices[0].message.tool_calls) {
      const toolCalls = data.choices[0].message.tool_calls;
      const toolResults = [];

      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);

        console.log('Tool call:', functionName, args);

        let toolResult;
        switch (functionName) {
          case 'make_http_request':
            toolResult = await executeHttpRequest(args);
            break;
          case 'extract_data':
            toolResult = executeExtractData(args);
            break;
          case 'analyze_sentiment':
            toolResult = analyzeSentiment(args);
            break;
          case 'classify_data':
            toolResult = classifyData(args);
            break;
          default:
            toolResult = { error: `Unknown tool: ${functionName}` };
        }

        toolResults.push({
          tool: functionName,
          arguments: args,
          result: toolResult,
        });
      }

      result.tool_calls = toolResults;
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('AI Agent error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'AI Agent execution failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Tool execution functions
async function executeHttpRequest(args: any) {
  try {
    const response = await fetch(args.url, {
      method: args.method,
      headers: args.headers || {},
      body: args.body ? JSON.stringify(args.body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      status: response.status,
      data: data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

function executeExtractData(args: any) {
  const { data, fields } = args;
  const extracted: any = {};

  for (const field of fields) {
    const value = getValueByPath(data, field);
    extracted[field] = value;
  }

  return extracted;
}

function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function analyzeSentiment(args: any) {
  const { text } = args;
  // Simple sentiment analysis (in real implementation, could call another AI service)
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'poor', 'disappointing'];

  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

  let sentiment = 'neutral';
  if (positiveCount > negativeCount) sentiment = 'positive';
  if (negativeCount > positiveCount) sentiment = 'negative';

  return {
    sentiment,
    confidence: Math.abs(positiveCount - negativeCount) / (positiveCount + negativeCount + 1),
    positive_score: positiveCount,
    negative_score: negativeCount,
  };
}

function classifyData(args: any) {
  const { data, categories } = args;
  // Simple classification based on string matching
  const dataStr = JSON.stringify(data).toLowerCase();
  
  for (const category of categories) {
    if (dataStr.includes(category.toLowerCase())) {
      return {
        category,
        confidence: 0.8,
      };
    }
  }

  return {
    category: categories[0],
    confidence: 0.5,
  };
}
