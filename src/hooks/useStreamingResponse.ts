import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface StreamingOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: Error) => void;
}

export function useStreamingResponse() {
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const streamResponse = useCallback(async (
    endpoint: string,
    body: any,
    options: StreamingOptions = {}
  ) => {
    setIsStreaming(true);
    setStreamingText('');
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body, stream: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              
              if (content) {
                fullText += content;
                setStreamingText(fullText);
                options.onChunk?.(content);
              }
            } catch (e) {
              // Skip invalid JSON chunks
            }
          }
        }
      }

      options.onComplete?.(fullText);
      return fullText;
    } catch (error: any) {
      console.error('Streaming error:', error);
      toast.error(error.message || 'Failed to stream response');
      options.onError?.(error);
      throw error;
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const resetStream = useCallback(() => {
    setStreamingText('');
    setIsStreaming(false);
  }, []);

  return {
    streamingText,
    isStreaming,
    streamResponse,
    resetStream,
  };
}
