import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { GROK_CONFIG } from '@/config/grok';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface StreamOptions {
  messages: Message[];
  model: string;
  onChunk: (content: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export function useGrokStream() {
  const streamMessage = useCallback(async ({
    messages,
    model,
    onChunk,
    onComplete,
    onError,
  }: StreamOptions) => {
    try {
      // Try to get session, but don't require it (guest mode)
      const { data: { session } } = await supabase.auth.getSession();

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add auth header if available
      if (session) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/grok`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            messages,
            model,
            stream: GROK_CONFIG.streamingEnabled,
            temperature: GROK_CONFIG.defaultTemperature,
            max_tokens: GROK_CONFIG.defaultMaxTokens,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              
              if (delta) {
                fullContent += delta;
                onChunk(fullContent);
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }

      onComplete();
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, []);

  return { streamMessage };
}
