import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, BarChart3, GitBranch } from "lucide-react";
import WorkspaceManager from "@/components/WorkspaceManager";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import WorkflowBuilder from "@/components/WorkflowBuilder";

const EnterpriseSection = () => {
  return (
    <>
      <TabsContent value="workspace" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-500" />
              Enterprise Workspaces
              <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-500 border-cyan-500/30">Enterprise</Badge>
            </CardTitle>
            <CardDescription>
              Manage collaborative AI workspaces, team members, and permissions.
            </CardDescription>
          </CardHeader>
        </Card>
        <WorkspaceManager />
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              Enterprise Analytics
              <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-500 border-indigo-500/30">Enterprise</Badge>
            </CardTitle>
            <CardDescription>
              Advanced analytics dashboard with usage insights, performance metrics, and team productivity.
            </CardDescription>
          </CardHeader>
        </Card>
        <AnalyticsDashboard />
      </TabsContent>

      <TabsContent value="workflows" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-emerald-500" />
              AI Workflow Automation
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">Enterprise</Badge>
            </CardTitle>
            <CardDescription>
              Build and automate complex AI workflows with multi-step processing and intelligent routing.
            </CardDescription>
          </CardHeader>
        </Card>
        <WorkflowBuilder />
      </TabsContent>
    </>
  );
};

export default EnterpriseSection;