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
    const { text1, text2, language = 'en' } = await req.json();

    if (!text1 || !text2) {
      throw new Error('Both text1 and text2 are required for comparison');
    }

    console.log(`Comparing texts in language: ${language}`);

    const HF_API_URL = 'https://router.huggingface.co/hf-inference/models/';
    
    // Use a multilingual model for text similarity
    const model = language === 'en' 
      ? 'sentence-transformers/all-MiniLM-L6-v2'
      : 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2';

    const response = await fetchWithRetry(`${HF_API_URL}${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        inputs: [text1, text2],
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
      console.error(`Hugging Face API error for text comparison:`, errorText);
      
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
    
    if (!Array.isArray(embeddings) || embeddings.length < 2) {
      throw new Error('Failed to get embeddings for both texts');
    }

    // Calculate similarity metrics
    const cosineSim = cosineSimilarity(embeddings[0], embeddings[1]);
    const euclideanDist = euclideanDistance(embeddings[0], embeddings[1]);
    
    // Determine similarity level
    let similarityLevel = 'low';
    if (cosineSim > 0.8) similarityLevel = 'very high';
    else if (cosineSim > 0.6) similarityLevel = 'high';
    else if (cosineSim > 0.4) similarityLevel = 'medium';
    else if (cosineSim > 0.2) similarityLevel = 'low-medium';

    console.log(`Text comparison completed with similarity: ${cosineSim}`);

    return new Response(
      JSON.stringify({ 
        similarity: {
          cosine: cosineSim,
          euclidean_distance: euclideanDist,
          level: similarityLevel,
          percentage: Math.round(cosineSim * 100)
        },
        texts: {
          text1: text1,
          text2: text2,
          length1: text1.length,
          length2: text2.length
        },
        model: model,
        language: language,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in free text comparison:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Helper functions
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

function euclideanDistance(vecA: number[], vecB: number[]): number {
  return Math.sqrt(vecA.reduce((sum, a, i) => sum + Math.pow(a - vecB[i], 2), 0));
}