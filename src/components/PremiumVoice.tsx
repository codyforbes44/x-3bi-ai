import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, Loader2, Play, Pause, Sparkles, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const PremiumVoice = () => {
  const [text, setText] = useState('');
  const [provider, setProvider] = useState('elevenlabs');
  const [voice, setVoice] = useState('Aria');
  const [model, setModel] = useState('eleven_multilingual_v2');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const elevenLabsVoices = [
    { value: 'Aria', label: 'Aria (Female, Expressive)' },
    { value: 'Roger', label: 'Roger (Male, Confident)' },
    { value: 'Sarah', label: 'Sarah (Female, Soft)' },
    { value: 'Laura', label: 'Laura (Female, Upbeat)' },
    { value: 'Charlie', label: 'Charlie (Male, Casual)' },
    { value: 'George', label: 'George (Male, Warm)' },
    { value: 'Callum', label: 'Callum (Male, Intense)' },
    { value: 'River', label: 'River (Non-binary, Calm)' },
    { value: 'Liam', label: 'Liam (Male, Young)' },
    { value: 'Charlotte', label: 'Charlotte (Female, Seductive)' },
    { value: 'Alice', label: 'Alice (Female, British)' },
    { value: 'Matilda', label: 'Matilda (Female, Warm)' },
    { value: 'Will', label: 'Will (Male, Friendly)' },
    { value: 'Jessica', label: 'Jessica (Female, Expressive)' },
    { value: 'Eric', label: 'Eric (Male, Middle-aged)' },
    { value: 'Chris', label: 'Chris (Male, Casual)' },
    { value: 'Brian', label: 'Brian (Male, Deep)' },
    { value: 'Daniel', label: 'Daniel (Male, Deep)' },
    { value: 'Lily', label: 'Lily (Female, British)' },
    { value: 'Bill', label: 'Bill (Male, Strong)' }
  ];

  const openAIVoices = [
    { value: 'alloy', label: 'Alloy' },
    { value: 'echo', label: 'Echo' },
    { value: 'fable', label: 'Fable' },
    { value: 'onyx', label: 'Onyx' },
    { value: 'nova', label: 'Nova' },
    { value: 'shimmer', label: 'Shimmer' }
  ];

  const elevenLabsModels = [
    { value: 'eleven_multilingual_v2', label: 'Multilingual v2 (Best Quality)' },
    { value: 'eleven_turbo_v2_5', label: 'Turbo v2.5 (Fast, 32 Languages)' },
    { value: 'eleven_turbo_v2', label: 'Turbo v2 (Fastest, English Only)' },
    { value: 'eleven_multilingual_v1', label: 'Multilingual v1 (Legacy)' }
  ];

  const handleGenerateVoice = async () => {
    if (!text.trim() || isGenerating) return;

    setIsGenerating(true);
    setAudioUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke('premium-voice', {
        body: {
          text,
          voice,
          model: provider === 'elevenlabs' ? model : 'tts-1-hd',
          provider
        }
      });

      if (error) throw error;

      if (data.audioContent) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        toast({
          title: "Success",
          description: `Voice generated with ${data.provider === 'elevenlabs' ? 'ElevenLabs' : 'OpenAI'}!`,
        });
      } else {
        throw new Error('No audio content received');
      }
    } catch (error) {
      console.error('Voice generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate voice. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleProviderChange = (newProvider: string) => {
    setProvider(newProvider);
    // Reset voice selection when changing providers
    if (newProvider === 'elevenlabs') {
      setVoice('Aria');
      setModel('eleven_multilingual_v2');
    } else {
      setVoice('alloy');
    }
  };

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-4 flex-row items-center justify-end">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          AI Enhanced
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <Tabs value={provider} onValueChange={handleProviderChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="elevenlabs" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              ElevenLabs
            </TabsTrigger>
            <TabsTrigger value="openai" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              OpenAI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="elevenlabs" className="space-y-4 mt-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-primary">ElevenLabs Premium</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Ultra-realistic voices with emotional expression and multilingual support
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Voice</label>
                <Select value={voice} onValueChange={setVoice} disabled={isGenerating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {elevenLabsVoices.map((voiceOption) => (
                      <SelectItem key={voiceOption.value} value={voiceOption.value}>
                        {voiceOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Model</label>
                <Select value={model} onValueChange={setModel} disabled={isGenerating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {elevenLabsModels.map((modelOption) => (
                      <SelectItem key={modelOption.value} value={modelOption.value}>
                        {modelOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="openai" className="space-y-4 mt-4">
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <h4 className="font-medium">OpenAI TTS</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                High-quality text-to-speech with natural-sounding voices
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Voice</label>
              <Select value={voice} onValueChange={setVoice} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {openAIVoices.map((voiceOption) => (
                    <SelectItem key={voiceOption.value} value={voiceOption.value}>
                      {voiceOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <div>
          <label className="text-sm font-medium mb-2 block">Text to Speech</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            className="min-h-[100px]"
            disabled={isGenerating}
          />
        </div>

        <Button 
          onClick={handleGenerateVoice} 
          disabled={!text.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating with {provider === 'elevenlabs' ? 'ElevenLabs' : 'OpenAI'}...
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 mr-2" />
              Generate Premium Voice
            </>
          )}
        </Button>

        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
          {audioUrl ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Volume2 className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Premium audio ready</p>
                <Button onClick={handlePlayPause} variant="outline">
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              </div>
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={handleAudioEnded}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <Volume2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Generated audio will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumVoice;