import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { query, limit = 10 } = await req.json();

    console.log(`Semantic search: "${query}"`);

    // Get query embedding
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: query,
      }),
    });

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Search knowledge entities using vector similarity
    const { data: entities, error } = await supabaseClient.rpc('match_knowledge_entities', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: limit,
      p_user_id: user.id
    });

    if (error) {
      console.error('Vector search error:', error);
      // Fallback to text search
      const { data: fallbackEntities } = await supabaseClient
        .from('knowledge_entities')
        .select('*')
        .eq('user_id', user.id)
        .or(`entity_name.ilike.%${query}%,properties->>description.ilike.%${query}%`)
        .limit(limit);
      
      return new Response(
        JSON.stringify({
          success: true,
          results: fallbackEntities || [],
          method: 'text_search',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get related entities for each result
    const enrichedResults = await Promise.all(
      entities.map(async (entity: any) => {
        const { data: relationships } = await supabaseClient
          .from('knowledge_relationships')
          .select(`
            *,
            to_entity:to_entity_id (*)
          `)
          .eq('from_entity_id', entity.id)
          .limit(5);

        return {
          ...entity,
          related: relationships || [],
        };
      })
    );

    // Log search
    await supabaseClient
      .from('semantic_searches')
      .insert({
        user_id: user.id,
        query,
        query_embedding: queryEmbedding,
        results: enrichedResults,
        result_count: enrichedResults.length,
      });

    return new Response(
      JSON.stringify({
        success: true,
        results: enrichedResults,
        method: 'vector_search',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in semantic-search:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Note: The match_knowledge_entities function needs to be created in the database
