import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  /**
   * Variant determines the skeleton pattern
   */
  variant?: 'card' | 'list' | 'text' | 'avatar' | 'table' | 'custom';
  /**
   * Number of skeleton items to render
   */
  count?: number;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Skeleton Loader Component
 * Reusable loading state patterns for various content types
 */
export function SkeletonLoader({
  variant = 'card',
  count = 1,
  className,
}: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={cn("rounded-lg border bg-card p-6 space-y-4", className)}>
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-full" />
            <div className="h-3 bg-muted rounded animate-pulse w-5/6" />
            <div className="flex gap-2 mt-4">
              <div className="h-9 bg-muted rounded animate-pulse w-20" />
              <div className="h-9 bg-muted rounded animate-pulse w-24" />
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={cn("flex items-center gap-4 p-4 rounded-lg", className)}>
            <div className="h-12 w-12 bg-muted rounded-full animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={cn("space-y-2", className)}>
            <div className="h-4 bg-muted rounded animate-pulse w-full" />
            <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
            <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
          </div>
        );

      case 'avatar':
        return (
          <div className={cn("flex items-center gap-3", className)}>
            <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-muted rounded animate-pulse w-24" />
              <div className="h-2 bg-muted rounded animate-pulse w-16" />
            </div>
          </div>
        );

      case 'table':
        return (
          <div className={cn("space-y-3", className)}>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className={cn("h-20 bg-muted rounded animate-pulse", className)} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {skeletons.map((i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

/**
 * Simple Skeleton for inline use
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
