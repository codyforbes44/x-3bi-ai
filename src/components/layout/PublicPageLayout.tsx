import { ReactNode } from 'react';
import { LAYOUT_CONFIG } from '@/config/layout-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SkipLinks } from '@/components/a11y/SkipLinks';
import { cn } from '@/lib/utils';

interface PublicPageLayoutProps {
  children: ReactNode;
  /**
   * Maximum width of content container
   */
  maxWidth?: keyof typeof LAYOUT_CONFIG.maxWidth | '7xl';
  /**
   * Vertical padding
   */
  padding?: keyof typeof LAYOUT_CONFIG.padding;
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
 * Public Page Layout
 * Simple layout for public marketing pages
 * No authentication required
 */
export function PublicPageLayout({
  children,
  maxWidth = '2xl',
  padding = 'standard',
  className = '',
  showFooter = true,
}: PublicPageLayoutProps) {
  const maxWidthClass = maxWidth === '7xl' ? 'max-w-7xl' : LAYOUT_CONFIG.maxWidth[maxWidth];
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
          {children}
        </div>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
