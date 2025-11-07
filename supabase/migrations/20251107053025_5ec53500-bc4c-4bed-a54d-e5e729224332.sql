-- Create grok_conversations table
CREATE TABLE IF NOT EXISTS public.grok_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'grok-beta',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grok_messages table
CREATE TABLE IF NOT EXISTS public.grok_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.grok_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.grok_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grok_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for grok_conversations
CREATE POLICY "Users can view their own conversations"
  ON public.grok_conversations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations"
  ON public.grok_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
  ON public.grok_conversations
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
  ON public.grok_conversations
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for grok_messages
CREATE POLICY "Users can view messages in their conversations"
  ON public.grok_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.grok_conversations
      WHERE grok_conversations.id = grok_messages.conversation_id
      AND grok_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their conversations"
  ON public.grok_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.grok_conversations
      WHERE grok_conversations.id = grok_messages.conversation_id
      AND grok_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete messages in their conversations"
  ON public.grok_messages
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.grok_conversations
      WHERE grok_conversations.id = grok_messages.conversation_id
      AND grok_conversations.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_grok_conversations_user_id ON public.grok_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_grok_messages_conversation_id ON public.grok_messages(conversation_id);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_grok_conversation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_grok_conversations_updated_at
  BEFORE UPDATE ON public.grok_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_grok_conversation_updated_at();