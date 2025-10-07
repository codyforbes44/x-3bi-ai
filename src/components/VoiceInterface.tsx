import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { Mic, MicOff, MessageSquare, Send, Zap, Radio, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text' | 'audio';
}

const VoiceInterface: React.FC = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your real-time AI assistant. You can speak to me directly or type messages. I\'ll respond with both voice and text.',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [textInput, setTextInput] = useState('');
  const [currentTranscript, setCurrentTranscript] = useState('');
  
  const chatRef = useRef<RealtimeChat | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessage = (event: any) => {
    console.log('Received message:', event.type, event);
    
    switch (event.type) {
      case 'response.audio_transcript.delta':
        // Build up the transcript as it streams in
        setCurrentTranscript(prev => prev + (event.delta || ''));
        break;
        
      case 'response.audio_transcript.done':
        // Finalize the transcript
        if (currentTranscript.trim()) {
          const newMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: currentTranscript.trim(),
            timestamp: new Date(),
            type: 'audio'
          };
          setMessages(prev => [...prev, newMessage]);
        }
        setCurrentTranscript('');
        setIsSpeaking(false);
        break;
        
      case 'response.audio.delta':
        setIsSpeaking(true);
        break;
        
      case 'response.audio.done':
        setIsSpeaking(false);
        break;
        
      case 'input_audio_buffer.speech_started':
        console.log('User started speaking');
        break;
        
      case 'input_audio_buffer.speech_stopped':
        console.log('User stopped speaking');
        break;
        
      case 'conversation.item.input_audio_transcription.completed':
        // User's speech was transcribed
        if (event.transcript) {
          const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: event.transcript,
            timestamp: new Date(),
            type: 'audio'
          };
          setMessages(prev => [...prev, userMessage]);
        }
        break;
        
      case 'error':
        console.error('Realtime API error:', event);
        toast({
          title: "Realtime Error",
          description: event.error?.message || 'An unknown error occurred',
          variant: "destructive",
        });
        break;
        
      default:
        // Log other events for debugging
        if (event.type) {
          console.log(`Unhandled event type: ${event.type}`, event);
        }
    }
  };

  const handleError = (error: Error) => {
    console.error('RealtimeChat error:', error);
    toast({
      title: "Connection Error",
      description: error.message,
      variant: "destructive",
    });
    setIsConnected(false);
    setIsLoading(false);
  };

  const startConversation = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      chatRef.current = new RealtimeChat(handleMessage, handleError);
      await chatRef.current.init();
      setIsConnected(true);
      
      toast({
        title: "Connected",
        description: "Real-time voice interface is ready. Start speaking!",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : 'Failed to start real-time conversation',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const endConversation = () => {
    chatRef.current?.disconnect();
    setIsConnected(false);
    setIsSpeaking(false);
    setCurrentTranscript('');
    
    toast({
      title: "Disconnected",
      description: "Voice interface session ended",
    });
  };

  const sendTextMessage = async () => {
    if (!textInput.trim() || !chatRef.current?.getConnectionStatus()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textInput.trim(),
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      await chatRef.current?.sendMessage(textInput.trim());
      setTextInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Send Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-end gap-2 mb-2">
          <Badge variant="secondary" className={isConnected ? "bg-green-500/20 text-green-500 border-green-500/30" : "bg-red-500/20 text-red-500 border-red-500/30"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          {isSpeaking && (
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-500 border-blue-500/30 animate-pulse">
              <Zap className="w-3 h-3 mr-1" />
              Speaking
            </Badge>
          )}
        </div>
        <CardDescription>
          Real-time voice conversations with OpenAI's latest models. Speak naturally or type messages.
        </CardDescription>
        
        {/* Connection Controls */}
        <div className="flex items-center gap-4 pt-2">
          {!isConnected ? (
            <Button
              onClick={startConversation}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Voice Chat
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={endConversation}
              variant="destructive"
            >
              <MicOff className="w-4 h-4 mr-2" />
              End Chat
            </Button>
          )}
          
          {isConnected && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Real-time connection active
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      <Badge variant="secondary" className="h-5 text-xs">
                        {message.type === 'audio' ? <Mic className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Show current transcript being built */}
            {currentTranscript && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted text-muted-foreground border-2 border-primary/30">
                    <p className="text-sm whitespace-pre-wrap">{currentTranscript}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-xs opacity-70">Speaking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-6 pt-4 border-t">
          <div className="flex gap-2">
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Type a message or just speak..." : "Connect to start chatting"}
              className="flex-1"
              disabled={!isConnected}
            />
            <Button 
              onClick={sendTextMessage} 
              disabled={!textInput.trim() || !isConnected}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {isConnected && (
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
              <Mic className="w-3 h-3" />
              Listening for voice input - speak naturally
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInterface;