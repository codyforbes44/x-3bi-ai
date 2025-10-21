import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RateLimitStatus {
  current: number;
  limit: number;
  resetAt: Date;
  remaining: number;
}

export function RateLimitIndicator() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<RateLimitStatus>({
    current: 3847,
    limit: 5000,
    resetAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    remaining: 1153,
  });

  const percentageUsed = (status.current / status.limit) * 100;
  const isNearLimit = percentageUsed > 80;
  const isAtLimit = percentageUsed >= 100;

  const getTimeUntilReset = () => {
    const now = new Date();
    const diff = status.resetAt.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <Card className={isAtLimit ? 'border-destructive' : isNearLimit ? 'border-yellow-500' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">API Usage</CardTitle>
          {isAtLimit ? (
            <Badge variant="destructive">Limit Reached</Badge>
          ) : isNearLimit ? (
            <Badge variant="default" className="bg-yellow-500">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Near Limit
            </Badge>
          ) : (
            <Badge variant="secondary">Active</Badge>
          )}
        </div>
        <CardDescription className="text-xs">
          Monthly API request quota
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {status.current.toLocaleString()} / {status.limit.toLocaleString()}
            </span>
            <span className="font-medium">{percentageUsed.toFixed(0)}%</span>
          </div>
          <Progress
            value={percentageUsed}
            className={cn(
              'h-2',
              isAtLimit && '[&>div]:bg-destructive',
              isNearLimit && '[&>div]:bg-yellow-500'
            )}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Remaining</p>
            <p className="font-semibold">{status.remaining.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Resets in
            </p>
            <p className="font-semibold">{getTimeUntilReset()}</p>
          </div>
        </div>

        {/* Warnings and Actions */}
        {isAtLimit && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              You've reached your API limit. Upgrade to continue using AI features.
            </AlertDescription>
          </Alert>
        )}

        {isNearLimit && !isAtLimit && (
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription className="text-xs">
              You're approaching your limit. Consider upgrading for unlimited access.
            </AlertDescription>
          </Alert>
        )}

        {(isAtLimit || isNearLimit) && (
          <Button
            onClick={() => navigate('/pricing')}
            variant={isAtLimit ? 'destructive' : 'default'}
            className="w-full"
            size="sm"
          >
            {isAtLimit ? 'Upgrade Now' : 'View Plans'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
