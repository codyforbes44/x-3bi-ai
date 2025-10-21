import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  onToggleListening: () => void;
  onToggleSpeaking: () => void;
  className?: string;
}

export function VoiceControls({
  isListening,
  isSpeaking,
  onToggleListening,
  onToggleSpeaking,
  className,
}: VoiceControlsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant={isListening ? 'default' : 'outline'}
        size="icon"
        onClick={onToggleListening}
        className={cn(
          'transition-all',
          isListening && 'animate-pulse bg-red-500 hover:bg-red-600'
        )}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </Button>

      <Button
        variant={isSpeaking ? 'default' : 'outline'}
        size="icon"
        onClick={onToggleSpeaking}
        className={cn(
          'transition-all',
          isSpeaking && 'animate-pulse'
        )}
        title={isSpeaking ? 'Stop speaking' : 'Enable text-to-speech'}
      >
        {isSpeaking ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
