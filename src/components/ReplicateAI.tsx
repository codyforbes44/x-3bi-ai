import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, Video, Image as ImageIcon, Wand2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReplicateAI() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [predictionId, setPredictionId] = useState("");
  const [selectedModel, setSelectedModel] = useState("flux-schnell");
  const { toast } = useToast();

  const models = {
    "flux-schnell": {
      name: "FLUX Schnell",
      description: "Ultra-fast image generation",
      type: "image",
    },
    "flux-pro": {
      name: "FLUX Pro",
      description: "Highest quality image generation",
      type: "image",
    },
    "stable-video": {
      name: "Stable Video Diffusion",
      description: "Image to video generation",
      type: "video",
    },
    "runway-gen3": {
      name: "RunwayML Gen-3",
      description: "Advanced video generation",
      type: "video",
    },
    "real-esrgan": {
      name: "Real-ESRGAN",
      description: "4x image upscaling",
      type: "upscale",
    },
  };

  const generate = async () => {
    if (!prompt && !imageUrl) {
      toast({
        title: "Input Required",
        description: "Please provide a prompt or image URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await supabase.functions.invoke("replicate-ai", {
        body: {
          model: selectedModel,
          prompt: prompt || undefined,
          image_url: imageUrl || undefined,
        },
      });

      if (response.error) throw response.error;

      setPredictionId(response.data.id);
      
      toast({
        title: "Generation Started",
        description: "Your request is being processed...",
      });

      // Poll for results
      pollPrediction(response.data.id);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start generation",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const pollPrediction = async (id: string) => {
    const maxAttempts = 60;
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await supabase.functions.invoke("replicate-ai", {
          body: { prediction_id: id },
        });

        if (response.error) throw response.error;

        const prediction = response.data;

        if (prediction.status === "succeeded") {
          setResult(prediction.output);
          setLoading(false);
          toast({
            title: "Success",
            description: "Generation completed!",
          });
        } else if (prediction.status === "failed") {
          throw new Error(prediction.error || "Generation failed");
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 2000);
        } else {
          throw new Error("Timeout waiting for generation");
        }
      } catch (error: any) {
        console.error("Polling error:", error);
        setLoading(false);
        toast({
          title: "Error",
          description: error.message || "Failed to get results",
          variant: "destructive",
        });
      }
    };

    poll();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Replicate AI</CardTitle>
            <CardDescription>
              Access hundreds of AI models - image generation, video, upscaling, and more
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(models).map(([key, model]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      {model.type === "image" && <ImageIcon className="w-4 h-4" />}
                      {model.type === "video" && <Video className="w-4 h-4" />}
                      {model.type === "upscale" && <Wand2 className="w-4 h-4" />}
                      <div>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-xs text-muted-foreground">{model.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="prompt" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="prompt">Text Prompt</TabsTrigger>
              <TabsTrigger value="image">Image Input</TabsTrigger>
            </TabsList>

            <TabsContent value="prompt" className="space-y-2">
              <Label>Prompt</Label>
              <Textarea
                placeholder="Describe what you want to create..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
            </TabsContent>

            <TabsContent value="image" className="space-y-2">
              <Label>Image URL</Label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <Label>Result</Label>
            {Array.isArray(result) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.map((item, index) => (
                  <div key={index}>
                    {item.endsWith(".mp4") || item.endsWith(".gif") ? (
                      <video controls className="w-full rounded-lg">
                        <source src={item} />
                      </video>
                    ) : (
                      <img src={item} alt={`Result ${index + 1}`} className="w-full rounded-lg" />
                    )}
                  </div>
                ))}
              </div>
            ) : typeof result === "string" ? (
              result.endsWith(".mp4") || result.endsWith(".gif") ? (
                <video controls className="w-full rounded-lg">
                  <source src={result} />
                </video>
              ) : (
                <img src={result} alt="Result" className="w-full rounded-lg" />
              )
            ) : (
              <pre className="p-4 rounded-lg bg-muted text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
