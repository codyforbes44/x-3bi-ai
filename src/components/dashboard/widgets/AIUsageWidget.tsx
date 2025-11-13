import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp } from 'lucide-react';
import { DashboardWidget } from '../DashboardWidget';

export function AIUsageWidget() {
  // Mock data - in production, fetch from your AI usage analytics
  const usageData = {
    totalRequests: 1247,
    totalCost: 28.45,
    avgResponseTime: 1.8,
    trend: 12.5,
  };

  return (
    <DashboardWidget
      title="AI Usage"
      description="Last 30 days"
      icon={<Brain className="h-5 w-5 text-primary" />}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Requests</p>
          <p className="text-2xl font-bold">{usageData.totalRequests.toLocaleString()}</p>
          <div className="flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            {usageData.trend}% vs last month
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Cost</p>
          <p className="text-2xl font-bold">${usageData.totalCost}</p>
          <p className="text-xs text-muted-foreground">
            Avg: {usageData.avgResponseTime}s/request
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Most Used Model</span>
          <Badge variant="secondary">GPT-4</Badge>
        </div>
      </div>
    </DashboardWidget>
  );
}
