import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, MessageSquare, Clock, Activity, Brain, Zap, TrendingUp } from "lucide-react";
import { VisualAnalytics } from "@/components/visual/VisualAnalytics";
import { VisualChartCard } from "@/components/visual/VisualChartCard";
import { IconGrid } from "@/components/visual/IconGrid";
import { LongPressTooltip } from "@/components/visual/LongPressTooltip";

interface AnalyticsData {
  totalSessions: number;
  totalMessages: number;
  averageSessionDuration: number;
  activeUsers: number;
  topModels: Array<{ model: string; usage: number }>;
  dailyUsage: Array<{ date: string; sessions: number; messages: number }>;
  performanceMetrics: {
    averageResponseTime: number;
    successRate: number;
    errorRate: number;
  };
}

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Mock data for demonstration
  const analytics: AnalyticsData = {
    totalSessions: 1247,
    totalMessages: 8934,
    averageSessionDuration: 324,
    activeUsers: 89,
    topModels: [
      { model: 'claude-4-opus', usage: 45 },
      { model: 'gpt-4o-mini', usage: 32 },
      { model: 'claude-3-sonnet', usage: 18 },
      { model: 'gpt-4o', usage: 15 },
      { model: 'perplexity-online', usage: 12 }
    ],
    dailyUsage: [
      { date: 'Jan 1', sessions: 145, messages: 892 },
      { date: 'Jan 2', sessions: 178, messages: 1124 },
      { date: 'Jan 3', sessions: 156, messages: 967 },
      { date: 'Jan 4', sessions: 203, messages: 1345 },
      { date: 'Jan 5', sessions: 189, messages: 1198 },
      { date: 'Jan 6', sessions: 167, messages: 1056 },
      { date: 'Jan 7', sessions: 209, messages: 1352 }
    ],
    performanceMetrics: {
      averageResponseTime: 247,
      successRate: 99.7,
      errorRate: 0.3
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  const getModelIcon = (model: string) => {
    if (model.includes('claude')) return <Brain className="w-4 h-4 text-purple-500" />;
    if (model.includes('gpt')) return <MessageSquare className="w-4 h-4 text-green-500" />;
    return <Activity className="w-4 h-4 text-blue-500" />;
  };

  const stats = [
    {
      title: "Total Sessions",
      value: analytics.totalSessions.toLocaleString(),
      description: `${timeRange} period`,
      icon: Activity,
      color: "text-blue-500"
    },
    {
      title: "Messages Sent",
      value: analytics.totalMessages.toLocaleString(),
      description: "AI interactions",
      icon: MessageSquare,
      color: "text-green-500"
    },
    {
      title: "Active Users",
      value: analytics.activeUsers.toLocaleString(),
      description: "Unique users",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Avg Duration",
      value: formatDuration(analytics.averageSessionDuration),
      description: "Per session",
      icon: Clock,
      color: "text-orange-500"
    }
  ];

  // Generate sparkline data
  const generateSparkline = () => 
    analytics.dailyUsage.map(d => ({ value: d.sessions }));

  return (
    <div className="space-y-6">
      {/* Visual Analytics - Icon Only */}
      <VisualAnalytics
        totalSessions={analytics.totalSessions}
        totalMessages={analytics.totalMessages}
        averageSessionDuration={analytics.averageSessionDuration}
        activeUsers={analytics.activeUsers}
        onTimeRangeChange={setTimeRange}
        selectedRange={timeRange}
      />

      {/* Performance Metrics - Icon Only with Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VisualChartCard
          icon={Clock}
          value={`${analytics.performanceMetrics.averageResponseTime}ms`}
          label="Average Response Time"
          trend="down"
          trendValue={12}
          sparklineData={generateSparkline()}
        />
        <VisualChartCard
          icon={Zap}
          value={`${analytics.performanceMetrics.successRate}%`}
          label="Success Rate"
          trend="up"
          trendValue={2}
          sparklineData={generateSparkline()}
        />
        <VisualChartCard
          icon={TrendingUp}
          value={`${analytics.performanceMetrics.errorRate}%`}
          label="Error Rate"
          trend="down"
          trendValue={5}
          sparklineData={generateSparkline()}
        />
      </div>

      {/* Top Models - Icon Grid Only */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">{analytics.topModels.length}</span>
          </div>
          <div className="space-y-3">
            {analytics.topModels.map((model) => (
              <LongPressTooltip key={model.model} content={model.model}>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all">
                  {getModelIcon(model.model)}
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${model.usage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{model.usage}%</span>
                </div>
              </LongPressTooltip>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;