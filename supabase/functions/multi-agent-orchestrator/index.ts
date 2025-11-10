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

    const { conversationId, goal, agentIds, maxTurns = 10 } = await req.json();

    // Get agents
    const { data: agents } = await supabaseClient
      .from('ai_agents')
      .select('*')
      .in('id', agentIds)
      .eq('is_active', true);

    if (!agents || agents.length === 0) {
      throw new Error('No active agents found');
    }

    console.log(`Starting multi-agent collaboration with ${agents.length} agents for goal: ${goal}`);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const conversationHistory = [];
    let currentTurn = 0;
    let goalAchieved = false;

    // Master orchestrator decides which agent speaks next
    while (currentTurn < maxTurns && !goalAchieved) {
      currentTurn++;
      console.log(`Turn ${currentTurn}/${maxTurns}`);

      // Orchestrator selects next agent
      const orchestratorResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
              content: `You are a master orchestrator managing multiple AI agents working towards a goal.
              
              Goal: ${goal}
              
              Available agents:
              ${agents.map(a => `- ${a.name} (${a.role}): ${a.persona.description || ''}`).join('\n')}
              
              Conversation so far:
              ${conversationHistory.map(h => `${h.agent}: ${h.message}`).join('\n')}
              
              Decide which agent should speak next and what they should focus on.`
            },
            {
              role: 'user',
              content: 'Which agent should speak next and what should they address?'
            }
          ],
          tools: [
            {
              type: 'function',
              name: 'select_next_agent',
              description: 'Select the next agent to contribute',
              parameters: {
                type: 'object',
                properties: {
                  agent_id: { type: 'string' },
                  focus: { type: 'string' },
                  goal_achieved: { type: 'boolean' }
                },
                required: ['agent_id', 'focus', 'goal_achieved'],
                additionalProperties: false
              }
            }
          ],
          tool_choice: { type: 'function', function: { name: 'select_next_agent' } }
        }),
      });

      const orchestratorData = await orchestratorResponse.json();
      const selection = JSON.parse(orchestratorData.choices[0].message.tool_calls[0].function.arguments);
      
      goalAchieved = selection.goal_achieved;
      
      if (goalAchieved) {
        console.log('Goal achieved!');
        break;
      }

      const selectedAgent = agents.find(a => a.id === selection.agent_id);
      if (!selectedAgent) {
        console.error('Selected agent not found');
        break;
      }

      // Selected agent generates response
      const agentResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedAgent.model,
          temperature: selectedAgent.temperature,
          messages: [
            {
              role: 'system',
              content: `${selectedAgent.system_prompt}
              
              You are ${selectedAgent.name}, a ${selectedAgent.role}.
              Persona: ${JSON.stringify(selectedAgent.persona)}
              
              Current goal: ${goal}
              Your focus: ${selection.focus}
              
              Conversation history:
              ${conversationHistory.map(h => `${h.agent}: ${h.message}`).join('\n')}`
            },
            {
              role: 'user',
              content: selection.focus
            }
          ],
        }),
      });

      const agentData = await agentResponse.json();
      const agentMessage = agentData.choices[0].message.content;

      conversationHistory.push({
        agent: selectedAgent.name,
        agent_id: selectedAgent.id,
        role: selectedAgent.role,
        message: agentMessage,
        turn: currentTurn,
      });

      // Log collaboration
      await supabaseClient
        .from('agent_collaborations')
        .insert({
          conversation_id: conversationId,
          agent_id: selectedAgent.id,
          message: agentMessage,
          message_type: 'contribution',
          metadata: { turn: currentTurn, focus: selection.focus },
        });

      console.log(`${selectedAgent.name}: ${agentMessage.substring(0, 100)}...`);
    }

    // Generate final synthesis
    const synthesisResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
            content: `Synthesize the multi-agent collaboration into a final output.
            
            Goal: ${goal}
            
            Agent contributions:
            ${conversationHistory.map(h => `${h.agent} (${h.role}):\n${h.message}`).join('\n\n')}`
          },
          {
            role: 'user',
            content: 'Provide a comprehensive final output that achieves the goal, integrating insights from all agents.'
          }
        ],
      }),
    });

    const synthesisData = await synthesisResponse.json();
    const finalOutput = synthesisData.choices[0].message.content;

    // Update conversation
    await supabaseClient
      .from('agent_conversations')
      .update({
        conversation_history: conversationHistory,
        final_output: { text: finalOutput, turns: currentTurn },
        status: goalAchieved ? 'completed' : 'max_turns_reached',
        updated_at: new Date().toISOString(),
      })
      .eq('id', conversationId);

    return new Response(
      JSON.stringify({
        success: true,
        conversationHistory,
        finalOutput,
        turns: currentTurn,
        goalAchieved,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in multi-agent-orchestrator:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
