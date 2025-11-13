/**
 * Enhanced route prefetching utilities
 */

type PrefetchPriority = 'high' | 'medium' | 'low';

interface PrefetchOptions {
  priority?: PrefetchPriority;
  as?: 'script' | 'style' | 'fetch';
}

/**
 * Prefetch a route or resource
 */
export function prefetch(href: string, options: PrefetchOptions = {}) {
  const { priority = 'low', as = 'fetch' } = options;

  // Check if already prefetched
  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = as;

  // Set fetchpriority for modern browsers
  if ('fetchPriority' in HTMLLinkElement.prototype) {
    (link as any).fetchPriority = priority;
  }

  document.head.appendChild(link);
}

/**
 * Preload critical resources
 */
export function preload(href: string, as: 'script' | 'style' | 'font' | 'image') {
  const existing = document.querySelector(`link[href="${href}"][rel="preload"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;

  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }

  document.head.appendChild(link);
}

/**
 * Prefetch routes using requestIdleCallback
 */
export function prefetchOnIdle(routes: string[], priority: PrefetchPriority = 'low') {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(
      () => {
        routes.forEach((route) => prefetch(route, { priority }));
      },
      { timeout: 2000 }
    );
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      routes.forEach((route) => prefetch(route, { priority }));
    }, 1000);
  }
}

/**
 * Preconnect to domain
 */
export function preconnect(domain: string) {
  const existing = document.querySelector(`link[href="${domain}"][rel="preconnect"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  link.crossOrigin = 'anonymous';

  document.head.appendChild(link);
}

/**
 * DNS prefetch for domain
 */
export function dnsPrefetch(domain: string) {
  const existing = document.querySelector(`link[href="${domain}"][rel="dns-prefetch"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = domain;

  document.head.appendChild(link);
}
