/**
 * Standard CORS headers for all edge functions
 * Use these headers to enable cross-origin requests from the web app
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

/**
 * Handle CORS preflight requests
 * Call this at the beginning of your edge function
 */
export function handleCors(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
}

/**
 * Create a success response with CORS headers
 */
export function successResponse(data: unknown, status = 200): Response {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

/**
 * Create an error response with CORS headers
 */
export function errorResponse(
  error: string | Error,
  status = 500,
  details?: unknown
): Response {
  const message = error instanceof Error ? error.message : error;
  
  return new Response(
    JSON.stringify({
      error: message,
      ...(details && { details })
    }),
    {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}