import { useState } from "react";
import { Sparkles, Palette, Image as ImageIcon, Wand2, Download } from "lucide-react";
import { StyleWheel } from "./StyleWheel";
import { IconButton } from "./IconButton";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { OptimizedImage } from "@/components/ui/optimized-image";

export function VisualImageGenerator() {
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-image', {
        body: {
          prompt: `${selectedStyle} style: ${prompt}`,
          model: 'dall-e-3',
          size: '1024x1024',
          quality: 'standard'
        }
      });

      if (error) throw error;

      if (data.data && data.data[0]?.url) {
        setGeneratedImage(data.data[0].url);
      } else {
        throw new Error('No image URL received');
      }
    } catch (error) {
      console.error('Image generation error:', error);
      toast({
        description: "⚠️",
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
      link.download = `ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 p-6">
      {/* Visual Style Selector */}
      <div className="flex justify-center">
        <StyleWheel onSelect={setSelectedStyle} selected={selectedStyle} />
      </div>

      {/* Prompt Input - Icon Only */}
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "placeholder:text-muted-foreground/50"
          )}
          placeholder="..."
          disabled={isGenerating}
        />
        <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
      </div>

      {/* Action Icons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center transition-all",
            !prompt.trim() || isGenerating
              ? "bg-muted/50 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:scale-110 shadow-lg shadow-primary/20"
          )}
          aria-label="Generate"
        >
          <Wand2 className="w-10 h-10" />
        </button>
        {generatedImage && (
          <button
            onClick={handleDownload}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all",
              "bg-background/50 hover:bg-muted/50 hover:scale-110"
            )}
            aria-label="Download"
          >
            <Download className="w-10 h-10" />
          </button>
        )}
      </div>

      {/* Generated Image Display */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-4">
            <Wand2 className="w-16 h-16 text-primary animate-pulse" />
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        ) : generatedImage ? (
          <OptimizedImage
            src={generatedImage}
            alt="Generated"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
          />
        ) : (
          <ImageIcon className="w-32 h-32 text-muted-foreground/20" />
        )}
      </div>
    </div>
  );
}
