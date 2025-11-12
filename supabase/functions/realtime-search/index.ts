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
    const { query, searchType = 'web', includeImages = false } = await req.json();

    if (!query) {
      throw new Error('Query is required');
    }

    console.log(`Processing real-time search: ${query}`);

    const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');
    if (!PERPLEXITY_API_KEY) {
      throw new Error('PERPLEXITY_API_KEY is not set');
    }

    // Determine the best model based on search type
    let model = 'llama-3.1-sonar-large-128k-online';
    let systemPrompt = 'You are a helpful AI assistant with access to real-time web information.';
    
    if (searchType === 'news') {
      systemPrompt = 'You are a news assistant. Provide the latest, most accurate news information with sources and timestamps when available.';
    } else if (searchType === 'research') {
      model = 'llama-3.1-sonar-huge-128k-online'; // Use the most powerful model for research
      systemPrompt = 'You are a research assistant. Provide comprehensive, well-sourced information with detailed analysis and multiple perspectives.';
    } else if (searchType === 'quick') {
      model = 'llama-3.1-sonar-small-128k-online'; // Use faster model for quick queries
      systemPrompt = 'You are a quick-response assistant. Provide concise, accurate answers efficiently.';
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: searchType === 'research' ? 4000 : 2000,
        return_images: includeImages,
        return_related_questions: true,
        search_recency_filter: searchType === 'news' ? 'day' : 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', errorText);
      throw new Error(`Search API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content || 'No results found';
    
    console.log('Real-time search completed successfully');

    return new Response(JSON.stringify({ 
      result,
      model,
      searchType,
      relatedQuestions: data.related_questions || [],
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Real-time search error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to perform real-time search'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});