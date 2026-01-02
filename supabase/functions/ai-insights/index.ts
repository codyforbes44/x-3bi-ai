import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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
    const { 
      description,
      type = 'analysis',
      data,
      context = 'general',
      provider = 'anthropic'
    } = await req.json();

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'analysis':
        systemPrompt = 'You are an expert data analyst. Provide deep insights, patterns, and actionable recommendations from the given data.';
        userPrompt = `Analyze the following data and provide comprehensive insights:\n\nDescription: ${description}\nData: ${JSON.stringify(data, null, 2)}\nContext: ${context}`;
        break;
      
      case 'prediction':
        systemPrompt = 'You are a predictive analytics expert. Use machine learning concepts to forecast trends and outcomes.';
        userPrompt = `Based on the following data, provide predictions and trend analysis:\n\nDescription: ${description}\nData: ${JSON.stringify(data, null, 2)}\nContext: ${context}`;
        break;
      
      case 'optimization':
        systemPrompt = 'You are an optimization specialist. Identify inefficiencies and suggest improvements.';
        userPrompt = `Analyze the following for optimization opportunities:\n\nDescription: ${description}\nData: ${JSON.stringify(data, null, 2)}\nContext: ${context}`;
        break;
      
      case 'visualization':
        systemPrompt = 'You are a data visualization expert. Recommend the best ways to visualize data and create chart configurations.';
        userPrompt = `Suggest optimal visualization strategies for:\n\nDescription: ${description}\nData: ${JSON.stringify(data, null, 2)}\nContext: ${context}\n\nProvide specific chart types, configurations, and Recharts component suggestions.`;
        break;
      
      case 'report':
        systemPrompt = 'You are a business intelligence expert. Create comprehensive, executive-level reports with actionable insights.';
        userPrompt = `Create a detailed analytical report for:\n\nDescription: ${description}\nData: ${JSON.stringify(data, null, 2)}\nContext: ${context}`;
        break;
      
      default:
        systemPrompt = 'You are an intelligent data assistant. Provide helpful analysis and insights.';
        userPrompt = `${description}\n\nData: ${JSON.stringify(data, null, 2)}\nContext: ${context}`;
    }

    console.log(`Performing ${type} analysis for context: ${context}`);

    let analysis;

    // Use Claude Sonnet 4 as default (superior analytical reasoning)
    if (provider === 'anthropic') {
      const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
      if (!anthropicApiKey) {
        throw new Error('Anthropic API key not configured');
      }

      console.log('Using Claude Sonnet 4 for insights analysis');
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          messages: [
            { role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }
          ],
          max_tokens: 4096,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Anthropic API error: ${error}`);
      }

      const result = await response.json();
      analysis = result.content[0].text;
    } else {
      // Fallback to OpenAI GPT-4o
      const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openAIApiKey) {
        throw new Error('OpenAI API key not configured');
      }

      console.log('Using OpenAI GPT-4o for insights analysis');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 3000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${error}`);
      }

      const result = await response.json();
      analysis = result.choices[0].message.content;
    }

    return new Response(JSON.stringify({
      analysis,
      type,
      context,
      timestamp: new Date().toISOString(),
      confidence: 'high',
      recommendations: analysis.includes('recommend') || analysis.includes('suggest')
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    logError(error, 'ai-insights');
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: getErrorStatus(error),
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});