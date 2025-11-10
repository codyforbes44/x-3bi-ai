/**
 * Centralized AI model routing and client management
 * Supports Lovable AI Gateway with all models
 */

export type AIModel = 
  | 'google/gemini-2.5-pro'
  | 'google/gemini-2.5-flash'
  | 'google/gemini-2.5-flash-lite'
  | 'google/gemini-2.5-flash-image'
  | 'openai/gpt-5'
  | 'openai/gpt-5-mini'
  | 'openai/gpt-5-nano';

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequestOptions {
  model?: AIModel;
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface AIStreamOptions extends AIRequestOptions {
  stream: true;
}

/**
 * Get the Lovable AI API key from environment
 */
function getAIApiKey(): string {
  const apiKey = Deno.env.get('LOVABLE_API_KEY');
  if (!apiKey) {
    throw new Error('LOVABLE_API_KEY not configured');
  }
  return apiKey;
}

/**
 * Default model selection
 */
const DEFAULT_MODEL: AIModel = 'google/gemini-2.5-flash';

/**
 * Make a request to the Lovable AI Gateway
 */
export async function callAI(options: AIRequestOptions): Promise<Response> {
  const apiKey = getAIApiKey();
  const model = options.model || DEFAULT_MODEL;

  const requestBody: any = {
    model,
    messages: options.messages,
  };

  if (options.temperature !== undefined) {
    requestBody.temperature = options.temperature;
  }

  if (options.maxTokens !== undefined) {
    requestBody.max_tokens = options.maxTokens;
  }

  if (options.stream) {
    requestBody.stream = true;
  }

  console.log(`AI Request to ${model}:`, {
    messageCount: options.messages.length,
    stream: options.stream || false
  });

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('AI Gateway error:', response.status, errorText);
    
    // Handle specific error codes
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (response.status === 402) {
      throw new Error('Payment required. Please add credits to your workspace.');
    }
    
    throw new Error(`AI Gateway error: ${response.status} - ${errorText}`);
  }

  return response;
}

/**
 * Stream AI responses (for chat interfaces)
 */
export async function streamAI(options: AIStreamOptions): Promise<Response> {
  return callAI(options);
}

/**
 * Get a single AI completion (non-streaming)
 */
export async function getAICompletion(options: AIRequestOptions): Promise<string> {
  const response = await callAI({ ...options, stream: false });
  const data = await response.json();
  
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Helper to create a system + user message pair
 */
export function createMessages(systemPrompt: string, userMessage: string): AIMessage[] {
  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage }
  ];
}