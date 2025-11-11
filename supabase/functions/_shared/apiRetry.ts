/**
 * Retry utility for API calls with exponential backoff
 */

export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  timeout?: number;
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retryOptions: RetryOptions = {}
): Promise<Response> {
  const {
    maxRetries = 2,
    initialDelay = 1000,
    maxDelay = 5000,
    timeout = 30000,
  } = retryOptions;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Return immediately on success
      if (response.ok) {
        return response;
      }

      // Return immediately on client errors (except 429)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        return response;
      }

      // Retry on 503 (service unavailable) or 429 (rate limit)
      if ((response.status === 503 || response.status === 429) && attempt < maxRetries) {
        const delay = Math.min(initialDelay * Math.pow(2, attempt), maxDelay);
        console.log(`Retrying after ${delay}ms (attempt ${attempt + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // Return response for other status codes
      return response;

    } catch (error) {
      lastError = error as Error;

      // Don't retry on timeout or network errors if it's the last attempt
      if (attempt === maxRetries) {
        throw new Error(`Request failed after ${maxRetries + 1} attempts: ${lastError.message}`);
      }

      // Wait before retrying
      const delay = Math.min(initialDelay * Math.pow(2, attempt), maxDelay);
      console.log(`Network error, retrying after ${delay}ms (attempt ${attempt + 1}/${maxRetries})...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Request failed');
}

export function handleAPIError(response: Response, corsHeaders: Record<string, string>) {
  if (response.status === 429) {
    return new Response(
      JSON.stringify({ 
        error: 'Rate limit exceeded. Please try again in a few moments.',
        retry: true 
      }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (response.status === 402) {
    return new Response(
      JSON.stringify({ 
        error: 'Credits depleted. Please add funds to continue using this service.',
        retry: false 
      }),
      { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (response.status === 503) {
    return new Response(
      JSON.stringify({ 
        error: 'Service temporarily unavailable. Please try again later.',
        retry: true 
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return null;
}
