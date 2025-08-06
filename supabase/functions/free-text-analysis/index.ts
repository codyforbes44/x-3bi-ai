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
    const { text, task = 'sentiment-analysis' } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    console.log(`Processing text analysis task: ${task}`);

    let response;
    let result;

    // Use Hugging Face's free inference API
    const HF_API_URL = 'https://api-inference.huggingface.co/models/';
    
    switch (task) {
      case 'sentiment-analysis':
        response = await fetch(`${HF_API_URL}cardiffnlp/twitter-roberta-base-sentiment-latest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: text }),
        });
        break;
        
      case 'text-classification':
        response = await fetch(`${HF_API_URL}facebook/bart-large-mnli`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            inputs: text,
            parameters: {
              candidate_labels: ["business", "technology", "politics", "sports", "entertainment", "science", "health"]
            }
          }),
        });
        break;
        
      case 'summarization':
        response = await fetch(`${HF_API_URL}facebook/bart-large-cnn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            inputs: text,
            parameters: {
              max_length: 150,
              min_length: 30
            }
          }),
        });
        break;
        
      case 'question-answering':
        const { question, context } = await req.json();
        if (!question || !context) {
          throw new Error('Question and context are required for QA task');
        }
        response = await fetch(`${HF_API_URL}distilbert-base-cased-distilled-squad`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            inputs: {
              question: question,
              context: context
            }
          }),
        });
        break;
        
      case 'text-generation':
        response = await fetch(`${HF_API_URL}gpt2`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            inputs: text,
            parameters: {
              max_length: 100,
              temperature: 0.7,
              do_sample: true
            }
          }),
        });
        break;
        
      default:
        throw new Error(`Unsupported task: ${task}`);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Hugging Face API error for ${task}:`, errorText);
      
      // Handle model loading error
      if (response.status === 503) {
        return new Response(
          JSON.stringify({ 
            error: 'Model is loading, please try again in a few moments',
            task: task,
            retry: true
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 503 }
        );
      }
      
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    result = await response.json();
    
    console.log(`${task} completed successfully`);

    return new Response(
      JSON.stringify({ 
        result: result,
        task: task,
        input: text,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in free text analysis:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        task: 'unknown'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});