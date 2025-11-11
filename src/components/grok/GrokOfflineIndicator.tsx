import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Wifi } from 'lucide-react';

export function GrokOfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <Badge variant="outline" className="gap-1 bg-destructive/10 text-destructive border-destructive/20">
      <WifiOff className="w-3 h-3" />
      Offline
    </Badge>
  );
}
