/**
 * Standardized response helpers for edge functions
 */

import { corsHeaders } from './cors.ts';

export interface SuccessResponse<T = any> {
  data: T;
  metadata?: Record<string, any>;
}

export interface ErrorResponse {
  error: string;
  details?: unknown;
  code?: string;
}

/**
 * Create a successful JSON response
 */
export function success<T>(
  data: T,
  options: {
    status?: number;
    metadata?: Record<string, any>;
    headers?: Record<string, string>;
  } = {}
): Response {
  const { status = 200, metadata, headers = {} } = options;

  const body: SuccessResponse<T> = { data };
  if (metadata) {
    body.metadata = metadata;
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

/**
 * Create an error JSON response
 */
export function error(
  message: string,
  options: {
    status?: number;
    details?: unknown;
    code?: string;
    headers?: Record<string, string>;
  } = {}
): Response {
  const { status = 500, details, code, headers = {} } = options;

  const body: ErrorResponse = { error: message };
  if (details) body.details = details;
  if (code) body.code = code;

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

/**
 * Create a streaming response (for SSE)
 */
export function stream(
  body: ReadableStream,
  headers: Record<string, string> = {}
): Response {
  return new Response(body, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      ...headers,
    },
  });
}

/**
 * Common error responses
 */
export const badRequest = (message: string, details?: unknown) =>
  error(message, { status: 400, details });

export const unauthorized = (message = 'Authentication required') =>
  error(message, { status: 401 });

export const forbidden = (message = 'Access forbidden') =>
  error(message, { status: 403 });

export const notFound = (message = 'Resource not found') =>
  error(message, { status: 404 });

export const rateLimited = (message = 'Rate limit exceeded') =>
  error(message, { status: 429, code: 'RATE_LIMIT_EXCEEDED' });

export const paymentRequired = (message = 'Payment required') =>
  error(message, { status: 402, code: 'PAYMENT_REQUIRED' });

export const serviceUnavailable = (message = 'Service temporarily unavailable') =>
  error(message, { status: 503, code: 'SERVICE_UNAVAILABLE' });
