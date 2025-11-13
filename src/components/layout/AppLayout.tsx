import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AISidebar } from '@/components/ai-sidebar/AISidebar';
import { useAISidebarContext } from '@/contexts/AISidebarContext';

export function AppLayout() {
  const location = useLocation();
  const { setCurrentFeature } = useAISidebarContext();
  
  // Determine feature context based on current route
  useEffect(() => {
    const getFeatureFromRoute = (pathname: string): string | null => {
      if (pathname === '/') return 'home';
      if (pathname.includes('/dashboard')) return 'dashboard';
      if (pathname.includes('/grok')) return 'grok';
      if (pathname.includes('/analytics')) return 'analytics';
      if (pathname.includes('/memory')) return 'memory';
      if (pathname.includes('/api')) return 'api';
      if (pathname.includes('/profile')) return 'profile';
      if (pathname.includes('/workspaces')) return 'workspaces';
      if (pathname.includes('/security')) return 'security';
      return null;
    };

    setCurrentFeature(getFeatureFromRoute(location.pathname));
  }, [location.pathname, setCurrentFeature]);

  return (
    <>
      <Outlet />
      {/* Global AI Sidebar - uses context for feature detection */}
      <AISidebar />
    </>
  );
}
