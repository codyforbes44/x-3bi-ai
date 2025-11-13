import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { APMDashboard } from '@/components/monitoring/APMDashboard';
import { AlertingSystem } from '@/components/monitoring/AlertingSystem';
import { SEO } from '@/components/SEO';
import { Activity, Bell, BarChart3 } from 'lucide-react';
import { RequireRole } from '@/components/auth/RequireRole';

export default function MonitoringDashboard() {
  return (
    <RequireRole role="admin">
      <SEO
        title="Monitoring Dashboard - Real-time Performance Monitoring"
        description="Monitor application performance, web vitals, and set up custom alerts for your platform."
      />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Monitoring Dashboard</h1>
          <p className="text-muted-foreground">
            Track performance metrics, monitor web vitals, and manage alerts
          </p>
        </div>

        <Tabs defaultValue="apm" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="apm" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">APM</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Metrics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="apm">
            <APMDashboard />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertingSystem />
          </TabsContent>

          <TabsContent value="metrics">
            <div className="text-center py-12 text-muted-foreground">
              Business metrics tracking coming soon
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RequireRole>
  );
}
