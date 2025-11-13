import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NeonCard } from "@/components/ui/neon-card";
import { AccentDot } from "@/components/ui/accent-dot";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. I can help you with coding, creative writing, analysis, and much more. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          model: 'google/gemini-2.5-flash' // Modern Lovable AI model
        }
      });

      if (error) {
        // Handle specific error types
        if (error.message?.includes('Rate limit')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Too many requests. Please wait a moment and try again.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        
        if (error.message?.includes('credits depleted') || error.message?.includes('Payment required')) {
          toast({
            title: "AI Credits Depleted",
            description: "Please add funds to your Lovable workspace to continue using AI features.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        
        throw error;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <NeonCard variant="purple" glass={true} glow={true} size="lg" className="h-[600px] md:h-[700px] flex flex-col">
      <div className="pb-3 md:pb-4 flex items-center justify-between p-4 md:p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <AccentDot color="purple" />
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-500" />
              AI Chat
            </h3>
          </div>
        </div>
        <Badge variant="neon-purple" className="text-xs">Gemini 2.5 Flash</Badge>
      </div>
      
      <ScrollArea className="flex-1 px-3 md:px-6 py-4" ref={scrollAreaRef}>
        <div className="space-y-3 md:space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 md:gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 md:gap-3 max-w-[85%] md:max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-purple-600' 
                    : 'bg-purple-600/20'
                }`}>
                  {message.role === 'user' ? <User className="w-3 h-3 md:w-4 md:h-4 text-white" /> : <Bot className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />}
                </div>
                <div className={`rounded-lg p-2.5 md:p-3 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'glass-card border border-white/10'
                }`}>
                  <p className="text-xs md:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <span className="text-[10px] md:text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 md:gap-3 justify-start">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                <Bot className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
              </div>
              <div className="glass-card border border-white/10 rounded-lg p-2.5 md:p-3">
                <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin text-purple-500" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-3 md:p-6 pt-3 md:pt-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 text-sm md:text-base"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-9 w-9 md:h-10 md:w-10 bg-purple-600 hover:bg-purple-700"
          >
            <Send className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </div>
    </NeonCard>
  );
};

export default AIChat;