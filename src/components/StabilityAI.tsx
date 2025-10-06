import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function StabilityAI() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [model, setModel] = useState("sd3-large");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [cfgScale, setCfgScale] = useState(7);
  const { toast } = useToast();

  const models = [
    { value: "sd3-large", label: "Stable Diffusion 3 Large" },
    { value: "sd3-medium", label: "Stable Diffusion 3 Medium" },
    { value: "stable-image-ultra", label: "Stable Image Ultra" },
    { value: "stable-image-core", label: "Stable Image Core" },
  ];

  const aspectRatios = [
    "1:1", "16:9", "21:9", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21"
  ];

  const generate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please provide a prompt",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await supabase.functions.invoke("stability-ai", {
        body: {
          prompt: prompt.trim(),
          negative_prompt: negativePrompt.trim() || undefined,
          model,
          aspect_ratio: aspectRatio,
          cfg_scale: cfgScale,
        },
      });

      if (response.error) throw response.error;

      setResult(response.data.image);
      toast({
        title: "Success",
        description: "Image generated successfully!",
      });
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Stability AI</CardTitle>
            <CardDescription>
              Professional image generation with Stable Diffusion 3
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Prompt</Label>
            <Textarea
              placeholder="A majestic mountain landscape at sunset..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Negative Prompt (Optional)</Label>
            <Textarea
              placeholder="blurry, low quality, distorted..."
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatios.map((ratio) => (
                    <SelectItem key={ratio} value={ratio}>
                      {ratio}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>CFG Scale: {cfgScale}</Label>
              <Slider
                value={[cfgScale]}
                onValueChange={(v) => setCfgScale(v[0])}
                min={1}
                max={20}
                step={0.5}
              />
            </div>
          </div>

          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <Label>Generated Image</Label>
            <img src={result} alt="Generated" className="w-full rounded-lg border" />
            <Button
              variant="outline"
              onClick={() => {
                const a = document.createElement("a");
                a.href = result;
                a.download = "stability-ai-image.png";
                a.click();
              }}
              className="w-full"
            >
              Download Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
