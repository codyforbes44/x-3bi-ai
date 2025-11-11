import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef, memo } from 'react';
// @ts-ignore - react-window types may not be available
import { VariableSizeList } from 'react-window';

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

// Virtual list row component
const VirtualRow = memo(({ index, style, data }: { index: number; style: React.CSSProperties; data: Message[] }) => (
  <div style={style} className="px-4">
    <MessageItem message={data[index]} />
  </div>
));

VirtualRow.displayName = 'VirtualRow';

// Estimate row height based on content
const getItemSize = (messages: Message[], index: number): number => {
  const message = messages[index];
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
  const listRef = useRef<any>(null);
  const VIRTUAL_THRESHOLD = 100;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length >= VIRTUAL_THRESHOLD && listRef.current) {
      // Virtual scrolling: scroll to last item
      listRef.current.scrollToItem(messages.length - 1, 'end');
    } else if (scrollRef.current) {
      // Regular scrolling: scroll to bottom
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    const heightInPixels = parseInt(height.match(/\d+/)?.[0] || '500');
    
    return (
      <div className={height}>
        <VariableSizeList
          ref={listRef}
          height={heightInPixels}
          itemCount={messages.length}
          itemSize={(index) => getItemSize(messages, index)}
          width="100%"
          itemData={messages}
          overscanCount={3}
          className="pr-4"
        >
          {VirtualRow}
        </VariableSizeList>
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
