import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  mobileColumns?: 1 | 2;
  tabletColumns?: 2 | 3 | 4;
  desktopColumns?: 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * Responsive grid that adapts to device size
 * Mobile-first approach with sensible defaults
 */
export function ResponsiveGrid({
  children,
  className,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  gap = 'md'
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };
  
  return (
    <div 
      className={cn(
        "grid",
        gapClasses[gap],
        `grid-cols-${mobileColumns}`,
        `md:grid-cols-${tabletColumns}`,
        `lg:grid-cols-${desktopColumns}`,
        className
      )}
    >
      {children}
    </div>
  );
}
