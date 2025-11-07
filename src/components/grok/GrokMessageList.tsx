import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GrokMessageListProps {
  messages: Message[];
  height?: string;
  emptyMessage?: string;
  emptyDescription?: string;
}

export function GrokMessageList({ 
  messages, 
  height = 'h-[500px]',
  emptyMessage = 'Start a conversation with Grok',
  emptyDescription = 'Ask anything and get intelligent responses with real-time streaming'
}: GrokMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea ref={scrollRef} className={`${height} pr-4`}>
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <Sparkles className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">{emptyMessage}</p>
          <p className="text-sm mt-2">{emptyDescription}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={message.role === 'user' ? 'secondary' : 'outline'}>
                    {message.role === 'user' ? 'You' : 'Grok'}
                  </Badge>
                </div>
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
