-- Add search_path security to functions missing it

-- Fix calculate_relevance_score
CREATE OR REPLACE FUNCTION public.calculate_relevance_score(
  similarity double precision,
  created_at timestamp with time zone,
  decay_factor double precision DEFAULT 0.1
)
RETURNS double precision
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $$
BEGIN
  -- Combine similarity with temporal decay
  -- decay_factor controls how much recency matters (0.1 = 10% weight on recency)
  RETURN similarity * (1 + decay_factor * exp(-extract(epoch from (now() - created_at)) / 86400));
END;
$$;

-- Fix cleanup_old_audit_logs
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.audit_logs
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$;

-- Fix update_last_accessed
CREATE OR REPLACE FUNCTION public.update_last_accessed()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.last_accessed_at = now();
  RETURN NEW;
END;
$$;

-- Fix update_grok_conversation_updated_at
CREATE OR REPLACE FUNCTION public.update_grok_conversation_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;