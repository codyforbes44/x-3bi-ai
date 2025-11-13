import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { APMDashboard } from '@/components/monitoring/APMDashboard';
import { AlertingSystem } from '@/components/monitoring/AlertingSystem';
import { RealTimeMonitoring } from '@/components/RealTimeMonitoring';
import { SEO } from '@/components/SEO';
import { Activity, Bell, BarChart3 } from 'lucide-react';
import { RequireRole } from '@/components/auth/RequireRole';
import { Badge } from '@/components/ui/badge';

export default function MonitoringDashboard() {
  return (
    <RequireRole role="admin">
      <SEO
        title="Monitoring Dashboard - Real-time Performance Monitoring"
        description="Monitor application performance, web vitals, and set up custom alerts for your platform."
      />
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Monitoring Dashboard</h1>
            <p className="text-muted-foreground">
              Track performance metrics, monitor web vitals, and manage alerts
            </p>
          </div>
          <Badge variant="outline" className="w-fit">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Monitoring
          </Badge>
        </div>

        <Tabs defaultValue="apm" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="apm" className="flex items-center gap-2 min-h-[44px]">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">APM</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2 min-h-[44px]">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2 min-h-[44px]">
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
            <RealTimeMonitoring />
          </TabsContent>
        </Tabs>
      </div>
    </RequireRole>
  );
}
