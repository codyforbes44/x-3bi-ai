import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Image, Volume2, Code, Sparkles, Play, Copy, Download, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const InteractiveDemo = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [codePrompt, setCodePrompt] = useState('');
  const [codeResponse, setCodeResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const demoPrompts = {
    chat: [
      "Explain quantum computing in simple terms",
      "Write a creative story about AI",
      "Help me plan a weekend trip to Paris"
    ],
    image: [
      "A futuristic cityscape at sunset with flying cars",
      "A cozy coffee shop in a magical forest",
      "Abstract art representing the flow of data"
    ],
    code: [
      "Create a responsive navigation component in React",
      "Build a calculator function in Python",
      "Design a database schema for a blog"
    ]
  };

  const handleChatDemo = async () => {
    if (!chatInput.trim()) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: chatInput, provider: 'openai' }
      });
      
      if (error) throw error;
      setChatResponse(data.message);
      
      toast({
        title: "AI Response Generated",
        description: "Chat response ready for review"
      });
    } catch (error) {
      toast({
        title: "Demo Error",
        description: "Try again or use a different prompt",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageDemo = async () => {
    if (!imagePrompt.trim()) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-image', {
        body: { prompt: imagePrompt, model: 'dall-e-3' }
      });
      
      if (error) throw error;
      setImageUrl(data.imageUrl);
      
      toast({
        title: "Image Generated",
        description: "High-quality image created with DALL-E 3"
      });
    } catch (error) {
      toast({
        title: "Demo Error", 
        description: "Try a different image prompt",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeDemo = async () => {
    if (!codePrompt.trim()) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-code', {
        body: { prompt: codePrompt, provider: 'openai' }
      });
      
      if (error) throw error;
      setCodeResponse(data.code);
      
      toast({
        title: "Code Generated",
        description: "Production-ready code created"
      });
    } catch (error) {
      toast({
        title: "Demo Error",
        description: "Try a different code request",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Content copied to clipboard"
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-card backdrop-blur-sm rounded-full px-6 py-3 mb-6">
          <Play className="w-5 h-5 text-primary" />
          <span className="text-foreground font-medium">Interactive Demo</span>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            Live AI
          </Badge>
        </div>
        
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Experience AI Power
          <span className="block text-3xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            In Real-Time
          </span>
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Try our AI capabilities instantly. No signup required - see the results immediately.
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Image Gen
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Code AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  AI Chat Demo
                  <Badge variant="secondary" className="ml-auto">GPT-4o</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Try these prompts:</label>
                  <div className="flex flex-wrap gap-2">
                    {demoPrompts.chat.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setChatInput(prompt)}
                        className="text-xs"
                      >
                        {prompt.slice(0, 25)}...
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything or try a sample prompt..."
                  className="min-h-[100px] bg-background/50"
                />
                
                <Button 
                  onClick={handleChatDemo}
                  disabled={!chatInput.trim() || isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Response
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  AI Response
                  {chatResponse && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(chatResponse)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[200px] p-4 bg-background/50 rounded-lg border border-border">
                  {chatResponse ? (
                    <p className="text-foreground whitespace-pre-wrap">{chatResponse}</p>
                  ) : (
                    <p className="text-muted-foreground italic">AI response will appear here...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="image" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Image Generation
                  <Badge variant="secondary" className="ml-auto">DALL-E 3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Sample prompts:</label>
                  <div className="flex flex-wrap gap-2">
                    {demoPrompts.image.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setImagePrompt(prompt)}
                        className="text-xs"
                      >
                        {prompt.slice(0, 20)}...
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image you want to create..."
                  className="min-h-[100px] bg-background/50"
                />
                
                <Button 
                  onClick={handleImageDemo}
                  disabled={!imagePrompt.trim() || isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Creating Image...
                    </>
                  ) : (
                    <>
                      <Image className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Generated Image
                  {imageUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(imageUrl, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[300px] flex items-center justify-center bg-background/50 rounded-lg border border-border">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt="Generated AI image"
                      className="max-w-full max-h-[300px] object-contain rounded-lg"
                    />
                  ) : (
                    <p className="text-muted-foreground italic">Generated image will appear here...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  AI Code Assistant
                  <Badge variant="secondary" className="ml-auto">GPT-4o</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Example requests:</label>
                  <div className="flex flex-wrap gap-2">
                    {demoPrompts.code.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setCodePrompt(prompt)}
                        className="text-xs"
                      >
                        {prompt.slice(0, 25)}...
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Textarea
                  value={codePrompt}
                  onChange={(e) => setCodePrompt(e.target.value)}
                  placeholder="Describe the code you need..."
                  className="min-h-[100px] bg-background/50"
                />
                
                <Button 
                  onClick={handleCodeDemo}
                  disabled={!codePrompt.trim() || isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Writing Code...
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4 mr-2" />
                      Generate Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Generated Code
                  {codeResponse && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(codeResponse)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[300px] p-4 bg-background/50 rounded-lg border border-border overflow-auto">
                  {codeResponse ? (
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                      <code>{codeResponse}</code>
                    </pre>
                  ) : (
                    <p className="text-muted-foreground italic">Generated code will appear here...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveDemo;