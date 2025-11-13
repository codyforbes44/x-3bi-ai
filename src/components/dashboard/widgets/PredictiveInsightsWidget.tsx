import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp } from 'lucide-react';
import { DashboardWidget } from '../DashboardWidget';
import { Progress } from '@/components/ui/progress';

export function PredictiveInsightsWidget() {
  // Mock data - in production, fetch from your predictive insights
  const insights = [
    {
      id: 1,
      title: 'High API usage predicted',
      confidence: 87,
      type: 'warning',
      timeframe: 'Next 7 days',
    },
    {
      id: 2,
      title: 'User growth acceleration',
      confidence: 92,
      type: 'success',
      timeframe: 'Next 30 days',
    },
  ];

  return (
    <DashboardWidget
      title="Predictive Insights"
      description="AI-powered predictions"
      icon={<Sparkles className="h-5 w-5 text-primary" />}
    >
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.timeframe}</p>
              </div>
              <Badge
                variant={insight.type === 'warning' ? 'secondary' : 'default'}
                className="text-xs flex-shrink-0"
              >
                {insight.confidence}% confident
              </Badge>
            </div>
            <Progress value={insight.confidence} className="h-1" />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <button className="text-xs text-primary hover:underline flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          View all insights
        </button>
      </div>
    </DashboardWidget>
  );
}
