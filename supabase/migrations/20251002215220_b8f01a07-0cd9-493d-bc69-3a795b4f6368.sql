-- Create workflow status enum
CREATE TYPE public.workflow_status AS ENUM ('draft', 'active', 'inactive', 'archived');

-- Create trigger type enum
CREATE TYPE public.trigger_type AS ENUM ('manual', 'scheduled', 'webhook', 'event');

-- Create execution status enum
CREATE TYPE public.execution_status AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');

-- Create step type enum
CREATE TYPE public.step_type AS ENUM (
  'ai_chat',
  'ai_image',
  'ai_code',
  'data_transform',
  'condition',
  'loop',
  'http_request',
  'database_query',
  'delay',
  'notification'
);

-- Create workflows table
CREATE TABLE public.workflows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type trigger_type NOT NULL DEFAULT 'manual',
  trigger_config JSONB DEFAULT '{}'::jsonb,
  status workflow_status NOT NULL DEFAULT 'draft',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_run_at TIMESTAMP WITH TIME ZONE,
  run_count INTEGER DEFAULT 0
);

-- Create workflow_steps table
CREATE TABLE public.workflow_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  name TEXT NOT NULL,
  type step_type NOT NULL,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workflow_executions table
CREATE TABLE public.workflow_executions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  triggered_by UUID,
  status execution_status NOT NULL DEFAULT 'pending',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  execution_time_ms INTEGER,
  input_data JSONB DEFAULT '{}'::jsonb,
  output_data JSONB DEFAULT '{}'::jsonb,
  error_message TEXT,
  steps_completed INTEGER DEFAULT 0,
  total_steps INTEGER DEFAULT 0
);

-- Create workflow_execution_logs table for step-by-step tracking
CREATE TABLE public.workflow_execution_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  execution_id UUID NOT NULL REFERENCES public.workflow_executions(id) ON DELETE CASCADE,
  step_id UUID REFERENCES public.workflow_steps(id) ON DELETE SET NULL,
  step_order INTEGER NOT NULL,
  status execution_status NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  input_data JSONB DEFAULT '{}'::jsonb,
  output_data JSONB DEFAULT '{}'::jsonb,
  error_message TEXT
);

-- Enable RLS
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_execution_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for workflows
CREATE POLICY "Users can view workflows in their workspaces"
  ON public.workflows
  FOR SELECT
  USING (
    workspace_id IS NULL OR 
    public.is_workspace_member(workspace_id, auth.uid())
  );

CREATE POLICY "Workspace members can create workflows"
  ON public.workflows
  FOR INSERT
  WITH CHECK (
    workspace_id IS NULL OR
    public.is_workspace_member(workspace_id, auth.uid())
  );

CREATE POLICY "Workflow creators and workspace admins can update workflows"
  ON public.workflows
  FOR UPDATE
  USING (
    auth.uid() = created_by OR
    (workspace_id IS NOT NULL AND public.is_workspace_admin(workspace_id, auth.uid()))
  );

CREATE POLICY "Workflow creators and workspace owners can delete workflows"
  ON public.workflows
  FOR DELETE
  USING (
    auth.uid() = created_by OR
    (workspace_id IS NOT NULL AND public.has_workspace_role(workspace_id, auth.uid(), 'owner'))
  );

-- RLS Policies for workflow_steps
CREATE POLICY "Users can view steps of accessible workflows"
  ON public.workflow_steps
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.workflows
      WHERE workflows.id = workflow_steps.workflow_id
      AND (
        workflows.workspace_id IS NULL OR
        public.is_workspace_member(workflows.workspace_id, auth.uid())
      )
    )
  );

CREATE POLICY "Users can manage steps of their workflows"
  ON public.workflow_steps
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.workflows
      WHERE workflows.id = workflow_steps.workflow_id
      AND (
        workflows.created_by = auth.uid() OR
        (workflows.workspace_id IS NOT NULL AND public.is_workspace_admin(workflows.workspace_id, auth.uid()))
      )
    )
  );

-- RLS Policies for workflow_executions
CREATE POLICY "Users can view executions of accessible workflows"
  ON public.workflow_executions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.workflows
      WHERE workflows.id = workflow_executions.workflow_id
      AND (
        workflows.workspace_id IS NULL OR
        public.is_workspace_member(workflows.workspace_id, auth.uid())
      )
    )
  );

CREATE POLICY "Users can create executions for accessible workflows"
  ON public.workflow_executions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.workflows
      WHERE workflows.id = workflow_id
      AND (
        workflows.workspace_id IS NULL OR
        public.is_workspace_member(workflows.workspace_id, auth.uid())
      )
    )
  );

CREATE POLICY "Users can update their executions"
  ON public.workflow_executions
  FOR UPDATE
  USING (auth.uid() = triggered_by);

-- RLS Policies for workflow_execution_logs
CREATE POLICY "Users can view execution logs of accessible workflows"
  ON public.workflow_execution_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.workflow_executions
      JOIN public.workflows ON workflows.id = workflow_executions.workflow_id
      WHERE workflow_executions.id = workflow_execution_logs.execution_id
      AND (
        workflows.workspace_id IS NULL OR
        public.is_workspace_member(workflows.workspace_id, auth.uid())
      )
    )
  );

CREATE POLICY "System can manage execution logs"
  ON public.workflow_execution_logs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON public.workflows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workflow_steps_updated_at
  BEFORE UPDATE ON public.workflow_steps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_workflows_workspace_id ON public.workflows(workspace_id);
CREATE INDEX idx_workflows_created_by ON public.workflows(created_by);
CREATE INDEX idx_workflows_status ON public.workflows(status);
CREATE INDEX idx_workflow_steps_workflow_id ON public.workflow_steps(workflow_id);
CREATE INDEX idx_workflow_steps_order ON public.workflow_steps(workflow_id, step_order);
CREATE INDEX idx_workflow_executions_workflow_id ON public.workflow_executions(workflow_id);
CREATE INDEX idx_workflow_executions_status ON public.workflow_executions(status);
CREATE INDEX idx_workflow_execution_logs_execution_id ON public.workflow_execution_logs(execution_id);