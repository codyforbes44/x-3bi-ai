import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Image, Mic, Volume2 } from "lucide-react";
import AIChat from "@/components/AIChat";
import AIImageGenerator from "@/components/AIImageGenerator";
import PremiumVoice from "@/components/PremiumVoice";
import AIVoice from "@/components/AIVoice";

const AIToolsSection = () => {
  return (
    <>
      <TabsContent value="chat" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              AI Chat Assistant
              <Badge variant="secondary">GPT-4o Mini</Badge>
            </CardTitle>
            <CardDescription>
              Have intelligent conversations with our advanced AI assistant. Ask questions, get help with tasks, or just chat!
            </CardDescription>
          </CardHeader>
        </Card>
        <AIChat />
      </TabsContent>

      <TabsContent value="image" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5 text-pink-500" />
              AI Image Generator
              <Badge variant="secondary">DALL-E 3</Badge>
            </CardTitle>
            <CardDescription>
              Create stunning, unique images from text descriptions using state-of-the-art AI image generation.
            </CardDescription>
          </CardHeader>
        </Card>
        <AIImageGenerator />
      </TabsContent>

      <TabsContent value="voice" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-green-500" />
              Premium Voice Synthesis
              <Badge variant="secondary">ElevenLabs</Badge>
            </CardTitle>
            <CardDescription>
              Generate ultra-realistic speech with ElevenLabs premium voices and emotional expression.
            </CardDescription>
          </CardHeader>
        </Card>
        <PremiumVoice />
      </TabsContent>

      <TabsContent value="basic-voice" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-teal-500" />
              Basic Voice Synthesis
              <Badge variant="secondary">TTS-1</Badge>
            </CardTitle>
            <CardDescription>
              Convert text to natural-sounding speech with OpenAI's text-to-speech models.
            </CardDescription>
          </CardHeader>
        </Card>
        <AIVoice />
      </TabsContent>
    </>
  );
};

export default AIToolsSection;