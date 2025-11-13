import { useEffect, useRef } from 'react';
import { A11Y_CONFIG } from '@/config/a11y-config';

interface ScreenReaderAnnouncerProps {
  message: string;
  /**
   * Politeness level for announcements
   */
  politeness?: 'polite' | 'assertive' | 'off';
  /**
   * Clear message after delay (ms)
   */
  clearAfter?: number;
}

/**
 * Screen Reader Announcer Component
 * Announces dynamic content changes to screen readers
 */
export function ScreenReaderAnnouncer({
  message,
  politeness = 'polite',
  clearAfter = 1000,
}: ScreenReaderAnnouncerProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!message || !regionRef.current) return;

    // Set the message
    regionRef.current.textContent = message;

    // Clear after delay
    const timer = setTimeout(() => {
      if (regionRef.current) {
        regionRef.current.textContent = '';
      }
    }, clearAfter);

    return () => clearTimeout(timer);
  }, [message, clearAfter]);

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    />
  );
}

/**
 * Global screen reader announcer utility
 * Use this to announce messages from anywhere in the app
 */
export function announceToScreenReader(
  message: string,
  politeness: 'polite' | 'assertive' = 'polite'
) {
  const liveRegion = document.getElementById('global-sr-announcer');
  if (liveRegion) {
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.textContent = message;

    // Clear after 1 second
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
}
