/**
 * API client with retry logic and error handling
 */

import { fetchWithRetry, RetryOptions } from './apiRetry.ts';

export interface APIClientOptions {
  baseURL: string;
  headers?: Record<string, string>;
  retryOptions?: RetryOptions;
}

export class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private retryOptions: RetryOptions;

  constructor(options: APIClientOptions) {
    this.baseURL = options.baseURL;
    this.defaultHeaders = options.headers || {};
    this.retryOptions = options.retryOptions || {};
  }

  /**
   * Make a request with retry logic
   */
  async request<T = any>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${path}`;
    const headers = {
      ...this.defaultHeaders,
      ...(options.headers || {}),
    };

    const response = await fetchWithRetry(
      url,
      { ...options, headers },
      this.retryOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error [${response.status}]:`, errorText);
      
      throw new APIError(
        `API request failed: ${response.statusText}`,
        response.status,
        errorText
      );
    }

    return response.json();
  }

  /**
   * POST request
   */
  async post<T = any>(path: string, body: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  }

  /**
   * GET request
   */
  async get<T = any>(path: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * Stream response (for SSE)
   */
  async stream(path: string, body: any, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseURL}${path}`;
    const headers = {
      ...this.defaultHeaders,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    const response = await fetchWithRetry(
      url,
      {
        ...options,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      },
      this.retryOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Stream API error [${response.status}]:`, errorText);
      throw new APIError(
        `Stream request failed: ${response.statusText}`,
        response.status,
        errorText
      );
    }

    return response;
  }
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Pre-configured API clients
 */
export function createLovableAIClient(apiKey: string): APIClient {
  return new APIClient({
    baseURL: 'https://ai.gateway.lovable.dev/v1',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    retryOptions: {
      maxRetries: 2,
      initialDelay: 1000,
      maxDelay: 5000,
      timeout: 30000,
    },
  });
}

export function createOpenAIClient(apiKey: string): APIClient {
  return new APIClient({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    retryOptions: {
      maxRetries: 2,
      initialDelay: 1000,
      maxDelay: 5000,
      timeout: 30000,
    },
  });
}
