import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { GitBranch, Play, Plus, Settings, Clock, CheckCircle, XCircle, Pause, Workflow } from "lucide-react";
import { useWorkflowContext } from "@/contexts/WorkflowContext";

interface Workflow {
  id: string;
  name: string;
  description?: string;
  steps: any[];
  trigger_type: 'manual' | 'scheduled' | 'webhook';
  status: 'active' | 'inactive' | 'draft';
  created_at: string;
  updated_at: string;
}

interface WorkflowExecution {
  id: string;
  workflow_id: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  started_at: string;
  completed_at?: string;
  result?: any;
  error_message?: string;
}

const WorkflowBuilder = () => {
  const {
    workflows,
    executions,
    loading,
    createWorkflow,
    executeWorkflow,
  } = useWorkflowContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger_type: 'manual' as const,
  });


  const handleCreateWorkflow = async () => {
    if (!newWorkflow.name.trim()) return;

    setIsLoading(true);
    const workflow = await createWorkflow(newWorkflow);
    
    if (workflow) {
      setNewWorkflow({ name: '', description: '', trigger_type: 'manual' });
      setShowCreateDialog(false);
    }
    setIsLoading(false);
  };

  const handleRunWorkflow = async (workflowId: string) => {
    setIsLoading(true);
    await executeWorkflow(workflowId);
    setIsLoading(false);
  };


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'cancelled':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'running':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardDescription>
                Create and manage automated AI workflows for complex tasks
              </CardDescription>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workflow
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Workflow</DialogTitle>
                  <DialogDescription>
                    Set up a new automated AI workflow
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="workflow-name">Workflow Name</Label>
                    <Input
                      id="workflow-name"
                      value={newWorkflow.name}
                      onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                      placeholder="Enter workflow name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workflow-description">Description (Optional)</Label>
                    <Textarea
                      id="workflow-description"
                      value={newWorkflow.description}
                      onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                      placeholder="Describe what this workflow does"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trigger-type">Trigger Type</Label>
                    <Select value={newWorkflow.trigger_type} onValueChange={(value) => setNewWorkflow({ ...newWorkflow, trigger_type: value as any })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateWorkflow} disabled={isLoading} className="w-full">
                    {isLoading ? "Creating..." : "Create Workflow"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="executions">Execution History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading workflows...</div>
          ) : workflows.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Workflow className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No workflows yet</p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Workflow
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <Badge variant={getStatusBadgeVariant(workflow.status) as any}>
                      {workflow.status}
                    </Badge>
                  </div>
                  {workflow.description && (
                    <CardDescription>{workflow.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GitBranch className="w-4 h-4" />
                    <span>{workflow.trigger_type} trigger</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleRunWorkflow(workflow.id)}
                      disabled={workflow.status !== 'active' || isLoading}
                      className="flex-1"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Run
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                    >
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </TabsContent>

        <TabsContent value="executions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Executions</CardTitle>
              <CardDescription>Monitor workflow execution history and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {executions.map((execution) => {
                  const workflow = workflows.find(w => w.id === execution.workflow_id);
                  return (
                    <div key={execution.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(execution.status)}
                        <div>
                          <div className="font-medium">{workflow?.name || 'Unknown Workflow'}</div>
                          <div className="text-xs text-muted-foreground">
                            Started {new Date(execution.started_at).toLocaleString()}
                          </div>
                          {execution.completed_at && (
                            <div className="text-xs text-muted-foreground">
                              Completed {new Date(execution.completed_at).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(execution.status) as any}>
                          {execution.status}
                        </Badge>
                        {execution.status === 'completed' && execution.completed_at && execution.started_at && (
                          <div className="text-xs text-muted-foreground">
                            {Math.round((new Date(execution.completed_at).getTime() - new Date(execution.started_at).getTime()) / 1000)}s
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {executions.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No executions yet. Run a workflow to see history here.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Workflow Templates</CardTitle>
              <CardDescription>Pre-built workflow templates for common use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-dashed">
                  <div className="font-medium mb-2">Data Analysis Pipeline</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Automatically analyze data, generate insights, and create reports using AI
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>
                
                <div className="p-4 rounded-lg border border-dashed">
                  <div className="font-medium mb-2">Content Generation</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Generate, review, and publish content across multiple platforms
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>
                
                <div className="p-4 rounded-lg border border-dashed">
                  <div className="font-medium mb-2">Customer Support</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Automate customer inquiries, categorize, and route to appropriate teams
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>
                
                <div className="p-4 rounded-lg border border-dashed">
                  <div className="font-medium mb-2">Multi-Model Processing</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Process content through multiple AI models for comprehensive analysis
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowBuilder;