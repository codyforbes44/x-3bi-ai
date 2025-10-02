-- Create workspace role enum
CREATE TYPE public.workspace_role AS ENUM ('owner', 'admin', 'member', 'viewer');

-- Create workspaces table
CREATE TABLE public.workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workspace_members table (junction table for users and workspaces)
CREATE TABLE public.workspace_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role workspace_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- Enable RLS
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- Create helper function to check workspace membership
CREATE OR REPLACE FUNCTION public.is_workspace_member(_workspace_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.workspace_members
    WHERE workspace_id = _workspace_id
      AND user_id = _user_id
  )
$$;

-- Create helper function to check workspace role
CREATE OR REPLACE FUNCTION public.has_workspace_role(_workspace_id UUID, _user_id UUID, _role workspace_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.workspace_members
    WHERE workspace_id = _workspace_id
      AND user_id = _user_id
      AND role = _role
  )
$$;

-- Create helper function to check if user is workspace admin or owner
CREATE OR REPLACE FUNCTION public.is_workspace_admin(_workspace_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.workspace_members
    WHERE workspace_id = _workspace_id
      AND user_id = _user_id
      AND role IN ('owner', 'admin')
  )
$$;

-- RLS Policies for workspaces table
CREATE POLICY "Users can view workspaces they are members of"
  ON public.workspaces
  FOR SELECT
  USING (public.is_workspace_member(id, auth.uid()));

CREATE POLICY "Authenticated users can create workspaces"
  ON public.workspaces
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Workspace admins can update workspace"
  ON public.workspaces
  FOR UPDATE
  USING (public.is_workspace_admin(id, auth.uid()));

CREATE POLICY "Workspace owners can delete workspace"
  ON public.workspaces
  FOR DELETE
  USING (public.has_workspace_role(id, auth.uid(), 'owner'));

-- RLS Policies for workspace_members table
CREATE POLICY "Users can view members of their workspaces"
  ON public.workspace_members
  FOR SELECT
  USING (public.is_workspace_member(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can add members"
  ON public.workspace_members
  FOR INSERT
  WITH CHECK (public.is_workspace_admin(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can update member roles"
  ON public.workspace_members
  FOR UPDATE
  USING (public.is_workspace_admin(workspace_id, auth.uid()));

CREATE POLICY "Workspace admins can remove members"
  ON public.workspace_members
  FOR DELETE
  USING (public.is_workspace_admin(workspace_id, auth.uid()));

CREATE POLICY "Users can leave workspaces"
  ON public.workspace_members
  FOR DELETE
  USING (auth.uid() = user_id AND role != 'owner');

-- Create trigger for updated_at
CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically add creator as owner when workspace is created
CREATE OR REPLACE FUNCTION public.add_workspace_creator_as_owner()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.workspace_members (workspace_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'owner');
  RETURN NEW;
END;
$$;

-- Create trigger to add creator as owner
CREATE TRIGGER on_workspace_created
  AFTER INSERT ON public.workspaces
  FOR EACH ROW
  EXECUTE FUNCTION public.add_workspace_creator_as_owner();

-- Add indexes for performance
CREATE INDEX idx_workspace_members_workspace_id ON public.workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user_id ON public.workspace_members(user_id);
CREATE INDEX idx_workspaces_created_by ON public.workspaces(created_by);