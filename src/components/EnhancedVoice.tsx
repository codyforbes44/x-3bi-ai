import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mic, Volume2, Play, Pause } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { addVoiceRecord } from "./VoiceHistory";

const openAIVoices = [
  { id: "alloy", name: "Alloy", description: "Neutral and balanced" },
  { id: "echo", name: "Echo", description: "Warm and friendly" },
  { id: "fable", name: "Fable", description: "Expressive storytelling" },
  { id: "onyx", name: "Onyx", description: "Deep and authoritative" },
  { id: "nova", name: "Nova", description: "Energetic and upbeat" },
  { id: "shimmer", name: "Shimmer", description: "Soft and soothing" }
];

const elevenLabsVoices = [
  { id: "9BWtsMINqrJLrRacOk9x", name: "Aria", description: "Female, expressive" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", description: "Male, confident" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", description: "Female, professional" },
  { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura", description: "Female, warm" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", description: "Male, friendly" }
];

const elevenLabsModels = [
  { id: "eleven_multilingual_v2", name: "Multilingual v2", description: "Most life-like, 29 languages" },
  { id: "eleven_turbo_v2_5", name: "Turbo v2.5", description: "Low latency, 32 languages" },
  { id: "eleven_turbo_v2", name: "Turbo v2", description: "English only, fastest" }
];

export default function EnhancedVoice() {
  const [text, setText] = useState("");
  const [provider, setProvider] = useState<"openai" | "elevenlabs">("openai");
  const [voice, setVoice] = useState(openAIVoices[0].id);
  const [model, setModel] = useState(elevenLabsModels[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }

    setIsGenerating(true);
    try {
      const endpoint = provider === 'elevenlabs' ? 'premium-voice' : 'ai-voice';
      
      const { data, error } = await supabase.functions.invoke(endpoint, {
        body: {
          text,
          voice,
          ...(provider === 'elevenlabs' && { model })
        }
      });

      if (error) throw error;

      const audioData = `data:audio/mp3;base64,${data.audioContent}`;
      setAudioUrl(audioData);
      
      // Save to history
      const selectedVoice = provider === 'openai' 
        ? openAIVoices.find(v => v.id === voice)?.name 
        : elevenLabsVoices.find(v => v.id === voice)?.name;
      
      addVoiceRecord({
        text,
        audioUrl: audioData,
        voice: selectedVoice || voice,
        provider: provider === 'openai' ? 'OpenAI' : 'ElevenLabs'
      });

      toast.success('Voice generated successfully!');
    } catch (error: any) {
      console.error('Voice generation error:', error);
      toast.error(error.message || 'Failed to generate voice');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioUrl) return;

    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio) {
        audio.play();
      } else {
        const newAudio = new Audio(audioUrl);
        newAudio.onended = () => setIsPlaying(false);
        newAudio.play();
        setAudio(newAudio);
      }
      setIsPlaying(true);
    }
  };

  const handleProviderChange = (newProvider: string) => {
    setProvider(newProvider as "openai" | "elevenlabs");
    setVoice(newProvider === 'openai' ? openAIVoices[0].id : elevenLabsVoices[0].id);
    setAudioUrl(null);
  };

  const currentVoices = provider === 'openai' ? openAIVoices : elevenLabsVoices;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          Generate natural speech with multiple voice options and providers
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={provider} onValueChange={handleProviderChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="openai">
              OpenAI TTS
              <Badge variant="secondary" className="ml-2">Fast</Badge>
            </TabsTrigger>
            <TabsTrigger value="elevenlabs">
              ElevenLabs
              <Badge variant="secondary" className="ml-2">Premium</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={provider} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Voice</label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currentVoices.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        <div className="flex flex-col">
                          <span>{v.name}</span>
                          <span className="text-xs text-muted-foreground">{v.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {provider === 'elevenlabs' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Model</label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {elevenLabsModels.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          <div className="flex flex-col">
                            <span>{m.name}</span>
                            <span className="text-xs text-muted-foreground">{m.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Text to Speak</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to speech..."
                className="min-h-[120px]"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !text.trim()}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Generate Voice
                  </>
                )}
              </Button>

              {audioUrl && (
                <Button
                  variant="outline"
                  onClick={handlePlayPause}
                  className="px-8"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </>
                  )}
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
