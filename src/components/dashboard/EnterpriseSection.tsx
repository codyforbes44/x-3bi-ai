import { TabsContent } from "@/components/ui/tabs";
import { NeonCard } from "@/components/ui/neon-card";
import { Badge } from "@/components/ui/badge";
import { Building2, BarChart3, GitBranch } from "lucide-react";
import WorkspaceManager from "@/components/WorkspaceManager";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import WorkflowBuilder from "@/components/WorkflowBuilder";
import WorkflowTemplates from "@/components/WorkflowTemplates";
import UsageAnalytics from "@/components/UsageAnalytics";

const EnterpriseSection = () => {
  return (
    <>
      <TabsContent value="workspace" className="space-y-4">
        <NeonCard variant="pink" glow className="border-b border-white/10 p-6">
          <h3 className="text-xl font-bold text-pink-500 mb-2 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Enterprise Workspaces
            <Badge variant="neon-pink">Enterprise</Badge>
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage collaborative AI workspaces, team members, and permissions.
          </p>
        </NeonCard>
        <WorkspaceManager />
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <NeonCard variant="pink" glow className="border-b border-white/10 p-6">
          <h3 className="text-xl font-bold text-pink-500 mb-2 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Enterprise Analytics
            <Badge variant="neon-pink">Enterprise</Badge>
          </h3>
          <p className="text-sm text-muted-foreground">
            Advanced analytics dashboard with usage insights, performance metrics, and team productivity.
          </p>
        </NeonCard>
        <AnalyticsDashboard />
      </TabsContent>

      <TabsContent value="workflows" className="space-y-4">
        <NeonCard variant="pink" glow className="border-b border-white/10 p-6">
          <h3 className="text-xl font-bold text-pink-500 mb-2 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            AI Workflow Automation
            <Badge variant="neon-pink">Enterprise</Badge>
          </h3>
          <p className="text-sm text-muted-foreground">
            Build and automate complex AI workflows with multi-step processing and intelligent routing.
          </p>
        </NeonCard>
        <WorkflowBuilder />
      </TabsContent>

      <TabsContent value="workflow-templates" className="space-y-4">
        <NeonCard variant="pink" glow className="border-b border-white/10 p-6">
          <h3 className="text-xl font-bold text-pink-500 mb-2 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Workflow Templates
            <Badge variant="neon-pink">Automation</Badge>
          </h3>
          <p className="text-sm text-muted-foreground">
            Pre-built automation workflows for common tasks - customize and deploy instantly.
          </p>
        </NeonCard>
        <WorkflowTemplates />
      </TabsContent>

      <TabsContent value="usage-analytics" className="space-y-4">
        <NeonCard variant="pink" glow className="border-b border-white/10 p-6">
          <h3 className="text-xl font-bold text-pink-500 mb-2 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Usage Analytics
            <Badge variant="neon-pink">Insights</Badge>
          </h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive usage tracking, cost analysis, and performance metrics dashboard.
          </p>
        </NeonCard>
        <UsageAnalytics />
      </TabsContent>
    </>
  );
};

export default EnterpriseSection;