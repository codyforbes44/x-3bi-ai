import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Sparkles, Trash2, Plus, MessageSquare, Share2, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';

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
  const [model, setModel] = useState('grok-beta');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !currentConversation) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Save user message
    await saveMessage(currentConversation, 'user', userMessage.content);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/grok`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            model,
            stream: true,
            temperature: 0.7,
            max_tokens: 4096,
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
      let assistantMessage = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

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
                assistantMessage += delta;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: assistantMessage,
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }

      // Save assistant message
      if (assistantMessage) {
        await saveMessage(currentConversation, 'assistant', assistantMessage);
      }
    } catch (error: any) {
      console.error('Grok chat error:', error);
      toast({
        title: 'Error',
        description: error?.message || 'Failed to send message',
        variant: 'destructive',
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Grok Chat - xAI Conversation"
        description="Chat with xAI's Grok model with streaming responses and conversation history"
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
              <ScrollArea className="h-[600px]">
                {conversations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No conversations yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          currentConversation === conv.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                        onClick={() => setCurrentConversation(conv.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium truncate">{conv.title}</p>
                              {conv.is_public && (
                                <Badge variant="secondary" className="text-xs">Public</Badge>
                              )}
                            </div>
                            <p className="text-xs opacity-70">
                              {new Date(conv.updated_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePublicSharing(conv.id, conv.is_public);
                              }}
                              className="h-6 w-6 p-0"
                              title={conv.is_public ? 'Make private' : 'Make public'}
                            >
                              <Share2 className={`w-3 h-3 ${conv.is_public ? 'text-green-500' : ''}`} />
                            </Button>
                            {conv.is_public && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyShareLink(conv.share_token);
                                }}
                                className="h-6 w-6 p-0"
                                title="Copy share link"
                              >
                                {copiedToken === conv.share_token ? (
                                  <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conv.id);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
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
                    <SelectItem value="grok-beta">Grok Beta</SelectItem>
                    <SelectItem value="grok-2">Grok 2</SelectItem>
                    <SelectItem value="grok-2-mini">Grok 2 Mini</SelectItem>
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
                  <ScrollArea ref={scrollRef} className="h-[500px] pr-4">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                        <Sparkles className="w-12 h-12 mb-4 opacity-50" />
                        <p className="text-lg font-medium">Start a conversation</p>
                        <p className="text-sm mt-2">
                          Ask anything and get intelligent responses
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                message.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={message.role === 'user' ? 'secondary' : 'outline'}>
                                  {message.role === 'user' ? 'You' : 'Grok'}
                                </Badge>
                              </div>
                              <p className="whitespace-pre-wrap break-words">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>

                  <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="space-y-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="min-h-[100px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Press Enter to send, Shift+Enter for new line
                      </p>
                      <Button type="submit" disabled={isLoading || !input.trim()}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
