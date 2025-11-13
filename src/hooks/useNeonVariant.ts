import { useMemo } from 'react';

type NeonVariant = 'pink' | 'cyan' | 'purple' | 'blue' | 'mixed';
type FeatureCategory = 'enterprise' | 'advanced-ai' | 'ai-tools' | 'utilities';

const CATEGORY_NEON_MAP: Record<FeatureCategory, NeonVariant> = {
  'advanced-ai': 'purple',
  'ai-tools': 'cyan',
  enterprise: 'pink',
  utilities: 'blue',
};

/**
 * Hook to determine neon variant based on feature category
 */
export function useNeonVariant(category: FeatureCategory): NeonVariant {
  return useMemo(() => CATEGORY_NEON_MAP[category], [category]);
}

/**
 * Get neon variant for a feature ID based on its category
 */
export function getNeonVariantForFeature(featureId: string): NeonVariant {
  // Map common feature prefixes to categories
  if (featureId.includes('grok') || featureId.includes('claude') || featureId.includes('gemini')) {
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
