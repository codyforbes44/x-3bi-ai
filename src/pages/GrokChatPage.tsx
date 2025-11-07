import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Plus, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';
import { useGrokStream } from '@/hooks/useGrokStream';
import { GrokMessageList } from '@/components/grok/GrokMessageList';
import { GrokInputArea } from '@/components/grok/GrokInputArea';
import { GrokConversationList } from '@/components/grok/GrokConversationList';
import { GROK_MODELS } from '@/config/grok';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  model: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  share_token: string;
}

export default function GrokChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<string>('grok-beta');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { streamMessage } = useGrokStream();

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation);
    }
  }, [currentConversation]);


  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('grok_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('grok_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data?.map(msg => ({ role: msg.role as 'user' | 'assistant', content: msg.content })) || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const createNewConversation = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('grok_conversations')
        .insert({
          user_id: user.id,
          title: 'New Conversation',
          model,
        })
        .select()
        .single();

      if (error) throw error;
      
      setConversations(prev => [data, ...prev]);
      setCurrentConversation(data.id);
      setMessages([]);
    } catch (error) {
      console.error('Failed to create conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to create new conversation',
        variant: 'destructive',
      });
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('grok_conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== id));
      if (currentConversation === id) {
        setCurrentConversation(null);
        setMessages([]);
      }

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
  };

  const togglePublicSharing = async (conversationId: string, currentIsPublic: boolean) => {
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
  };

  const copyShareLink = async (shareToken: string) => {
    const shareUrl = `${window.location.origin}/grok-chat/shared/${shareToken}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedToken(shareToken);
      setTimeout(() => setCopiedToken(null), 2000);
      
      toast({
        title: 'Link Copied',
        description: 'Share link copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const saveMessage = async (conversationId: string, role: 'user' | 'assistant', content: string) => {
    try {
      const { error } = await supabase
        .from('grok_messages')
        .insert({
          conversation_id: conversationId,
          role,
          content,
        });

      if (error) throw error;

      // Update conversation's updated_at
      await supabase
        .from('grok_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      // Update title if it's the first user message
      if (role === 'user' && messages.length === 0) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        await supabase
          .from('grok_conversations')
          .update({ title })
          .eq('id', conversationId);
        
        setConversations(prev => prev.map(c => 
          c.id === conversationId ? { ...c, title } : c
        ));
      }
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !currentConversation) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Save user message
    await saveMessage(currentConversation, 'user', userMessage.content);

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
      onComplete: async () => {
        // Save assistant message
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === 'assistant' && lastMessage.content) {
          await saveMessage(currentConversation!, 'assistant', lastMessage.content);
        }
        setIsLoading(false);
      },
      onError: (error) => {
        console.error('Grok chat error:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to send message',
          variant: 'destructive',
        });
        setMessages(prev => prev.slice(0, -1));
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <SEO
        title="Grok Chat - xAI Conversation"
        description="Chat with xAI's Grok model with streaming responses and conversation history"
        keywords={['Grok AI', 'xAI chat', 'AI conversation', 'streaming chat']}
        ogImage="https://3bi.ai/og/grok-chat.png"
        canonical="https://3bi.ai/grok-chat"
      />
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Conversations Sidebar */}
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Button size="sm" onClick={createNewConversation}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <GrokConversationList
                conversations={conversations}
                currentConversation={currentConversation}
                copiedToken={copiedToken}
                onSelect={setCurrentConversation}
                onDelete={deleteConversation}
                onToggleSharing={togglePublicSharing}
                onCopyShareLink={copyShareLink}
              />
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>Grok Chat</CardTitle>
                    <CardDescription>
                      Chat with xAI's Grok model
                    </CardDescription>
                  </div>
                </div>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GROK_MODELS.map((modelOption) => {
                      const Icon = modelOption.icon;
                      return (
                        <SelectItem key={modelOption.id} value={modelOption.id}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {modelOption.name}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!currentConversation ? (
                <div className="flex flex-col items-center justify-center h-[500px] text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium">No conversation selected</p>
                  <p className="text-sm mt-2">
                    Create a new conversation to get started
                  </p>
                  <Button onClick={createNewConversation} className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    New Conversation
                  </Button>
                </div>
              ) : (
                <>
                  <GrokMessageList
                    messages={messages}
                    emptyMessage="Start a conversation"
                    emptyDescription="Ask anything and get intelligent responses"
                  />
                  <GrokInputArea
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSendMessage}
                    isLoading={isLoading}
                    disabled={!currentConversation}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
