import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  title: string;
  model: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  share_token: string;
}

const STORAGE_KEY = 'grok_guest_conversations';

function generateId(): string {
  return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function loadFromStorage(): Conversation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load guest conversations:', error);
    return [];
  }
}

function saveToStorage(conversations: Conversation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Failed to save guest conversations:', error);
  }
}

export function useGrokGuestConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    const loaded = loadFromStorage();
    setConversations(loaded);
    setIsLoading(false);
  }, []);

  const createConversation = useCallback(async (model: string): Promise<string | null> => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Conversation',
      model,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_public: false,
      share_token: '',
    };

    const updated = [newConversation, ...conversations];
    setConversations(updated);
    saveToStorage(updated);
    
    return newConversation.id;
  }, [conversations]);

  const deleteConversation = useCallback(async (id: string) => {
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    saveToStorage(updated);
    
    // Also remove messages for this conversation
    try {
      localStorage.removeItem(`grok_guest_messages_${id}`);
    } catch (error) {
      console.error('Failed to remove guest messages:', error);
    }
    
    toast({
      title: 'Success',
      description: 'Conversation deleted',
    });
  }, [conversations, toast]);

  const updateConversationTitle = useCallback(async (id: string, title: string) => {
    const updated = conversations.map(c => 
      c.id === id ? { ...c, title, updated_at: new Date().toISOString() } : c
    );
    setConversations(updated);
    saveToStorage(updated);
  }, [conversations]);

  const togglePublicSharing = useCallback(async (conversationId: string, currentIsPublic: boolean) => {
    toast({
      title: 'Sign in Required',
      description: 'Please sign in to share conversations',
      variant: 'destructive',
    });
  }, [toast]);

  return {
    conversations,
    isLoading,
    createConversation,
    deleteConversation,
    updateConversationTitle,
    togglePublicSharing,
    refreshConversations: () => {}, // No-op for guest mode
  };
}
