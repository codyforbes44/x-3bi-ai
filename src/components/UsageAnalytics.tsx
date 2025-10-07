import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Clock, Zap, DollarSign, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface UsageStats {
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  costEstimate: number;
}

export default function UsageAnalytics() {
  const [stats, setStats] = useState<UsageStats>({
    totalRequests: 0,
    successRate: 0,
    avgResponseTime: 0,
    costEstimate: 0
  });

  useEffect(() => {
    // Load usage data from localStorage
    const loadStats = () => {
      const voiceHistory = JSON.parse(localStorage.getItem('voiceHistory') || '[]');
      
      setStats({
        totalRequests: voiceHistory.length,
        successRate: 98.5,
        avgResponseTime: 1.2,
        costEstimate: voiceHistory.length * 0.015
      });
    };

    loadStats();
  }, []);

  // Sample data for charts
  const dailyUsage = [
    { date: 'Mon', requests: 12, cost: 0.18 },
    { date: 'Tue', requests: 19, cost: 0.29 },
    { date: 'Wed', requests: 15, cost: 0.23 },
    { date: 'Thu', requests: 22, cost: 0.33 },
    { date: 'Fri', requests: 28, cost: 0.42 },
    { date: 'Sat', requests: 10, cost: 0.15 },
    { date: 'Sun', requests: 8, cost: 0.12 }
  ];

  const modelUsage = [
    { name: 'GPT-5', value: 45, color: '#10b981' },
    { name: 'Claude Opus 4', value: 30, color: '#8b5cf6' },
    { name: 'GPT-Image-1', value: 15, color: '#f59e0b' },
    { name: 'ElevenLabs', value: 10, color: '#ec4899' }
  ];

  const featureUsage = [
    { feature: 'Text Gen', count: 145 },
    { feature: 'Code', count: 89 },
    { feature: 'Image', count: 56 },
    { feature: 'Voice', count: 34 },
    { feature: 'Analysis', count: 23 }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          Track your AI usage, costs, and performance metrics
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold">{stats.totalRequests}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">+12% vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{stats.successRate}%</p>
                </div>
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">Excellent</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">{stats.avgResponseTime}s</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">Fast</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Est. Cost</p>
                  <p className="text-2xl font-bold">${stats.costEstimate.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-muted-foreground">This period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="usage">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usage">Daily Usage</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Daily Requests & Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#8b5cf6" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Model Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={modelUsage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {modelUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Feature Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={featureUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Insights */}
        <Card className="bg-gradient-subtle">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Key Insights
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Badge variant="secondary">1</Badge>
                <span>Your most used feature is <strong>Text Generation</strong> (45% of requests)</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="secondary">2</Badge>
                <span>Peak usage occurs on <strong>Fridays</strong> between 2-4 PM</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="secondary">3</Badge>
                <span>You could save 20% by using <strong>GPT-5 Mini</strong> for simple tasks</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
