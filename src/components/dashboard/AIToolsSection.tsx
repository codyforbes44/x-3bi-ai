import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Image, Mic, Volume2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AIChat from "@/components/AIChat";
import AIImageGenerator from "@/components/AIImageGenerator";
import PremiumVoice from "@/components/PremiumVoice";
import AIVoice from "@/components/AIVoice";

const AIToolsSection = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <TabsContent value="chat" className={`space-y-${isMobile ? '3' : '4'}`}>
        <Card>
          <CardHeader className={isMobile ? 'p-4' : ''}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
              <MessageSquare className="w-5 h-5 text-blue-500" />
              AI Chat Assistant
              <Badge variant="secondary">GPT-4o Mini</Badge>
            </CardTitle>
            <CardDescription className={isMobile ? 'text-sm' : ''}>
              Have intelligent conversations with our advanced AI assistant. Ask questions, get help with tasks, or just chat!
            </CardDescription>
          </CardHeader>
        </Card>
        <AIChat />
      </TabsContent>

      <TabsContent value="image" className={`space-y-${isMobile ? '3' : '4'}`}>
        <Card>
          <CardHeader className={isMobile ? 'p-4' : ''}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
              <Image className="w-5 h-5 text-pink-500" />
              AI Image Generator
              <Badge variant="secondary">DALL-E 3</Badge>
            </CardTitle>
            <CardDescription className={isMobile ? 'text-sm' : ''}>
              Create stunning, unique images from text descriptions using state-of-the-art AI image generation.
            </CardDescription>
          </CardHeader>
        </Card>
        <AIImageGenerator />
      </TabsContent>

      <TabsContent value="voice" className={`space-y-${isMobile ? '3' : '4'}`}>
        <Card>
          <CardHeader className={isMobile ? 'p-4' : ''}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
              <Mic className="w-5 h-5 text-green-500" />
              Premium Voice Synthesis
              <Badge variant="secondary">ElevenLabs</Badge>
            </CardTitle>
            <CardDescription className={isMobile ? 'text-sm' : ''}>
              Generate ultra-realistic speech with ElevenLabs premium voices and emotional expression.
            </CardDescription>
          </CardHeader>
        </Card>
        <PremiumVoice />
      </TabsContent>

      <TabsContent value="basic-voice" className={`space-y-${isMobile ? '3' : '4'}`}>
        <Card>
          <CardHeader className={isMobile ? 'p-4' : ''}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
              <Volume2 className="w-5 h-5 text-teal-500" />
              Basic Voice Synthesis
              <Badge variant="secondary">TTS-1</Badge>
            </CardTitle>
            <CardDescription className={isMobile ? 'text-sm' : ''}>
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