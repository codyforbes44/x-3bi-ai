import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { 
      query, 
      modality_filter, 
      tags_filter, 
      limit = 10,
      decay_factor = 0.1,
      similarity_threshold = 0.7
    } = await req.json();

    if (!query) {
      throw new Error('Query is required');
    }

    // Generate query embedding
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: query,
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error('Failed to generate query embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Build filter conditions
    let filterConditions = `user_id = '${user.id}'`;
    
    if (modality_filter) {
      filterConditions += ` AND modality = '${modality_filter}'`;
    }

    if (tags_filter && tags_filter.length > 0) {
      const tagsArray = tags_filter.map((t: string) => `'${t}'`).join(',');
      filterConditions += ` AND tags && ARRAY[${tagsArray}]`;
    }

    // Perform vector similarity search with temporal decay
    const { data: results, error } = await supabaseClient.rpc('search_sessions_with_decay', {
      query_embedding: queryEmbedding,
      match_threshold: similarity_threshold,
      match_count: limit,
      decay_factor: decay_factor,
      filter_user_id: user.id,
      filter_modality: modality_filter || null,
    });

    if (error) {
      // Fallback to basic search if RPC doesn't exist
      console.warn('RPC search failed, using basic query:', error);
      
      const { data: fallbackResults, error: fallbackError } = await supabaseClient
        .from('multimodal_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (fallbackError) throw fallbackError;

      return new Response(
        JSON.stringify({ 
          results: fallbackResults || [],
          fallback: true,
          message: 'Using basic search (no semantic similarity)',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${results?.length || 0} matching sessions`);

    return new Response(
      JSON.stringify({ 
        results: results || [],
        query,
        count: results?.length || 0,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in search-multimodal-sessions:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: error.message === 'Unauthorized' ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
