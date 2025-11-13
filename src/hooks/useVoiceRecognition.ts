import { useState, useEffect, useCallback, useRef } from 'react';

// TypeScript definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface VoiceCommand {
  phrases: string[];
  action: () => void;
  description: string;
}

interface UseVoiceRecognitionOptions {
  commands?: VoiceCommand[];
  onTranscript?: (text: string) => void;
  continuous?: boolean;
  requireWakeWord?: boolean;
  wakeWords?: string[];
}

export function useVoiceRecognition({
  commands = [],
  onTranscript,
  continuous = true,
  requireWakeWord = true,
  wakeWords = ['hey 3bi', 'hey three bi'],
}: UseVoiceRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAwaitingCommand, setIsAwaitingCommand] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  // Process recognized speech
  const processTranscript = useCallback((text: string) => {
    const lowerText = text.toLowerCase().trim();
    
    // Update transcript
    setTranscript(text);
    onTranscript?.(text);

    // Check for wake word
    if (requireWakeWord && !isAwaitingCommand) {
      const hasWakeWord = wakeWords.some(word => lowerText.includes(word));
      if (hasWakeWord) {
        setIsAwaitingCommand(true);
        setTranscript('Listening for command...');
        // Reset after 5 seconds if no command given
        setTimeout(() => setIsAwaitingCommand(false), 5000);
        return;
      }
    }

    // Process commands only if wake word detected or wake word not required
    if (!requireWakeWord || isAwaitingCommand) {
      for (const command of commands) {
        const matched = command.phrases.some(phrase => 
          lowerText.includes(phrase.toLowerCase())
        );
        
        if (matched) {
          command.action();
          setTranscript(`Command executed: ${command.description}`);
          setIsAwaitingCommand(false);
          return;
        }
      }
      
      if (isAwaitingCommand) {
        setTranscript('Command not recognized');
        setIsAwaitingCommand(false);
      }
    }
  }, [commands, requireWakeWord, wakeWords, isAwaitingCommand, onTranscript]);

  // Start listening
  const startListening = useCallback(async () => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = continuous;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setTranscript(requireWakeWord ? 'Say "Hey 3BI" to activate...' : 'Listening...');
      };

      recognition.onresult = (event) => {
        const results = Array.from(event.results);
        const latestResult = results[results.length - 1];
        
        if (latestResult.isFinal) {
          const text = latestResult[0].transcript;
          processTranscript(text);
        } else {
          // Show interim results
          const interimText = latestResult[0].transcript;
          setTranscript(interimText);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        switch (event.error) {
          case 'no-speech':
            // Auto-restart on silence
            if (isListening) {
              recognition.start();
            }
            break;
          case 'audio-capture':
            setError('Microphone not found. Please check your audio settings.');
            setIsListening(false);
            break;
          case 'not-allowed':
            setError('Microphone permission denied. Please allow microphone access.');
            setIsListening(false);
            break;
          case 'network':
            setError('Network error. Please check your internet connection.');
            break;
          default:
            setError(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        // Auto-restart if still supposed to be listening
        if (isListening && continuous) {
          recognition.start();
        } else {
          setIsListening(false);
          setTranscript('');
          setIsAwaitingCommand(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setError('Failed to access microphone. Please check permissions.');
      setIsListening(false);
    }
  }, [isSupported, continuous, processTranscript, requireWakeWord, isListening]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setTranscript('');
    setIsAwaitingCommand(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    error,
    isAwaitingCommand,
    startListening,
    stopListening,
  };
}
