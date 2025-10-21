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
  'grok-3': {
    primary: 'grok-3',
    fallbacks: ['claude-opus-4-1-20250805', 'gpt-5-2025-08-07'],
    provider: 'xai',
  },
  'claude-opus-4-1-20250805': {
    primary: 'claude-opus-4-1-20250805',
    fallbacks: ['gpt-5-2025-08-07', 'grok-3'],
    provider: 'anthropic',
  },
  'gpt-5-2025-08-07': {
    primary: 'gpt-5-2025-08-07',
    fallbacks: ['claude-opus-4-1-20250805', 'grok-3'],
    provider: 'openai',
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
    case 'chat':
      return 'grok-3'; // Grok for conversational AI
    case 'analysis':
      return 'claude-opus-4-1-20250805'; // Claude for deep reasoning
    default:
      return 'grok-3';
  }
}
