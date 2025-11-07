import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Share2, Check, Copy } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  model: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  share_token: string;
}

interface GrokConversationListProps {
  conversations: Conversation[];
  currentConversation: string | null;
  copiedToken: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSharing: (id: string, isPublic: boolean) => void;
  onCopyShareLink: (token: string) => void;
}

export function GrokConversationList({
  conversations,
  currentConversation,
  copiedToken,
  onSelect,
  onDelete,
  onToggleSharing,
  onCopyShareLink,
}: GrokConversationListProps) {
  return (
    <ScrollArea className="h-[600px]">
      {conversations.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No conversations yet
        </p>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentConversation === conv.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
              onClick={() => onSelect(conv.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    {conv.is_public && (
                      <Badge variant="secondary" className="text-xs">Public</Badge>
                    )}
                  </div>
                  <p className="text-xs opacity-70">
                    {new Date(conv.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSharing(conv.id, conv.is_public);
                    }}
                    className="h-6 w-6 p-0"
                    title={conv.is_public ? 'Make private' : 'Make public'}
                  >
                    <Share2 className={`w-3 h-3 ${conv.is_public ? 'text-green-500' : ''}`} />
                  </Button>
                  {conv.is_public && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyShareLink(conv.share_token);
                      }}
                      className="h-6 w-6 p-0"
                      title="Copy share link"
                    >
                      {copiedToken === conv.share_token ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="h-6 w-6 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
