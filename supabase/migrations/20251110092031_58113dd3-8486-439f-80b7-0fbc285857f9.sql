-- Digital Twin Tables
CREATE TABLE IF NOT EXISTS public.digital_twin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  communication_style JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  behavior_patterns JSONB DEFAULT '{}',
  decision_patterns JSONB DEFAULT '{}',
  expertise_areas TEXT[] DEFAULT '{}',
  personality_traits JSONB DEFAULT '{}',
  learning_rate NUMERIC DEFAULT 0.5,
  confidence_score NUMERIC DEFAULT 0.0,
  total_interactions INTEGER DEFAULT 0,
  last_trained_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS public.digital_twin_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  user_input TEXT,
  user_decision TEXT,
  twin_prediction TEXT,
  prediction_accuracy NUMERIC,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Multi-Agent System Tables
CREATE TABLE IF NOT EXISTS public.ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  persona JSONB NOT NULL,
  capabilities TEXT[] DEFAULT '{}',
  system_prompt TEXT NOT NULL,
  model TEXT DEFAULT 'google/gemini-2.5-flash',
  temperature NUMERIC DEFAULT 0.7,
  is_active BOOLEAN DEFAULT true,
  performance_metrics JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agent_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  goal TEXT NOT NULL,
  participating_agents UUID[] DEFAULT '{}',
  status TEXT DEFAULT 'active',
  conversation_history JSONB DEFAULT '[]',
  final_output JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agent_collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.agent_conversations(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES public.ai_agents(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL,
  target_agent_id UUID REFERENCES public.ai_agents(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Temporal Intelligence Tables
CREATE TABLE IF NOT EXISTS public.temporal_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pattern_type TEXT NOT NULL,
  pattern_name TEXT NOT NULL,
  recurrence_rule TEXT,
  time_windows JSONB DEFAULT '[]',
  historical_data JSONB DEFAULT '[]',
  confidence_level NUMERIC DEFAULT 0.0,
  next_predicted_occurrence TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.predictive_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  predicted_for TIMESTAMPTZ NOT NULL,
  confidence_score NUMERIC NOT NULL,
  based_on_patterns UUID[] DEFAULT '{}',
  action_suggestions JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending',
  actual_outcome TEXT,
  accuracy_score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cross-App Memory Graph Tables
CREATE TABLE IF NOT EXISTS public.knowledge_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  embedding vector(1536),
  source_apps TEXT[] DEFAULT '{}',
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  access_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.knowledge_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  from_entity_id UUID NOT NULL REFERENCES public.knowledge_entities(id) ON DELETE CASCADE,
  to_entity_id UUID NOT NULL REFERENCES public.knowledge_entities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  strength NUMERIC DEFAULT 1.0,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_entity_id, to_entity_id, relationship_type)
);

CREATE TABLE IF NOT EXISTS public.semantic_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  query_embedding vector(1536),
  results JSONB DEFAULT '[]',
  result_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.digital_twin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_twin_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temporal_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictive_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semantic_searches ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own digital twin profile"
  ON public.digital_twin_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own digital twin profile"
  ON public.digital_twin_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own digital twin profile"
  ON public.digital_twin_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own twin interactions"
  ON public.digital_twin_interactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own twin interactions"
  ON public.digital_twin_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own agents"
  ON public.ai_agents FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own agent conversations"
  ON public.agent_conversations FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own agent collaborations"
  ON public.agent_collaborations FOR SELECT
  USING (auth.uid() = (SELECT user_id FROM public.agent_conversations WHERE id = conversation_id));

CREATE POLICY "Users can insert their own agent collaborations"
  ON public.agent_collaborations FOR INSERT
  WITH CHECK (auth.uid() = (SELECT user_id FROM public.agent_conversations WHERE id = conversation_id));

CREATE POLICY "Users can manage their own temporal patterns"
  ON public.temporal_patterns FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own predictive insights"
  ON public.predictive_insights FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own knowledge entities"
  ON public.knowledge_entities FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own knowledge relationships"
  ON public.knowledge_relationships FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own semantic searches"
  ON public.semantic_searches FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_digital_twin_user ON public.digital_twin_profiles(user_id);
CREATE INDEX idx_twin_interactions_user ON public.digital_twin_interactions(user_id);
CREATE INDEX idx_agents_user ON public.ai_agents(user_id);
CREATE INDEX idx_agent_convos_user ON public.agent_conversations(user_id);
CREATE INDEX idx_temporal_patterns_user ON public.temporal_patterns(user_id);
CREATE INDEX idx_predictive_insights_user ON public.predictive_insights(user_id);
CREATE INDEX idx_knowledge_entities_user ON public.knowledge_entities(user_id);
CREATE INDEX idx_knowledge_relationships_user ON public.knowledge_relationships(user_id);
CREATE INDEX idx_knowledge_entities_embedding ON public.knowledge_entities USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_semantic_searches_embedding ON public.semantic_searches USING ivfflat (query_embedding vector_cosine_ops);

-- Triggers
CREATE TRIGGER update_digital_twin_updated_at
  BEFORE UPDATE ON public.digital_twin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.ai_agents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agent_conversations_updated_at
  BEFORE UPDATE ON public.agent_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_temporal_patterns_updated_at
  BEFORE UPDATE ON public.temporal_patterns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_predictive_insights_updated_at
  BEFORE UPDATE ON public.predictive_insights
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_knowledge_entities_updated_at
  BEFORE UPDATE ON public.knowledge_entities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_knowledge_relationships_updated_at
  BEFORE UPDATE ON public.knowledge_relationships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();