import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { cn } from '@/lib/utils';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  onListeningChange?: (isListening: boolean) => void;
  autoSubmit?: boolean;
  disabled?: boolean;
}

export function VoiceInputButton({ 
  onTranscript, 
  onListeningChange,
  autoSubmit = false,
  disabled = false 
}: VoiceInputButtonProps) {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const { isListening, startListening, stopListening } = useVoiceInput({
    onTranscript: (text) => {
      onTranscript(text);
      if (autoSubmit) {
        stopListening();
      }
    },
    onError: (error) => {
      console.error('Voice input error:', error);
    },
  });

  useEffect(() => {
    onListeningChange?.(isListening);
  }, [isListening, onListeningChange]);

  // Check microphone permission
  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' as PermissionName })
      .then(result => {
        setIsPermissionGranted(result.state === 'granted');
        result.onchange = () => {
          setIsPermissionGranted(result.state === 'granted');
        };
      })
      .catch(() => setIsPermissionGranted(false));
  }, []);

  // Simulate volume level animation when listening
  useEffect(() => {
    if (!isListening) {
      setVolumeLevel(0);
      return;
    }

    const interval = setInterval(() => {
      setVolumeLevel(Math.random() * 100);
    }, 100);

    return () => clearInterval(interval);
  }, [isListening]);

  const handleToggle = async () => {
    if (isListening) {
      stopListening();
    } else {
      try {
        // Request microphone permission if not granted
        if (!isPermissionGranted) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setIsPermissionGranted(true);
        }
        startListening();
      } catch (error) {
        console.error('Failed to start voice input:', error);
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Button
              type="button"
              variant={isListening ? "default" : "ghost"}
              size="icon"
              onClick={handleToggle}
              disabled={disabled}
              className={cn(
                "h-9 w-9 transition-all",
                isListening && "animate-pulse"
              )}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            
            {/* Visual feedback - waveform */}
            {isListening && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 items-end h-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-primary rounded-full transition-all"
                    style={{
                      height: `${Math.max(20, volumeLevel * Math.random())}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {isListening ? 'Stop recording' : 'Start voice input'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
