import { ReactNode } from 'react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshWrapperProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  className?: string;
}

export function PullToRefreshWrapper({ onRefresh, children, className }: PullToRefreshWrapperProps) {
  const { isPulling, pullDistance, isRefreshing, shouldShowIndicator } = usePullToRefresh({
    threshold: 80,
    onRefresh,
  });

  return (
    <div className={cn('relative', className)}>
      {/* Pull indicator */}
      <div
        className="fixed top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 z-50"
        style={{
          transform: `translateY(${isPulling || isRefreshing ? pullDistance : 0}px)`,
          opacity: shouldShowIndicator ? 1 : 0,
        }}
      >
        <div className="bg-background/95 backdrop-blur-sm rounded-full p-3 shadow-lg border">
          <Loader2 
            className={cn(
              'h-6 w-6 text-primary',
              isRefreshing && 'animate-spin'
            )} 
          />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${isPulling ? pullDistance : 0}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
