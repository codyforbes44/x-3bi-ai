import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNativePlatform } from './useNativePlatform';

interface VoiceCommand {
  phrases: string[];
  action: () => void;
  description: string;
}

export function useVoiceCommands(commands: VoiceCommand[]) {
  const { isNative } = useNativePlatform();
  const navigate = useNavigate();

  useEffect(() => {
    // Only works in browsers that support Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      console.log('Voice command detected:', transcript);

      // Check wake words
      if (transcript.includes('hey 3bi') || transcript.includes('hey three bi')) {
        console.log('Wake word detected, listening for command...');
        
        // Process command
        for (const command of commands) {
          if (command.phrases.some(phrase => transcript.includes(phrase))) {
            command.action();
            break;
          }
        }
      }

      // Navigation commands
      if (transcript.includes('go to') || transcript.includes('open')) {
        if (transcript.includes('dashboard')) navigate('/dashboard');
        else if (transcript.includes('grok') || transcript.includes('chat')) navigate('/grok-chat');
        else if (transcript.includes('settings')) navigate('/settings');
        else if (transcript.includes('home')) navigate('/');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    // Auto-start recognition (user must grant permission first)
    // recognition.start();

    return () => {
      recognition.stop();
    };
  }, [commands, navigate]);
}
