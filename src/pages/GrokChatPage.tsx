import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Plus, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { SEO } from '@/components/SEO';
import { useGrokStream } from '@/hooks/useGrokStream';
import { useGrokConversations } from '@/hooks/useGrokConversations';
import { useGrokMessages } from '@/hooks/useGrokMessages';
import { GrokMessageList } from '@/components/grok/GrokMessageList';
import { GrokInputArea } from '@/components/grok/GrokInputArea';
import { GrokConversationList } from '@/components/grok/GrokConversationList';
import { GROK_MODELS } from '@/config/grok';

export default function GrokChatPage() {
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [model, setModel] = useState<string>('grok-beta');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { streamMessage } = useGrokStream();
  
  const {
    conversations,
    createConversation,
    deleteConversation,
    togglePublicSharing,
  } = useGrokConversations(user?.id);
  
  const {
    messages,
    setMessages,
    saveMessage,
    updateConversationTitleFromFirstMessage,
  } = useGrokMessages(currentConversation);

  const handleCreateConversation = async () => {
    const conversationId = await createConversation(model);
    if (conversationId) {
      setCurrentConversation(conversationId);
    }
  };

  const handleDeleteConversation = async (id: string) => {
    if (currentConversation === id) {
      setCurrentConversation(null);
    }
    await deleteConversation(id);
  };

  const handleCopyShareLink = async (shareToken: string) => {
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

  const handleSendMessage = async () => {
    if (!input.trim() || isStreaming || !currentConversation) return;

    const userMessage = { role: 'user' as const, content: input };
    const messagesCopy = [...messages, userMessage];
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    // Save user message and update title if needed
    await saveMessage(currentConversation, 'user', userMessage.content);
    await updateConversationTitleFromFirstMessage(currentConversation, userMessage.content, messages.length);

    // Add empty assistant message that we'll update
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    let assistantContent = '';

    await streamMessage({
      messages: messagesCopy,
      model,
      onChunk: (content) => {
        assistantContent = content;
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
        if (assistantContent) {
          await saveMessage(currentConversation!, 'assistant', assistantContent);
        }
        setIsStreaming(false);
      },
      onError: (error) => {
        console.error('Grok chat error:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to send message',
          variant: 'destructive',
        });
        setMessages(prev => prev.slice(0, -1));
        setIsStreaming(false);
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
                <Button size="sm" onClick={handleCreateConversation}>
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
                onDelete={handleDeleteConversation}
                onToggleSharing={togglePublicSharing}
                onCopyShareLink={handleCopyShareLink}
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
                  <Button onClick={handleCreateConversation} className="mt-4">
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
                    isLoading={isStreaming}
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
