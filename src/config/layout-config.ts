/**
 * Layout Configuration
 * Centralized layout standards for consistent spacing, padding, and max-widths
 */

export const LAYOUT_CONFIG = {
  /**
   * Container max-widths
   */
  maxWidth: {
    xs: 'max-w-2xl',      // 672px - Narrow content (articles, forms)
    sm: 'max-w-3xl',      // 768px - Small content
    md: 'max-w-4xl',      // 896px - Medium content
    lg: 'max-w-5xl',      // 1024px - Large content
    xl: 'max-w-6xl',      // 1152px - Extra large content
    '2xl': 'max-w-7xl',   // 1280px - Dashboard, wide layouts
    full: 'max-w-full',   // No restriction
  },

  /**
   * Vertical padding for page sections
   */
  padding: {
    compact: 'py-8 md:py-12',      // Tight spacing
    standard: 'py-12 md:py-16',    // Default spacing
    relaxed: 'py-16 md:py-24',     // Generous spacing
    hero: 'py-20 md:py-32',        // Hero sections
  },

  /**
   * Horizontal padding for containers
   */
  horizontalPadding: {
    mobile: 'px-4',                // Mobile (16px)
    tablet: 'md:px-6',             // Tablet (24px)
    desktop: 'lg:px-8',            // Desktop (32px)
    combined: 'px-4 md:px-6 lg:px-8', // Responsive
  },

  /**
   * Page header heights (for scroll offset)
   */
  headerHeight: {
    mobile: '56px',  // 3.5rem (h-14)
    desktop: '64px', // 4rem (h-16)
  },

  /**
   * Footer heights
   */
  footerHeight: {
    mobile: '64px',  // For bottom nav
    desktop: 'auto',
  },

  /**
   * Spacing between sections
   */
  sectionGap: {
    tight: 'space-y-8',
    standard: 'space-y-12',
    relaxed: 'space-y-16',
    loose: 'space-y-24',
  },

  /**
   * Grid configurations
   */
  grid: {
    twoColumn: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    threeColumn: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    fourColumn: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    autoFit: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  },

  /**
   * Z-index layers
   */
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    modal: 30,
    overlay: 40,
    toast: 50,
  },
} as const;

/**
 * Layout variant configurations
 */
export const LAYOUT_VARIANTS = {
  public: {
    showHeader: true,
    showFooter: true,
    showBreadcrumbs: false,
    showBackButton: false,
    requireAuth: false,
    maxWidth: LAYOUT_CONFIG.maxWidth['2xl'],
    padding: LAYOUT_CONFIG.padding.standard,
  },
  authenticated: {
    showHeader: true,
    showFooter: false,
    showBreadcrumbs: true,
    showBackButton: false,
    requireAuth: true,
    maxWidth: LAYOUT_CONFIG.maxWidth['2xl'],
    padding: LAYOUT_CONFIG.padding.standard,
  },
  minimal: {
    showHeader: false,
    showFooter: false,
    showBreadcrumbs: false,
    showBackButton: false,
    requireAuth: false,
    maxWidth: LAYOUT_CONFIG.maxWidth.sm,
    padding: LAYOUT_CONFIG.padding.compact,
  },
  dashboard: {
    showHeader: false, // Uses custom dashboard header
    showFooter: false,
    showBreadcrumbs: true,
    showBackButton: false,
    requireAuth: true,
    maxWidth: LAYOUT_CONFIG.maxWidth.full,
    padding: LAYOUT_CONFIG.padding.compact,
  },
} as const;

export type LayoutVariant = keyof typeof LAYOUT_VARIANTS;
export type MaxWidth = keyof typeof LAYOUT_CONFIG.maxWidth;
export type Padding = keyof typeof LAYOUT_CONFIG.padding;
