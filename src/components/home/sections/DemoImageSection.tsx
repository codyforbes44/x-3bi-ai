import { OptimizedImage } from "@/components/ui/optimized-image";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Image as ImageIcon, Loader2, Wand2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function DemoImageSection() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDemo = async () => {
    if (!prompt.trim() || prompt.length > 200) {
      toast({
        title: 'Invalid input',
        description: 'Please enter a prompt (max 200 characters)',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setImageUrl('');

    try {
      const { data, error } = await supabase.functions.invoke('demo-image', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw error;
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Demo image error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <ImageIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Image Generation Demo</h3>
          <p className="text-sm text-muted-foreground">Create images with Gemini AI</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Describe your image... (e.g., 'A futuristic city at sunset')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={200}
        />

        <Button 
          onClick={handleDemo} 
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>

        {imageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden border border-border/50">
            <img 
              src={imageUrl} 
              alt="Generated" 
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
