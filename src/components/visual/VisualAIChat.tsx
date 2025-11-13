import { useState, useRef, useEffect } from "react";
import { NeonCard } from "@/components/ui/neon-card";
import { AccentDot } from "@/components/ui/accent-dot";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User } from "lucide-react";
import { PromptBubbles } from "./PromptBubbles";
import { VoiceVisualizer } from "./VoiceVisualizer";
import { OnboardingTour } from "./OnboardingTour";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function VisualAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('visual-onboarding-complete');
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('visual-onboarding-complete', 'true');
    setShowOnboarding(false);
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          model: 'google/gemini-2.5-flash'
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition will be implemented separately
    toast({
      title: "Voice Input",
      description: isListening ? "Stopped listening" : "Started listening",
    });
  };

  return (
    <>
      {showOnboarding && <OnboardingTour onComplete={handleCompleteOnboarding} />}
      
      <NeonCard variant="purple" glass={true} glow={true} size="lg" className="h-[700px] flex flex-col">
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AccentDot color="purple" />
            <Bot className="h-6 w-6 text-purple-500" />
          </div>
        </div>
        
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
            <VoiceVisualizer 
              isListening={isListening}
              onToggle={handleVoiceToggle}
            />
            
            <div className="w-full max-w-2xl">
              <p className="text-center text-sm text-muted-foreground mb-6">
                Or choose a quick action
              </p>
              <PromptBubbles 
                onSelect={handleSendMessage}
                disabled={isLoading}
              />
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4 md:px-6 py-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-purple-500" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'glass-card border border-white/10'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-black" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 md:p-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-4">
                <VoiceVisualizer 
                  isListening={isListening}
                  onToggle={handleVoiceToggle}
                />
              </div>
            </div>
          </>
        )}
      </NeonCard>
    </>
  );
}
