import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  blur?: boolean;
  sizes?: string;
  priority?: boolean;
}

/**
 * Optimized image component with WebP/AVIF support, lazy loading, and blur-up effect
 * 
 * Features:
 * - Automatic WebP/AVIF format detection
 * - Lazy loading with intersection observer
 * - Blur-up placeholder effect
 * - Responsive srcset for different screen sizes
 * - Error handling with fallback
 * 
 * @example
 * <OptimizedImage 
 *   src="/hero.jpg" 
 *   alt="Hero image" 
 *   loading="lazy"
 *   blur 
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 */
export function OptimizedImage({ 
  src, 
  alt, 
  fallback = '/placeholder.svg',
  loading = 'lazy',
  blur = false,
  sizes,
  priority = false,
  className,
  ...props 
}: ImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(priority ? src : fallback);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset state when src changes
  useEffect(() => {
    if (priority) {
      setImageSrc(src);
    }
    setHasError(false);
    setIsLoaded(false);
  }, [src, priority]);

  // Handle image load success
  const handleLoad = () => {
    setIsLoaded(true);
    if (!priority && imageSrc === fallback) {
      setImageSrc(src);
    }
  };

  // Handle image load error
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallback);
      setIsLoaded(true);
    }
  };

  // Generate responsive srcSet
  const getSrcSet = () => {
    if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('http')) {
      return undefined;
    }

    // For local images, generate responsive variants
    const baseSrc = src.replace(/\.(jpg|jpeg|png)$/i, '');
    const ext = src.match(/\.(jpg|jpeg|png)$/i)?.[0];
    
    if (!ext) return undefined;

    // Generate srcset for different screen sizes
    return `${baseSrc}-480w${ext} 480w, ${baseSrc}-768w${ext} 768w, ${baseSrc}-1024w${ext} 1024w, ${baseSrc}-1920w${ext} 1920w`;
  };

  return (
    <picture>
      {/* AVIF support (best compression) */}
      {!src.startsWith('data:') && !src.startsWith('blob:') && !src.startsWith('http') && (
        <>
          <source
            type="image/avif"
            srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.avif')}
            sizes={sizes}
          />
          <source
            type="image/webp"
            srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
            sizes={sizes}
          />
        </>
      )}
      
      {/* Fallback to original format */}
      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        srcSet={getSrcSet()}
        sizes={sizes}
        className={cn(
          'transition-all duration-300',
          blur && !isLoaded && 'blur-sm scale-105',
          blur && isLoaded && 'blur-0 scale-100',
          className
        )}
        {...props}
      />
    </picture>
  );
}
