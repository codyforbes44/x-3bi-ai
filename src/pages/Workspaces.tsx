import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WorkspaceSwitcher } from "@/components/workspaces/WorkspaceSwitcher";
import { CreateWorkspaceDialog } from "@/components/workspaces/CreateWorkspaceDialog";
import { WorkspaceSettings } from "@/components/workspaces/WorkspaceSettings";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderKanban, Settings } from "lucide-react";

const Workspaces = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { currentWorkspace, workspaces, members, loading } = useWorkspace();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading workspaces...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
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
      </main>

      <Footer />
      
      <CreateWorkspaceDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </div>
  );
};

export default Workspaces;
