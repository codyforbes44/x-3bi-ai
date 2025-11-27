import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Brain, 
  Send, 
  Image as ImageIcon, 
  FileText, 
  Zap, 
  Sparkles, 
  Copy,
  Download,
  Upload,
  Search,
  Clock,
  TrendingUp,
  BookOpen
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  provider?: string;
  images?: string[];
}

const AdvancedAI: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your advanced AI assistant powered by Claude 4. I excel at complex reasoning, analysis, and creative tasks. I can also search the web in real-time and analyze images. How can I assist you today?',
      timestamp: new Date(),
      model: 'claude-sonnet-4-20250514',
      provider: 'anthropic'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('anthropic');
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-4-20250514');
  const [searchType, setSearchType] = useState('web');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('chat');
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const providers = {
    anthropic: {
      name: 'Claude 4',
      models: [
        { value: 'claude-sonnet-4-5-20250514', label: 'Claude 4.5 Sonnet (Recommended)' },
        { value: 'claude-opus-4-1-20250805', label: 'Claude 4.1 Opus (Most Capable)' },
        { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku (Fast)' }
      ],
      color: 'text-purple-500',
      badge: 'Primary AI'
    },
    perplexity: {
      name: 'Perplexity',
      models: [
        { value: 'llama-3.1-sonar-huge-128k-online', label: 'Sonar Huge (Most Powerful)' },
        { value: 'llama-3.1-sonar-large-128k-online', label: 'Sonar Large (Balanced)' },
        { value: 'llama-3.1-sonar-small-128k-online', label: 'Sonar Small (Fast)' }
      ],
      color: 'text-blue-500',
      badge: 'Real-time Web'
    },
    openai: {
      name: 'OpenAI',
      models: [
        { value: 'gpt-4o', label: 'GPT-4o (Vision + Text)' },
        { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast)' }
      ],
      color: 'text-green-500',
      badge: 'Multi-modal'
    }
  };

  const searchTypes = [
    { value: 'web', label: 'Web Search', icon: Search },
    { value: 'news', label: 'Latest News', icon: TrendingUp },
    { value: 'research', label: 'Deep Research', icon: BookOpen },
    { value: 'quick', label: 'Quick Answer', icon: Zap }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          const base64Data = base64.split(',')[1]; // Remove data:image/jpeg;base64, prefix
          setUploadedImages(prev => [...prev, base64Data]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      images: uploadedImages.length > 0 ? uploadedImages : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response;
      
      if (activeTab === 'search') {
        response = await supabase.functions.invoke('realtime-search', {
          body: {
            query: input,
            searchType,
            includeImages: false
          }
        });
      } else {
        response = await supabase.functions.invoke('advanced-ai', {
          body: {
            message: input,
            model: selectedModel,
            provider: selectedProvider,
            images: uploadedImages.length > 0 ? uploadedImages : undefined,
            tools: getAvailableTools()
          }
        });
      }

      if (response.error) throw response.error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.result || response.data.message,
        timestamp: new Date(),
        model: response.data.model,
        provider: response.data.provider || (activeTab === 'search' ? 'perplexity' : selectedProvider)
      };

      setMessages(prev => [...prev, assistantMessage]);
      setUploadedImages([]); // Clear uploaded images after sending

      toast({
        title: "AI Response Generated",
        description: `Response from ${providers[assistantMessage.provider as keyof typeof providers]?.name || assistantMessage.provider}`,
      });

    } catch (error) {
      console.error('Advanced AI error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableTools = () => {
    // Define available tools for function calling
    return [
      {
        type: 'function',
        function: {
          name: 'search_web',
          description: 'Search the web for real-time information',
          parameters: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'The search query' },
              searchType: { type: 'string', enum: ['web', 'news', 'research', 'quick'] }
            },
            required: ['query']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'analyze_data',
          description: 'Analyze data and provide insights',
          parameters: {
            type: 'object',
            properties: {
              data: { type: 'string', description: 'The data to analyze' },
              analysisType: { type: 'string', description: 'Type of analysis needed' }
            },
            required: ['data']
          }
        }
      }
    ];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Content copied to clipboard"
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardDescription>
            Access Claude 4, Perplexity real-time search, and advanced AI capabilities with function calling and image analysis.
          </CardDescription>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            Multi-Modal
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="search">Real-time Search</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 flex flex-col">
            {/* AI Provider Controls */}
            <div className="px-6 py-4 border-b">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">AI Provider</label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(providers).map(([key, provider]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <Brain className={`w-4 h-4 ${provider.color}`} />
                            {provider.name}
                            <Badge variant="secondary" className="text-xs">
                              {provider.badge}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {providers[selectedProvider as keyof typeof providers]?.models.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="search" className="flex-1 flex flex-col">
            {/* Search Controls */}
            <div className="px-6 py-4 border-b">
              <div>
                <label className="text-sm font-medium mb-2 block">Search Type</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {searchTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="w-4 h-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Messages Area */}
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {message.role === 'user' ? '👤' : '🤖'}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      
                      {message.images && message.images.length > 0 && (
                        <div className="mt-2 flex gap-2">
                          {message.images.map((img, index) => (
                            <img 
                              key={index}
                              src={`data:image/jpeg;base64,${img}`} 
                              alt={`Uploaded ${index + 1}`}
                              className="w-16 h-16 object-cover rounded border"
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.model && (
                            <Badge variant="secondary" className="text-xs">
                              {message.model}
                            </Badge>
                          )}
                        </div>
                        {message.role === 'assistant' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(message.content)}
                            className="h-6 px-2"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 pt-4 border-t">
            {/* Image Upload */}
            {uploadedImages.length > 0 && (
              <div className="mb-4 flex gap-2 flex-wrap">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={`data:image/jpeg;base64,${img}`} 
                      alt={`Upload ${index + 1}`}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 w-6 h-6 p-0"
                      onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={activeTab === 'search' ? "Search the web in real-time..." : "Ask anything or describe what you need help with..."}
                className="flex-1 min-h-[60px] max-h-[120px]"
                disabled={isLoading}
              />
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || activeTab === 'search'}
                  title="Upload images"
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim() || isLoading}
                  size="icon"
                >
                  {isLoading ? (
                    <Zap className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedAI;