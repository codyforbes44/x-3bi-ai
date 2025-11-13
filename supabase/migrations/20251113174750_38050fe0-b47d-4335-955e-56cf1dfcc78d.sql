-- Fix security issue: Restrict profiles table SELECT policy
-- Current policy allows anyone to view all profiles including emails
-- New policy restricts to own profile OR workspace members only

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Add restricted policy for authenticated users to view own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Add policy to view profiles of workspace members
CREATE POLICY "Users can view workspace member profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM public.workspace_members wm1
      JOIN public.workspace_members wm2 ON wm1.workspace_id = wm2.workspace_id
      WHERE wm1.user_id = auth.uid() 
        AND wm2.user_id = profiles.user_id
    )
  );

-- Fix grok_rate_limits: Ensure only users can view their own rate limits
-- This prevents competitors from analyzing usage patterns
DROP POLICY IF EXISTS "Users can view their own rate limits" ON public.grok_rate_limits;

CREATE POLICY "Users can view only their own rate limits"
  ON public.grok_rate_limits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);