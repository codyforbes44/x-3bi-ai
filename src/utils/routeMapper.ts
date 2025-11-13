/**
 * Centralized routing configuration
 * Maps feature IDs to their actual routes
 */

export const ROUTE_MAP = {
  // AI Features (accessible via dashboard tabs)
  chat: '/dashboard?tab=chat',
  image: '/dashboard?tab=image',
  code: '/dashboard?tab=code',
  voice: '/dashboard?tab=voice',
  video: '/dashboard?tab=video-gen',
  enhance: '/dashboard?tab=image-enhance',
  summary: '/dashboard?tab=summarizer',
  
  // Standalone pages
  grok: '/grok',
  dashboard: '/dashboard',
  workflows: '/workflow-automation',
  team: '/team-collaboration',
  security: '/security-compliance',
  settings: '/settings',
  profile: '/profile',
} as const;

// Legacy route redirects for backward compatibility
export const LEGACY_ROUTES = {
  '/ai-chat': '/dashboard?tab=chat',
  '/ai-image': '/dashboard?tab=image',
  '/ai-code': '/dashboard?tab=code',
  '/ai-voice': '/dashboard?tab=voice',
  '/ai-video': '/dashboard?tab=video-gen',
  '/ai-enhance': '/dashboard?tab=image-enhance',
  '/ai-summary': '/dashboard?tab=summarizer',
} as const;

/**
 * Get the route for a feature ID
 */
export function getFeatureRoute(featureId: string): string {
  return ROUTE_MAP[featureId as keyof typeof ROUTE_MAP] || '/dashboard';
}

/**
 * Check if a route is active based on current location
 */
export function isRouteActive(currentPath: string, currentSearch: string, targetRoute: string): boolean {
  // Handle dashboard tab routes
  if (targetRoute.includes('?tab=')) {
    const [path, query] = targetRoute.split('?');
    const tabMatch = query.match(/tab=([^&]+)/);
    const currentTabMatch = currentSearch.match(/tab=([^&]+)/);
    
    return currentPath === path && tabMatch && currentTabMatch && tabMatch[1] === currentTabMatch[1];
  }
  
  // Handle exact path matches
  return currentPath === targetRoute;
}

/**
 * Extract active tab from URL search params
 */
export function getActiveTab(search: string): string | null {
  const params = new URLSearchParams(search);
  return params.get('tab');
}
