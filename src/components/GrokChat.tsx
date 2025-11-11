import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Trash2, Share2 } from 'lucide-react';
import { useGrokChat } from '@/hooks/useGrokChat';
import { GrokMessageList } from './grok/GrokMessageList';
import { GrokInputArea } from './grok/GrokInputArea';
import { GROK_MODELS, DEFAULT_GROK_MODEL } from '@/config/grok';
import { useNativeShare } from '@/hooks/useNativeShare';

export const GrokChat = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(DEFAULT_GROK_MODEL);
  const { messages, isLoading, sendMessage, clearMessages } = useGrokChat();
  const { share } = useNativeShare();

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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>Grok Chat</CardTitle>
              <CardDescription>
                Chat with xAI's Grok model with streaming responses
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
            {messages.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareConversation}
                  disabled={isLoading}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearMessages}
                  disabled={isLoading}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <GrokMessageList messages={messages} />
        <GrokInputArea
          value={input}
          onChange={setInput}
          onSubmit={handleSendMessage}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};
