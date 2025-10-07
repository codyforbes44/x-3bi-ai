// Design System Tokens Configuration
// This file defines all semantic color tokens used throughout the application
// NEVER use direct colors (text-white, bg-blue-500, etc.) - always use these tokens

export const semanticColors = {
  // State colors
  success: {
    DEFAULT: 'hsl(var(--success))',
    foreground: 'hsl(var(--success-foreground))',
  },
  warning: {
    DEFAULT: 'hsl(var(--warning))',
    foreground: 'hsl(var(--warning-foreground))',
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },
  
  // Brand colors
  brand: {
    purple: 'hsl(var(--primary))',
    blue: 'hsl(var(--accent))',
    green: 'hsl(var(--success))',
  },

  // Feature-specific colors (derived from semantic tokens)
  feature: {
    ai: 'hsl(var(--primary))',
    code: 'hsl(var(--accent))',
    image: 'hsl(var(--accent-glow))',
    voice: 'hsl(var(--success))',
    analytics: 'hsl(var(--primary-variant))',
  }
} as const;

// Spacing scale for consistent spacing
export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const;

// Typography scale
export const typography = {
  size: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Border radius scale
export const borderRadius = {
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  full: '9999px',
} as const;

// Shadow scale
export const shadows = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  elegant: 'var(--shadow-elegant)',
  glow: 'var(--shadow-glow)',
} as const;
