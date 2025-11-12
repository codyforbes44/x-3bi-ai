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
    console.log('[useGrokStream] Starting stream request', { model, messageCount: messages.length });
    
    try {
      // Try to get session, but don't require it (guest mode)
      const { data: { session } } = await supabase.auth.getSession();

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add auth header if available
      if (session) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
        console.log('[useGrokStream] Using authenticated mode');
      } else {
        console.log('[useGrokStream] Using guest mode');
      }

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/grok`;
      console.log('[useGrokStream] Calling edge function:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messages,
          model,
          stream: GROK_CONFIG.streamingEnabled,
          temperature: GROK_CONFIG.defaultTemperature,
          max_tokens: GROK_CONFIG.defaultMaxTokens,
        }),
      });

      console.log('[useGrokStream] Response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Failed to get response';
        let errorDetails: any = {};
        
        try {
          errorDetails = await response.json();
          errorMessage = errorDetails.error || errorDetails.message || errorMessage;
          
          // Handle rate limit errors specifically
          if (response.status === 429) {
            console.error('[useGrokStream] Rate limit exceeded:', errorDetails);
            throw new Error(errorDetails.message || 'Daily message limit reached. Please try again tomorrow.');
          }
          
          console.error('[useGrokStream] API error:', response.status, errorDetails);
        } catch (jsonError) {
          const textError = await response.text();
          console.error('[useGrokStream] Non-JSON error response:', textError);
          errorMessage = textError || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      if (!response.body) {
        console.error('[useGrokStream] No response body');
        throw new Error('No response body');
      }

      console.log('[useGrokStream] Starting to read stream');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let chunkCount = 0;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log('[useGrokStream] Stream complete, total chunks:', chunkCount);
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              
              if (data === '[DONE]') {
                console.log('[useGrokStream] Received [DONE] signal');
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                
                if (delta) {
                  chunkCount++;
                  fullContent += delta;
                  onChunk(fullContent);
                }
              } catch (e) {
                console.error('[useGrokStream] Failed to parse SSE data:', e, 'Line:', line);
              }
            }
          }
        }

        console.log('[useGrokStream] Stream finished successfully');
        onComplete();
      } catch (streamError) {
        console.error('[useGrokStream] Stream reading error:', streamError);
        throw streamError;
      }
    } catch (error) {
      console.error('[useGrokStream] Error in streamMessage:', error);
      onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, []);

  return { streamMessage };
}
