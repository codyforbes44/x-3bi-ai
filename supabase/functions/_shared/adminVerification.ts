import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Server-side admin verification middleware
 * CRITICAL: Always verify admin status on the server, never trust client-side checks
 */

export interface AdminVerificationResult {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userId: string;
  role: string | null;
}

/**
 * Verify if the authenticated user has admin or super_admin role
 * @param req - The incoming request with Authorization header
 * @returns AdminVerificationResult with user role information
 * @throws Error if user is not authenticated or verification fails
 */
export async function verifyAdmin(req: Request): Promise<AdminVerificationResult> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Unauthorized: No authorization header');
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Server configuration error');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Get user from JWT
  const jwt = authHeader.replace('Bearer ', '');
  const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);

  if (userError || !user) {
    throw new Error('Unauthorized: Invalid token');
  }

  // Check user role from user_roles table (server-side verification)
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (roleError && roleError.code !== 'PGRST116') { // PGRST116 = no rows returned
    console.error('Error checking user role:', roleError);
    throw new Error('Failed to verify user role');
  }

  const role = roleData?.role || 'user';
  const isAdmin = role === 'admin' || role === 'super_admin';
  const isSuperAdmin = role === 'super_admin';

  return {
    isAdmin,
    isSuperAdmin,
    userId: user.id,
    role,
  };
}

/**
 * Require admin role for the request
 * @param req - The incoming request
 * @throws Error with 403 status if user is not admin
 */
export async function requireAdmin(req: Request): Promise<AdminVerificationResult> {
  const result = await verifyAdmin(req);
  
  if (!result.isAdmin) {
    throw new Error('Forbidden: Admin access required');
  }

  return result;
}

/**
 * Require super_admin role for the request
 * @param req - The incoming request
 * @throws Error with 403 status if user is not super_admin
 */
export async function requireSuperAdmin(req: Request): Promise<AdminVerificationResult> {
  const result = await verifyAdmin(req);
  
  if (!result.isSuperAdmin) {
    throw new Error('Forbidden: Super admin access required');
  }

  return result;
}

/**
 * Create a standard 403 Forbidden response
 */
export function createForbiddenResponse(message = 'Forbidden'): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}