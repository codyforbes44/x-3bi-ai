import { Activity, Zap, Users, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { IconStat } from "@/components/visual/IconStat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LongPressTooltip } from "@/components/visual/LongPressTooltip";

interface VisualAnalyticsProps {
  totalSessions: number;
  totalMessages: number;
  averageSessionDuration: number;
  activeUsers: number;
  onTimeRangeChange?: (range: string) => void;
  selectedRange?: string;
}

export function VisualAnalytics({ 
  totalSessions, 
  totalMessages, 
  averageSessionDuration, 
  activeUsers,
  onTimeRangeChange,
  selectedRange = '7d'
}: VisualAnalyticsProps) {
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector - Icon Only */}
      <div className="flex items-center gap-2 justify-end">
        <LongPressTooltip content="7 Days">
          <Button
            variant={selectedRange === '7d' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onTimeRangeChange?.('7d')}
          >
            <span className="text-sm">7</span>
          </Button>
        </LongPressTooltip>
        <LongPressTooltip content="30 Days">
          <Button
            variant={selectedRange === '30d' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onTimeRangeChange?.('30d')}
          >
            <span className="text-sm">30</span>
          </Button>
        </LongPressTooltip>
        <LongPressTooltip content="90 Days">
          <Button
            variant={selectedRange === '90d' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => onTimeRangeChange?.('90d')}
          >
            <span className="text-sm">90</span>
          </Button>
        </LongPressTooltip>
      </div>

      {/* Icon Stats Grid - No Text Labels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <IconStat
          icon={Activity}
          value={totalSessions.toLocaleString()}
          label="Total Sessions"
          trend="up"
        />
        <IconStat
          icon={Zap}
          value={totalMessages.toLocaleString()}
          label="Messages Sent"
          trend="up"
        />
        <IconStat
          icon={Users}
          value={activeUsers.toLocaleString()}
          label="Active Users"
          trend="up"
        />
        <IconStat
          icon={Calendar}
          value={formatDuration(averageSessionDuration)}
          label="Average Duration"
          trend="neutral"
        />
      </div>
    </div>
  );
}
