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
    const { code, language, task } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (task) {
      case 'explain':
        systemPrompt = 'You are a code explanation expert. Explain code clearly and concisely.';
        userPrompt = `Explain this ${language} code:\n\n${code}`;
        break;
      case 'optimize':
        systemPrompt = 'You are a code optimization expert. Provide optimized, efficient code.';
        userPrompt = `Optimize this ${language} code:\n\n${code}`;
        break;
      case 'debug':
        systemPrompt = 'You are a debugging expert. Find and fix issues in code.';
        userPrompt = `Debug this ${language} code and suggest fixes:\n\n${code}`;
        break;
      case 'convert':
        systemPrompt = 'You are a code conversion expert. Convert code between languages accurately.';
        userPrompt = `Convert this code to ${language}:\n\n${code}`;
        break;
      default:
        systemPrompt = 'You are a helpful coding assistant.';
        userPrompt = code;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-code function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});