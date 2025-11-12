import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mic, Loader2, Play, Pause } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function DemoVoiceSection() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleDemo = async () => {
    if (!text.trim() || text.length > 200) {
      toast({
        title: 'Invalid input',
        description: 'Please enter text (max 200 characters)',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAudioUrl('');
    setIsPlaying(false);

    try {
      const { data, error } = await supabase.functions.invoke('demo-voice', {
        body: { text: text.trim() }
      });

      if (error) throw error;
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error('Demo voice error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate voice. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <Mic className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Voice Synthesis Demo</h3>
          <p className="text-sm text-muted-foreground">Convert text to speech with ElevenLabs</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Enter text to speak... (e.g., 'Welcome to 3BI.AI')"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={200}
        />

        <Button 
          onClick={handleDemo} 
          disabled={isLoading || !text.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Synthesizing...
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" />
              Generate Voice
            </>
          )}
        </Button>

        {audioUrl && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Audio ready</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={togglePlayback}
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
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
