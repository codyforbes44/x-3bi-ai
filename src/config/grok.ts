import { Brain, Sparkles, Zap, Eye, ImagePlus, Code2 } from 'lucide-react';

export const GROK_MODELS = [
  // === GROK 4 FAMILY (Latest Flagship) ===
  {
    id: 'grok-4-0709',
    name: 'Grok 4',
    icon: Brain,
    description: 'Flagship model with 256K context and advanced reasoning',
    contextWindow: 256000,
    capabilities: ['text', 'vision', 'tools', 'reasoning'],
  },
  {
    id: 'grok-4-fast-reasoning',
    name: 'Grok 4 Fast Reasoning',
    icon: Zap,
    description: 'Fast reasoning model with 2M context window',
    contextWindow: 2000000,
    capabilities: ['text', 'vision', 'tools', 'reasoning'],
  },
  {
    id: 'grok-4-fast-non-reasoning',
    name: 'Grok 4 Fast',
    icon: Zap,
    description: 'Fast model with 2M context, optimized for speed',
    contextWindow: 2000000,
    capabilities: ['text', 'vision', 'tools'],
  },
  
  // === GROK 3 FAMILY ===
  {
    id: 'grok-3',
    name: 'Grok 3',
    icon: Brain,
    description: 'Advanced capabilities with excellent performance (131K context)',
    contextWindow: 131072,
    capabilities: ['text', 'vision', 'tools'],
  },
  {
    id: 'grok-3-fast',
    name: 'Grok 3 Fast',
    icon: Zap,
    description: 'Optimized Grok 3 for faster responses (131K context)',
    contextWindow: 131072,
    capabilities: ['text', 'tools'],
  },
  {
    id: 'grok-3-mini',
    name: 'Grok 3 Mini',
    icon: Sparkles,
    description: 'Lightweight and cost-efficient (131K context)',
    contextWindow: 131072,
    capabilities: ['text'],
  },
  
  // === GROK 2 FAMILY ===
  {
    id: 'grok-2-vision-1212',
    name: 'Grok 2 Vision',
    icon: Eye,
    description: 'Vision capabilities for image understanding',
    contextWindow: 32768,
    capabilities: ['text', 'vision'],
  },
  {
    id: 'grok-2-image-1212',
    name: 'Grok 2 Image',
    icon: ImagePlus,
    description: 'Image generation from text prompts',
    capabilities: ['text-to-image'],
  },
  {
    id: 'grok-2',
    name: 'Grok 2',
    icon: Brain,
    description: 'Advanced reasoning and analysis',
    contextWindow: 32768,
    capabilities: ['text'],
  },
  {
    id: 'grok-2-mini',
    name: 'Grok 2 Mini',
    icon: Zap,
    description: 'Fast and efficient responses',
    contextWindow: 32768,
    capabilities: ['text'],
  },
  
  // === SPECIALIZED MODELS ===
  {
    id: 'grok-code-fast-1',
    name: 'Grok Code Fast',
    icon: Code2,
    description: 'Code-specialized model with 256K context',
    contextWindow: 256000,
    capabilities: ['text', 'code'],
  },
] as const;

export type GrokModel = typeof GROK_MODELS[number]['id'];

export const DEFAULT_GROK_MODEL: GrokModel = 'grok-4-0709';

export const GROK_CONFIG = {
  defaultTemperature: 0.7,
  defaultMaxTokens: 4096,
  streamingEnabled: true,
  guestRateLimit: 1000, // high limit per day (generous for free tier)
  authenticatedRateLimit: 1000, // high limit per day (generous for free tier)
} as const;
