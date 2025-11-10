-- Create grok_rate_limits table for daily message tracking
CREATE TABLE IF NOT EXISTS public.grok_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  message_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.grok_rate_limits ENABLE ROW LEVEL SECURITY;

-- Users can view their own rate limits
CREATE POLICY "Users can view their own rate limits"
  ON public.grok_rate_limits
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage rate limits (for edge functions)
CREATE POLICY "Service role can manage rate limits"
  ON public.grok_rate_limits
  FOR ALL
  USING (true);

-- Index for fast lookups
CREATE INDEX idx_grok_rate_limits_user_date ON public.grok_rate_limits(user_id, date);

-- Function to clean up old rate limit records (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_grok_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.grok_rate_limits
  WHERE date < CURRENT_DATE - INTERVAL '30 days';
END;
$$;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_grok_rate_limits_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_grok_rate_limits_updated_at_trigger
  BEFORE UPDATE ON public.grok_rate_limits
  FOR EACH ROW
  EXECUTE FUNCTION update_grok_rate_limits_updated_at();