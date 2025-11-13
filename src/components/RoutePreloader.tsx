import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Preload routes based on likely user navigation
 */
export const RoutePreloader = () => {
  const location = useLocation();

  useEffect(() => {
    const preloadRoutes = () => {
      // Preload common next steps based on current route
      const preloadMap: Record<string, string[]> = {
        '/': ['/auth', '/dashboard', '/pricing'],
        '/auth': ['/dashboard'],
        '/dashboard': ['/grok', '/profile', '/workspaces'],
        '/pricing': ['/auth', '/enterprise'],
      };

      const routesToPreload = preloadMap[location.pathname] || [];

      routesToPreload.forEach((route) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    };

    // Preload after a short delay to not interfere with current page load
    const timer = setTimeout(preloadRoutes, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};
