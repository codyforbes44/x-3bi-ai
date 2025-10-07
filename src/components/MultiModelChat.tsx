import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Send, Copy, Check, Sparkles, Brain, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: Date;
}

interface ModelConfig {
  id: string;
  name: string;
  provider: 'anthropic' | 'openai';
  description: string;
  icon: any;
  color: string;
}

const models: ModelConfig[] = [
  {
    id: "claude-opus-4-1-20250805",
    name: "Claude Opus 4",
    provider: "anthropic",
    description: "Most intelligent, superior reasoning",
    icon: Brain,
    color: "text-purple-500"
  },
  {
    id: "claude-sonnet-4-20250514",
    name: "Claude Sonnet 4",
    provider: "anthropic",
    description: "High performance, exceptional reasoning",
    icon: Sparkles,
    color: "text-blue-500"
  },
  {
    id: "gpt-5-2025-08-07",
    name: "GPT-5",
    provider: "openai",
    description: "Flagship model, best overall",
    icon: Zap,
    color: "text-green-500"
  },
  {
    id: "gpt-5-mini-2025-08-07",
    name: "GPT-5 Mini",
    provider: "openai",
    description: "Fast and cost-efficient",
    icon: Zap,
    color: "text-cyan-500"
  }
];

export default function MultiModelChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (compareMode) {
        // Send to multiple models simultaneously
        const responses = await Promise.all(
          models.slice(0, 3).map(async (model) => {
            const { data, error } = await supabase.functions.invoke('ai-chat', {
              body: {
                messages: [{ role: 'user', content: input }],
                model: model.id,
                provider: model.provider
              }
            });

            if (error) throw error;

            return {
              id: crypto.randomUUID(),
              role: 'assistant' as const,
              content: data.response,
              model: model.name,
              timestamp: new Date()
            };
          })
        );

        setMessages(prev => [...prev, ...responses]);
      } else {
        // Single model response
        const model = models.find(m => m.id === selectedModel)!;
        const { data, error } = await supabase.functions.invoke('ai-chat', {
          body: {
            messages: [...messages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: input }],
            model: model.id,
            provider: model.provider
          }
        });

        if (error) throw error;

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response,
          model: model.name,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      toast.error(error.message || 'Failed to get response');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Copied to clipboard');
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardDescription>
              Compare responses from different AI models or use single model mode
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={compareMode ? "default" : "outline"}
              size="sm"
              onClick={() => setCompareMode(!compareMode)}
            >
              {compareMode ? "Compare Mode" : "Single Mode"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        {!compareMode && (
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center gap-2">
                    <model.icon className={`w-4 h-4 ${model.color}`} />
                    <span>{model.name}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {model.description}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <ScrollArea ref={scrollRef} className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.model && (
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {message.model}
                    </Badge>
                  )}
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.role === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(message.content, message.id)}
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={compareMode ? "Ask all models..." : "Type your message..."}
            className="min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
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
      </CardContent>
    </Card>
  );
}
