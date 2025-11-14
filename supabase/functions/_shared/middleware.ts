/**
 * Composable middleware system for edge functions
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { corsHeaders } from './cors.ts';
import { isRateLimited, getRateLimitHeaders, createRateLimitResponse } from './rateLimit.ts';

export interface Context {
  req: Request;
  user?: { id: string; email?: string };
  supabase?: any;
  rateLimitHeaders?: Record<string, string>;
  [key: string]: any;
}

export type Handler = (ctx: Context) => Promise<Response> | Response;
export type Middleware = (ctx: Context, next: Handler) => Promise<Response> | Response;

/**
 * Compose multiple middleware functions
 */
export function compose(...middleware: Middleware[]): Middleware {
  return (ctx: Context, handler: Handler) => {
    let index = -1;

    const dispatch = async (i: number): Promise<Response> => {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;

      const fn = i === middleware.length ? handler : middleware[i];
      if (!fn) return handler(ctx);

      return fn(ctx, () => dispatch(i + 1));
    };

    return dispatch(0);
  };
}

/**
 * CORS middleware - handles preflight and adds headers
 */
export const withCors: Middleware = async (ctx, next) => {
  if (ctx.req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  const response = await next(ctx);
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

/**
 * Authentication middleware - requires valid JWT
 */
export const withAuth: Middleware = async (ctx, next) => {
  const authHeader = ctx.req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Missing authorization header' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
    global: { headers: { Authorization: authHeader } },
  });

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(
      JSON.stringify({ error: 'Invalid or expired token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  ctx.user = user;
  ctx.supabase = supabase;
  return next(ctx);
};

/**
 * Rate limiting middleware
 */
export function withRateLimit(options: { windowMs: number; maxRequests: number }): Middleware {
  return async (ctx, next) => {
    if (!ctx.user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required for rate limiting' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rateLimitResult = isRateLimited(ctx.user.id, options);
    ctx.rateLimitHeaders = getRateLimitHeaders(ctx.user.id, options);

    if (rateLimitResult.limited) {
      return createRateLimitResponse(rateLimitResult.resetAt);
    }

    return next(ctx);
  };
}

/**
 * Validation middleware using Zod schemas
 */
export function withValidation<T>(schema: { parse: (data: unknown) => T }): Middleware {
  return async (ctx, next) => {
    try {
      const body = await ctx.req.json();
      ctx.validatedData = schema.parse(body);
      return next(ctx);
    } catch (error) {
      console.error('Validation error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: error instanceof Error ? error.message : 'Invalid input'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  };
}

/**
 * Error handling middleware - wraps handler in try/catch
 */
export const withErrorHandling: Middleware = async (ctx, next) => {
  try {
    return await next(ctx);
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

/**
 * Logging middleware - logs request details
 */
export const withLogging: Middleware = async (ctx, next) => {
  const start = Date.now();
  console.log(`[${ctx.req.method}] ${ctx.req.url} - Started`);
  
  const response = await next(ctx);
  
  const duration = Date.now() - start;
  console.log(`[${ctx.req.method}] ${ctx.req.url} - ${response.status} (${duration}ms)`);
  
  return response;
};
