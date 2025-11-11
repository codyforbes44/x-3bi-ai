import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Trash2, Share2, Menu, LogIn, User } from 'lucide-react';
import { useGrokChat } from '@/hooks/useGrokChat';
import { useGrokConversations } from '@/hooks/useGrokConversations';
import { GrokMessageList } from '@/components/grok/GrokMessageList';
import { GrokInputArea } from '@/components/grok/GrokInputArea';
import { GrokConversationList } from '@/components/grok/GrokConversationList';
import { GROK_MODELS, DEFAULT_GROK_MODEL } from '@/config/grok';
import { useNativeShare } from '@/hooks/useNativeShare';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GrokOfflineIndicator } from '@/components/grok/GrokOfflineIndicator';
import { GrokInstallPrompt } from '@/components/grok/GrokInstallPrompt';
import { useToast } from '@/hooks/use-toast';

export default function GrokStandalone() {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(DEFAULT_GROK_MODEL);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { share } = useNativeShare();
  const { toast } = useToast();
  const { messages, isLoading, sendMessage, clearMessages } = useGrokChat();
  const { conversations } = useGrokConversations(user?.id);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    await sendMessage(input, model);
    setInput('');
  };

  const handleShareConversation = () => {
    const conversation = messages
      .map(m => `${m.role === 'user' ? 'You' : 'Grok'}: ${m.content}`)
      .join('\n\n');
    
    share({
      title: '3BI.AI - Grok Conversation',
      text: conversation
    });
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    setIsHistoryOpen(false);
  };

  const handleDeleteConversation = async (id: string) => {
    // TODO: Implement deletion with IndexedDB
    console.log('Delete conversation:', id);
  };

  const handleToggleSharing = async (id: string, isPublic: boolean) => {
    // Not needed for standalone version
    console.log('Toggle sharing:', id, isPublic);
  };

  const handleCopyShareLink = (token: string) => {
    // Not needed for standalone version
    console.log('Copy share link:', token);
  };

  const handleNewChat = () => {
    clearMessages();
    setCurrentConversationId(null);
    setIsHistoryOpen(false);
    toast({
      title: "New chat started",
      description: "Previous conversation saved to history",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <h2 className="font-semibold">Conversations</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <GrokConversationList
                      conversations={conversations}
                      currentConversation={currentConversationId}
                      copiedToken={null}
                      onSelect={handleSelectConversation}
                      onDelete={handleDeleteConversation}
                      onToggleSharing={handleToggleSharing}
                      onCopyShareLink={handleCopyShareLink}
                    />
                  </div>
                  <div className="p-4 border-t">
                    <Button onClick={handleNewChat} className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      New Chat
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">Grok Chat</span>
          </div>
          
          <div className="flex items-center gap-2">
            <GrokOfflineIndicator />
            {user ? (
              <Button variant="ghost" size="icon" asChild>
                <a href="/profile">
                  <User className="h-5 w-5" />
                </a>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <a href="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6 flex flex-col">
        {/* Model Selector */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[200px]">
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

          {messages.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareConversation}
                disabled={isLoading}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 mb-4">
          <GrokMessageList 
            messages={messages}
            emptyMessage="Start chatting with Grok"
            emptyDescription="Ask anything and get intelligent AI responses"
          />
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-background pb-4">
          <GrokInputArea
            value={input}
            onChange={setInput}
            onSubmit={handleSendMessage}
            isLoading={isLoading}
            placeholder="Message Grok..."
          />
        </div>
      </main>

      {/* Install Prompt */}
      <GrokInstallPrompt />
    </div>
  );
}
