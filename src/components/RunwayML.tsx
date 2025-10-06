import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Video, Play } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function RunwayML() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [taskId, setTaskId] = useState("");
  const [model, setModel] = useState("gen3a_turbo");
  const [duration, setDuration] = useState(5);
  const { toast } = useToast();

  const models = [
    { value: "gen3a_turbo", label: "Gen-3 Alpha Turbo (Fast)" },
    { value: "gen3", label: "Gen-3 Alpha (High Quality)" },
  ];

  const generate = async () => {
    if (!prompt.trim() && !imageFile) {
      toast({
        title: "Input Required",
        description: "Please provide a prompt or image",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let imageData: string | undefined;

      if (imageFile) {
        const reader = new FileReader();
        imageData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(imageFile);
        });
      }

      const response = await supabase.functions.invoke("runwayml", {
        body: {
          prompt: prompt.trim() || undefined,
          image: imageData,
          model,
          duration,
        },
      });

      if (response.error) throw response.error;

      setTaskId(response.data.id);
      
      toast({
        title: "Generation Started",
        description: "Your video is being generated...",
      });

      // Poll for results
      pollTask(response.data.id);
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

  const pollTask = async (id: string) => {
    const maxAttempts = 120; // 4 minutes max
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await supabase.functions.invoke("runwayml", {
          body: { task_id: id },
        });

        if (response.error) throw response.error;

        const task = response.data;

        if (task.status === "SUCCEEDED") {
          setResult(task.output);
          setLoading(false);
          toast({
            title: "Success",
            description: "Video generated successfully!",
          });
        } else if (task.status === "FAILED") {
          throw new Error(task.error || "Generation failed");
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
          <Video className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>RunwayML Gen-3</CardTitle>
            <CardDescription>
              Advanced AI video generation - text to video and image to video
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
              placeholder="Describe the video you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Starting Image (Optional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            {imageFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {imageFile.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Duration: {duration} seconds</Label>
            <Slider
              value={[duration]}
              onValueChange={(v) => setDuration(v[0])}
              min={5}
              max={10}
              step={1}
            />
          </div>

          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Video...
              </>
            ) : (
              <>
                <Video className="mr-2 h-4 w-4" />
                Generate Video
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <Label>Generated Video</Label>
            <video controls className="w-full rounded-lg border">
              <source src={result} type="video/mp4" />
            </video>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => window.open(result, "_blank")}
                className="flex-1"
              >
                <Play className="mr-2 h-4 w-4" />
                Open in New Tab
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = result;
                  a.download = "runwayml-video.mp4";
                  a.click();
                }}
                className="flex-1"
              >
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
