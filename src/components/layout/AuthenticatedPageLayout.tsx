import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LAYOUT_CONFIG } from '@/config/layout-config';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { SkipLinks } from '@/components/a11y/SkipLinks';
import { cn } from '@/lib/utils';

interface AuthenticatedPageLayoutProps {
  children: ReactNode;
  /**
   * Maximum width of content container
   */
  maxWidth?: keyof typeof LAYOUT_CONFIG.maxWidth;
  /**
   * Vertical padding
   */
  padding?: keyof typeof LAYOUT_CONFIG.padding;
  /**
   * Show breadcrumbs
   */
  showBreadcrumbs?: boolean;
  /**
   * Show back button
   */
  showBackButton?: boolean;
  /**
   * Custom className for content area
   */
  className?: string;
}

/**
 * Authenticated Page Layout
 * Layout for protected pages requiring authentication
 * Redirects to /auth if user is not logged in
 */
export function AuthenticatedPageLayout({
  children,
  maxWidth = '2xl',
  padding = 'standard',
  showBreadcrumbs = true,
  showBackButton = false,
  className = '',
}: AuthenticatedPageLayoutProps) {
  const { user, loading } = useAuth();

  const maxWidthClass = LAYOUT_CONFIG.maxWidth[maxWidth];
  const paddingClass = LAYOUT_CONFIG.padding[padding];
  const horizontalPadding = LAYOUT_CONFIG.horizontalPadding.combined;

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLinks />
      <Header />

      <main
        id="main-content"
        className={cn(
          'flex-1',
          'pt-14 md:pt-16', // Account for fixed header
          'pb-16 md:pb-0', // Account for mobile bottom nav
          className
        )}
        tabIndex={-1}
      >
        <div className={cn(maxWidthClass, horizontalPadding, paddingClass, 'mx-auto')}>
          {/* TODO: Add Breadcrumbs component when Phase 2 is complete */}
          {showBreadcrumbs && (
            <div className="mb-6">
              {/* <Breadcrumbs /> */}
            </div>
          )}

          {/* TODO: Add BackButton component when Phase 2 is complete */}
          {showBackButton && (
            <div className="mb-4">
              {/* <BackButton /> */}
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  );
}
