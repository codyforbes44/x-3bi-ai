/**
 * Simple in-memory rate limiter for edge functions
 * Note: This is per-instance. For true distributed rate limiting, use Redis or Supabase Edge Functions KV
 */

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (will reset on cold starts)
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Clean up old entries periodically
 */
function cleanup() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanup, 5 * 60 * 1000);

/**
 * Check if request is rate limited
 * @param identifier - Unique identifier (user ID, IP address, etc.)
 * @param config - Rate limit configuration
 * @returns true if rate limited, false if allowed
 */
export function isRateLimited(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 60 }
): { limited: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No entry or window expired - create new entry
  if (!entry || entry.resetAt < now) {
    const resetAt = now + config.windowMs;
    rateLimitStore.set(identifier, { count: 1, resetAt });
    return { limited: false, remaining: config.maxRequests - 1, resetAt };
  }

  // Increment counter
  entry.count++;
  rateLimitStore.set(identifier, entry);

  // Check if over limit
  const limited = entry.count > config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);

  return { limited, remaining, resetAt: entry.resetAt };
}

/**
 * Get rate limit headers for response
 */
export function getRateLimitHeaders(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 60 }
): Record<string, string> {
  const result = isRateLimited(identifier, config);
  
  return {
    'X-RateLimit-Limit': String(config.maxRequests),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetAt),
  };
}

/**
 * Create a rate limit error response
 */
export function createRateLimitResponse(resetAt: number): Response {
  return new Response(
    JSON.stringify({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      resetAt: new Date(resetAt).toISOString(),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
      },
    }
  );
}
