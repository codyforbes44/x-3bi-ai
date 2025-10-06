import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mic2, Loader2, Play, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const MiniVoiceInterface = () => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!text.trim() || isGenerating) return;

    setIsGenerating(true);
    setAudioUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-voice', {
        body: {
          text,
          voice_id: '9BWtsMINqrJLrRacOk9x', // Aria
          model_id: 'eleven_multilingual_v2'
        }
      });

      if (error) throw error;

      if (data.audio_url) {
        setAudioUrl(data.audio_url);
        toast({
          title: "Success",
          description: "Voice generated!",
        });
      } else {
        throw new Error('No audio URL received');
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Mic2 className="w-5 h-5 text-primary" />
            Voice Synthesis
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard?feature=ai-voice')}
            className="gap-1 text-xs"
          >
            Full Version
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
        <Badge variant="secondary" className="w-fit text-xs">ElevenLabs</Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 pt-0 gap-3">
        <div className="space-y-3">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to speak..."
            className="min-h-[60px] text-sm"
            disabled={isGenerating}
          />
          <Button 
            onClick={handleGenerate} 
            disabled={!text.trim() || isGenerating}
            className="w-full"
            size="sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Mic2 className="w-4 h-4 mr-2" />
                Generate Voice
              </>
            )}
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg min-h-0">
          {audioUrl ? (
            <div className="flex flex-col items-center gap-3">
              <audio controls src={audioUrl} className="w-full max-w-xs" />
              <Button size="sm" variant="outline" onClick={() => {
                const audio = new Audio(audioUrl);
                audio.play();
              }}>
                <Play className="w-4 h-4 mr-2" />
                Play Audio
              </Button>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <Mic2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Audio player appears here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniVoiceInterface;
