/**
 * Authentication utilities for edge functions
 */

import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

export interface AuthenticatedUser {
  id: string;
  email?: string;
  role?: string;
}

/**
 * Get authenticated user from request
 * @param req - The incoming request
 * @returns User object if authenticated, null otherwise
 */
export async function getAuthenticatedUser(req: Request): Promise<AuthenticatedUser | null> {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return null;
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const { data: { user }, error } = await supabaseClient.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

/**
 * Require authentication - throws error if not authenticated
 * @param req - The incoming request
 * @returns Authenticated user
 * @throws Error if not authenticated
 */
export async function requireAuth(req: Request): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser(req);
  
  if (!user) {
    throw new Error('Unauthorized - authentication required');
  }
  
  return user;
}

/**
 * Check if user has a specific role
 * @param supabase - Supabase client
 * @param userId - User ID to check
 * @param role - Role to check for
 * @returns true if user has role, false otherwise
 */
export async function hasRole(
  supabase: SupabaseClient,
  userId: string,
  role: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('has_role', { _user_id: userId, _role: role });
    
    if (error) {
      console.error('Error checking role:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
}

/**
 * Require admin role - throws error if not admin
 * @param supabase - Supabase client
 * @param userId - User ID to check
 * @throws Error if not admin
 */
export async function requireAdmin(supabase: SupabaseClient, userId: string): Promise<void> {
  const isAdmin = await hasRole(supabase, userId, 'admin');
  
  if (!isAdmin) {
    throw new Error('Forbidden - admin access required');
  }
}

/**
 * Create authenticated error response
 */
export function createAuthErrorResponse(message: string = 'Unauthorized'): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Create forbidden error response
 */
export function createForbiddenResponse(message: string = 'Forbidden'): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
