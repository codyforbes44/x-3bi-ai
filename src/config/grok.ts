import { Brain, Sparkles, Zap } from 'lucide-react';

export const GROK_MODELS = [
  {
    id: 'grok-4',
    name: 'Grok 4',
    icon: Brain,
    description: 'Latest flagship model with 256K context and advanced reasoning',
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    icon: Brain,
    description: 'Advanced capabilities with excellent performance',
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
] as const;

export type GrokModel = typeof GROK_MODELS[number]['id'];

export const DEFAULT_GROK_MODEL: GrokModel = 'grok-4';

export const GROK_CONFIG = {
  defaultTemperature: 0.7,
  defaultMaxTokens: 4096,
  streamingEnabled: true,
} as const;
