import { useEffect, useState } from 'react';

interface PullToRefreshOptions {
  threshold?: number; // Distance in pixels to trigger refresh (default: 80)
  resistance?: number; // How much to resist pull (0-1, default: 0.5)
  onRefresh: () => Promise<void>;
}

export function usePullToRefresh(options: PullToRefreshOptions) {
  const { threshold = 80, resistance = 0.5, onRefresh } = options;
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger if scrolled to top
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling || window.scrollY > 0) return;

      currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY);
      
      // Apply resistance
      const resistedDistance = distance * resistance;
      setPullDistance(resistedDistance);

      // Prevent default scroll if pulling
      if (distance > 0) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling) return;

      setIsPulling(false);

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        setPullDistance(0);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullDistance, threshold, resistance, onRefresh, isRefreshing]);

  return {
    isPulling,
    pullDistance,
    isRefreshing,
    shouldShowIndicator: pullDistance > threshold * 0.5,
  };
}
