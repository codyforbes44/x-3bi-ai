import { ReactNode } from 'react';
import { LAYOUT_CONFIG } from '@/config/layout-config';
import { SkipLinks } from '@/components/a11y/SkipLinks';
import { cn } from '@/lib/utils';

interface MinimalPageLayoutProps {
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
   * Custom className for content area
   */
  className?: string;
  /**
   * Center content vertically
   */
  centerVertically?: boolean;
}

/**
 * Minimal Page Layout
 * Bare layout with no header/footer
 * Used for auth pages, error pages, etc.
 */
export function MinimalPageLayout({
  children,
  maxWidth = 'sm',
  padding = 'compact',
  className = '',
  centerVertically = true,
}: MinimalPageLayoutProps) {
  const maxWidthClass = LAYOUT_CONFIG.maxWidth[maxWidth];
  const paddingClass = LAYOUT_CONFIG.padding[padding];
  const horizontalPadding = LAYOUT_CONFIG.horizontalPadding.combined;

  return (
    <div
      className={cn(
        'min-h-screen bg-background',
        centerVertically && 'flex items-center justify-center'
      )}
    >
      <SkipLinks />

      <main
        id="main-content"
        className={cn(
          'w-full',
          maxWidthClass,
          horizontalPadding,
          paddingClass,
          centerVertically ? '' : 'py-12',
          centerVertically ? 'mx-auto' : 'mx-auto',
          className
        )}
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}
