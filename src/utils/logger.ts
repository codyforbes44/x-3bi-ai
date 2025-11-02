/**
 * Safe logging utility that sanitizes sensitive data and respects environment
 */

const isDevelopment = import.meta.env.DEV;

/**
 * Sanitize error objects to remove sensitive data
 */
function sanitizeError(error: any): any {
  if (!error) return error;
  
  // If it's a string, return as is
  if (typeof error === 'string') return error;
  
  // For error objects, only return safe properties
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      // Don't include stack trace in production
      ...(isDevelopment && { stack: error.stack })
    };
  }
  
  // For other objects, try to sanitize
  if (typeof error === 'object') {
    const sanitized: any = {};
    const safeKeys = ['message', 'status', 'statusText', 'code', 'type'];
    
    for (const key of safeKeys) {
      if (key in error) {
        sanitized[key] = error[key];
      }
    }
    
    return sanitized;
  }
  
  return error;
}

/**
 * Log error - only in development or to error tracking service in production
 */
export function logError(message: string, error?: any): void {
  if (isDevelopment) {
    console.error(message, error);
  } else {
    // In production, only log to external service (Sentry is already configured)
    // Don't log to console to avoid exposing sensitive data
    const sanitized = sanitizeError(error);
    // Sentry will automatically capture errors
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        tags: { message }
      });
    }
  }
}

/**
 * Log info - only in development
 */
export function logInfo(message: string, data?: any): void {
  if (isDevelopment) {
    console.log(message, data);
  }
}

/**
 * Log warning - only in development
 */
export function logWarning(message: string, data?: any): void {
  if (isDevelopment) {
    console.warn(message, data);
  }
}

/**
 * Safe logger for development debugging
 */
export const logger = {
  error: logError,
  info: logInfo,
  warn: logWarning,
  dev: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[DEV] ${message}`, data);
    }
  }
};
