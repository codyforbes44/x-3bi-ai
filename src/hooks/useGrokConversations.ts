import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

export function useGrokConversations(userId: string | undefined) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadConversations = useCallback(async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('grok_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Failed to load conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const createConversation = useCallback(async (model: string): Promise<string | null> => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from('grok_conversations')
        .insert({
          user_id: userId,
          title: 'New Conversation',
          model,
        })
        .select()
        .single();

      if (error) throw error;
      
      setConversations(prev => [data, ...prev]);
      return data.id;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to create new conversation',
        variant: 'destructive',
      });
      return null;
    }
  }, [userId, toast]);

  const deleteConversation = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('grok_conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== id));
      toast({
        title: 'Success',
        description: 'Conversation deleted',
      });
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const updateConversationTitle = useCallback(async (id: string, title: string) => {
    try {
      const { error } = await supabase
        .from('grok_conversations')
        .update({ title })
        .eq('id', id);

      if (error) throw error;
      
      setConversations(prev => prev.map(c => 
        c.id === id ? { ...c, title } : c
      ));
    } catch (error) {
      console.error('Failed to update conversation title:', error);
    }
  }, []);

  const togglePublicSharing = useCallback(async (conversationId: string, currentIsPublic: boolean) => {
    try {
      const { error } = await supabase
        .from('grok_conversations')
        .update({ is_public: !currentIsPublic })
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev => prev.map(c => 
        c.id === conversationId ? { ...c, is_public: !currentIsPublic } : c
      ));

      toast({
        title: 'Success',
        description: !currentIsPublic ? 'Conversation is now public' : 'Conversation is now private',
      });
    } catch (error) {
      console.error('Failed to toggle sharing:', error);
      toast({
        title: 'Error',
        description: 'Failed to update sharing settings',
        variant: 'destructive',
      });
    }
  }, [toast]);

  return {
    conversations,
    isLoading,
    createConversation,
    deleteConversation,
    updateConversationTitle,
    togglePublicSharing,
    refreshConversations: loadConversations,
  };
}
