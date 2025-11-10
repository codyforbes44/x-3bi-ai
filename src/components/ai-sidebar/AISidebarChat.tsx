import { useState, useCallback, useEffect } from 'react';
import { GrokMessageList } from '@/components/grok/GrokMessageList';
import { GrokInputArea } from '@/components/grok/GrokInputArea';
import { useGrokChat } from '@/hooks/useGrokChat';
import { DEFAULT_GROK_MODEL } from '@/config/grok';
import { FeatureContext, getContextualSystemPrompt } from '@/utils/aiSidebarContext';

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

  // Handle initial prompt
  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      onClearPrompt?.();
    }
  }, [initialPrompt, onClearPrompt]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    
    await sendMessage(input, DEFAULT_GROK_MODEL);
    setInput('');
  }, [input, isLoading, sendMessage]);

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
      
      <div className="border-t border-border p-3">
        <GrokInputArea
          value={input}
          onChange={setInput}
          onSubmit={handleSendMessage}
          isLoading={isLoading}
          placeholder={`Ask about ${context.featureName}...`}
        />
      </div>
    </div>
  );
}
