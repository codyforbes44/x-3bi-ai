import { useCallback } from 'react';
import { useHaptics } from './useHaptics';

interface AccessibleGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
  hapticFeedback?: boolean;
  ariaLabel?: string;
}

/**
 * Provides accessible gesture handlers with keyboard equivalents
 * Ensures all gesture interactions are accessible via keyboard
 */
export function useAccessibleGesture({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onLongPress,
  onDoubleTap,
  hapticFeedback = true,
  ariaLabel = 'Interactive element with gesture support',
}: AccessibleGestureOptions) {
  const haptics = useHaptics();
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Keyboard equivalents for gestures
    switch (e.key) {
      case 'ArrowLeft':
        if (onSwipeLeft) {
          e.preventDefault();
          if (hapticFeedback) haptics.light();
          onSwipeLeft();
        }
        break;
      case 'ArrowRight':
        if (onSwipeRight) {
          e.preventDefault();
          if (hapticFeedback) haptics.light();
          onSwipeRight();
        }
        break;
      case 'ArrowUp':
        if (onSwipeUp) {
          e.preventDefault();
          if (hapticFeedback) haptics.light();
          onSwipeUp();
        }
        break;
      case 'ArrowDown':
        if (onSwipeDown) {
          e.preventDefault();
          if (hapticFeedback) haptics.light();
          onSwipeDown();
        }
        break;
      case ' ':
      case 'Space':
        if (onLongPress) {
          e.preventDefault();
          if (hapticFeedback) haptics.medium();
          onLongPress();
        }
        break;
      case 'Enter':
        if (onDoubleTap) {
          e.preventDefault();
          if (hapticFeedback) haptics.medium();
          onDoubleTap();
        }
        break;
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onLongPress, onDoubleTap, hapticFeedback, haptics]);
  
  // Build aria-label with gesture hints
  const buildAriaLabel = useCallback(() => {
    const hints = [];
    if (onSwipeLeft) hints.push('Left arrow to navigate left');
    if (onSwipeRight) hints.push('Right arrow to navigate right');
    if (onSwipeUp) hints.push('Up arrow to scroll up');
    if (onSwipeDown) hints.push('Down arrow to scroll down');
    if (onLongPress) hints.push('Space for long press action');
    if (onDoubleTap) hints.push('Enter for double tap action');
    
    return hints.length > 0 
      ? `${ariaLabel}. ${hints.join(', ')}`
      : ariaLabel;
  }, [ariaLabel, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onLongPress, onDoubleTap]);
  
  return {
    onKeyDown: handleKeyDown,
    'aria-label': buildAriaLabel(),
    role: 'button',
    tabIndex: 0,
  };
}
