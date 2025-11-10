import { useState, useCallback, useEffect } from 'react';
import { GrokMessageList } from '@/components/grok/GrokMessageList';
import { GrokInputArea } from '@/components/grok/GrokInputArea';
import { useGrokChat } from '@/hooks/useGrokChat';
import { DEFAULT_GROK_MODEL } from '@/config/grok';
import { FeatureContext } from '@/utils/aiSidebarContext';
import { VoiceInputButton } from './VoiceInputButton';
import { VoiceControls } from './VoiceControls';
import { useElevenLabsTTS } from '@/hooks/useElevenLabsTTS';
import { useAISidebarSettings } from '@/hooks/useAISidebarSettings';
import { Volume2 } from 'lucide-react';

interface AISidebarChatProps {
  context: FeatureContext;
  initialPrompt?: string;
  onClearPrompt?: () => void;
  height?: string;
}

export function AISidebarChat({ 
  context, 
  initialPrompt,
  onClearPrompt,
  height = 'h-[400px]'
}: AISidebarChatProps) {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearMessages } = useGrokChat();
  const { settings } = useAISidebarSettings();
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [lastAssistantMessage, setLastAssistantMessage] = useState<string>('');

  // Voice output using ElevenLabs
  const {
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
  } = useElevenLabsTTS({
    voiceId: settings.selectedVoice,
  });

  // Handle initial prompt
  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      onClearPrompt?.();
    }
  }, [initialPrompt, onClearPrompt]);

  // Auto-read assistant responses if enabled
  useEffect(() => {
    if (!settings.voiceOutputEnabled) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant' && lastMessage.content !== lastAssistantMessage) {
      setLastAssistantMessage(lastMessage.content);
      speak(lastMessage.content);
    }
  }, [messages, settings.voiceOutputEnabled, speak, lastAssistantMessage]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    
    await sendMessage(input, DEFAULT_GROK_MODEL);
    setInput('');
  }, [input, isLoading, sendMessage]);

  const handleVoiceTranscript = useCallback((text: string) => {
    setInput(prev => prev + (prev ? ' ' : '') + text);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPaused, pause, resume]);

  return (
    <div className="flex flex-col h-full">
      <div className={`flex-1 ${height} overflow-hidden`}>
        <GrokMessageList 
          messages={messages}
          height="h-full"
          emptyMessage="Ask me anything!"
          emptyDescription={`I can help you with ${context.featureName.toLowerCase()}`}
        />
      </div>

      {/* Voice Controls (when speaking) */}
      {isSpeaking && settings.voiceOutputEnabled && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">Playing response...</span>
          </div>
          <VoiceControls
            isPlaying={!isPaused}
            isMuted={isMuted}
            volume={volume}
            onPlayPause={handlePlayPause}
            onMuteToggle={toggleMute}
            onVolumeChange={changeVolume}
            onStop={stop}
          />
        </div>
      )}

      {/* Voice Input Status */}
      {isListeningVoice && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-3 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-sm text-primary font-medium">Listening...</span>
          </div>
        </div>
      )}
      
      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <GrokInputArea
              value={input}
              onChange={setInput}
              onSubmit={handleSendMessage}
              isLoading={isLoading}
              placeholder={`Ask about ${context.featureName}...`}
            />
          </div>
          
          {/* Voice Input Button */}
          {settings.voiceInputEnabled && (
            <VoiceInputButton
              onTranscript={handleVoiceTranscript}
              onListeningChange={setIsListeningVoice}
              disabled={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
