import { ReactNode } from 'react';
import { LAYOUT_CONFIG } from '@/config/layout-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SkipLinks } from '@/components/a11y/SkipLinks';
import { cn } from '@/lib/utils';

interface StandardPageLayoutProps {
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
  /**
   * Show footer
   */
  showFooter?: boolean;
}

/**
 * Standard Page Layout
 * Default layout for public pages with header and footer
 */
export function StandardPageLayout({
  children,
  maxWidth = '2xl',
  padding = 'standard',
  showBreadcrumbs = false,
  showBackButton = false,
  className = '',
  showFooter = true,
}: StandardPageLayoutProps) {
  const maxWidthClass = LAYOUT_CONFIG.maxWidth[maxWidth];
  const paddingClass = LAYOUT_CONFIG.padding[padding];
  const horizontalPadding = LAYOUT_CONFIG.horizontalPadding.combined;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLinks />
      <Header />

      <main
        id="main-content"
        className={cn(
          'flex-1',
          'pt-14 md:pt-16', // Account for fixed header
          showFooter ? 'pb-16 md:pb-0' : '', // Account for mobile bottom nav
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

      {showFooter && <Footer />}
    </div>
  );
}
