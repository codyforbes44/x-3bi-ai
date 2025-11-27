import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, model = 'claude-sonnet-4-5-20250514', provider = 'anthropic', tools, images } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    console.log(`Processing advanced AI request with ${provider} ${model}`);

    let response;
    let aiMessage;

    if (provider === 'anthropic') {
      // Claude 4 API call
      const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
      if (!ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY is not set');
      }

      const messages = [
        {
          role: 'user',
          content: images ? [
            { type: 'text', text: message },
            ...images.map((img: string) => ({
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: img
              }
            }))
          ] : [{ type: 'text', text: message }]
        }
      ];

      const requestBody: any = {
        model,
        max_tokens: 4000,
        messages,
        temperature: 0.7,
        system: "You are Claude 4, an advanced AI assistant with superior reasoning capabilities. Provide thoughtful, accurate, and helpful responses. You can analyze images, process complex requests, and use tools when available."
      };

      // Convert OpenAI-style tools to Anthropic format if needed
      if (tools && tools.length > 0) {
        requestBody.tools = tools.map((tool: any) => {
          // If it's already in Anthropic format, use as-is
          if (tool.name && tool.description && tool.input_schema) {
            return tool;
          }
          // Convert from OpenAI format to Anthropic format
          if (tool.type === 'function' && tool.function) {
            return {
              name: tool.function.name,
              description: tool.function.description || '',
              input_schema: tool.function.parameters || {
                type: 'object',
                properties: {},
                required: []
              }
            };
          }
          return tool;
        });
      }

      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Anthropic API error:', errorText);
        throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      aiMessage = data.content[0]?.text || 'No response generated';

      // Handle tool use if present
      if (data.content.some((c: any) => c.type === 'tool_use')) {
        const toolUses = data.content.filter((c: any) => c.type === 'tool_use');
        return new Response(JSON.stringify({ 
          message: aiMessage,
          toolUses,
          model: model,
          provider: provider
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

    } else if (provider === 'perplexity') {
      // Perplexity API for real-time web search
      const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');
      if (!PERPLEXITY_API_KEY) {
        throw new Error('PERPLEXITY_API_KEY is not set');
      }

      response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model || 'llama-3.1-sonar-large-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant with access to real-time web information. Provide accurate, up-to-date, and comprehensive answers based on the latest available data.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 2000,
          return_images: false,
          return_related_questions: true,
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Perplexity API error:', errorText);
        throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      aiMessage = data.choices[0]?.message?.content || 'No response generated';

    } else {
      // Fallback to OpenAI
      const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
      if (!OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not set');
      }

      const messages = [
        {
          role: 'system',
          content: 'You are an advanced AI assistant. Provide helpful, accurate, and thoughtful responses.'
        },
        {
          role: 'user',
          content: message
        }
      ];

      // Determine if this is a newer model that requires max_completion_tokens
      const isNewerModel = model.includes('gpt-5') || model.includes('o3') || model.includes('o4');
      
      const requestBody: any = {
        model: model || 'gpt-4o',
        messages,
      };
      
      // Newer models use max_completion_tokens and don't support temperature
      if (isNewerModel) {
        requestBody.max_completion_tokens = 4000;
        // O3/O4 models don't support temperature parameter
      } else {
        requestBody.temperature = 0.7;
        requestBody.max_tokens = 4000;
      }

      if (tools && tools.length > 0) {
        requestBody.tools = tools;
        requestBody.tool_choice = 'auto';
      }

      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', errorText);
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      aiMessage = data.choices[0]?.message?.content || 'No response generated';

      // Handle tool calls if present
      if (data.choices[0]?.message?.tool_calls) {
        return new Response(JSON.stringify({ 
          message: aiMessage,
          toolCalls: data.choices[0].message.tool_calls,
          model: model,
          provider: provider
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    console.log(`Successfully processed ${provider} request`);

    return new Response(JSON.stringify({ 
      message: aiMessage,
      model: model,
      provider: provider
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Advanced AI error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to process advanced AI request'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});