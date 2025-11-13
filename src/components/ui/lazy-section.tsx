import { ReactNode, useEffect, useState, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: ReactNode;
  /**
   * Fallback component to show while loading
   */
  fallback?: ReactNode;
  /**
   * Minimum height for the skeleton
   */
  skeletonHeight?: string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Root margin for intersection observer (when to start loading)
   */
  rootMargin?: string;
}

/**
 * Lazy Section Component
 * Loads content only when it enters the viewport
 * Used for progressive loading of heavy sections
 */
export function LazySection({
  children,
  fallback,
  skeletonHeight = '400px',
  className = '',
  rootMargin = '200px',
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={sectionRef} className={cn('w-full', className)}>
      {isVisible ? (
        children
      ) : (
        fallback || (
          <div className="w-full space-y-4" style={{ minHeight: skeletonHeight }}>
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-64" />
            <Skeleton className="w-full h-32" />
          </div>
        )
      )}
    </div>
  );
}
