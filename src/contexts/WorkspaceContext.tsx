import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Workspace {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joined_at: string;
}

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  members: WorkspaceMember[];
  loading: boolean;
  switchWorkspace: (workspaceId: string) => void;
  createWorkspace: (name: string, description?: string) => Promise<void>;
  updateWorkspace: (id: string, name: string, description?: string) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  addMember: (workspaceId: string, userId: string, role: WorkspaceMember['role']) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  updateMemberRole: (memberId: string, role: WorkspaceMember['role']) => Promise<void>;
  leaveWorkspace: (workspaceId: string) => Promise<void>;
  refreshWorkspaces: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return context;
};

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkspaces = async () => {
    if (!user) {
      setWorkspaces([]);
      setCurrentWorkspace(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("workspaces")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setWorkspaces(data || []);
      
      // Set current workspace from localStorage or first workspace
      const savedWorkspaceId = localStorage.getItem("currentWorkspaceId");
      if (savedWorkspaceId && data?.find(w => w.id === savedWorkspaceId)) {
        setCurrentWorkspace(data.find(w => w.id === savedWorkspaceId) || data[0] || null);
      } else if (data && data.length > 0) {
        setCurrentWorkspace(data[0]);
        localStorage.setItem("currentWorkspaceId", data[0].id);
      }
    } catch (error: any) {
      toast.error("Failed to load workspaces");
      console.error("Error fetching workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async (workspaceId: string) => {
    try {
      const { data, error } = await supabase
        .from("workspace_members")
        .select("*")
        .eq("workspace_id", workspaceId);

      if (error) throw error;
      setMembers(data || []);
    } catch (error: any) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [user]);

  useEffect(() => {
    if (currentWorkspace) {
      fetchMembers(currentWorkspace.id);
    }
  }, [currentWorkspace]);

  const switchWorkspace = (workspaceId: string) => {
    const workspace = workspaces.find(w => w.id === workspaceId);
    if (workspace) {
      setCurrentWorkspace(workspace);
      localStorage.setItem("currentWorkspaceId", workspaceId);
    }
  };

  const createWorkspace = async (name: string, description?: string) => {
    if (!user) {
      toast.error("You must be logged in to create a workspace");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("workspaces")
        .insert({
          name,
          description: description || null,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Workspace created successfully");
      await fetchWorkspaces();
      switchWorkspace(data.id);
    } catch (error: any) {
      toast.error("Failed to create workspace");
      console.error("Error creating workspace:", error);
    }
  };

  const updateWorkspace = async (id: string, name: string, description?: string) => {
    try {
      const { error } = await supabase
        .from("workspaces")
        .update({ name, description: description || null })
        .eq("id", id);

      if (error) throw error;

      toast.success("Workspace updated successfully");
      await fetchWorkspaces();
    } catch (error: any) {
      toast.error("Failed to update workspace");
      console.error("Error updating workspace:", error);
    }
  };

  const deleteWorkspace = async (id: string) => {
    try {
      const { error } = await supabase
        .from("workspaces")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Workspace deleted successfully");
      await fetchWorkspaces();
    } catch (error: any) {
      toast.error("Failed to delete workspace");
      console.error("Error deleting workspace:", error);
    }
  };

  const addMember = async (workspaceId: string, userId: string, role: WorkspaceMember['role']) => {
    try {
      const { error } = await supabase
        .from("workspace_members")
        .insert({
          workspace_id: workspaceId,
          user_id: userId,
          role,
        });

      if (error) throw error;

      toast.success("Member added successfully");
      if (currentWorkspace?.id === workspaceId) {
        await fetchMembers(workspaceId);
      }
    } catch (error: any) {
      toast.error("Failed to add member");
      console.error("Error adding member:", error);
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from("workspace_members")
        .delete()
        .eq("id", memberId);

      if (error) throw error;

      toast.success("Member removed successfully");
      if (currentWorkspace) {
        await fetchMembers(currentWorkspace.id);
      }
    } catch (error: any) {
      toast.error("Failed to remove member");
      console.error("Error removing member:", error);
    }
  };

  const updateMemberRole = async (memberId: string, role: WorkspaceMember['role']) => {
    try {
      const { error } = await supabase
        .from("workspace_members")
        .update({ role })
        .eq("id", memberId);

      if (error) throw error;

      toast.success("Member role updated successfully");
      if (currentWorkspace) {
        await fetchMembers(currentWorkspace.id);
      }
    } catch (error: any) {
      toast.error("Failed to update member role");
      console.error("Error updating member role:", error);
    }
  };

  const leaveWorkspace = async (workspaceId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("workspace_members")
        .delete()
        .eq("workspace_id", workspaceId)
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Left workspace successfully");
      await fetchWorkspaces();
    } catch (error: any) {
      toast.error("Failed to leave workspace");
      console.error("Error leaving workspace:", error);
    }
  };

  const refreshWorkspaces = async () => {
    await fetchWorkspaces();
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        members,
        loading,
        switchWorkspace,
        createWorkspace,
        updateWorkspace,
        deleteWorkspace,
        addMember,
        removeMember,
        updateMemberRole,
        leaveWorkspace,
        refreshWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
