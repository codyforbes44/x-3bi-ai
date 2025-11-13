import { useCallback, useRef } from 'react';

type AriaLive = 'polite' | 'assertive' | 'off';

/**
 * Hook for announcing messages to screen readers
 * Uses ARIA live regions for dynamic content updates
 */
export function useScreenReader() {
  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  
  const announce = useCallback((message: string, priority: AriaLive = 'polite') => {
    // Create or get live region
    if (!liveRegionRef.current) {
      liveRegionRef.current = document.getElementById('screen-reader-announcements') as HTMLDivElement;
      
      if (!liveRegionRef.current) {
        liveRegionRef.current = document.createElement('div');
        liveRegionRef.current.id = 'screen-reader-announcements';
        liveRegionRef.current.className = 'sr-only';
        liveRegionRef.current.setAttribute('aria-live', priority);
        liveRegionRef.current.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegionRef.current);
      }
    }
    
    // Update priority if needed
    if (liveRegionRef.current.getAttribute('aria-live') !== priority) {
      liveRegionRef.current.setAttribute('aria-live', priority);
    }
    
    // Clear and set new message (triggers screen reader)
    liveRegionRef.current.textContent = '';
    setTimeout(() => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = message;
      }
    }, 100);
  }, []);
  
  const announcePolite = useCallback((message: string) => {
    announce(message, 'polite');
  }, [announce]);
  
  const announceAssertive = useCallback((message: string) => {
    announce(message, 'assertive');
  }, [announce]);
  
  return {
    announce,
    announcePolite,
    announceAssertive,
  };
}

/**
 * Screen reader live region component
 * Add once to your app root
 */
export function ScreenReaderLiveRegion() {
  return (
    <div
      id="screen-reader-announcements"
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
    />
  );
}
