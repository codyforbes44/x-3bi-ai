import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { DashboardWidget } from '../DashboardWidget';

interface SystemMetric {
  metric_type: string;
  value: number;
  created_at: string;
}

export function SystemHealthWidget() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();

    const channel = supabase
      .channel('system_metrics_widget')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'system_metrics',
      }, () => {
        fetchMetrics();
      })
      .subscribe();

    const interval = setInterval(fetchMetrics, 30000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data } = await supabase
        .from('system_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (data) {
        setMetrics(data);
        calculateSystemHealth(data);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSystemHealth = (data: SystemMetric[]) => {
    const errorRates = data.filter(m => m.metric_type === 'error_rate');
    const avgErrorRate = errorRates.reduce((sum, m) => sum + m.value, 0) / (errorRates.length || 1);

    if (avgErrorRate > 5) {
      setSystemHealth('critical');
    } else if (avgErrorRate > 2) {
      setSystemHealth('warning');
    } else {
      setSystemHealth('healthy');
    }
  };

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

  return (
    <DashboardWidget
      title="System Health"
      description="Real-time system status"
      icon={
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      }
      action={
        <Badge variant={systemHealth === 'healthy' ? 'default' : systemHealth === 'warning' ? 'secondary' : 'destructive'}>
          {systemHealth === 'healthy' && <CheckCircle className="w-3 h-3 mr-1" />}
          {systemHealth !== 'healthy' && <AlertCircle className="w-3 h-3 mr-1" />}
          {systemHealth}
        </Badge>
      }
    >
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading metrics...</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Response Time</p>
            <p className="text-2xl font-bold">{responseTime.current.toFixed(0)}ms</p>
            <div className="flex items-center text-xs">
              {responseTime.trend > 0 ? (
                <TrendingUp className="w-3 h-3 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-green-600 mr-1" />
              )}
              <span className={responseTime.trend > 0 ? 'text-destructive' : 'text-green-600'}>
                {Math.abs(responseTime.trend).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Error Rate</p>
            <p className="text-2xl font-bold">{errorRate.current.toFixed(2)}%</p>
            <div className="flex items-center text-xs">
              {errorRate.trend > 0 ? (
                <TrendingUp className="w-3 h-3 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-green-600 mr-1" />
              )}
              <span className={errorRate.trend > 0 ? 'text-destructive' : 'text-green-600'}>
                {Math.abs(errorRate.trend).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </DashboardWidget>
  );
}
