import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { fetchWithRetry, handleAPIError } from '../_shared/apiRetry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { texts, model = 'sentence-transformers/all-MiniLM-L6-v2' } = await req.json();

    if (!texts || !Array.isArray(texts)) {
      throw new Error('Texts array is required');
    }

    console.log(`Generating embeddings for ${texts.length} texts using model: ${model}`);

    const HF_API_URL = 'https://router.huggingface.co/hf-inference/models/';
    
    const response = await fetchWithRetry(`${HF_API_URL}${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        inputs: texts,
        options: {
          wait_for_model: true
        }
      }),
    });

    if (!response.ok) {
      // Handle common API errors
      const errorResponse = handleAPIError(response, corsHeaders);
      if (errorResponse) return errorResponse;

      const errorText = await response.text();
      console.error(`Hugging Face API error for embeddings:`, errorText);
      
      // Handle model loading error
      if (response.status === 503) {
        return new Response(
          JSON.stringify({ 
            error: 'Model is loading, please try again in a few moments',
            model: model,
            retry: true
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 503 }
        );
      }
      
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    const embeddings = await response.json();
    
    console.log(`Embeddings generated successfully`);

    // Calculate similarity between texts if more than one
    let similarities = [];
    if (texts.length > 1 && Array.isArray(embeddings) && embeddings.length > 1) {
      for (let i = 0; i < embeddings.length; i++) {
        for (let j = i + 1; j < embeddings.length; j++) {
          const similarity = cosineSimilarity(embeddings[i], embeddings[j]);
          similarities.push({
            text1_index: i,
            text2_index: j,
            text1: texts[i],
            text2: texts[j],
            similarity: similarity
          });
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        embeddings: embeddings,
        similarities: similarities,
        model: model,
        input_count: texts.length,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in free embeddings:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Helper function to calculate cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}