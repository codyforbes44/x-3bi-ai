import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseTextToSpeechOptions {
  voice?: string;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}) {
  const { voice = 'alloy', onComplete, onError } = options;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setIsSpeaking(true);

    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text,
          voice,
        },
      });

      if (error) throw error;

      if (!data?.audioContent) {
        throw new Error('No audio content received');
      }

      // Convert base64 to blob and play
      const byteCharacters = atob(data.audioContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        onComplete?.();
      };
      audio.onerror = (e) => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        const error = new Error('Failed to play audio');
        onError?.(error);
      };

      setAudioElement(audio);
      await audio.play();
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsSpeaking(false);
      toast.error('Failed to generate speech');
      onError?.(error as Error);
    }
  }, [voice, onComplete, onError]);

  const stop = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsSpeaking(false);
    }
  }, [audioElement]);

  return {
    speak,
    stop,
    isSpeaking,
  };
}
