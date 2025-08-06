import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { 
      description,
      type = 'analysis',
      data,
      context = 'general'
    } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

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
        temperature: 0.3,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const result = await response.json();
    const analysis = result.choices[0].message.content;

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
    console.error('Error in ai-insights function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});