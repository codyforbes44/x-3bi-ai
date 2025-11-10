/**
 * Edge Function Caching Utilities
 * Provides response caching, cache headers, and cache invalidation
 */

export interface CacheOptions {
  maxAge?: number; // Cache duration in seconds
  sMaxAge?: number; // CDN cache duration in seconds
  staleWhileRevalidate?: number; // Serve stale content while revalidating
  public?: boolean; // Public vs private cache
}

/**
 * Create cache headers for response
 */
export function createCacheHeaders(options: CacheOptions = {}): Headers {
  const {
    maxAge = 300, // 5 minutes default
    sMaxAge = 600, // 10 minutes CDN default
    staleWhileRevalidate = 60,
    public: isPublic = true,
  } = options;

  const headers = new Headers();
  
  const directives = [
    isPublic ? 'public' : 'private',
    `max-age=${maxAge}`,
    `s-maxage=${sMaxAge}`,
    `stale-while-revalidate=${staleWhileRevalidate}`,
  ];

  headers.set('Cache-Control', directives.join(', '));
  headers.set('Vary', 'Accept-Encoding, Authorization');
  
  return headers;
}

/**
 * Create no-cache headers for sensitive data
 */
export function createNoCacheHeaders(): Headers {
  const headers = new Headers();
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');
  return headers;
}

/**
 * Simple in-memory cache for edge functions
 */
class MemoryCache {
  private cache: Map<string, { data: any; expires: number }> = new Map();

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  set(key: string, data: any, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      expires: Date.now() + (ttlSeconds * 1000),
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new MemoryCache();

/**
 * Generate cache key from request
 */
export function generateCacheKey(req: Request, ...params: string[]): string {
  const url = new URL(req.url);
  const path = url.pathname;
  const query = url.search;
  const auth = req.headers.get('Authorization') || 'anonymous';
  
  // Create a simple hash of the auth header for privacy
  const authHash = auth === 'anonymous' ? 'anon' : 
    btoa(auth).substring(0, 16);
  
  return `${path}${query}:${authHash}:${params.join(':')}`;
}

/**
 * Cached fetch wrapper
 */
export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  const cached = cache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  const data = await fetchFn();
  cache.set(key, data, ttlSeconds);
  return data;
}

/**
 * Merge headers
 */
export function mergeHeaders(...headerSets: (Headers | HeadersInit)[]): Headers {
  const merged = new Headers();
  
  for (const headerSet of headerSets) {
    const headers = headerSet instanceof Headers ? headerSet : new Headers(headerSet);
    headers.forEach((value, key) => {
      merged.set(key, value);
    });
  }
  
  return merged;
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => cache.cleanup(), 5 * 60 * 1000);
}
