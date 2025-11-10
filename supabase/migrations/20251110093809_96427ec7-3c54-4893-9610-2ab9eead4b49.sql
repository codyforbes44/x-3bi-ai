-- Phase 7: Platform Domination - Complete Ecosystem
-- Database tables for Analytics, Enterprise, API Gateway, Webhooks, Marketplace, and Security

-- 7.2 Analytics & Monitoring
CREATE TABLE IF NOT EXISTS system_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_system_metrics_created_at ON system_metrics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_metrics_type ON system_metrics(metric_type);

CREATE TABLE IF NOT EXISTS user_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_events_user_id ON user_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_events_created_at ON user_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_type ON user_events(event_type);

ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all system metrics" ON system_metrics FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM workspace_members wm
    JOIN workspaces w ON w.id = wm.workspace_id
    WHERE wm.user_id = auth.uid() AND wm.role = 'admin'
  )
);

CREATE POLICY "Users can view their own events" ON user_events FOR SELECT USING (auth.uid() = user_id);

-- 7.3 Enterprise Features
CREATE TABLE IF NOT EXISTS user_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'online',
  last_seen TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(user_id, workspace_id)
);

CREATE INDEX IF NOT EXISTS idx_user_presence_workspace ON user_presence(workspace_id);
CREATE INDEX IF NOT EXISTS idx_user_presence_status ON user_presence(status);

CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  resource TEXT NOT NULL,
  action TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE(role, permission_id)
);

CREATE TABLE IF NOT EXISTS tenant_customization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL UNIQUE REFERENCES workspaces(id) ON DELETE CASCADE,
  brand_colors JSONB DEFAULT '{}'::jsonb,
  logo_urls JSONB DEFAULT '{}'::jsonb,
  custom_domain TEXT,
  features JSONB DEFAULT '{}'::jsonb,
  email_templates JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_presence ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_customization ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view presence in their workspaces" ON user_presence FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM workspace_members WHERE workspace_id = user_presence.workspace_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own presence" ON user_presence FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view permissions" ON permissions FOR SELECT USING (true);
CREATE POLICY "Admins can manage permissions" ON permissions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM workspace_members WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Workspace members can view customization" ON tenant_customization FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM workspace_members WHERE workspace_id = tenant_customization.workspace_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage customization" ON tenant_customization FOR ALL USING (
  EXISTS (
    SELECT 1 FROM workspace_members WHERE workspace_id = tenant_customization.workspace_id AND user_id = auth.uid() AND role = 'admin'
  )
);

-- 7.4 API Gateway & Marketplace
CREATE TABLE IF NOT EXISTS api_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  limit_per_hour INTEGER DEFAULT 100,
  limit_per_day INTEGER DEFAULT 1000,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS api_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_api_requests_key_created ON api_requests(api_key_id, created_at DESC);

CREATE TABLE IF NOT EXISTS webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  secret TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  retry_config JSONB DEFAULT '{"max_attempts": 3, "backoff_multiplier": 2}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id UUID REFERENCES webhooks(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  response_code INTEGER,
  response_body TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_status ON webhook_deliveries(status, created_at);

CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  logo_url TEXT,
  publisher_id UUID REFERENCES auth.users(id),
  config_schema JSONB NOT NULL,
  pricing_model TEXT DEFAULT 'free',
  install_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
  config JSONB DEFAULT '{}'::jsonb,
  oauth_tokens JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  usage_stats JSONB DEFAULT '{}'::jsonb,
  installed_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE api_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own webhooks" ON webhooks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own webhooks" ON webhooks FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their webhook deliveries" ON webhook_deliveries FOR SELECT USING (
  EXISTS (SELECT 1 FROM webhooks WHERE webhooks.id = webhook_deliveries.webhook_id AND webhooks.user_id = auth.uid())
);

CREATE POLICY "Anyone can view integrations" ON integrations FOR SELECT USING (true);
CREATE POLICY "Publishers can manage their integrations" ON integrations FOR ALL USING (auth.uid() = publisher_id);

CREATE POLICY "Users can view their installed integrations" ON user_integrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their installed integrations" ON user_integrations FOR ALL USING (auth.uid() = user_id);

-- 7.5 Advanced Security
CREATE TABLE IF NOT EXISTS encrypted_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL,
  encrypted_value TEXT NOT NULL,
  iv TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS compliance_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  generated_by UUID REFERENCES auth.users(id),
  report_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS security_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  scan_type TEXT NOT NULL,
  status TEXT DEFAULT 'running',
  findings JSONB DEFAULT '[]'::jsonb,
  score INTEGER,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE encrypted_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their encrypted data" ON encrypted_data FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Workspace admins can view compliance reports" ON compliance_reports FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM workspace_members WHERE workspace_id = compliance_reports.workspace_id AND user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Workspace admins can view security scans" ON security_scans FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM workspace_members WHERE workspace_id = security_scans.workspace_id AND user_id = auth.uid() AND role = 'admin'
  )
);

-- Insert default permissions
INSERT INTO permissions (name, description, resource, action) VALUES
  ('view_analytics', 'View analytics dashboards', 'analytics', 'read'),
  ('manage_team', 'Manage team members', 'team', 'write'),
  ('manage_integrations', 'Install and configure integrations', 'integrations', 'write'),
  ('manage_webhooks', 'Create and manage webhooks', 'webhooks', 'write'),
  ('view_audit_logs', 'View audit logs', 'audit', 'read'),
  ('manage_security', 'Manage security settings', 'security', 'write'),
  ('export_data', 'Export user data', 'data', 'export')
ON CONFLICT (name) DO NOTHING;