import { Brain, Sparkles, Zap } from 'lucide-react';

export const GROK_MODELS = [
  {
    id: 'grok-4-0709',
    name: 'Grok 4',
    icon: Brain,
    description: 'Flagship model with 256K context and advanced reasoning',
  },
  {
    id: 'grok-4-fast-reasoning',
    name: 'Grok 4 Fast Reasoning',
    icon: Zap,
    description: 'Fast reasoning model with 2M context window',
  },
  {
    id: 'grok-4-fast-non-reasoning',
    name: 'Grok 4 Fast',
    icon: Zap,
    description: 'Fast model with 2M context, optimized for speed',
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    icon: Brain,
    description: 'Advanced capabilities with excellent performance (131K context)',
  },
  {
    id: 'grok-3-mini',
    name: 'Grok 3 Mini',
    icon: Sparkles,
    description: 'Lightweight and efficient (131K context)',
  },
  {
    id: 'grok-2-vision-1212',
    name: 'Grok 2 Vision',
    icon: Brain,
    description: 'Vision capabilities for image understanding',
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
    id: 'grok-code-fast-1',
    name: 'Grok Code Fast',
    icon: Zap,
    description: 'Code-specialized model with 256K context',
  },
] as const;

export type GrokModel = typeof GROK_MODELS[number]['id'];

export const DEFAULT_GROK_MODEL: GrokModel = 'grok-4-0709';

export const GROK_CONFIG = {
  defaultTemperature: 0.7,
  defaultMaxTokens: 4096,
  streamingEnabled: true,
  guestRateLimit: 5, // messages per minute
  authenticatedRateLimit: 40, // messages per minute
} as const;
