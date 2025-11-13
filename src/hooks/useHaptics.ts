import { useCallback } from 'react';

/**
 * Haptic feedback patterns for different interactions
 */
export function useHaptics() {
  const vibrate = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        // Vibration API not supported or failed
        console.debug('Haptic feedback not available');
      }
    }
  }, []);
  
  return {
    vibrate,
    // Light tap - quick feedback for touches
    light: () => vibrate(10),
    // Medium - button presses
    medium: () => vibrate(20),
    // Heavy - important actions
    heavy: () => vibrate([10, 50, 10]),
    // Error - failed action
    error: () => vibrate([50, 100, 50]),
    // Success - successful completion
    success: () => vibrate([10, 20, 10, 20, 30]),
    // Warning - cautionary feedback
    warning: () => vibrate([30, 50, 30]),
  };
}
