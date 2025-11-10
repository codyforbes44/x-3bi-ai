-- Create application logs table for centralized logging
CREATE TABLE IF NOT EXISTS public.application_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  level TEXT NOT NULL CHECK (level IN ('debug', 'info', 'warn', 'error', 'fatal')),
  message TEXT NOT NULL,
  context JSONB DEFAULT '{}'::jsonb,
  stack TEXT,
  correlation_id TEXT,
  session_id TEXT,
  user_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_application_logs_timestamp ON public.application_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_application_logs_level ON public.application_logs(level);
CREATE INDEX IF NOT EXISTS idx_application_logs_correlation_id ON public.application_logs(correlation_id);
CREATE INDEX IF NOT EXISTS idx_application_logs_session_id ON public.application_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_application_logs_user_id ON public.application_logs(user_id);

-- Enable RLS
ALTER TABLE public.application_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only service role can write, authenticated users can read their own logs
CREATE POLICY "Service role can insert logs"
  ON public.application_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Users can view their own logs"
  ON public.application_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

-- Create performance metrics table
CREATE TABLE IF NOT EXISTS public.performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  rating TEXT CHECK (rating IN ('good', 'needs-improvement', 'poor')),
  user_id UUID,
  session_id TEXT,
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for performance metrics
CREATE INDEX IF NOT EXISTS idx_performance_metrics_timestamp ON public.performance_metrics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_name ON public.performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_rating ON public.performance_metrics(rating);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_user_id ON public.performance_metrics(user_id);

-- Enable RLS
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can insert metrics"
  ON public.performance_metrics
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can view their own metrics"
  ON public.performance_metrics
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);