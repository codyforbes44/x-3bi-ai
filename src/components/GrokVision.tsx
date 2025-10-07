import { useState } from 'react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Eye, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string | Array<{ type: 'text' | 'image_url'; text?: string; image_url?: { url: string } }>;
}

export const GrokVision = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setImageUrl('');
  };

  const sendMessage = async () => {
    if ((!input.trim() && !imageFile && !imageUrl) || isLoading) return;

    let userContent: any;
    
    // Build message content based on whether we have an image
    if (imageFile || imageUrl) {
      const imageSource = imageFile ? imagePreview : imageUrl;
      userContent = [
        { type: 'text', text: input || 'What do you see in this image?' },
        { type: 'image_url', image_url: { url: imageSource } }
      ];
    } else {
      userContent = input;
    }

    const userMessage: Message = { 
      role: 'user', 
      content: userContent
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    clearImage();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('grok', {
        body: {
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          model: 'grok-vision-beta', // Grok Vision model
          temperature: 0.7,
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Error calling Grok Vision:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response from Grok Vision. Please try again.',
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

  const renderMessageContent = (content: Message['content']) => {
    if (typeof content === 'string') {
      return <p className="text-sm whitespace-pre-wrap">{content}</p>;
    }
    
    return (
      <div className="space-y-2">
        {content.map((item, idx) => (
          <div key={idx}>
            {item.type === 'text' && item.text && (
              <p className="text-sm whitespace-pre-wrap">{item.text}</p>
            )}
            {item.type === 'image_url' && item.image_url && (
              <img 
                src={item.image_url.url} 
                alt="Uploaded" 
                className="max-w-xs rounded-lg border border-border"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <CardDescription className="mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Analyze images and get insights from Grok Vision
            <Badge variant="outline" className="ml-2">Vision AI</Badge>
          </CardDescription>

          <div className="space-y-4">
            {/* Messages */}
            <div className="min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 p-4 border border-border rounded-lg bg-muted/30">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground text-sm">
                  Upload an image or provide an image URL to analyze with Grok Vision
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
                    {renderMessageContent(message.content)}
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

            {/* Image Input */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </span>
                    </Button>
                  </label>
                </div>
                <div className="flex-1">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste image URL..."
                    disabled={!!imageFile}
                  />
                </div>
              </div>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-xs rounded-lg border border-border"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={clearImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Text Input */}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the image or provide additional context..."
                className="min-h-[80px]"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || (!input.trim() && !imageFile && !imageUrl)}
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
