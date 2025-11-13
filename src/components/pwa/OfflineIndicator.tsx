import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  className?: string;
}

/**
 * Offline Indicator Component
 * Shows a banner when network is unavailable
 */
export function OfflineIndicator({ className }: OfflineIndicatorProps) {
  const { online } = useNetworkStatus();

  if (online) return null;

  return (
    <div
      className={cn(
        'fixed top-14 md:top-16 left-0 right-0 z-50 animate-in slide-in-from-top',
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <Alert variant="destructive" className="rounded-none border-x-0 border-t-0">
        <WifiOff className="h-4 w-4" />
        <AlertDescription>
          You're currently offline. Some features may be unavailable.
        </AlertDescription>
      </Alert>
    </div>
  );
}
