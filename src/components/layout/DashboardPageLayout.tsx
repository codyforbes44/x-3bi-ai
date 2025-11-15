import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LAYOUT_CONFIG } from '@/config/layout-config';
import { useAuth } from '@/contexts/AuthContext';
import { SkipLinks } from '@/components/a11y/SkipLinks';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { cn } from '@/lib/utils';

interface DashboardPageLayoutProps {
  children: ReactNode;
  /**
   * Page title
   */
  title?: string;
  /**
   * Page description
   */
  description?: string;
  /**
   * Show breadcrumbs
   */
  showBreadcrumbs?: boolean;
  /**
   * Actions to display in header
   */
  headerActions?: ReactNode;
  /**
   * Custom className for content area
   */
  className?: string;
}

/**
 * Dashboard Page Layout
 * Layout for dashboard feature pages with consistent header and spacing
 * Requires authentication
 */
export function DashboardPageLayout({
  children,
  title,
  description,
  showBreadcrumbs = true,
  headerActions,
  className = '',
}: DashboardPageLayoutProps) {
  const { user, loading } = useAuth();

  const horizontalPadding = LAYOUT_CONFIG.horizontalPadding.combined;
  const paddingClass = LAYOUT_CONFIG.padding.standard;

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
    <div className="min-h-screen bg-background">
      <SkipLinks />

      <main
        id="main-content"
        className={cn('min-h-screen', className)}
        tabIndex={-1}
      >
        <div className={cn('max-w-7xl mx-auto', horizontalPadding, paddingClass)}>
          {showBreadcrumbs && (
            <div className="mb-6">
              <Breadcrumbs showHome={true} />
            </div>
          )}

          {(title || description || headerActions) && (
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {title && (
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
                {headerActions && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {headerActions}
                  </div>
                )}
              </div>
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  );
}
