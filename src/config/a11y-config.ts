/**
 * Accessibility Configuration
 * Centralized accessibility settings and keyboard shortcuts
 */

export const A11Y_CONFIG = {
  /**
   * Keyboard shortcuts configuration
   */
  shortcuts: {
    // Navigation
    openCommandPalette: { key: 'k', meta: true, description: 'Open command palette' },
    openSearch: { key: '/', description: 'Focus search' },
    goToDashboard: { key: 'd', shift: true, description: 'Go to dashboard' },
    goToHome: { key: 'h', shift: true, description: 'Go to home' },
    
    // Accessibility
    showKeyboardShortcuts: { key: '?', description: 'Show keyboard shortcuts' },
    toggleAccessibilityMenu: { key: 'a', meta: true, shift: true, description: 'Toggle accessibility menu' },
    skipToContent: { key: 's', description: 'Skip to main content' },
    
    // UI Controls
    toggleSidebar: { key: 'b', meta: true, description: 'Toggle sidebar' },
    toggleTheme: { key: 't', meta: true, description: 'Toggle theme' },
    closeModal: { key: 'Escape', description: 'Close modal/dialog' },
    
    // Chat/AI
    focusChatInput: { key: 'c', shift: true, description: 'Focus chat input' },
    submitChat: { key: 'Enter', meta: true, description: 'Submit chat message' },
    
    // General
    undo: { key: 'z', meta: true, description: 'Undo' },
    redo: { key: 'z', meta: true, shift: true, description: 'Redo' },
  },

  /**
   * Skip links configuration
   */
  skipLinks: [
    { id: 'main-content', label: 'Skip to main content' },
    { id: 'navigation', label: 'Skip to navigation' },
    { id: 'footer', label: 'Skip to footer' },
    { id: 'search', label: 'Skip to search' },
  ],

  /**
   * ARIA live region politeness levels
   */
  liveRegion: {
    polite: 'polite',
    assertive: 'assertive',
    off: 'off',
  },

  /**
   * Focus trap configuration
   */
  focusTrap: {
    returnFocusOnDeactivate: true,
    allowOutsideClick: false,
    escapeDeactivates: true,
    initialFocus: undefined, // Auto-focus first element
  },

  /**
   * Minimum touch target sizes (WCAG 2.5.5 Level AAA)
   */
  touchTarget: {
    minWidth: '44px',
    minHeight: '44px',
    spacing: '8px', // Minimum spacing between touch targets
  },

  /**
   * Animation preferences
   */
  animation: {
    respectReducedMotion: true,
    defaultDuration: '200ms',
    reducedDuration: '0ms',
  },

  /**
   * Screen reader text utilities
   */
  srOnly: 'sr-only',
  notSrOnly: 'not-sr-only',

  /**
   * Focus visible styles
   */
  focusVisible: {
    outline: '2px solid hsl(var(--ring))',
    outlineOffset: '2px',
  },

  /**
   * Contrast ratios (WCAG 2.1 Level AA)
   */
  contrast: {
    normalText: 4.5,      // Minimum for normal text
    largeText: 3,         // Minimum for large text (18pt+)
    uiComponents: 3,      // Minimum for UI components
    enhanced: 7,          // AAA level for normal text
  },

  /**
   * Landmark roles for better navigation
   */
  landmarks: {
    banner: 'banner',       // Site header
    navigation: 'navigation',
    main: 'main',
    complementary: 'complementary',
    contentinfo: 'contentinfo', // Footer
    search: 'search',
    form: 'form',
  },
} as const;

/**
 * Helper function to format keyboard shortcut
 */
export function formatShortcut(shortcut: typeof A11Y_CONFIG.shortcuts[keyof typeof A11Y_CONFIG.shortcuts]): string {
  const parts: string[] = [];
  
  if ('meta' in shortcut && shortcut.meta) parts.push('⌘');
  if ('shift' in shortcut && shortcut.shift) parts.push('⇧');
  if ('alt' in shortcut && shortcut.alt) parts.push('⌥');
  if ('ctrl' in shortcut && shortcut.ctrl) parts.push('Ctrl');
  
  parts.push(shortcut.key.toUpperCase());
  
  return parts.join(' + ');
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on user preference
 */
export function getAnimationDuration(): string {
  return prefersReducedMotion() 
    ? A11Y_CONFIG.animation.reducedDuration 
    : A11Y_CONFIG.animation.defaultDuration;
}
