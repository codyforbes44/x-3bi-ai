import { useState } from 'react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Send, Zap, Brain, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const GrokChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('grok-3');
  const [systemPrompt, setSystemPrompt] = useState('You are Grok, a witty and helpful AI assistant created by xAI. You provide accurate, engaging responses with a touch of humor.');
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    
    // Include system prompt if it's the first message
    const messagesToSend = messages.length === 0 && systemPrompt
      ? [{ role: 'system' as const, content: systemPrompt }, userMessage]
      : [...messages, userMessage];
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Calling Grok with:', { model, messageCount: messagesToSend.length });
      
      const { data, error } = await supabase.functions.invoke('grok', {
        body: {
          messages: messagesToSend.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          model,
          temperature: 0.7,
        },
      });

      console.log('Grok response:', { data, error });

      if (error) {
        console.error('Grok error details:', error);
        throw error;
      }

      if (!data?.choices?.[0]?.message?.content) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from Grok');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages([...messages, userMessage, assistantMessage]);
    } catch (error: any) {
      console.error('Error calling Grok:', error);
      toast({
        title: 'Error',
        description: error?.message || 'Failed to get response from Grok. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <CardDescription className="mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Chat with Grok, X's advanced AI assistant with real-time knowledge
            <Badge variant="outline" className="ml-2">Premium</Badge>
          </CardDescription>

          {/* Model Selection & System Prompt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grok-3">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Grok 3
                    </div>
                  </SelectItem>
                  <SelectItem value="grok-vision">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Grok Vision
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">System Prompt</label>
              <Textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Set Grok's personality and behavior..."
                className="min-h-[80px]"
                disabled={messages.length > 0}
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Messages */}
            <div className="min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 p-4 border border-border rounded-lg bg-muted/30">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground text-sm">
                  Start a conversation with Grok
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border rounded-lg p-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Grok anything..."
                className="min-h-[80px]"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="h-[80px] w-[80px]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
