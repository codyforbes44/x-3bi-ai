import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Bot, Sparkles, MessageSquare, Music, Video, Phone, Wand2 } from "lucide-react";
import AdvancedAI from "@/components/AdvancedAI";
import LocalAI from "@/components/LocalAI";
import VoiceInterface from "@/components/VoiceInterface";
import AIConversation from "@/components/AIConversation";
import ClaudeChat from "@/components/ClaudeChat";
import MultiModelChat from "@/components/MultiModelChat";
import AdvancedHuggingFace from "@/components/AdvancedHuggingFace";
import SunoAI from "@/components/SunoAI";
import ReplicateAI from "@/components/ReplicateAI";
import ElevenLabsConversation from "@/components/ElevenLabsConversation";
import StabilityAI from "@/components/StabilityAI";
import GoogleGemini from "@/components/GoogleGemini";
import RunwayML from "@/components/RunwayML";

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

      <TabsContent value="claude" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Claude 4 Chat
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-500 border-purple-500/30">Latest Model</Badge>
            </CardTitle>
            <CardDescription>
              Direct conversation with Claude 4 Sonnet - Anthropic's most capable reasoning model.
            </CardDescription>
          </CardHeader>
        </Card>
        <ClaudeChat />
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

      <TabsContent value="multi-chat" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              Multi-Model Chat
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-500 border-purple-500/30">Compare</Badge>
            </CardTitle>
            <CardDescription>
              Compare responses from Claude Opus 4, Sonnet 4, GPT-5, and GPT-5 Mini simultaneously.
            </CardDescription>
          </CardHeader>
        </Card>
        <MultiModelChat />
      </TabsContent>

      <TabsContent value="advanced-huggingface" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Advanced Hugging Face
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Premium Models</Badge>
            </CardTitle>
            <CardDescription>
              Access powerful AI models for image generation, NLP, vision, and audio tasks.
            </CardDescription>
          </CardHeader>
        </Card>
        <AdvancedHuggingFace />
      </TabsContent>

      <TabsContent value="suno-ai" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5 text-pink-500" />
              Suno AI Music Generator
              <Badge variant="secondary" className="bg-pink-500/20 text-pink-500 border-pink-500/30">Music Generation</Badge>
            </CardTitle>
            <CardDescription>
              Generate custom music and songs with AI - describe what you want to hear.
            </CardDescription>
          </CardHeader>
        </Card>
        <SunoAI />
      </TabsContent>

      <TabsContent value="replicate-ai" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Replicate AI
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-500 border-blue-500/30">Multi-Model</Badge>
            </CardTitle>
            <CardDescription>
              Access hundreds of AI models for image, video, and upscaling.
            </CardDescription>
          </CardHeader>
        </Card>
        <ReplicateAI />
      </TabsContent>

      <TabsContent value="elevenlabs-conversation" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              ElevenLabs Voice Agents
              <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30">Voice AI</Badge>
            </CardTitle>
            <CardDescription>
              Real-time voice conversations with AI agents using ElevenLabs.
            </CardDescription>
          </CardHeader>
        </Card>
        <ElevenLabsConversation />
      </TabsContent>

      <TabsContent value="stability-ai" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-purple-500" />
              Stability AI
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-500 border-purple-500/30">SD3</Badge>
            </CardTitle>
            <CardDescription>
              Professional image generation with Stable Diffusion 3.
            </CardDescription>
          </CardHeader>
        </Card>
        <StabilityAI />
      </TabsContent>

      <TabsContent value="google-gemini" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              Google Gemini
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-500 border-orange-500/30">Gemini 2.0</Badge>
            </CardTitle>
            <CardDescription>
              Multimodal AI with 2M token context for text, image, and video.
            </CardDescription>
          </CardHeader>
        </Card>
        <GoogleGemini />
      </TabsContent>

      <TabsContent value="runwayml" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-red-500" />
              RunwayML Gen-3
              <Badge variant="secondary" className="bg-red-500/20 text-red-500 border-red-500/30">Video AI</Badge>
            </CardTitle>
            <CardDescription>
              Advanced AI video generation - text to video and image to video.
            </CardDescription>
          </CardHeader>
        </Card>
        <RunwayML />
      </TabsContent>
    </>
  );
};

export default AISection;