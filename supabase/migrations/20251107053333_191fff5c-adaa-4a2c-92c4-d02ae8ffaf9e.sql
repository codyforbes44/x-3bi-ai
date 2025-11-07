-- Add sharing columns to grok_conversations
ALTER TABLE public.grok_conversations
ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS share_token UUID UNIQUE DEFAULT gen_random_uuid();

-- Create index for share token lookups
CREATE INDEX IF NOT EXISTS idx_grok_conversations_share_token ON public.grok_conversations(share_token);

-- Add RLS policy for public conversations
CREATE POLICY "Anyone can view public conversations"
  ON public.grok_conversations
  FOR SELECT
  USING (is_public = true);

-- Add RLS policy for messages in public conversations
CREATE POLICY "Anyone can view messages in public conversations"
  ON public.grok_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.grok_conversations
      WHERE grok_conversations.id = grok_messages.conversation_id
      AND grok_conversations.is_public = true
    )
  );