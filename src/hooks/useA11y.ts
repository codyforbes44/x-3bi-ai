import { useEffect, useCallback, useState } from 'react';
import { A11Y_CONFIG } from '@/config/a11y-config';

/**
 * Accessibility utilities hook
 * Provides common a11y functions and state
 */
export function useA11y() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Detect user preferences
  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);

    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(contrastQuery.matches);

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  /**
   * Announce message to screen readers
   */
  const announce = useCallback((
    message: string,
    politeness: 'polite' | 'assertive' = 'polite'
  ) => {
    const liveRegion = document.getElementById('global-sr-announcer');
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', politeness);
      liveRegion.textContent = message;

      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }, []);

  /**
   * Focus element by ID
   */
  const focusElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      // Scroll into view if needed
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  /**
   * Get first focusable element in container
   */
  const getFirstFocusable = useCallback((container: HTMLElement): HTMLElement | null => {
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return container.querySelector(focusableSelector);
  }, []);

  /**
   * Get all focusable elements in container
   */
  const getAllFocusable = useCallback((container: HTMLElement): HTMLElement[] => {
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(focusableSelector));
  }, []);

  /**
   * Set page title (announced by screen readers)
   */
  const setPageTitle = useCallback((title: string) => {
    document.title = title;
    announce(`Page: ${title}`, 'polite');
  }, [announce]);

  /**
   * Check if element is in viewport
   */
  const isInViewport = useCallback((element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, []);

  /**
   * Get animation duration based on reduced motion preference
   */
  const getAnimationDuration = useCallback((defaultDuration: number): number => {
    return reducedMotion ? 0 : defaultDuration;
  }, [reducedMotion]);

  return {
    // State
    reducedMotion,
    highContrast,
    
    // Methods
    announce,
    focusElement,
    getFirstFocusable,
    getAllFocusable,
    setPageTitle,
    isInViewport,
    getAnimationDuration,
    
    // Config
    config: A11Y_CONFIG,
  };
}

/**
 * Hook to manage focus trap
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector)
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, enabled]);
}
