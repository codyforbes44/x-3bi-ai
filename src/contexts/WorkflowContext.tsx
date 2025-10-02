import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { toast } from "sonner";

interface Workflow {
  id: string;
  workspace_id: string | null;
  name: string;
  description: string | null;
  trigger_type: 'manual' | 'scheduled' | 'webhook' | 'event';
  trigger_config: any;
  status: 'draft' | 'active' | 'inactive' | 'archived';
  created_by: string;
  created_at: string;
  updated_at: string;
  last_run_at: string | null;
  run_count: number;
}

interface WorkflowStep {
  id: string;
  workflow_id: string;
  step_order: number;
  name: string;
  type: string;
  config: any;
  created_at: string;
  updated_at: string;
}

interface WorkflowExecution {
  id: string;
  workflow_id: string;
  triggered_by: string | null;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  started_at: string;
  completed_at: string | null;
  execution_time_ms: number | null;
  input_data: any;
  output_data: any;
  error_message: string | null;
  steps_completed: number;
  total_steps: number;
}

interface WorkflowContextType {
  workflows: Workflow[];
  executions: WorkflowExecution[];
  loading: boolean;
  createWorkflow: (workflow: Partial<Workflow>) => Promise<Workflow | null>;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
  getWorkflowSteps: (workflowId: string) => Promise<WorkflowStep[]>;
  addWorkflowStep: (workflowId: string, step: Partial<WorkflowStep>) => Promise<void>;
  updateWorkflowStep: (stepId: string, updates: Partial<WorkflowStep>) => Promise<void>;
  deleteWorkflowStep: (stepId: string) => Promise<void>;
  executeWorkflow: (workflowId: string, inputData?: any) => Promise<void>;
  getExecutions: (workflowId?: string) => Promise<WorkflowExecution[]>;
  refreshWorkflows: () => Promise<void>;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const useWorkflowContext = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflowContext must be used within WorkflowProvider");
  }
  return context;
};

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkflows = async () => {
    if (!user) {
      setWorkflows([]);
      setLoading(false);
      return;
    }

    try {
      const query = supabase
        .from("workflows")
        .select("*")
        .order("created_at", { ascending: false });

      if (currentWorkspace) {
        query.eq("workspace_id", currentWorkspace.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setWorkflows(data || []);
    } catch (error: any) {
      console.error("Error fetching workflows:", error);
      toast.error("Failed to load workflows");
    } finally {
      setLoading(false);
    }
  };

  const fetchExecutions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("workflow_executions")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setExecutions(data || []);
    } catch (error: any) {
      console.error("Error fetching executions:", error);
    }
  };

  useEffect(() => {
    fetchWorkflows();
    fetchExecutions();
  }, [user, currentWorkspace]);

  const createWorkflow = async (workflow: Partial<Workflow>): Promise<Workflow | null> => {
    if (!user) {
      toast.error("You must be logged in");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("workflows")
        .insert([{
          name: workflow.name!,
          description: workflow.description || null,
          trigger_type: workflow.trigger_type || 'manual',
          trigger_config: workflow.trigger_config || {},
          status: workflow.status || 'draft',
          workspace_id: currentWorkspace?.id || null,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      toast.success("Workflow created successfully");
      await fetchWorkflows();
      return data;
    } catch (error: any) {
      toast.error("Failed to create workflow");
      console.error("Error creating workflow:", error);
      return null;
    }
  };

  const updateWorkflow = async (id: string, updates: Partial<Workflow>) => {
    try {
      const { error } = await supabase
        .from("workflows")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast.success("Workflow updated successfully");
      await fetchWorkflows();
    } catch (error: any) {
      toast.error("Failed to update workflow");
      console.error("Error updating workflow:", error);
    }
  };

  const deleteWorkflow = async (id: string) => {
    try {
      const { error } = await supabase
        .from("workflows")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Workflow deleted successfully");
      await fetchWorkflows();
    } catch (error: any) {
      toast.error("Failed to delete workflow");
      console.error("Error deleting workflow:", error);
    }
  };

  const getWorkflowSteps = async (workflowId: string): Promise<WorkflowStep[]> => {
    try {
      const { data, error } = await supabase
        .from("workflow_steps")
        .select("*")
        .eq("workflow_id", workflowId)
        .order("step_order", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Error fetching workflow steps:", error);
      return [];
    }
  };

  const addWorkflowStep = async (workflowId: string, step: Partial<WorkflowStep>) => {
    try {
      const { error } = await supabase
        .from("workflow_steps")
        .insert([{
          workflow_id: workflowId,
          name: step.name!,
          type: step.type as any,
          step_order: step.step_order!,
          config: step.config || {},
        }]);

      if (error) throw error;
      toast.success("Step added successfully");
    } catch (error: any) {
      toast.error("Failed to add step");
      console.error("Error adding workflow step:", error);
    }
  };

  const updateWorkflowStep = async (stepId: string, updates: Partial<WorkflowStep>) => {
    try {
      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.type) updateData.type = updates.type;
      if (updates.step_order !== undefined) updateData.step_order = updates.step_order;
      if (updates.config) updateData.config = updates.config;

      const { error } = await supabase
        .from("workflow_steps")
        .update(updateData)
        .eq("id", stepId);

      if (error) throw error;
      toast.success("Step updated successfully");
    } catch (error: any) {
      toast.error("Failed to update step");
      console.error("Error updating workflow step:", error);
    }
  };

  const deleteWorkflowStep = async (stepId: string) => {
    try {
      const { error } = await supabase
        .from("workflow_steps")
        .delete()
        .eq("id", stepId);

      if (error) throw error;
      toast.success("Step deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete step");
      console.error("Error deleting workflow step:", error);
    }
  };

  const executeWorkflow = async (workflowId: string, inputData: any = {}) => {
    if (!user) return;

    try {
      // Get workflow steps
      const steps = await getWorkflowSteps(workflowId);

      // Create execution record
      const { data: execution, error: execError } = await supabase
        .from("workflow_executions")
        .insert({
          workflow_id: workflowId,
          triggered_by: user.id,
          status: 'running',
          input_data: inputData,
          total_steps: steps.length,
        })
        .select()
        .single();

      if (execError) throw execError;

      toast.success("Workflow execution started");

      // Call edge function to execute workflow
      const { error: invokeError } = await supabase.functions.invoke('execute-workflow', {
        body: {
          execution_id: execution.id,
          workflow_id: workflowId,
          steps,
          input_data: inputData,
        },
      });

      if (invokeError) throw invokeError;

      await fetchExecutions();
    } catch (error: any) {
      toast.error("Failed to execute workflow");
      console.error("Error executing workflow:", error);
    }
  };

  const getExecutions = async (workflowId?: string): Promise<WorkflowExecution[]> => {
    try {
      let query = supabase
        .from("workflow_executions")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(50);

      if (workflowId) {
        query = query.eq("workflow_id", workflowId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Error fetching executions:", error);
      return [];
    }
  };

  const refreshWorkflows = async () => {
    await fetchWorkflows();
    await fetchExecutions();
  };

  return (
    <WorkflowContext.Provider
      value={{
        workflows,
        executions,
        loading,
        createWorkflow,
        updateWorkflow,
        deleteWorkflow,
        getWorkflowSteps,
        addWorkflowStep,
        updateWorkflowStep,
        deleteWorkflowStep,
        executeWorkflow,
        getExecutions,
        refreshWorkflows,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};
