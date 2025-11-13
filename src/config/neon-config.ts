/**
 * Neon Design System Configuration
 * Centralized configuration for neon colors, gradients, and mappings
 */

export type NeonVariant = 'pink' | 'cyan' | 'purple' | 'blue' | 'mixed';
export type FeatureCategory = 'enterprise' | 'advanced-ai' | 'ai-tools' | 'utilities';

/**
 * Maps feature categories to neon color variants
 */
export const CATEGORY_NEON_MAP: Record<FeatureCategory, NeonVariant> = {
  'enterprise': 'pink',      // Workspaces, Analytics, Teams
  'advanced-ai': 'purple',   // Grok, Claude, Gemini, GPT
  'ai-tools': 'cyan',        // Chat, Code, Image, Voice
  'utilities': 'blue',       // Security, Webhooks, Monitoring
};

/**
 * Maps status indicators to accent dot colors
 */
export const STATUS_DOT_MAP = {
  active: 'cyan',
  favorite: 'pink',
  new: 'purple',
  verified: 'blue',
} as const;

/**
 * Neon color classes for text
 */
export const NEON_TEXT_CLASSES: Record<NeonVariant, string> = {
  pink: 'text-pink-500',
  cyan: 'text-cyan-400',
  purple: 'text-purple-500',
  blue: 'text-blue-500',
  mixed: 'bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent',
};

/**
 * Category icons color classes
 */
export const CATEGORY_ICON_COLORS: Record<FeatureCategory, string> = {
  'enterprise': 'text-pink-500',
  'advanced-ai': 'text-purple-500',
  'ai-tools': 'text-cyan-400',
  'utilities': 'text-blue-500',
};

/**
 * Category label display names
 */
export const CATEGORY_LABELS: Record<FeatureCategory, string> = {
  'enterprise': 'Enterprise',
  'advanced-ai': 'Advanced AI',
  'ai-tools': 'AI Tools',
  'utilities': 'Utilities',
};

/**
 * Get bento grid span configuration based on index
 */
export function getBentoSpan(index: number, total: number) {
  // First item takes more space
  if (index === 0 && total > 3) {
    return {
      tablet: 'md:col-span-2' as const,
      desktop: 'lg:col-span-2' as const,
    };
  }
  
  // Every 5th item (for visual variety)
  if ((index + 1) % 5 === 0) {
    return {
      desktop: 'lg:col-span-2' as const,
    };
  }
  
  return undefined;
}
