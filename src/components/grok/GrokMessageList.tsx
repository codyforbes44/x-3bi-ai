import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef, memo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

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

// Memoized message component for better performance
const MessageItem = memo(({ message }: { message: Message }) => (
  <div
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
));

MessageItem.displayName = 'MessageItem';

// Estimate row height based on content length
const estimateSize = (message: Message): number => {
  const contentLength = message.content.length;
  const estimatedLines = Math.ceil(contentLength / 50); // ~50 chars per line
  const baseHeight = 80; // Base height for badge + padding
  const lineHeight = 24; // Height per line of content
  return baseHeight + (estimatedLines * lineHeight);
};

export function GrokMessageList({ 
  messages, 
  height = 'h-[500px]',
  emptyMessage = 'Start a conversation with Grok',
  emptyDescription = 'Ask anything and get intelligent responses with real-time streaming'
}: GrokMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const VIRTUAL_THRESHOLD = 100;

  // Virtual scrolling for large lists (100+ messages)
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => estimateSize(messages[index]),
    overscan: 3,
    enabled: messages.length >= VIRTUAL_THRESHOLD,
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length >= VIRTUAL_THRESHOLD && messages.length > 0) {
      // Virtual scrolling: scroll to last item
      virtualizer.scrollToIndex(messages.length - 1, { align: 'end' });
    } else if (scrollRef.current) {
      // Regular scrolling: scroll to bottom
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, virtualizer]);

  // Empty state
  if (messages.length === 0) {
    return (
      <div className={`${height} flex flex-col items-center justify-center text-center text-muted-foreground`}>
        <Sparkles className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">{emptyMessage}</p>
        <p className="text-sm mt-2">{emptyDescription}</p>
      </div>
    );
  }

  // Use virtual scrolling for large message lists (100+ messages)
  if (messages.length >= VIRTUAL_THRESHOLD) {
    return (
      <div ref={parentRef} className={`${height} overflow-auto pr-4`}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="py-2"
            >
              <MessageItem message={messages[virtualRow.index]} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Regular scrolling for smaller lists (<100 messages)
  return (
    <ScrollArea ref={scrollRef} className={`${height} pr-4`}>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
