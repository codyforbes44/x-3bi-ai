-- Phase 2: Security Hardening
-- Fix 3 tables with RLS enabled but no policies
-- Fix 2 trigger functions missing search_path protection

-- =====================================================
-- 1. Add RLS policies to api_rate_limits (service role only - system table)
-- =====================================================
CREATE POLICY "Service role can manage rate limits"
  ON public.api_rate_limits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 2. Add RLS policies to api_requests (users can view own, service can insert)
-- =====================================================
CREATE POLICY "Users can view their own API requests"
  ON public.api_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.api_keys
      WHERE api_keys.id = api_requests.api_key_id
        AND api_keys.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can insert API requests"
  ON public.api_requests
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- =====================================================
-- 3. Add RLS policies to role_permissions (public read, admin write)
-- =====================================================
CREATE POLICY "Anyone can view role permissions"
  ON public.role_permissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage role permissions"
  ON public.role_permissions
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- 4. Fix trigger functions missing search_path protection
-- =====================================================

-- Drop and recreate update_ai_sidebar_settings_updated_at with search_path
DROP FUNCTION IF EXISTS public.update_ai_sidebar_settings_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.update_ai_sidebar_settings_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Drop and recreate update_grok_rate_limits_updated_at with search_path
DROP FUNCTION IF EXISTS public.update_grok_rate_limits_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.update_grok_rate_limits_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate triggers that were dropped with CASCADE
-- (Only if the ai_sidebar_settings table exists - it may not be in schema)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ai_sidebar_settings') THEN
    CREATE TRIGGER update_ai_sidebar_settings_updated_at
      BEFORE UPDATE ON public.ai_sidebar_settings
      FOR EACH ROW
      EXECUTE FUNCTION public.update_ai_sidebar_settings_updated_at();
  END IF;
END $$;

-- Recreate trigger for grok_rate_limits
CREATE TRIGGER update_grok_rate_limits_updated_at
  BEFORE UPDATE ON public.grok_rate_limits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_grok_rate_limits_updated_at();