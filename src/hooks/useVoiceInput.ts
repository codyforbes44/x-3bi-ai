import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

interface UseVoiceInputOptions {
  onTranscript: (text: string) => void;
  onError?: (error: Error) => void;
  continuous?: boolean;
}

export function useVoiceInput(options: UseVoiceInputOptions) {
  const { onTranscript, onError, continuous = false } = options;
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      const error = new Error('Speech recognition not supported in this browser');
      toast.error('Speech recognition not supported. Please use Chrome or Edge.');
      onError?.(error);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = continuous;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast.success('Listening...');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        if (event.results[event.results.length - 1].isFinal) {
          onTranscript(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        const error = new Error(event.error);
        onError?.(error);
        setIsListening(false);
        
        if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try again.');
        } else {
          toast.error(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      toast.error('Failed to start voice input');
      onError?.(error as Error);
    }
  }, [continuous, onTranscript, onError]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    startListening,
    stopListening,
  };
}
