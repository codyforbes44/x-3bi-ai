import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { requireAuth } from '../_shared/auth.ts';
import { validateString, validateEnum } from '../_shared/validation.ts';
import { isRateLimited, getRateLimitHeaders, createRateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VALID_TASKS = ['explain', 'optimize', 'debug', 'convert'] as const;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const user = await requireAuth(req);
    
    // Rate limiting: 20 requests per minute per user
    const rateLimitResult = isRateLimited(user.id, { windowMs: 60000, maxRequests: 20 });
    const rateLimitHeaders = getRateLimitHeaders(user.id, { windowMs: 60000, maxRequests: 20 });
    
    if (rateLimitResult.limited) {
      return createRateLimitResponse(rateLimitResult.resetAt);
    }

    const { code, language, task, model = 'google/gemini-2.5-flash' } = await req.json();

    // Validate inputs
    validateString(code, 'code', { maxLength: 50000 });
    validateString(language, 'language', { maxLength: 50 });
    validateEnum(task, 'task', VALID_TASKS);
    validateString(model, 'model', { maxLength: 100 });
    
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

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Code task: ${task} with model: ${model}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    // Handle rate limit errors
    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }}
      );
    }

    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: 'AI credits depleted. Please add funds to your Lovable workspace.' }),
        { status: 402, headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }}
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-code function:', error);
    return new Response(JSON.stringify({ error: error.message || 'An unexpected error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});