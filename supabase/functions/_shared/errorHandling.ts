/**
 * Centralized error handling for edge functions
 */

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string, details?: unknown) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends APIError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends APIError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

/**
 * Log error with context - keeps logging minimal for production
 * Only logs error name and message, not full stack traces (visible in Edge Function logs)
 */
export function logError(error: unknown, context?: string): void {
  const prefix = context ? `[${context}]` : '';
  
  if (error instanceof Error) {
    // Only log essential info - stack traces are verbose
    console.error(`${prefix} ${error.name}: ${error.message}`);
  } else {
    console.error(`${prefix} Error:`, String(error));
  }
}

/**
 * Extract status code from error
 */
export function getErrorStatus(error: unknown): number {
  if (error instanceof APIError) {
    return error.statusCode;
  }
  return 500;
}

/**
 * Extract error message for response
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

/**
 * Create error response object
 */
export function createErrorObject(error: unknown): {
  error: string;
  details?: unknown;
} {
  const result: any = {
    error: getErrorMessage(error)
  };

  if (error instanceof APIError && error.details) {
    result.details = error.details;
  }

  return result;
}