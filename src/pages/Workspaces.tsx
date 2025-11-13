import { useState } from "react";
import { SEO } from "@/components/SEO";
import { WorkspaceSwitcher } from "@/components/workspaces/WorkspaceSwitcher";
import { CreateWorkspaceDialog } from "@/components/workspaces/CreateWorkspaceDialog";
import { WorkspaceSettings } from "@/components/workspaces/WorkspaceSettings";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderKanban, Settings } from "lucide-react";
import { AuthenticatedPageLayout } from "@/components/layout/AuthenticatedPageLayout";

const Workspaces = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { currentWorkspace, workspaces, members, loading } = useWorkspace();

  if (loading) {
    return (
      <AuthenticatedPageLayout maxWidth="xl" showBreadcrumbs={false}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading workspaces...</p>
        </div>
      </AuthenticatedPageLayout>
    );
  }

  return (
    <>
      <SEO
        title="Team Workspaces - Collaborate on AI"
        description="Create and manage team workspaces. Collaborate on AI projects with role-based access control."
        keywords={['team workspaces', 'collaboration', 'team AI', 'workspace management']}
        ogImage="https://3bi.ai/og/workspaces.png"
        canonical="https://3bi.ai/workspaces"
      />
      <AuthenticatedPageLayout maxWidth="xl" showBreadcrumbs={true}>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Workspaces</h1>
            <p className="text-xl text-muted-foreground">
              Collaborate with your team in shared workspaces
            </p>
          </div>

          {/* Workspace Switcher */}
          <div className="max-w-md">
            <WorkspaceSwitcher onCreateWorkspace={() => setCreateDialogOpen(true)} />
          </div>

          {currentWorkspace ? (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Overview Cards */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Workspace
                  </CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentWorkspace.name}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentWorkspace.description || "No description"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{members.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Active collaborators
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Workspaces
                  </CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workspaces.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Accessible workspaces
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Workspace Selected</CardTitle>
                <CardDescription>
                  Create or select a workspace to get started
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {/* Workspace Settings */}
          {currentWorkspace && <WorkspaceSettings />}
        </div>

        <CreateWorkspaceDialog 
          open={createDialogOpen} 
          onOpenChange={setCreateDialogOpen} 
        />
      </AuthenticatedPageLayout>
    </>
  );
};

export default Workspaces;
