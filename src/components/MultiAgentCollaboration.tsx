import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, Plus, Play, CheckCircle, Loader2, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const MultiAgentCollaboration = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [running, setRunning] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [agentsRes, conversationsRes] = await Promise.all([
        supabase.from('ai_agents').select('*').order('created_at', { ascending: false }),
        supabase.from('agent_conversations').select('*').order('created_at', { ascending: false }).limit(10),
      ]);

      setAgents(agentsRes.data || []);
      setConversations(conversationsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async (agentData: any) => {
    setCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('ai_agents').insert({
        user_id: user.id,
        name: agentData.name,
        role: agentData.role,
        persona: { description: agentData.description },
        capabilities: agentData.capabilities.split(',').map((c: string) => c.trim()),
        system_prompt: agentData.systemPrompt,
        model: agentData.model || 'google/gemini-2.5-flash',
      });

      if (error) throw error;

      toast({ title: "Agent Created", description: `${agentData.name} is ready to collaborate` });
      loadData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const runCollaboration = async (goal: string, selectedAgents: string[]) => {
    if (selectedAgents.length < 2) {
      toast({ title: "Error", description: "Select at least 2 agents", variant: "destructive" });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create conversation
      const { data: conversation, error: convError } = await supabase
        .from('agent_conversations')
        .insert({
          user_id: user.id,
          title: `Collaboration: ${goal.substring(0, 50)}`,
          goal,
          participating_agents: selectedAgents,
          status: 'active',
        })
        .select()
        .single();

      if (convError) throw convError;

      setRunning(conversation.id);

      // Run multi-agent orchestrator
      const { data, error } = await supabase.functions.invoke('multi-agent-orchestrator', {
        body: {
          conversationId: conversation.id,
          goal,
          agentIds: selectedAgents,
          maxTurns: 10,
        }
      });

      if (error) throw error;

      toast({
        title: "Collaboration Complete",
        description: `Completed in ${data.turns} turns`,
      });

      loadData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setRunning(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Multi-Agent Collaboration
          </h2>
          <p className="text-muted-foreground mt-1">
            Specialized AI agents working together to solve complex problems
          </p>
        </div>
        <CreateAgentDialog onCreate={createAgent} creating={creating} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your AI Agents</h3>
          <div className="space-y-3">
            {agents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No agents yet. Create your first agent!</p>
            ) : (
              agents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.role}</p>
                  </div>
                  <Badge variant={agent.is_active ? "default" : "secondary"}>
                    {agent.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        <RunCollaborationDialog agents={agents} onRun={runCollaboration} running={!!running} />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Collaborations</h3>
        <div className="space-y-3">
          {conversations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No collaborations yet</p>
          ) : (
            conversations.map((conv) => (
              <div key={conv.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{conv.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{conv.goal}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{conv.participating_agents?.length || 0} agents</Badge>
                    <Badge variant={conv.status === 'completed' ? 'default' : 'secondary'}>
                      {conv.status}
                    </Badge>
                  </div>
                </div>
                {conv.status === 'completed' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

const CreateAgentDialog = ({ onCreate, creating }: any) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    capabilities: '',
    systemPrompt: '',
    model: 'google/gemini-2.5-flash',
  });

  const handleSubmit = () => {
    onCreate(formData);
    setOpen(false);
    setFormData({
      name: '',
      role: '',
      description: '',
      capabilities: '',
      systemPrompt: '',
      model: 'google/gemini-2.5-flash',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create AI Agent</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              placeholder="Research Agent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Role</label>
            <Input
              placeholder="Researcher"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Gathers and analyzes information"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Capabilities (comma-separated)</label>
            <Input
              placeholder="research, analysis, summarization"
              value={formData.capabilities}
              onChange={(e) => setFormData({ ...formData, capabilities: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">System Prompt</label>
            <Textarea
              placeholder="You are a research specialist..."
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
              rows={4}
            />
          </div>
          <Button onClick={handleSubmit} disabled={creating} className="w-full">
            {creating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Create Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RunCollaborationDialog = ({ agents, onRun, running }: any) => {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const handleRun = () => {
    onRun(goal, selectedAgents);
    setOpen(false);
    setGoal('');
    setSelectedAgents([]);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Run Collaboration</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Goal</label>
          <Textarea
            placeholder="What should the agents accomplish together?"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Select Agents (min 2)</label>
          <div className="space-y-2">
            {agents.map((agent: any) => (
              <label key={agent.id} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-muted">
                <input
                  type="checkbox"
                  checked={selectedAgents.includes(agent.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAgents([...selectedAgents, agent.id]);
                    } else {
                      setSelectedAgents(selectedAgents.filter(id => id !== agent.id));
                    }
                  }}
                  className="h-4 w-4"
                />
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.role}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        <Button onClick={handleRun} disabled={running || !goal || selectedAgents.length < 2} className="w-full">
          {running ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          Start Collaboration
        </Button>
      </div>
    </Card>
  );
};
