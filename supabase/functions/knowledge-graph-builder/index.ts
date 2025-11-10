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

    const { content, sourceApp, contentType = 'text' } = await req.json();

    console.log(`Building knowledge graph from ${sourceApp} content`);

    // Extract entities and relationships using AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    // First, get embeddings for the content
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: content,
      }),
    });

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    // Extract entities and relationships
    const extractionResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a knowledge graph builder. Extract entities and relationships from content.
            
            Entity types: person, organization, project, document, concept, task, event, location, tool, skill
            Relationship types: works_on, created_by, related_to, mentions, depends_on, part_of, assigned_to, located_at`
          },
          {
            role: 'user',
            content: `Extract entities and relationships from this content:\n\n${content}`
          }
        ],
        tools: [
          {
            type: 'function',
            name: 'build_knowledge_graph',
            description: 'Build knowledge graph with entities and relationships',
            parameters: {
              type: 'object',
              properties: {
                entities: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      name: { type: 'string' },
                      properties: { type: 'object' }
                    }
                  }
                },
                relationships: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      from: { type: 'string' },
                      to: { type: 'string' },
                      type: { type: 'string' },
                      strength: { type: 'number' }
                    }
                  }
                }
              },
              required: ['entities', 'relationships'],
              additionalProperties: false
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'build_knowledge_graph' } }
      }),
    });

    const extractionData = await extractionResponse.json();
    const graph = JSON.parse(extractionData.choices[0].message.tool_calls[0].function.arguments);

    // Store entities
    const entityMap = new Map();
    for (const entity of graph.entities) {
      const { data: existingEntity } = await supabaseClient
        .from('knowledge_entities')
        .select('id')
        .eq('user_id', user.id)
        .eq('entity_type', entity.type)
        .eq('entity_name', entity.name)
        .single();

      if (existingEntity) {
        // Update existing
        await supabaseClient
          .from('knowledge_entities')
          .update({
            properties: entity.properties,
            source_apps: supabaseClient.rpc('array_append', {
              arr: 'source_apps',
              val: sourceApp
            }),
            access_count: supabaseClient.rpc('increment', { field: 'access_count' }),
            last_accessed: new Date().toISOString(),
          })
          .eq('id', existingEntity.id);
        
        entityMap.set(entity.name, existingEntity.id);
      } else {
        // Create new
        const { data: newEntity } = await supabaseClient
          .from('knowledge_entities')
          .insert({
            user_id: user.id,
            entity_type: entity.type,
            entity_name: entity.name,
            properties: entity.properties,
            embedding,
            source_apps: [sourceApp],
            access_count: 1,
          })
          .select()
          .single();
        
        entityMap.set(entity.name, newEntity.id);
      }
    }

    // Store relationships
    for (const rel of graph.relationships) {
      const fromId = entityMap.get(rel.from);
      const toId = entityMap.get(rel.to);

      if (fromId && toId) {
        await supabaseClient
          .from('knowledge_relationships')
          .upsert({
            user_id: user.id,
            from_entity_id: fromId,
            to_entity_id: toId,
            relationship_type: rel.type,
            strength: rel.strength || 1.0,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'from_entity_id,to_entity_id,relationship_type' });
      }
    }

    console.log(`Created ${graph.entities.length} entities and ${graph.relationships.length} relationships`);

    return new Response(
      JSON.stringify({
        success: true,
        entities: graph.entities.length,
        relationships: graph.relationships.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in knowledge-graph-builder:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
