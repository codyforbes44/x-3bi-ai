-- Enable pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create enum for modality types
CREATE TYPE modality_type AS ENUM ('text', 'image', 'audio', 'video', 'mixed');

-- Create multimodal_sessions table
CREATE TABLE public.multimodal_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  alias text NOT NULL,
  parent_alias text,
  modality modality_type NOT NULL DEFAULT 'text',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  content_hash text,
  
  -- Modality-specific fields
  image_url text,
  audio_url text,
  video_metadata jsonb,
  
  -- Vector embedding for semantic search (1536 dimensions for OpenAI ada-002)
  embedding vector(1536),
  
  -- Grok Vision analysis results
  vision_analysis jsonb,
  tags text[],
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_accessed_at timestamptz,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  UNIQUE(user_id, alias)
);

-- Enable RLS
ALTER TABLE public.multimodal_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own sessions"
  ON public.multimodal_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions"
  ON public.multimodal_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON public.multimodal_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
  ON public.multimodal_sessions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index on embedding for fast similarity search
CREATE INDEX multimodal_sessions_embedding_idx ON public.multimodal_sessions 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create indexes for performance
CREATE INDEX multimodal_sessions_user_id_idx ON public.multimodal_sessions(user_id);
CREATE INDEX multimodal_sessions_modality_idx ON public.multimodal_sessions(modality);
CREATE INDEX multimodal_sessions_created_at_idx ON public.multimodal_sessions(created_at DESC);
CREATE INDEX multimodal_sessions_tags_idx ON public.multimodal_sessions USING GIN(tags);

-- Function to update last_accessed_at
CREATE OR REPLACE FUNCTION update_last_accessed()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_accessed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for last_accessed_at on SELECT (via UPDATE workaround)
CREATE TRIGGER update_multimodal_sessions_updated_at
  BEFORE UPDATE ON public.multimodal_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate temporal decay score
CREATE OR REPLACE FUNCTION calculate_relevance_score(
  similarity float,
  created_at timestamptz,
  decay_factor float DEFAULT 0.1
)
RETURNS float AS $$
BEGIN
  -- Combine similarity with temporal decay
  -- decay_factor controls how much recency matters (0.1 = 10% weight on recency)
  RETURN similarity * (1 + decay_factor * exp(-extract(epoch from (now() - created_at)) / 86400));
END;
$$ LANGUAGE plpgsql IMMUTABLE;