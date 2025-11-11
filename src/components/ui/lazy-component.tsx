import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}

/**
 * Lazy render component that only renders children when in viewport
 */
export function LazyComponent({ 
  children, 
  fallback = <div className="min-h-[200px]" />,
  rootMargin = '100px'
}: LazyComponentProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin,
  });

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldRender(true);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {shouldRender ? children : fallback}
    </div>
  );
}
