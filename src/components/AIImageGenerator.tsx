import { OptimizedImage } from "@/components/ui/optimized-image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NeonCard } from "@/components/ui/neon-card";
import { AccentDot } from "@/components/ui/accent-dot";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Image, Loader2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('dall-e-3');
  const [size, setSize] = useState('1024x1024');
  const [quality, setQuality] = useState('standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-image', {
        body: {
          prompt,
          model,
          size,
          quality
        }
      });

      if (error) throw error;

      if (data.data && data.data[0]?.url) {
        setGeneratedImage(data.data[0].url);
        toast({
          title: "Success",
          description: "Image generated successfully!",
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

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <NeonCard variant="pink" glass={true} glow={true} size="lg" className="h-[700px] md:h-[800px] flex flex-col">
      <div className="pb-3 md:pb-4 flex items-center justify-between p-4 md:p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <AccentDot color="pink" />
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
              <Image className="h-5 w-5 text-pink-500" />
              AI Image Generator
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">Create stunning images with AI</p>
          </div>
        </div>
        <Badge variant="neon-pink" className="text-xs">DALL-E 3</Badge>
      </div>
      <div className="flex-1 flex flex-col space-y-3 md:space-y-4 min-h-0 p-4 md:p-6">
        <div className="space-y-3 md:space-y-4">
          <div>
            <label className="text-xs md:text-sm font-medium mb-2 block">Prompt</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="min-h-[60px] md:min-h-[80px] text-sm"
              disabled={isGenerating}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="text-xs md:text-sm font-medium mb-2 block">Model</label>
              <Select value={model} onValueChange={setModel} disabled={isGenerating}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                  <SelectItem value="dall-e-2">DALL-E 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-xs md:text-sm font-medium mb-2 block">Size</label>
              <Select value={size} onValueChange={setSize} disabled={isGenerating}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024x1024">Square</SelectItem>
                  <SelectItem value="1792x1024">Landscape</SelectItem>
                  <SelectItem value="1024x1792">Portrait</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs md:text-sm font-medium mb-2 block">Quality</label>
            <Select value={quality} onValueChange={setQuality} disabled={isGenerating}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="hd">HD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={!prompt.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Image className="w-4 h-4 mr-2" />
                Generate Image
              </>
            )}
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg min-h-0 overflow-hidden">
          {generatedImage ? (
            <div className="relative w-full h-full p-2 md:p-4">
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full h-full object-contain rounded-lg"
              />
              <Button
                onClick={handleDownload}
                className="absolute top-3 right-3 md:top-4 md:right-4"
                size="sm"
                variant="secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          ) : (
            <div className="text-center text-muted-foreground p-4">
              <Image className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 opacity-50" />
              <p className="text-xs md:text-sm">Generated image will appear here</p>
            </div>
          )}
        </NeonCard>
  );
};

export default AIImageGenerator;