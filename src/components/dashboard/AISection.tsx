import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Bot } from "lucide-react";
import AdvancedAI from "@/components/AdvancedAI";
import LocalAI from "@/components/LocalAI";
import VoiceInterface from "@/components/VoiceInterface";
import AIConversation from "@/components/AIConversation";

const AISection = () => {
  return (
    <>
      <TabsContent value="advanced" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Advanced AI Intelligence
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-500 border-purple-500/30">Claude 4</Badge>
            </CardTitle>
            <CardDescription>
              Access Claude 4's superior reasoning, Perplexity's real-time web search, and multi-modal AI capabilities.
            </CardDescription>
          </CardHeader>
        </Card>
        <AdvancedAI />
      </TabsContent>

      <TabsContent value="local" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-orange-500" />
              Local AI Models
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-500 border-orange-500/30">Privacy-First</Badge>
            </CardTitle>
            <CardDescription>
              Run AI models locally in your browser with WebGPU acceleration. No data leaves your device.
            </CardDescription>
          </CardHeader>
        </Card>
        <LocalAI />
      </TabsContent>

      <TabsContent value="realtime" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-red-500" />
              Real-Time Voice Interface
              <Badge variant="secondary" className="bg-red-500/20 text-red-500 border-red-500/30">WebRTC</Badge>
            </CardTitle>
            <CardDescription>
              Direct audio-to-audio conversations using OpenAI's Realtime API with WebRTC for ultra-low latency.
            </CardDescription>
          </CardHeader>
        </Card>
        <VoiceInterface />
      </TabsContent>

      <TabsContent value="conversation" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-500" />
              AI Voice Conversation
              <Badge variant="secondary">Voice + Text</Badge>
            </CardTitle>
            <CardDescription>
              Advanced conversational AI with voice responses using ElevenLabs premium voices.
            </CardDescription>
          </CardHeader>
        </Card>
        <AIConversation />
      </TabsContent>
    </>
  );
};

export default AISection;