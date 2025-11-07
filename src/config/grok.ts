import { Brain, Sparkles, Zap } from 'lucide-react';

export const GROK_MODELS = [
  {
    id: 'grok-beta',
    name: 'Grok Beta',
    icon: Sparkles,
    description: 'Latest beta version with cutting-edge features',
  },
  {
    id: 'grok-2',
    name: 'Grok 2',
    icon: Brain,
    description: 'Advanced reasoning and analysis',
  },
  {
    id: 'grok-2-mini',
    name: 'Grok 2 Mini',
    icon: Zap,
    description: 'Fast and efficient responses',
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    icon: Brain,
    description: 'Most advanced model with superior capabilities',
  },
] as const;

export type GrokModel = typeof GROK_MODELS[number]['id'];

export const DEFAULT_GROK_MODEL: GrokModel = 'grok-beta';

export const GROK_CONFIG = {
  defaultTemperature: 0.7,
  defaultMaxTokens: 4096,
  streamingEnabled: true,
} as const;
