import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useGrokStream } from './useGrokStream';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useGrokChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { streamMessage } = useGrokStream();

  const sendMessage = useCallback(async (content: string, model: string = 'grok-beta') => {
    if (!content.trim()) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Add empty assistant message that we'll update
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    await streamMessage({
      messages: [...messages, userMessage],
      model,
      onChunk: (content) => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content,
          };
          return newMessages;
        });
      },
      onComplete: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        console.error('Grok chat error:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to send message',
          variant: 'destructive',
        });
        // Remove the empty assistant message on error
        setMessages(prev => prev.slice(0, -1));
        setIsLoading(false);
      },
    });
  }, [messages, toast, streamMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
