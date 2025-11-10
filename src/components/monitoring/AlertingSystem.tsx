import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface Alert {
  id: string;
  name: string;
  metric: string;
  threshold: number;
  enabled: boolean;
  notificationChannel: 'toast' | 'email' | 'webhook';
}

interface AlertTrigger {
  id: string;
  alertName: string;
  value: number;
  timestamp: number;
}

export function AlertingSystem() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      name: 'High LCP',
      metric: 'LCP',
      threshold: 4000,
      enabled: true,
      notificationChannel: 'toast',
    },
    {
      id: '2',
      name: 'Poor CLS',
      metric: 'CLS',
      threshold: 0.25,
      enabled: true,
      notificationChannel: 'toast',
    },
  ]);
  const [triggeredAlerts, setTriggeredAlerts] = useState<AlertTrigger[]>([]);
  const [newAlert, setNewAlert] = useState({
    name: '',
    metric: 'LCP',
    threshold: 0,
  });

  useEffect(() => {
    // Monitor performance metrics and trigger alerts
    const interval = setInterval(() => {
      const performance = window.performance as any;
      if (performance.getEntriesByType) {
        const entries = performance.getEntriesByType('navigation');
        if (entries.length > 0) {
          const nav = entries[0] as PerformanceNavigationTiming;
          checkMetricThresholds('LCP', nav.loadEventEnd - nav.fetchStart);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [alerts]);

  const checkMetricThresholds = (metric: string, value: number) => {
    alerts.forEach((alert) => {
      if (alert.enabled && alert.metric === metric && value > alert.threshold) {
        triggerAlert(alert, value);
      }
    });
  };

  const triggerAlert = (alert: Alert, value: number) => {
    const trigger: AlertTrigger = {
      id: Date.now().toString(),
      alertName: alert.name,
      value,
      timestamp: Date.now(),
    };

    setTriggeredAlerts((prev) => [trigger, ...prev.slice(0, 9)]);

    if (alert.notificationChannel === 'toast') {
      toast.error(`Alert: ${alert.name}`, {
        description: `Threshold exceeded: ${value.toFixed(2)} > ${alert.threshold}`,
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    }
  };

  const addAlert = () => {
    if (!newAlert.name || !newAlert.threshold) {
      toast.error('Please fill in all fields');
      return;
    }

    const alert: Alert = {
      id: Date.now().toString(),
      ...newAlert,
      enabled: true,
      notificationChannel: 'toast',
    };

    setAlerts((prev) => [...prev, alert]);
    setNewAlert({ name: '', metric: 'LCP', threshold: 0 });
    toast.success('Alert created successfully');
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    toast.success('Alert deleted');
  };

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alert Configuration
          </CardTitle>
          <CardDescription>Set up performance thresholds and notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Alert Name</Label>
              <Input
                placeholder="High Load Time"
                value={newAlert.name}
                onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Metric</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                value={newAlert.metric}
                onChange={(e) => setNewAlert({ ...newAlert, metric: e.target.value })}
              >
                <option value="LCP">LCP</option>
                <option value="FID">FID</option>
                <option value="CLS">CLS</option>
                <option value="FCP">FCP</option>
                <option value="TTFB">TTFB</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Threshold</Label>
              <Input
                type="number"
                placeholder="4000"
                value={newAlert.threshold || ''}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, threshold: parseFloat(e.target.value) })
                }
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addAlert} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Alert
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Switch checked={alert.enabled} onCheckedChange={() => toggleAlert(alert.id)} />
                  <div>
                    <p className="font-medium">{alert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {alert.metric} &gt; {alert.threshold}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={alert.enabled ? 'default' : 'secondary'}>
                    {alert.notificationChannel}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alert Triggers</CardTitle>
          <CardDescription>Last 10 triggered alerts</CardDescription>
        </CardHeader>
        <CardContent>
          {triggeredAlerts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No alerts triggered yet</p>
          ) : (
            <div className="space-y-2">
              {triggeredAlerts.map((trigger) => (
                <div
                  key={trigger.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-destructive/5"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="font-medium">{trigger.alertName}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Value: {trigger.value.toFixed(2)} •{' '}
                    {new Date(trigger.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
