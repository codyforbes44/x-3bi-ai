import { useState, useEffect } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Optimized image component with WebP/AVIF support and lazy loading
 */
export function OptimizedImage({ 
  src, 
  alt, 
  fallback = '/placeholder.svg',
  loading = 'lazy',
  className,
  ...props 
}: ImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallback);
    }
  };

  // Generate srcSet with WebP and AVIF variants if possible
  const getSrcSet = () => {
    if (src.startsWith('data:') || src.startsWith('blob:')) {
      return undefined;
    }

    const baseSrc = src.replace(/\.(jpg|jpeg|png)$/i, '');
    const ext = src.match(/\.(jpg|jpeg|png)$/i)?.[0];
    
    if (!ext) return undefined;

    // For production, you'd have actual WebP/AVIF files
    // This is a placeholder implementation
    return `${baseSrc}.webp 1x, ${baseSrc}@2x.webp 2x`;
  };

  return (
    <picture>
      {/* AVIF support (best compression) */}
      {!src.startsWith('data:') && !src.startsWith('blob:') && (
        <>
          <source
            type="image/avif"
            srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.avif')}
          />
          <source
            type="image/webp"
            srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
          />
        </>
      )}
      
      {/* Fallback to original format */}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        className={className}
        {...props}
      />
    </picture>
  );
}
