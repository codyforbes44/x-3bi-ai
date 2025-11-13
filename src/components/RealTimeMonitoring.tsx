import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Activity, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Download, FileJson, FileSpreadsheet, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResponsiveTable, Column } from '@/components/ui/responsive-table';
import { useExport } from '@/hooks/useExport';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [filterType, setFilterType] = useState<string>('all');
  const { toast } = useToast();
  const { exportData } = useExport();

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

  const filteredMetrics = filterType === 'all' 
    ? metrics 
    : metrics.filter(m => m.metric_type === filterType);

  const handleExport = (format: 'csv' | 'json') => {
    const data = filteredMetrics.map(metric => ({
      type: metric.metric_type,
      value: metric.value,
      timestamp: new Date(metric.created_at).toLocaleString(),
    }));
    
    exportData(data, {
      filename: `system-metrics-${new Date().toISOString().split('T')[0]}`,
      format,
    });
  };

  const metricColumns: Column<SystemMetric>[] = [
    {
      key: 'metric_type',
      label: 'Metric Type',
      render: (metric) => (
        <Badge variant="outline" className="capitalize">
          {metric.metric_type.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'value',
      label: 'Value',
      render: (metric) => {
        if (metric.metric_type.includes('rate')) return `${metric.value.toFixed(2)}%`;
        if (metric.metric_type.includes('time')) return `${metric.value.toFixed(0)}ms`;
        if (metric.metric_type.includes('memory')) return `${metric.value.toFixed(0)}MB`;
        return `${metric.value.toFixed(0)}%`;
      },
    },
    {
      key: 'created_at',
      label: 'Timestamp',
      render: (metric) => new Date(metric.created_at).toLocaleTimeString(),
      hideOnMobile: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (metric) => {
        let status = 'healthy';
        if (metric.metric_type === 'error_rate' && metric.value > 5) status = 'critical';
        else if (metric.metric_type === 'error_rate' && metric.value > 2) status = 'warning';
        else if (metric.metric_type === 'response_time' && metric.value > 1000) status = 'warning';
        
        return (
          <Badge variant={status === 'healthy' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'}>
            {status}
          </Badge>
        );
      },
      mobileLabel: 'Status',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Real-Time System Monitoring</h2>
          <p className="text-muted-foreground">Live performance metrics and health status</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={systemHealth === 'healthy' ? 'default' : systemHealth === 'warning' ? 'secondary' : 'destructive'}>
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-background"></span>
            </span>
            {systemHealth === 'healthy' && <CheckCircle className="w-4 h-4 mr-2" />}
            {systemHealth === 'warning' && <AlertCircle className="w-4 h-4 mr-2" />}
            {systemHealth === 'critical' && <AlertCircle className="w-4 h-4 mr-2" />}
            System {systemHealth}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="min-h-[44px]">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <FileJson className="h-4 w-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-sm">Response Time</CardDescription>
            <CardTitle className="text-4xl font-bold">{responseTime.current.toFixed(0)}ms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm font-medium">
              {responseTime.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
              )}
              <span className={responseTime.trend > 0 ? 'text-destructive' : 'text-primary'}>
                {Math.abs(responseTime.trend).toFixed(1)}% from last
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-sm">Error Rate</CardDescription>
            <CardTitle className="text-4xl font-bold">{errorRate.current.toFixed(2)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm font-medium">
              {errorRate.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
              )}
              <span className={errorRate.trend > 0 ? 'text-destructive' : 'text-primary'}>
                {Math.abs(errorRate.trend).toFixed(1)}% from last
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-sm">Memory Usage</CardDescription>
            <CardTitle className="text-4xl font-bold">{memoryUsage.current.toFixed(0)}MB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm font-medium">
              {memoryUsage.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
              )}
              <span className={memoryUsage.trend > 0 ? 'text-destructive' : 'text-primary'}>
                {Math.abs(memoryUsage.trend).toFixed(1)}% from last
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-sm">CPU Usage</CardDescription>
            <CardTitle className="text-4xl font-bold">{cpuUsage.current.toFixed(0)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm font-medium">
              {cpuUsage.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
              )}
              <span className={cpuUsage.trend > 0 ? 'text-destructive' : 'text-primary'}>
                {Math.abs(cpuUsage.trend).toFixed(1)}% from last
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activity Log
              </CardTitle>
              <CardDescription>Latest system events and metrics</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-h-[44px]">
                    <Filter className="h-4 w-4 mr-2" />
                    {filterType === 'all' ? 'All Types' : filterType.replace('_', ' ')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterType('all')}>
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('response_time')}>
                    Response Time
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('error_rate')}>
                    Error Rate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('memory_usage')}>
                    Memory Usage
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('cpu_usage')}>
                    CPU Usage
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading metrics...</p>
          ) : (
            <ResponsiveTable
              data={filteredMetrics.slice(0, 20)}
              columns={metricColumns}
              keyExtractor={(metric) => metric.id}
              emptyMessage="No metrics available"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}