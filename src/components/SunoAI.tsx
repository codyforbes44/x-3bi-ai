import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Music, Play, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SunoAI() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [makeInstrumental, setMakeInstrumental] = useState(false);
  const [duration, setDuration] = useState("120");
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const generateMusic = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please provide a description for your music",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("suno-ai", {
        body: {
          prompt: prompt.trim(),
          title: title.trim() || undefined,
          tags: tags.trim() || undefined,
          make_instrumental: makeInstrumental,
          duration: parseInt(duration),
        },
      });

      if (error) {
        // Check if error has a message from the edge function
        const errorMessage = error.message || error.msg || "Failed to generate music";
        throw new Error(errorMessage);
      }

      // Check if the response contains an error field
      if (data?.error) {
        throw new Error(data.error);
      }

      setResults(data.songs || []);
      toast({
        title: "Success",
        description: data.message || "Music generation started! Check back in a few minutes.",
      });
    } catch (error: any) {
      console.error("Error generating music:", error);
      
      let errorMessage = "Failed to generate music. Please try again.";
      
      // Parse different error types
      if (error.message) {
        if (error.message.includes("temporarily unavailable")) {
          errorMessage = "Suno AI is temporarily unavailable. Please try again in a few moments.";
        } else if (error.message.includes("Rate limit")) {
          errorMessage = "Rate limit reached. Please wait a moment before trying again.";
        } else if (error.message.includes("API key")) {
          errorMessage = "Configuration error. Please contact support.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (songId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("suno-ai", {
        body: { action: "check_status", song_id: songId },
      });

      if (error) {
        throw new Error(error.message || "Failed to check status");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const updatedResults = results.map((song) =>
        song.id === songId ? data : song
      );
      setResults(updatedResults);

      const statusMessage = data.status === "complete" 
        ? "Your music is ready!" 
        : `Song status: ${data.status || "processing"}`;

      toast({
        title: "Status Updated",
        description: statusMessage,
      });
    } catch (error: any) {
      console.error("Error checking status:", error);
      toast({
        title: "Status Check Failed",
        description: error.message || "Failed to check song status",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription className="flex-1">
            Generate custom music and songs with AI - describe what you want to hear
          </CardDescription>
        </div>
        <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-sm text-amber-600 dark:text-amber-400">
            <strong>⚠️ Service Status:</strong> This feature uses a third-party Suno API service which may experience downtime. 
            If you see errors, the external API service is temporarily unavailable. Please try again later.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Music Description (Prompt)</Label>
            <Textarea
              placeholder="Describe the music you want to create... (e.g., 'upbeat electronic dance music with heavy bass and synth melodies')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Song Title (Optional)</Label>
              <Input
                placeholder="My Amazing Song"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags/Genre (Optional)</Label>
              <Input
                placeholder="electronic, dance, upbeat"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Make Instrumental</Label>
              <p className="text-sm text-muted-foreground">
                Generate music without vocals
              </p>
            </div>
            <Switch
              checked={makeInstrumental}
              onCheckedChange={setMakeInstrumental}
            />
          </div>

          <div className="space-y-2">
            <Label>Duration (seconds)</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">1 minute</SelectItem>
                <SelectItem value="120">2 minutes</SelectItem>
                <SelectItem value="180">3 minutes</SelectItem>
                <SelectItem value="240">4 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateMusic} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Music...
              </>
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Generate Music
              </>
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <Label>Generated Songs</Label>
            {results.map((song, index) => (
              <Card key={song.id || index}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{song.title || `Song ${index + 1}`}</h4>
                      <p className="text-sm text-muted-foreground">
                        Status: {song.status || "Processing"}
                      </p>
                      {song.tags && (
                        <p className="text-sm text-muted-foreground">
                          {song.tags}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => checkStatus(song.id)}
                    >
                      Refresh Status
                    </Button>
                  </div>

                  {song.audio_url && (
                    <div className="space-y-2">
                      <audio controls className="w-full">
                        <source src={song.audio_url} type="audio/mpeg" />
                      </audio>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(song.audio_url, "_blank")}
                          className="flex-1"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Play in New Tab
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const a = document.createElement("a");
                            a.href = song.audio_url;
                            a.download = `${song.title || "song"}.mp3`;
                            a.click();
                          }}
                          className="flex-1"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}

                  {song.video_url && (
                    <div className="space-y-2">
                      <Label className="text-sm">Video</Label>
                      <video controls className="w-full rounded-lg">
                        <source src={song.video_url} type="video/mp4" />
                      </video>
                    </div>
                  )}

                  {song.image_url && (
                    <img
                      src={song.image_url}
                      alt={song.title}
                      className="w-full rounded-lg"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
