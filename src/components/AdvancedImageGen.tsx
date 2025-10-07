import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Image as ImageIcon, Download, Wand2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StylePreset {
  id: string;
  name: string;
  prompt: string;
  size: string;
  quality: string;
}

export default function AdvancedImageGen() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [quality, setQuality] = useState("auto");
  const [background, setBackground] = useState("auto");
  const [outputFormat, setOutputFormat] = useState("png");
  const [compression, setCompression] = useState([100]);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [savedPresets, setSavedPresets] = useState<StylePreset[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      const requests = Array.from({ length: numberOfImages }, () =>
        supabase.functions.invoke('ai-image', {
          body: {
            prompt,
            size,
            quality,
            background,
            output_format: outputFormat,
            output_compression: compression[0],
            n: 1
          }
        })
      );

      const responses = await Promise.all(requests);
      
      const images = responses
        .filter(({ data, error }) => {
          if (error) {
            console.error('Image generation error:', error);
            return false;
          }
          return true;
        })
        .map(({ data }) => data.data[0].url);

      if (images.length === 0) {
        throw new Error('No images were generated');
      }

      setGeneratedImages(images);
      toast.success(`Generated ${images.length} image(s)!`);
    } catch (error: any) {
      console.error('Image generation error:', error);
      toast.error(error.message || 'Failed to generate images');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${index + 1}.${outputFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Download started');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const savePreset = () => {
    const preset: StylePreset = {
      id: crypto.randomUUID(),
      name: prompt.substring(0, 30) + '...',
      prompt,
      size,
      quality
    };
    const updated = [...savedPresets, preset];
    setSavedPresets(updated);
    localStorage.setItem('imagePresets', JSON.stringify(updated));
    toast.success('Preset saved!');
  };

  const loadPreset = (preset: StylePreset) => {
    setPrompt(preset.prompt);
    setSize(preset.size);
    setQuality(preset.quality);
    toast.success('Preset loaded');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          Generate images with advanced controls using gpt-image-1
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="generate">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="presets">
              Presets
              {savedPresets.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {savedPresets.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Prompt</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1024x1024">1024 × 1024 (Square)</SelectItem>
                    <SelectItem value="1536x1024">1536 × 1024 (Landscape)</SelectItem>
                    <SelectItem value="1024x1536">1024 × 1536 (Portrait)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quality</label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Background</label>
                <Select value={background} onValueChange={setBackground}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="transparent">Transparent</SelectItem>
                    <SelectItem value="opaque">Opaque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Compression: {compression[0]}%
                </label>
                <Slider
                  value={compression}
                  onValueChange={setCompression}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Number of Images: {numberOfImages}
              </label>
              <Slider
                value={[numberOfImages]}
                onValueChange={(v) => setNumberOfImages(v[0])}
                min={1}
                max={4}
                step={1}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Generate {numberOfImages > 1 ? `${numberOfImages} Images` : 'Image'}
                  </>
                )}
              </Button>
              
              {prompt && (
                <Button variant="outline" onClick={savePreset}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preset
                </Button>
              )}
            </div>

            {generatedImages.length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Generated ${index + 1}`}
                        className="w-full rounded-lg border"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDownload(imageUrl, index)}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="presets" className="space-y-4 mt-4">
            {savedPresets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No saved presets yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {savedPresets.map((preset) => (
                  <Card key={preset.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{preset.name}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{preset.size}</Badge>
                          <Badge variant="outline">{preset.quality}</Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadPreset(preset)}
                      >
                        Load
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
