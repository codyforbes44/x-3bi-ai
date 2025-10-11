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
      alias, 
      parent_alias, 
      modality, 
      content, 
      image_url, 
      audio_url, 
      video_metadata,
      metadata = {}
    } = await req.json();

    if (!alias || !modality) {
      throw new Error('Alias and modality are required');
    }

    // Generate content hash for integrity (TIMP-like)
    const contentString = JSON.stringify({ content, image_url, audio_url, video_metadata });
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(contentString)
    );
    const content_hash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Generate embedding using OpenAI
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    let embedding = null;

    if (OPENAI_API_KEY && content) {
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-ada-002',
          input: content,
        }),
      });

      if (embeddingResponse.ok) {
        const embeddingData = await embeddingResponse.json();
        embedding = embeddingData.data[0].embedding;
      }
    }

    // If image_url provided, analyze with Grok Vision
    let vision_analysis = null;
    let tags: string[] = [];

    if (image_url) {
      const GROK_API_KEY = Deno.env.get('GROK_API_KEY');
      if (GROK_API_KEY) {
        const visionResponse = await fetch('https://api.x.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROK_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'grok-3',
            messages: [
              {
                role: 'user',
                content: [
                  { 
                    type: 'text', 
                    text: 'Analyze this image and provide: 1) A brief description, 2) Key objects/entities, 3) Suggested tags (comma-separated). Format as JSON with keys: description, objects, tags' 
                  },
                  { 
                    type: 'image_url', 
                    image_url: { url: image_url } 
                  }
                ]
              }
            ],
            temperature: 0.3,
          }),
        });

        if (visionResponse.ok) {
          const visionData = await visionResponse.json();
          const analysisText = visionData.choices[0]?.message?.content || '';
          
          try {
            vision_analysis = JSON.parse(analysisText);
            tags = vision_analysis.tags ? vision_analysis.tags.split(',').map((t: string) => t.trim()) : [];
          } catch {
            vision_analysis = { raw: analysisText };
          }
        }
      }
    }

    // Save session to database
    const { data: session, error } = await supabaseClient
      .from('multimodal_sessions')
      .insert({
        user_id: user.id,
        alias,
        parent_alias,
        modality,
        data: { content, ...metadata },
        content_hash,
        image_url,
        audio_url,
        video_metadata,
        embedding,
        vision_analysis,
        tags,
        metadata,
      })
      .select()
      .single();

    if (error) throw error;

    console.log('Session saved:', session.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        session,
        hash: content_hash,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in save-multimodal-session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: error.message === 'Unauthorized' ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
