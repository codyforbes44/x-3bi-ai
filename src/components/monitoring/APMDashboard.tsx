import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { monitorWebVitals } from '@/utils/performance';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

export function APMDashboard() {
  const [vitals, setVitals] = useState<WebVital[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Application Performance Monitoring</h2>
          <p className="text-muted-foreground">Real-time Web Vitals and performance metrics</p>
        </div>
        <Badge variant={isMonitoring ? 'default' : 'secondary'}>
          {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
        </Badge>
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
