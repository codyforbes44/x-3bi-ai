import { Clock, Activity } from 'lucide-react';
import { DashboardWidget } from '../DashboardWidget';
import { Badge } from '@/components/ui/badge';

export function RecentActivityWidget() {
  // Mock data - in production, fetch from activity logs
  const activities = [
    {
      id: 1,
      type: 'api_call',
      description: 'GPT-4 API request completed',
      timestamp: new Date(Date.now() - 5 * 60000),
      status: 'success',
    },
    {
      id: 2,
      type: 'user',
      description: 'Profile updated',
      timestamp: new Date(Date.now() - 15 * 60000),
      status: 'success',
    },
    {
      id: 3,
      type: 'system',
      description: 'High response time detected',
      timestamp: new Date(Date.now() - 30 * 60000),
      status: 'warning',
    },
    {
      id: 4,
      type: 'api_call',
      description: 'Image generation completed',
      timestamp: new Date(Date.now() - 45 * 60000),
      status: 'success',
    },
  ];

  const formatTimestamp = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <DashboardWidget
      title="Recent Activity"
      description="Latest events"
      icon={<Activity className="h-5 w-5 text-primary" />}
    >
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 last:pb-0 border-b last:border-0">
            <div className="flex-shrink-0 mt-0.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-sm truncate">{activity.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(activity.timestamp)}
                </span>
                <Badge
                  variant={activity.status === 'success' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  );
}
