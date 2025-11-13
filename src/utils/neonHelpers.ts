import { NeonVariant, FeatureCategory, CATEGORY_NEON_MAP } from '@/config/neon-config';

/**
 * Get neon variant for a feature based on its ID or category
 */
export function getNeonVariantForFeature(featureId: string, category?: FeatureCategory): NeonVariant {
  // If category is provided, use the mapping
  if (category && category in CATEGORY_NEON_MAP) {
    return CATEGORY_NEON_MAP[category];
  }
  
  // Otherwise, infer from feature ID
  if (featureId.includes('grok') || featureId.includes('claude') || featureId.includes('gemini') || featureId.includes('gpt')) {
    return 'purple';
  }
  if (featureId.includes('chat') || featureId.includes('code') || featureId.includes('image')) {
    return 'cyan';
  }
  if (featureId.includes('workspace') || featureId.includes('analytics') || featureId.includes('team')) {
    return 'pink';
  }
  return 'blue';
}

/**
 * Get accent dot color based on status
 */
export function getAccentDotColor(status: 'active' | 'favorite' | 'new' | 'verified'): 'pink' | 'cyan' | 'purple' | 'blue' {
  const map = {
    active: 'cyan',
    favorite: 'pink',
    new: 'purple',
    verified: 'blue',
  } as const;
  
  return map[status];
}

/**
 * Get neon card size based on importance/index
 */
export function getNeonCardSize(index: number, isFeatured: boolean = false): 'sm' | 'md' | 'lg' | 'xl' {
  if (isFeatured || index === 0) return 'lg';
  if (index === 1) return 'md';
  return 'md';
}
