/**
 * Performance monitoring utilities
 */

interface PerformanceMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.observeWebVitals();
    }
  }

  private observeWebVitals() {
    // Observe Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      this.metrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
      this.reportMetric('LCP', this.metrics.LCP);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Observe First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstInput = entries[0] as any;
      this.metrics.FID = firstInput.processingStart - firstInput.startTime;
      this.reportMetric('FID', this.metrics.FID);
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Observe Cumulative Layout Shift
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      }
      this.metrics.CLS = clsScore;
      this.reportMetric('CLS', clsScore);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Get First Contentful Paint and TTFB from navigation timing
    if (typeof window !== 'undefined' && window.performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.FCP = fcpEntry.startTime;
        this.reportMetric('FCP', this.metrics.FCP);
      }

      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry) {
        this.metrics.TTFB = navEntry.responseStart - navEntry.requestStart;
        this.reportMetric('TTFB', this.metrics.TTFB);
      }
    }
  }

  private reportMetric(name: string, value: number) {
    console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
    
    // You can send to analytics service here
    // Example: analytics.track('performance', { metric: name, value });
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  measureComponentRender(componentName: string) {
    const start = performance.now();
    
    return () => {
      const duration = performance.now() - start;
      console.log(`[Performance] ${componentName} render: ${duration.toFixed(2)}ms`);
    };
  }

  measureAsyncOperation(operationName: string) {
    const start = performance.now();
    
    return () => {
      const duration = performance.now() - start;
      console.log(`[Performance] ${operationName}: ${duration.toFixed(2)}ms`);
      return duration;
    };
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * React hook for component performance monitoring
 */
export function usePerformanceMonitor(componentName: string) {
  const end = performanceMonitor.measureComponentRender(componentName);
  
  return {
    end,
    measureAsync: (operationName: string) => 
      performanceMonitor.measureAsyncOperation(`${componentName}.${operationName}`),
  };
}

/**
 * Chunk large arrays for processing
 */
export function* chunkArray<T>(array: T[], chunkSize: number): Generator<T[]> {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
