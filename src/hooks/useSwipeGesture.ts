import { useEffect, useRef } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  edgeThreshold?: number;
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  edgeThreshold = 20,
}: SwipeGestureOptions) {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const isEdgeSwipe = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      
      // Detect if swipe started from left edge
      isEdgeSwipe.current = touch.clientX < edgeThreshold;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart.current) return;
      
      // Prevent default scrolling when swiping from edge
      if (isEdgeSwipe.current) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStart.current.x;
        
        // Only prevent scroll if horizontal swipe is dominant
        if (Math.abs(deltaX) > 10) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      const deltaTime = Date.now() - touchStart.current.time;

      // Check if this is a horizontal swipe (not vertical scroll)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        // Fast swipe or sufficient distance
        const isFastSwipe = deltaTime < 300;
        const isLongSwipe = Math.abs(deltaX) > threshold * 1.5;

        if (isFastSwipe || isLongSwipe) {
          if (deltaX > 0 && (isEdgeSwipe.current || onSwipeRight)) {
            // Swipe right - open panel (only from edge)
            if (isEdgeSwipe.current && onSwipeRight) {
              onSwipeRight();
            }
          } else if (deltaX < 0 && onSwipeLeft) {
            // Swipe left - close panel
            onSwipeLeft();
          }
        }
      }

      touchStart.current = null;
      isEdgeSwipe.current = false;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold, edgeThreshold]);
}
