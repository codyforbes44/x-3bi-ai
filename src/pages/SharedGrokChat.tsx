import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SEO } from '@/components/SEO';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  model: string;
  created_at: string;
}

export default function SharedGrokChat() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shareToken) {
      loadSharedConversation();
    }
  }, [shareToken]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadSharedConversation = async () => {
    try {
      setIsLoading(true);

      // Load conversation
      const { data: convData, error: convError } = await supabase
        .from('grok_conversations')
        .select('*')
        .eq('share_token', shareToken)
        .eq('is_public', true)
        .maybeSingle();

      if (convError) throw convError;
      
      if (!convData) {
        toast({
          title: 'Not Found',
          description: 'This conversation does not exist or is not shared.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setConversation(convData);

      // Load messages
      const { data: msgData, error: msgError } = await supabase
        .from('grok_messages')
        .select('*')
        .eq('conversation_id', convData.id)
        .order('created_at', { ascending: true });

      if (msgError) throw msgError;

      setMessages(msgData?.map(msg => ({ role: msg.role as 'user' | 'assistant', content: msg.content })) || []);
    } catch (error) {
      console.error('Failed to load shared conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to load shared conversation',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!conversation) {
    return null;
  }

  return (
    <>
      <SEO
        title={`Shared Grok Chat - ${conversation.title}`}
        description="View a shared Grok AI conversation"
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-4 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/grok-chat')}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Start Your Own Chat
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle>{conversation.title}</CardTitle>
                  <CardDescription>
                    Shared Grok conversation
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary">{conversation.model}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea ref={scrollRef} className="h-[600px] pr-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <Sparkles className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium">No messages yet</p>
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
                            {message.role === 'user' ? 'User' : 'Grok'}
                          </Badge>
                        </div>
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">
                This is a read-only shared conversation
              </p>
              <Button onClick={() => navigate('/grok-chat')}>
                Start Your Own Grok Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
