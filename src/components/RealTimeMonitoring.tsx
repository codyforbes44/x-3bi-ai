import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Activity, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SystemMetric {
  id: string;
  metric_type: string;
  value: number;
  metadata: Record<string, any>;
  created_at: string;
}

export function RealTimeMonitoring() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('system-metrics', {
        body: {
          action: 'query',
          types: ['response_time', 'error_rate', 'memory_usage', 'cpu_usage'],
          limit: 100,
        },
      });

      if (error) throw error;

      if (data?.data) {
        setMetrics(data.data);
        calculateSystemHealth(data.data);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
      toast({
        title: 'Error',
        description: 'Failed to load system metrics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateSystemHealth = (metricData: SystemMetric[]) => {
    const errorRates = metricData.filter(m => m.metric_type === 'error_rate');
    const avgErrorRate = errorRates.reduce((sum, m) => sum + m.value, 0) / (errorRates.length || 1);

    if (avgErrorRate > 5) {
      setSystemHealth('critical');
    } else if (avgErrorRate > 2) {
      setSystemHealth('warning');
    } else {
      setSystemHealth('healthy');
    }
  };

  useEffect(() => {
    fetchMetrics();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('system_metrics')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'system_metrics',
      }, (payload) => {
        setMetrics(prev => [payload.new as SystemMetric, ...prev].slice(0, 100));
      })
      .subscribe();

    const interval = setInterval(fetchMetrics, 30000); // Refresh every 30s

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const getMetricSummary = (type: string) => {
    const typeMetrics = metrics.filter(m => m.metric_type === type);
    if (typeMetrics.length === 0) return { current: 0, trend: 0 };

    const current = typeMetrics[0]?.value || 0;
    const previous = typeMetrics[1]?.value || current;
    const trend = ((current - previous) / previous) * 100;

    return { current, trend };
  };

  const responseTime = getMetricSummary('response_time');
  const errorRate = getMetricSummary('error_rate');
  const memoryUsage = getMetricSummary('memory_usage');
  const cpuUsage = getMetricSummary('cpu_usage');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Real-Time System Monitoring</h2>
          <p className="text-muted-foreground">Live performance metrics and health status</p>
        </div>
        <Badge variant={systemHealth === 'healthy' ? 'default' : systemHealth === 'warning' ? 'secondary' : 'destructive'}>
          {systemHealth === 'healthy' && <CheckCircle className="w-4 h-4 mr-2" />}
          {systemHealth === 'warning' && <AlertCircle className="w-4 h-4 mr-2" />}
          {systemHealth === 'critical' && <AlertCircle className="w-4 h-4 mr-2" />}
          System {systemHealth}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Response Time</CardDescription>
            <CardTitle className="text-3xl">{responseTime.current.toFixed(0)}ms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              {responseTime.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
              )}
              <span className={responseTime.trend > 0 ? 'text-destructive' : 'text-primary'}>
                {Math.abs(responseTime.trend).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Error Rate</CardDescription>
            <CardTitle className="text-3xl">{errorRate.current.toFixed(2)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              {errorRate.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
              )}
              <span className={errorRate.trend > 0 ? 'text-destructive' : 'text-primary'}>
                {Math.abs(errorRate.trend).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Memory Usage</CardDescription>
            <CardTitle className="text-3xl">{memoryUsage.current.toFixed(0)}MB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              {memoryUsage.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
              )}
              <span className={memoryUsage.trend > 0 ? 'text-destructive' : 'text-primary'}>
                {Math.abs(memoryUsage.trend).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>CPU Usage</CardDescription>
            <CardTitle className="text-3xl">{cpuUsage.current.toFixed(0)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              {cpuUsage.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
              )}
              <span className={cpuUsage.trend > 0 ? 'text-destructive' : 'text-primary'}>
                {Math.abs(cpuUsage.trend).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest system events and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading metrics...</div>
          ) : metrics.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No metrics available</div>
          ) : (
            <div className="space-y-2">
              {metrics.slice(0, 10).map((metric) => (
                <div key={metric.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{metric.metric_type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(metric.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className="font-semibold">{metric.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}