import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MessageSquare, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function DemoChatSection() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDemo = async () => {
    if (!message.trim() || message.length > 500) {
      toast({
        title: 'Invalid input',
        description: 'Please enter a message (max 500 characters)',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setReply('');

    try {
      const { data, error } = await supabase.functions.invoke('demo-chat', {
        body: { message: message.trim() }
      });

      if (error) throw error;
      setReply(data.reply);
    } catch (error) {
      console.error('Demo chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 bg-background/50 backdrop-blur-sm border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">AI Chat Demo</h3>
          <p className="text-sm text-muted-foreground">Try our Gemini-powered chat assistant</p>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Ask me anything... (e.g., 'Explain quantum computing in simple terms')"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={3}
          className="resize-none"
        />

        <Button 
          onClick={handleDemo} 
          disabled={isLoading || !message.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Response
            </>
          )}
        </Button>

        {reply && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-sm text-foreground leading-relaxed">{reply}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
