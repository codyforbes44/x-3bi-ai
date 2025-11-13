import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Trash2, AlertTriangle, Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import { ResponsiveTable, Column } from '@/components/ui/responsive-table';
import { useExport } from '@/hooks/useExport';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const { exportData } = useExport();

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

  const handleExportAlerts = (format: 'csv' | 'json') => {
    const data = alerts.map(alert => ({
      name: alert.name,
      metric: alert.metric,
      threshold: alert.threshold,
      enabled: alert.enabled,
      channel: alert.notificationChannel,
    }));
    
    exportData(data, {
      filename: `alerts-${new Date().toISOString().split('T')[0]}`,
      format,
    });
  };

  const handleExportTriggered = (format: 'csv' | 'json') => {
    const data = triggeredAlerts.map(trigger => ({
      alert: trigger.alertName,
      value: trigger.value,
      timestamp: new Date(trigger.timestamp).toLocaleString(),
    }));
    
    exportData(data, {
      filename: `triggered-alerts-${new Date().toISOString().split('T')[0]}`,
      format,
    });
  };

  const alertColumns: Column<Alert>[] = [
    {
      key: 'name',
      label: 'Alert Name',
      render: (alert) => <span className="font-medium">{alert.name}</span>,
    },
    {
      key: 'metric',
      label: 'Metric',
      render: (alert) => alert.metric,
    },
    {
      key: 'threshold',
      label: 'Threshold',
      render: (alert) => alert.threshold.toString(),
      hideOnMobile: true,
    },
    {
      key: 'enabled',
      label: 'Status',
      render: (alert) => (
        <div className="flex items-center gap-2">
          <Switch 
            checked={alert.enabled} 
            onCheckedChange={() => toggleAlert(alert.id)}
          />
          <Badge variant={alert.enabled ? 'default' : 'secondary'}>
            {alert.enabled ? 'Active' : 'Disabled'}
          </Badge>
        </div>
      ),
      mobileLabel: 'Status',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (alert) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteAlert(alert.id)}
          className="min-h-[44px] min-w-[44px]"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const triggerColumns: Column<AlertTrigger>[] = [
    {
      key: 'alertName',
      label: 'Alert',
      render: (trigger) => <span className="font-medium">{trigger.alertName}</span>,
    },
    {
      key: 'value',
      label: 'Value',
      render: (trigger) => trigger.value.toFixed(2),
    },
    {
      key: 'timestamp',
      label: 'Time',
      render: (trigger) => new Date(trigger.timestamp).toLocaleString(),
      hideOnMobile: true,
    },
    {
      key: 'severity',
      label: 'Severity',
      render: () => (
        <Badge variant="destructive">
          <AlertTriangle className="h-3 w-3 mr-1" />
          High
        </Badge>
      ),
      mobileLabel: 'Status',
    },
  ];

  const activeAlertCount = alerts.filter(a => a.enabled).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alert Configuration
                {activeAlertCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeAlertCount} Active
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Set up performance thresholds and notifications</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-h-[44px]">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExportAlerts('csv')}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportAlerts('json')}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Alert Name</Label>
              <Input
                placeholder="High Load Time"
                value={newAlert.name}
                onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                className="min-h-[44px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Metric</Label>
              <select
                className="w-full min-h-[44px] px-3 rounded-md border border-input bg-background"
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
                className="min-h-[44px]"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addAlert} className="w-full min-h-[44px]">
                <Plus className="h-4 w-4 mr-2" />
                Add Alert
              </Button>
            </div>
          </div>

          <ResponsiveTable
            data={alerts}
            columns={alertColumns}
            keyExtractor={(alert) => alert.id}
            emptyMessage="No alerts configured yet"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                Recent Alert Triggers
                {triggeredAlerts.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {triggeredAlerts.length}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Last 10 triggered alerts</CardDescription>
            </div>
            {triggeredAlerts.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-h-[44px]">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExportTriggered('csv')}>
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportTriggered('json')}>
                    <FileJson className="h-4 w-4 mr-2" />
                    Export as JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveTable
            data={triggeredAlerts}
            columns={triggerColumns}
            keyExtractor={(trigger) => trigger.id}
            emptyMessage="No alerts triggered yet"
          />
        </CardContent>
      </Card>
    </div>
  );
}
