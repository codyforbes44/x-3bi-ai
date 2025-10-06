import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function ElevenLabsConversation() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const { toast } = useToast();
  const conversationRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Check if microphone permission is granted
    navigator.permissions.query({ name: 'microphone' as PermissionName }).then((result) => {
      if (result.state === 'denied') {
        toast({
          title: "Microphone Access Required",
          description: "Please allow microphone access to use voice conversation",
          variant: "destructive",
        });
      }
    });
  }, []);

  const startConversation = async () => {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize audio context
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      // Get signed URL from edge function
      const response = await fetch(
        `https://jmazzsxnatfewblgpxfq.supabase.co/functions/v1/elevenlabs-conversation`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_signed_url' }),
        }
      );

      if (!response.ok) throw new Error('Failed to get signed URL');

      const { signed_url } = await response.json();

      // Initialize conversation with WebSocket
      const ws = new WebSocket(signed_url);
      
      ws.onopen = () => {
        setIsConnected(true);
        toast({
          title: "Connected",
          description: "Voice conversation started",
        });
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'agent_speaking') {
          setIsSpeaking(true);
        } else if (data.type === 'agent_finished') {
          setIsSpeaking(false);
        } else if (data.type === 'transcript') {
          setMessages(prev => [...prev, {
            role: data.role,
            content: data.content,
          }]);
        } else if (data.type === 'audio') {
          playAudio(data.audio);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast({
          title: "Connection Error",
          description: "Failed to maintain voice connection",
          variant: "destructive",
        });
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsSpeaking(false);
      };

      conversationRef.current = ws;

      // Start capturing audio from microphone
      startAudioCapture(ws);

    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start conversation",
        variant: "destructive",
      });
    }
  };

  const startAudioCapture = async (ws: WebSocket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      const audioContext = audioContextRef.current!;
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          const int16Array = new Int16Array(inputData.length);
          
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          }

          ws.send(JSON.stringify({
            type: 'audio',
            data: Array.from(int16Array),
          }));
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

    } catch (error) {
      console.error('Audio capture error:', error);
    }
  };

  const playAudio = async (audioData: number[]) => {
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const int16Array = new Int16Array(audioData);
    const float32Array = new Float32Array(int16Array.length);

    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }

    const audioBuffer = audioContext.createBuffer(1, float32Array.length, 16000);
    audioBuffer.copyToChannel(float32Array, 0);

    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    gainNode.gain.value = volume;
    source.buffer = audioBuffer;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start();
  };

  const endConversation = () => {
    if (conversationRef.current) {
      conversationRef.current.close();
      conversationRef.current = null;
    }
    setIsConnected(false);
    setIsSpeaking(false);
    toast({
      title: "Disconnected",
      description: "Voice conversation ended",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Phone className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>ElevenLabs Conversational AI</CardTitle>
            <CardDescription>
              Real-time voice conversations with AI agents
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          {!isConnected ? (
            <Button onClick={startConversation} size="lg" className="gap-2">
              <Phone className="w-5 h-5" />
              Start Conversation
            </Button>
          ) : (
            <Button onClick={endConversation} variant="destructive" size="lg" className="gap-2">
              <PhoneOff className="w-5 h-5" />
              End Conversation
            </Button>
          )}
        </div>

        {isConnected && (
          <>
            <div className="flex items-center justify-center gap-4">
              <Badge variant={isSpeaking ? "default" : "secondary"} className="gap-2">
                {isSpeaking ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    AI Speaking
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Listening
                  </>
                )}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label>Volume: {Math.round(volume * 100)}%</Label>
              <Slider
                value={[volume]}
                onValueChange={(v) => setVolume(v[0])}
                min={0}
                max={1}
                step={0.1}
              />
            </div>

            {messages.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <Label>Conversation</Label>
                <div className="space-y-2">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary/10 ml-8'
                          : 'bg-muted mr-8'
                      }`}
                    >
                      <div className="text-xs text-muted-foreground mb-1">
                        {msg.role === 'user' ? 'You' : 'AI'}
                      </div>
                      <div className="text-sm">{msg.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
