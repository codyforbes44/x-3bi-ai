import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { prefetchOnIdle, preconnect, dnsPrefetch } from '@/utils/prefetch';

/**
 * Enhanced Route Preloader
 * Intelligently prefetches routes based on likely user navigation
 * Uses requestIdleCallback for non-blocking prefetch
 */
export const RoutePreloader = () => {
  const location = useLocation();

  useEffect(() => {
    // Preload common next steps based on current route
    const preloadMap: Record<string, { routes: string[]; priority: 'high' | 'medium' | 'low' }> = {
      '/': {
        routes: ['/auth', '/dashboard', '/pricing', '/grok'],
        priority: 'high',
      },
      '/auth': {
        routes: ['/dashboard', '/profile'],
        priority: 'high',
      },
      '/dashboard': {
        routes: ['/grok', '/profile', '/workspaces', '/analytics'],
        priority: 'medium',
      },
      '/pricing': {
        routes: ['/auth', '/enterprise', '/contact'],
        priority: 'medium',
      },
      '/grok': {
        routes: ['/dashboard', '/profile'],
        priority: 'low',
      },
    };

    const config = preloadMap[location.pathname];
    if (config) {
      prefetchOnIdle(config.routes, config.priority);
    }

    // Preconnect to critical domains
    if (location.pathname === '/') {
      preconnect('https://jmazzsxnatfewblgpxfq.supabase.co');
      dnsPrefetch('https://fonts.googleapis.com');
      dnsPrefetch('https://fonts.gstatic.com');
    }
  }, [location.pathname]);

  return null;
};
