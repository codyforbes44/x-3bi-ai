/**
 * Input validation utilities for edge functions
 */

/**
 * Validate required string field
 */
export function validateString(
  value: any,
  fieldName: string,
  options: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  } = {}
): string {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    throw new Error(`${fieldName} is required`);
  }

  if (options.minLength && trimmed.length < options.minLength) {
    throw new Error(`${fieldName} must be at least ${options.minLength} characters`);
  }

  if (options.maxLength && trimmed.length > options.maxLength) {
    throw new Error(`${fieldName} must be no more than ${options.maxLength} characters`);
  }

  if (options.pattern && !options.pattern.test(trimmed)) {
    throw new Error(`${fieldName} format is invalid`);
  }

  return trimmed;
}

/**
 * Validate email address
 */
export function validateEmail(email: any, fieldName: string = 'Email'): string {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validateString(email, fieldName, {
    maxLength: 255,
    pattern: emailPattern,
  });
}

/**
 * Validate URL
 */
export function validateUrl(url: any, fieldName: string = 'URL'): string {
  const validated = validateString(url, fieldName, { maxLength: 2048 });
  
  try {
    new URL(validated);
    return validated;
  } catch {
    throw new Error(`${fieldName} must be a valid URL`);
  }
}

/**
 * Validate number field
 */
export function validateNumber(
  value: any,
  fieldName: string,
  options: {
    min?: number;
    max?: number;
    integer?: boolean;
  } = {}
): number {
  const num = Number(value);

  if (isNaN(num)) {
    throw new Error(`${fieldName} must be a number`);
  }

  if (options.integer && !Number.isInteger(num)) {
    throw new Error(`${fieldName} must be an integer`);
  }

  if (options.min !== undefined && num < options.min) {
    throw new Error(`${fieldName} must be at least ${options.min}`);
  }

  if (options.max !== undefined && num > options.max) {
    throw new Error(`${fieldName} must be no more than ${options.max}`);
  }

  return num;
}

/**
 * Validate boolean field
 */
export function validateBoolean(value: any, fieldName: string): boolean {
  if (typeof value !== 'boolean') {
    throw new Error(`${fieldName} must be a boolean`);
  }
  return value;
}

/**
 * Validate array field
 */
export function validateArray(
  value: any,
  fieldName: string,
  options: {
    minLength?: number;
    maxLength?: number;
  } = {}
): any[] {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }

  if (options.minLength && value.length < options.minLength) {
    throw new Error(`${fieldName} must have at least ${options.minLength} items`);
  }

  if (options.maxLength && value.length > options.maxLength) {
    throw new Error(`${fieldName} must have no more than ${options.maxLength} items`);
  }

  return value;
}

/**
 * Validate enum value
 */
export function validateEnum<T extends string>(
  value: any,
  fieldName: string,
  allowedValues: readonly T[]
): T {
  if (!allowedValues.includes(value)) {
    throw new Error(
      `${fieldName} must be one of: ${allowedValues.join(', ')}`
    );
  }
  return value as T;
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  // Remove all HTML tags
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Create validation error response
 */
export function createValidationErrorResponse(message: string): Response {
  return new Response(
    JSON.stringify({ error: 'Validation error', message }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
