import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, AlertCircle, CheckCircle, Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { monitorWebVitals } from '@/utils/performance';
import { ResponsiveTable, Column } from '@/components/ui/responsive-table';
import { useExport } from '@/hooks/useExport';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

export function APMDashboard() {
  const [vitals, setVitals] = useState<WebVital[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { exportData } = useExport();

  useEffect(() => {
    setIsMonitoring(true);
    const cleanup = monitorWebVitals((metric) => {
      const vital: WebVital = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      };
      setVitals((prev) => [...prev.slice(-9), vital]);
    });

    return () => {
      cleanup();
      setIsMonitoring(false);
    };
  }, []);

  const getVitalThreshold = (name: string, value: number) => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      LCP: { good: 2500, poor: 4000 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 },
    };

    const threshold = thresholds[name];
    if (!threshold) return 'good';
    if (value <= threshold.good) return 'good';
    if (value >= threshold.poor) return 'poor';
    return 'needs-improvement';
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'needs-improvement':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'poor':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      case 'needs-improvement':
        return <TrendingUp className="h-4 w-4" />;
      case 'poor':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  const latestVitals = vitals.reduce((acc, vital) => {
    if (!acc[vital.name] || acc[vital.name].timestamp < vital.timestamp) {
      acc[vital.name] = vital;
    }
    return acc;
  }, {} as Record<string, WebVital>);

  const handleExport = (format: 'csv' | 'json') => {
    const data = vitals.map(vital => ({
      metric: vital.name,
      value: formatValue(vital.name, vital.value),
      rating: vital.rating,
      timestamp: new Date(vital.timestamp).toLocaleString(),
    }));
    
    exportData(data, {
      filename: `web-vitals-${new Date().toISOString().split('T')[0]}`,
      format,
    });
  };

  const columns: Column<WebVital>[] = [
    {
      key: 'name',
      label: 'Metric',
      render: (vital) => <span className="font-medium">{vital.name}</span>,
    },
    {
      key: 'value',
      label: 'Value',
      render: (vital) => formatValue(vital.name, vital.value),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (vital) => (
        <Badge className={getRatingColor(vital.rating)} variant="outline">
          {vital.rating.replace('-', ' ')}
        </Badge>
      ),
      mobileLabel: 'Status',
    },
    {
      key: 'timestamp',
      label: 'Time',
      render: (vital) => new Date(vital.timestamp).toLocaleTimeString(),
      hideOnMobile: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Application Performance Monitoring</h2>
          <p className="text-muted-foreground">Real-time Web Vitals and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isMonitoring ? 'default' : 'secondary'} className="w-fit">
            {isMonitoring && (
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-background"></span>
              </span>
            )}
            {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(latestVitals).map(([name, vital]) => (
          <Card key={name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{name}</CardTitle>
              {getRatingIcon(vital.rating)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatValue(name, vital.value)}</div>
              <Badge className={`mt-2 ${getRatingColor(vital.rating)}`} variant="outline">
                {vital.rating.replace('-', ' ')}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                Updated {new Date(vital.timestamp).toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {vitals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Vitals History</CardTitle>
            <CardDescription>Recent performance measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveTable
              data={vitals.slice(0, 10)}
              columns={columns}
              keyExtractor={(vital) => `${vital.name}-${vital.timestamp}`}
            />
          </CardContent>
        </Card>
      )}

      {vitals.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Collecting Metrics...</CardTitle>
            <CardDescription>
              Performance metrics will appear here as you interact with the application.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
