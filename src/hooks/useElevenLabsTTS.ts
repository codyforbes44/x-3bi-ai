import { useState, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseElevenLabsTTSOptions {
  voiceId?: string;
  model?: string;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

const ELEVENLABS_VOICES = {
  default: '9BWtsMINqrJLrRacOk9x', // Aria
  roger: 'CwhRBWXzGAHq8TQ4Fs17',
  sarah: 'EXAVITQu4vr4xnSDxMaL',
  laura: 'FGY2WhTYpPnrIDTdsKH5',
  charlie: 'IKne3meq5aSn9XLyUdCD',
};

export function useElevenLabsTTS(options: UseElevenLabsTTSOptions = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const speak = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      
      // Call ElevenLabs API via edge function
      const response = await fetch(`https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/text-to-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYXp6c3huYXRmZXdibGdweGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NjcxMTIsImV4cCI6MjA3MDA0MzExMn0.kUpKQ7U2ooc9zGngM8oZ78U9_aBoJmedJi_tXsKi4G0`,
        },
        body: JSON.stringify({
          text,
          voiceId: ELEVENLABS_VOICES[options.voiceId as keyof typeof ELEVENLABS_VOICES] || ELEVENLABS_VOICES.default,
          model: options.model || 'eleven_turbo_v2_5',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Create and play audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.volume = isMuted ? 0 : volume / 100;
      
      audio.onended = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        URL.revokeObjectURL(audioUrl);
        options.onComplete?.();
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        const error = new Error('Audio playback failed');
        options.onError?.(error);
        toast({
          title: 'Playback Error',
          description: 'Failed to play audio',
          variant: 'destructive',
        });
      };

      await audio.play();
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      setIsSpeaking(false);
      const err = error as Error;
      options.onError?.(err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to generate speech',
        variant: 'destructive',
      });
    }
  }, [options, volume, isMuted, toast]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
      setIsPaused(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume / 100 : 0;
    }
  }, [isMuted, volume]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume / 100;
    }
  }, [isMuted]);

  return {
    speak,
    pause,
    resume,
    stop,
    toggleMute,
    changeVolume,
    isSpeaking,
    isPaused,
    volume,
    isMuted,
  };
}

export { ELEVENLABS_VOICES };
