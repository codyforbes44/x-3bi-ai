import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, TrendingUp, DollarSign, Zap, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UsageData {
  model: string;
  requests: number;
  tokens: number;
  cost: number;
  avgResponseTime: number;
}

export function AIUsageAnalytics() {
  const [usageData, setUsageData] = useState<UsageData[]>([
    { model: 'Grok-3', requests: 1247, tokens: 156000, cost: 12.45, avgResponseTime: 1.2 },
    { model: 'Claude Opus 4', requests: 892, tokens: 134000, cost: 26.80, avgResponseTime: 1.8 },
    { model: 'GPT-5', requests: 634, tokens: 98000, cost: 19.60, avgResponseTime: 1.5 },
    { model: 'Gemini 2.5 Flash', requests: 2156, tokens: 245000, cost: 4.90, avgResponseTime: 0.8 },
  ]);

  const totalCost = usageData.reduce((sum, item) => sum + item.cost, 0);
  const totalRequests = usageData.reduce((sum, item) => sum + item.requests, 0);
  const monthlyBudget = 150;
  const budgetUsage = (totalCost / monthlyBudget) * 100;

  return (
    <div className="space-y-6">
      {/* Budget Alert */}
      {budgetUsage > 80 && (
        <Alert variant={budgetUsage > 90 ? 'destructive' : 'default'}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You've used {budgetUsage.toFixed(0)}% of your monthly budget (${totalCost.toFixed(2)} / ${monthlyBudget})
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Requests</CardDescription>
            <CardTitle className="text-3xl">{totalRequests.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Cost</CardDescription>
            <CardTitle className="text-3xl">${totalCost.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={budgetUsage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {budgetUsage.toFixed(0)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Response Time</CardDescription>
            <CardTitle className="text-3xl">1.2s</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Zap className="w-3 h-3 inline mr-1" />
              15% faster than average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Cost per Request</CardDescription>
            <CardTitle className="text-3xl">$0.013</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <DollarSign className="w-3 h-3 inline mr-1" />
              Optimized routing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">By Model</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Usage & Costs</CardTitle>
              <CardDescription>Breakdown by AI model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageData.map((model) => (
                  <div key={model.model} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{model.model}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{model.requests.toLocaleString()} requests</span>
                          <span>{model.tokens.toLocaleString()} tokens</span>
                          <span>{model.avgResponseTime}s avg</span>
                        </div>
                      </div>
                      <Badge variant="secondary">${model.cost.toFixed(2)}</Badge>
                    </div>
                    <Progress
                      value={(model.cost / totalCost) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
              <LineChart className="w-12 h-12 opacity-50" />
              <p className="ml-4">Chart visualization coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Suggestions</CardTitle>
              <CardDescription>Save money with these recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <strong>Use Gemini 2.5 Flash for simple queries</strong>
                  <br />
                  Could save ~$8.20/month by routing 40% of Claude requests to Gemini Flash
                </AlertDescription>
              </Alert>
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Enable response caching</strong>
                  <br />
                  Reduce duplicate requests by 15-20%, estimated savings: $5.40/month
                </AlertDescription>
              </Alert>
              <Alert>
                <DollarSign className="h-4 w-4" />
                <AlertDescription>
                  <strong>Switch to GPT-5 Mini for code tasks</strong>
                  <br />
                  Similar quality for code generation, could save $4.80/month
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
