import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, Image as ImageIcon, Video } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GoogleGemini() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [model, setModel] = useState("gemini-2.0-flash-exp");
  const { toast } = useToast();

  const models = [
    { value: "gemini-2.0-flash-exp", label: "Gemini 2.0 Flash (Fastest, Multimodal)" },
    { value: "gemini-exp-1206", label: "Gemini Exp 1206 (Advanced Reasoning)" },
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro (2M Context)" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  ];

  const processRequest = async () => {
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
      let imageData: string | undefined;
      let videoData: string | undefined;

      if (imageFile) {
        const reader = new FileReader();
        imageData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(imageFile);
        });
      }

      if (videoFile) {
        const reader = new FileReader();
        videoData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(videoFile);
        });
      }

      const response = await supabase.functions.invoke("google-gemini", {
        body: {
          prompt: prompt.trim(),
          model,
          image: imageData,
          video: videoData,
        },
      });

      if (response.error) throw response.error;

      setResult(response.data.text);
      toast({
        title: "Success",
        description: "Response generated successfully!",
      });
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
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
          <Sparkles className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Google Gemini</CardTitle>
            <CardDescription>
              Multimodal AI with 2M token context - understand text, images, video, and audio
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
              placeholder="Ask anything or describe what you want to analyze..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">Text Only</TabsTrigger>
              <TabsTrigger value="image">
                <ImageIcon className="w-4 h-4 mr-2" />
                Image
              </TabsTrigger>
              <TabsTrigger value="video">
                <Video className="w-4 h-4 mr-2" />
                Video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Using text-only mode with up to 2M token context
              </p>
            </TabsContent>

            <TabsContent value="image" className="space-y-2">
              <Label>Upload Image</Label>
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
            </TabsContent>

            <TabsContent value="video" className="space-y-2">
              <Label>Upload Video</Label>
              <Input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
              {videoFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {videoFile.name}
                </p>
              )}
            </TabsContent>
          </Tabs>

          <Button onClick={processRequest} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Response
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <Label>Response</Label>
            <div className="p-4 rounded-lg bg-muted">
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
