import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, MessageSquare, Clock, Activity, Brain, Zap } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardDescription>
                Monitor AI platform usage, performance, and user engagement
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge 
                variant={timeRange === '7d' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setTimeRange('7d')}
              >
                7 Days
              </Badge>
              <Badge 
                variant={timeRange === '30d' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setTimeRange('30d')}
              >
                30 Days
              </Badge>
              <Badge 
                variant={timeRange === '90d' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setTimeRange('90d')}
              >
                90 Days
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.title}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage Trends</TabsTrigger>
          <TabsTrigger value="models">Model Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Usage Trends</CardTitle>
              <CardDescription>Sessions and messages over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.dailyUsage.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="text-sm font-medium">{day.date}</div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-blue-500" />
                        <span>{day.sessions} sessions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-green-500" />
                        <span>{day.messages} messages</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top AI Models</CardTitle>
              <CardDescription>Most frequently used AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.topModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {getModelIcon(model.model)}
                      <div>
                        <div className="font-medium">{model.model}</div>
                        <div className="text-xs text-muted-foreground">
                          {model.usage}% usage share
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {model.usage}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.performanceMetrics.averageResponseTime}ms</div>
                <div className="text-xs text-muted-foreground">Average response time</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  {analytics.performanceMetrics.successRate}%
                </div>
                <div className="text-xs text-muted-foreground">Successful requests</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-500" />
                  Error Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">
                  {analytics.performanceMetrics.errorRate}%
                </div>
                <div className="text-xs text-muted-foreground">Failed requests</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;