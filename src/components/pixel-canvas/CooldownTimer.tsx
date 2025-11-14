import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CooldownTimerProps {
  lastPixelTime: Date | null;
  cooldownSeconds: number;
}

export function CooldownTimer({ lastPixelTime, cooldownSeconds }: CooldownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!lastPixelTime) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const elapsed = (Date.now() - lastPixelTime.getTime()) / 1000;
      const remaining = Math.max(0, cooldownSeconds - elapsed);
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 100);
    return () => clearInterval(interval);
  }, [lastPixelTime, cooldownSeconds]);

  if (timeLeft === 0) return null;

  const progress = ((cooldownSeconds - timeLeft) / cooldownSeconds) * 100;

  return (
    <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1">
        <div className="text-sm font-medium mb-1">
          Cooldown: {timeLeft.toFixed(1)}s
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
