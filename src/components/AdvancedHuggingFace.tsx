import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, FileText, Image as ImageIcon, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdvancedHuggingFace() {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState("text-to-image");
  const { toast } = useToast();

  const textTasks = [
    { value: "text-to-image", label: "Text to Image (FLUX.1)" },
    { value: "summarization", label: "Summarization" },
    { value: "translation", label: "Translation" },
    { value: "question-answering", label: "Question Answering" },
    { value: "code-generation", label: "Code Generation" },
  ];

  const imageTasks = [
    { value: "image-to-text", label: "Image to Text" },
    { value: "image-classification", label: "Image Classification" },
    { value: "object-detection", label: "Object Detection" },
  ];

  const audioTasks = [
    { value: "speech-to-text", label: "Speech to Text (Whisper)" },
    { value: "audio-classification", label: "Audio Classification" },
    { value: "text-to-speech", label: "Text to Speech" },
  ];

  const handleProcess = async () => {
    if (!textInput && !imageFile && !audioFile) {
      toast({
        title: "Input Required",
        description: "Please provide input for processing",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let response;
      
      if (selectedTask === "text-to-image") {
        response = await supabase.functions.invoke("advanced-huggingface", {
          body: { task: selectedTask, text: textInput },
        });
      } else if (imageFile) {
        const reader = new FileReader();
        const imageData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result);
          reader.readAsDataURL(imageFile);
        });
        
        response = await supabase.functions.invoke("advanced-huggingface", {
          body: { task: selectedTask, image: imageData },
        });
      } else if (audioFile) {
        const reader = new FileReader();
        const audioData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result);
          reader.readAsDataURL(audioFile);
        });
        
        response = await supabase.functions.invoke("advanced-huggingface", {
          body: { task: selectedTask, audio: audioData },
        });
      } else {
        response = await supabase.functions.invoke("advanced-huggingface", {
          body: { task: selectedTask, text: textInput },
        });
      }

      if (response.error) throw response.error;

      setResult(response.data);
      toast({
        title: "Success",
        description: "Processing completed successfully",
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
            <CardTitle>Advanced Hugging Face AI</CardTitle>
            <CardDescription>
              Access powerful AI models for image generation, NLP, vision, and audio tasks
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text" className="gap-2">
              <FileText className="w-4 h-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="image" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Image
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <Music className="w-4 h-4" />
              Audio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label>Task</Label>
              <Select value={selectedTask} onValueChange={setSelectedTask}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {textTasks.map((task) => (
                    <SelectItem key={task.value} value={task.value}>
                      {task.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Input Text</Label>
              <Textarea
                placeholder="Enter your text here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={6}
              />
            </div>
          </TabsContent>

          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label>Task</Label>
              <Select value={selectedTask} onValueChange={setSelectedTask}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {imageTasks.map((task) => (
                    <SelectItem key={task.value} value={task.value}>
                      {task.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Upload Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <div className="space-y-2">
              <Label>Task</Label>
              <Select value={selectedTask} onValueChange={setSelectedTask}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {audioTasks.map((task) => (
                    <SelectItem key={task.value} value={task.value}>
                      {task.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTask === "text-to-speech" ? (
              <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                  placeholder="Enter text to convert to speech..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={4}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Upload Audio</Label>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Button onClick={handleProcess} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Process
            </>
          )}
        </Button>

        {result && (
          <div className="space-y-4">
            <Label>Result</Label>
            {result.image && (
              <img
                src={result.image}
                alt="Generated"
                className="w-full rounded-lg border"
              />
            )}
            {result.text && (
              <div className="p-4 rounded-lg bg-muted">
                <pre className="whitespace-pre-wrap text-sm">{result.text}</pre>
              </div>
            )}
            {result.audio && (
              <audio controls className="w-full">
                <source src={result.audio} type="audio/wav" />
              </audio>
            )}
            {result.data && (
              <div className="p-4 rounded-lg bg-muted">
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
