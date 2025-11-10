-- Create AI Sidebar Settings table
CREATE TABLE IF NOT EXISTS ai_sidebar_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{
    "defaultState": "collapsed",
    "position": "right",
    "theme": "auto",
    "autoOpenOnDashboard": false,
    "persistConversations": true,
    "contextAwarenessEnabled": true,
    "suggestionsEnabled": true,
    "voiceInputEnabled": false,
    "voiceOutputEnabled": false,
    "voiceProvider": "browser",
    "selectedVoice": "default",
    "defaultModel": "grok-4-0709",
    "enableMultiModel": true,
    "keyboardShortcut": "Ctrl+Shift+G",
    "enableGlobalShortcut": true,
    "analyticsEnabled": true,
    "conversationHistory": "all"
  }'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE ai_sidebar_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own AI sidebar settings"
  ON ai_sidebar_settings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI sidebar settings"
  ON ai_sidebar_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI sidebar settings"
  ON ai_sidebar_settings
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI sidebar settings"
  ON ai_sidebar_settings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ai_sidebar_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ai_sidebar_settings_timestamp
  BEFORE UPDATE ON ai_sidebar_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_sidebar_settings_updated_at();