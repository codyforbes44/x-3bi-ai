import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { monitorWebVitals } from '@/utils/performance';
import { DashboardWidget } from '../DashboardWidget';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function WebVitalsWidget() {
  const [vitals, setVitals] = useState<WebVital[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    setIsMonitoring(true);
    const cleanup = monitorWebVitals((metric) => {
      const vital: WebVital = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
      };
      setVitals((prev) => {
        const updated = [...prev];
        const index = updated.findIndex(v => v.name === vital.name);
        if (index >= 0) {
          updated[index] = vital;
        } else {
          updated.push(vital);
        }
        return updated;
      });
    });

    return () => {
      cleanup();
      setIsMonitoring(false);
    };
  }, []);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'needs-improvement':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'poor':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  return (
    <DashboardWidget
      title="Web Vitals"
      description="Core web performance metrics"
      icon={<Activity className="h-5 w-5 text-primary" />}
      action={
        <Badge variant={isMonitoring ? 'default' : 'secondary'} className="text-xs">
          {isMonitoring ? 'Live' : 'Paused'}
        </Badge>
      }
    >
      {vitals.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground">
          Collecting metrics...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {vitals.map((vital) => (
            <div key={vital.name} className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{vital.name}</p>
              <p className="text-lg font-bold">{formatValue(vital.name, vital.value)}</p>
              <Badge className={`${getRatingColor(vital.rating)} text-xs`} variant="outline">
                {vital.rating === 'needs-improvement' ? 'Fair' : vital.rating}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </DashboardWidget>
  );
}
