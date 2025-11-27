import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ModelConfig {
  primary: string;
  fallbacks: string[];
  provider: string;
}

interface RouterOptions {
  preferredModel?: string;
  task?: 'chat' | 'code' | 'image' | 'voice';
  maxRetries?: number;
}

// Model routing configuration
const MODEL_ROUTES: Record<string, ModelConfig> = {
  // === GROK MODELS ===
  'grok-4-0709': {
    primary: 'grok-4-0709',
    fallbacks: ['grok-4-fast-reasoning', 'grok-3', 'claude-opus-4-1-20250805'],
    provider: 'xai',
  },
  'grok-4-fast-reasoning': {
    primary: 'grok-4-fast-reasoning',
    fallbacks: ['grok-4-0709', 'grok-3'],
    provider: 'xai',
  },
  'grok-3': {
    primary: 'grok-3',
    fallbacks: ['grok-4-0709', 'claude-sonnet-4-5-20250514'],
    provider: 'xai',
  },
  'grok-3-fast': {
    primary: 'grok-3-fast',
    fallbacks: ['grok-3', 'gpt-5-mini-2025-08-07'],
    provider: 'xai',
  },
  
  // === CLAUDE MODELS ===
  'claude-opus-4-1-20250805': {
    primary: 'claude-opus-4-1-20250805',
    fallbacks: ['claude-sonnet-4-5-20250514', 'o3-2025-04-16', 'grok-4-0709'],
    provider: 'anthropic',
  },
  'claude-sonnet-4-5-20250514': {
    primary: 'claude-sonnet-4-5-20250514',
    fallbacks: ['claude-opus-4-1-20250805', 'gpt-5-2025-08-07', 'grok-4-0709'],
    provider: 'anthropic',
  },
  
  // === OPENAI MODELS ===
  'gpt-5-2025-08-07': {
    primary: 'gpt-5-2025-08-07',
    fallbacks: ['gpt-5-mini-2025-08-07', 'claude-sonnet-4-5-20250514', 'grok-4-0709'],
    provider: 'openai',
  },
  'gpt-5-mini-2025-08-07': {
    primary: 'gpt-5-mini-2025-08-07',
    fallbacks: ['gpt-5-nano-2025-08-07', 'gpt-5-2025-08-07'],
    provider: 'openai',
  },
  'gpt-5-nano-2025-08-07': {
    primary: 'gpt-5-nano-2025-08-07',
    fallbacks: ['gpt-5-mini-2025-08-07', 'gemini-2.5-flash-lite'],
    provider: 'openai',
  },
  'o3-2025-04-16': {
    primary: 'o3-2025-04-16',
    fallbacks: ['o4-mini-2025-04-16', 'claude-opus-4-1-20250805', 'gpt-5-2025-08-07'],
    provider: 'openai',
  },
  'o4-mini-2025-04-16': {
    primary: 'o4-mini-2025-04-16',
    fallbacks: ['o3-2025-04-16', 'gpt-5-mini-2025-08-07'],
    provider: 'openai',
  },
  
  // === GEMINI MODELS ===
  'gemini-3-pro-preview': {
    primary: 'gemini-3-pro-preview',
    fallbacks: ['gemini-2.5-pro', 'claude-opus-4-1-20250805'],
    provider: 'google',
  },
  'gemini-2.5-pro': {
    primary: 'gemini-2.5-pro',
    fallbacks: ['gemini-2.5-flash', 'gpt-5-2025-08-07'],
    provider: 'google',
  },
  'gemini-2.5-flash': {
    primary: 'gemini-2.5-flash',
    fallbacks: ['gemini-2.5-flash-lite', 'gpt-5-mini-2025-08-07'],
    provider: 'google',
  },
  'gemini-2.5-flash-lite': {
    primary: 'gemini-2.5-flash-lite',
    fallbacks: ['gemini-2.5-flash', 'gpt-5-nano-2025-08-07'],
    provider: 'google',
  },
};

// Circuit breaker to track failing models
class CircuitBreaker {
  private failures: Map<string, number> = new Map();
  private lastFailure: Map<string, number> = new Map();
  private threshold = 3;
  private timeout = 60000; // 1 minute

  recordFailure(model: string) {
    const count = (this.failures.get(model) || 0) + 1;
    this.failures.set(model, count);
    this.lastFailure.set(model, Date.now());
  }

  recordSuccess(model: string) {
    this.failures.set(model, 0);
  }

  isOpen(model: string): boolean {
    const failures = this.failures.get(model) || 0;
    const lastFail = this.lastFailure.get(model) || 0;
    
    if (failures < this.threshold) return false;
    if (Date.now() - lastFail > this.timeout) {
      this.failures.set(model, 0);
      return false;
    }
    
    return true;
  }
}

const circuitBreaker = new CircuitBreaker();

export async function routeAIRequest(
  messages: any[],
  options: RouterOptions = {}
): Promise<any> {
  const {
    preferredModel = 'grok-3',
    task = 'chat',
    maxRetries = 3,
  } = options;

  const modelConfig = MODEL_ROUTES[preferredModel] || MODEL_ROUTES['grok-3'];
  const modelsToTry = [modelConfig.primary, ...modelConfig.fallbacks];

  for (let i = 0; i < modelsToTry.length && i < maxRetries; i++) {
    const currentModel = modelsToTry[i];

    // Skip if circuit breaker is open
    if (circuitBreaker.isOpen(currentModel)) {
      console.log(`Circuit breaker open for ${currentModel}, skipping`);
      continue;
    }

    try {
      console.log(`Attempting request with ${currentModel} (attempt ${i + 1})`);

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages,
          model: currentModel,
          provider: MODEL_ROUTES[currentModel]?.provider || 'anthropic',
        },
      });

      if (error) {
        // Handle rate limits and payment errors
        if (error.message?.includes('429') || error.message?.includes('rate limit')) {
          console.log(`Rate limit hit for ${currentModel}`);
          circuitBreaker.recordFailure(currentModel);
          continue;
        }
        
        if (error.message?.includes('402') || error.message?.includes('payment')) {
          toast.error('Payment required. Please add credits to continue.');
          throw error;
        }

        throw error;
      }

      // Success - record it and return
      circuitBreaker.recordSuccess(currentModel);
      
      if (i > 0) {
        toast.success(`Switched to ${currentModel} for better availability`);
      }

      return {
        ...data,
        model: currentModel,
        fallbackUsed: i > 0,
      };
    } catch (err) {
      console.error(`Error with ${currentModel}:`, err);
      circuitBreaker.recordFailure(currentModel);

      // If this was the last model, throw the error
      if (i === modelsToTry.length - 1) {
        toast.error('All AI models unavailable. Please try again later.');
        throw err;
      }

      // Otherwise, continue to next fallback
      console.log(`Falling back to next model...`);
    }
  }

  throw new Error('All fallback models exhausted');
}

// Smart routing based on task type
export function getOptimalModel(task: string): string {
  switch (task) {
    case 'code':
      return 'gpt-5-2025-08-07'; // GPT-5 is great for code
    case 'reasoning':
      return 'o3-2025-04-16'; // O3 for complex reasoning
    case 'chat':
      return 'grok-4-0709'; // Grok 4 for conversational AI
    case 'analysis':
      return 'claude-opus-4-1-20250805'; // Claude for deep reasoning
    case 'fast':
      return 'gpt-5-mini-2025-08-07'; // Mini for speed
    default:
      return 'grok-4-0709';
  }
}
