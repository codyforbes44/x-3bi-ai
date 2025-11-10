/**
 * Standard Edge Function Template
 * Copy this template when creating new edge functions
 * 
 * Features:
 * - CORS handling
 * - Error handling
 * - Authentication (optional)
 * - Logging
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { handleCors, successResponse, errorResponse } from './cors.ts';
import { logError, ValidationError } from './errorHandling.ts';

// Example edge function using standard template
serve(async (req) => {
  // 1. Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // 2. Parse request body
    const body = await req.json();
    
    // 3. Validate input (example)
    if (!body.message) {
      throw new ValidationError('Message is required');
    }

    // 4. Optional: Initialize Supabase client with auth
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // 5. Optional: Verify authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return errorResponse('Unauthorized', 401);
    }

    console.log('Processing request for user:', user.id);

    // 6. Your business logic here
    const result = {
      message: 'Success',
      data: body.message,
      userId: user.id
    };

    // 7. Return success response
    return successResponse(result);

  } catch (error) {
    // 8. Handle errors
    logError(error, 'function-name');
    
    if (error instanceof ValidationError) {
      return errorResponse(error.message, 400);
    }
    
    return errorResponse('Internal server error', 500);
  }
});

/* 
Configuration in supabase/config.toml:

[functions.your-function-name]
verify_jwt = true  # Set to false for public endpoints

*/