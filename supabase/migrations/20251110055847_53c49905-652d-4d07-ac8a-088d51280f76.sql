-- Update default model for grok_conversations to grok-4-0709
ALTER TABLE public.grok_conversations 
ALTER COLUMN model SET DEFAULT 'grok-4-0709';