import { useState, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function getStorageKey(conversationId: string): string {
  return `grok_guest_messages_${conversationId}`;
}

function loadMessages(conversationId: string): Message[] {
  try {
    const stored = localStorage.getItem(getStorageKey(conversationId));
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load guest messages:', error);
    return [];
  }
}

function saveMessages(conversationId: string, messages: Message[]) {
  try {
    localStorage.setItem(getStorageKey(conversationId), JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save guest messages:', error);
  }
}

export function useGrokGuestMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMessagesCallback = useCallback(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    
    setIsLoading(true);
    const loaded = loadMessages(conversationId);
    setMessages(loaded);
    setIsLoading(false);
  }, [conversationId]);

  useEffect(() => {
    loadMessagesCallback();
  }, [loadMessagesCallback]);

  const saveMessage = useCallback(async (
    conversationId: string, 
    role: 'user' | 'assistant', 
    content: string
  ) => {
    const currentMessages = loadMessages(conversationId);
    const updatedMessages = [...currentMessages, { role, content }];
    saveMessages(conversationId, updatedMessages);
  }, []);

  const updateConversationTitleFromFirstMessage = useCallback(async (
    conversationId: string,
    content: string,
    currentMessageCount: number
  ) => {
    if (currentMessageCount > 0) return;

    // Update title in conversations list
    try {
      const conversationsKey = 'grok_guest_conversations';
      const stored = localStorage.getItem(conversationsKey);
      if (stored) {
        const conversations = JSON.parse(stored);
        const updated = conversations.map((c: any) => {
          if (c.id === conversationId) {
            const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
            return { ...c, title, updated_at: new Date().toISOString() };
          }
          return c;
        });
        localStorage.setItem(conversationsKey, JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Failed to update guest conversation title:', error);
    }
  }, []);

  return {
    messages,
    isLoading,
    setMessages,
    saveMessage,
    updateConversationTitleFromFirstMessage,
    refreshMessages: loadMessagesCallback,
  };
}
