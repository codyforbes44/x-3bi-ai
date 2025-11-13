import { OptimizedImage } from "@/components/ui/optimized-image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Image, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const MiniImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-image', {
        body: {
          prompt,
          model: 'dall-e-3',
          size: '1024x1024',
          quality: 'standard'
        }
      });

      if (error) throw error;

      if (data.data && data.data[0]?.url) {
        setGeneratedImage(data.data[0].url);
        toast({
          title: "Success",
          description: "Image generated!",
        });
      } else {
        throw new Error('No image URL received');
      }
    } catch (error) {
      console.error('Image generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Image className="w-5 h-5 text-primary" />
            Image Generator
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard?feature=ai-image')}
            className="gap-1 text-xs"
          >
            Full Version
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
        <Badge variant="secondary" className="w-fit text-xs">DALL-E 3</Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 pt-0 gap-3">
        <div className="space-y-3">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image..."
            className="min-h-[60px] text-sm"
            disabled={isGenerating}
          />
          <Button 
            onClick={handleGenerate} 
            disabled={!prompt.trim() || isGenerating}
            className="w-full"
            size="sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Image className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg min-h-0 overflow-hidden">
          {generatedImage ? (
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <Image className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Image appears here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniImageGenerator;
