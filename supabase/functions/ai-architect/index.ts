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
      prompt, 
      template = 'landing-page',
      style = 'modern',
      colors = 'blue',
      features = [],
      industry = 'tech',
      provider = 'anthropic'
    } = await req.json();

    console.log('Generating code with AI architect:', { template, style, colors, industry });

    const systemPrompt = `You are an expert web developer and AI architect. Generate complete, production-ready React components with TypeScript and Tailwind CSS based on user requirements.

REQUIREMENTS:
- Use modern React patterns with hooks
- Include responsive design with Tailwind CSS
- Generate semantic, accessible HTML
- Include proper TypeScript types
- Create visually stunning, professional designs
- Include animations and interactions
- Generate multiple component files when needed
- Use proper component composition
- Include error handling and loading states

STYLE GUIDELINES:
- ${style} design aesthetic
- ${colors} color scheme
- Industry: ${industry}
- Features: ${features.join(', ')}

Generate a complete, functional component that exceeds expectations.`;

    const userPrompt = `Create a ${template} with the following specifications:
${prompt}

Additional requirements:
- Template type: ${template}
- Design style: ${style}
- Color scheme: ${colors}
- Industry: ${industry}
- Required features: ${features.join(', ')}

Provide the complete React component code with TypeScript and Tailwind CSS.`;

    let generatedCode;

    // Use Claude Opus 4 as default (maximum intelligence for complex architecture)
    if (provider === 'anthropic') {
      const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
      if (!anthropicApiKey) {
        throw new Error('Anthropic API key not configured');
      }

      console.log('Using Claude Opus 4 for architecture generation');
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-opus-4-1-20250805',
          messages: [
            { role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }
          ],
          max_tokens: 8192,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Anthropic API error: ${error}`);
      }

      const data = await response.json();
      generatedCode = data.content[0].text;
    } else {
      // Fallback to OpenAI GPT-4o
      const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openAIApiKey) {
        throw new Error('OpenAI API key not configured');
      }

      console.log('Using OpenAI GPT-4o for architecture generation');
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
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${error}`);
      }

      const data = await response.json();
      generatedCode = data.choices[0].message.content;
    }

    // Extract component name and file structure
    const componentMatch = generatedCode.match(/const\s+(\w+)\s*=/);
    const componentName = componentMatch ? componentMatch[1] : 'GeneratedComponent';

    return new Response(JSON.stringify({
      code: generatedCode,
      componentName,
      template,
      style,
      colors,
      features,
      industry,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-architect function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});