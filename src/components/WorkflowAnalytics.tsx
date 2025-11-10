import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BarChart, TrendingUp, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';

interface WorkflowAnalyticsProps {
  workflowId: string;
}

export const WorkflowAnalytics = ({ workflowId }: WorkflowAnalyticsProps) => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const analyzeWorkflow = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('workflow-learn', {
        body: { workflow_id: workflowId }
      });

      if (error) throw error;

      setInsights(data.insights);
      toast({
        title: 'Analysis Complete',
        description: 'Workflow performance analyzed successfully',
      });
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: 'Analysis Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeWorkflow();
  }, [workflowId]);

  if (!insights) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workflow Analytics</CardTitle>
          <CardDescription>Analyzing workflow performance...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Workflow Analytics</CardTitle>
            <CardDescription>Performance insights and optimization suggestions</CardDescription>
          </div>
          <Button onClick={analyzeWorkflow} disabled={loading} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="failures">Failures</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {(insights.success_rate * 100).toFixed(1)}%
                      </div>
                      <TrendingUp className={`h-5 w-5 ${insights.success_rate > 0.8 ? 'text-green-500' : 'text-yellow-500'}`} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Avg Execution Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {insights.avg_execution_time_ms.toFixed(0)}ms
                      </div>
                      <BarChart className="h-5 w-5 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Executions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {insights.total_executions}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="failures" className="space-y-4 mt-4">
              <div className="space-y-2">
                {insights.failure_analysis && insights.failure_analysis.length > 0 ? (
                  insights.failure_analysis.map((failure: any, idx: number) => (
                    <Card key={idx}>
                      <CardContent className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          <div>
                            <div className="font-medium">{failure.step_name}</div>
                            <div className="text-sm text-muted-foreground">
                              Step ID: {failure.step_id}
                            </div>
                          </div>
                        </div>
                        <Badge variant="destructive">
                          {failure.failure_count} failures
                        </Badge>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No failures detected. Workflow is running smoothly!
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4 mt-4">
              <div className="space-y-3">
                {insights.optimization_suggestions && insights.optimization_suggestions.length > 0 ? (
                  insights.optimization_suggestions.map((suggestion: string, idx: number) => (
                    <Card key={idx}>
                      <CardContent className="flex gap-3 py-4">
                        <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{suggestion}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No optimization suggestions at this time.
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
