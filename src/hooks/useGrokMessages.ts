import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useGrokMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('grok_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data?.map(msg => ({ 
        role: msg.role as 'user' | 'assistant', 
        content: msg.content 
      })) || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const saveMessage = useCallback(async (
    conversationId: string, 
    role: 'user' | 'assistant', 
    content: string
  ) => {
    try {
      const { error } = await supabase
        .from('grok_messages')
        .insert({
          conversation_id: conversationId,
          role,
          content,
        });

      if (error) throw error;

      // Update conversation's updated_at timestamp
      await supabase
        .from('grok_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  }, []);

  const updateConversationTitleFromFirstMessage = useCallback(async (
    conversationId: string,
    content: string,
    currentMessageCount: number
  ) => {
    if (currentMessageCount > 0) return;

    try {
      const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
      await supabase
        .from('grok_conversations')
        .update({ title })
        .eq('id', conversationId);
    } catch (error) {
      console.error('Failed to update conversation title:', error);
    }
  }, []);

  return {
    messages,
    isLoading,
    setMessages,
    saveMessage,
    updateConversationTitleFromFirstMessage,
    refreshMessages: loadMessages,
  };
}
