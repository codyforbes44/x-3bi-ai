import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Image, Volume2, Code, Sparkles, Zap, Brain, Cpu, Mic } from "lucide-react";
import AIChat from "@/components/AIChat";
import AIImageGenerator from "@/components/AIImageGenerator";
import AIVoice from "@/components/AIVoice";
import PremiumVoice from "@/components/PremiumVoice";
import AICodeAssistant from "@/components/AICodeAssistant";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const features = [
    {
      id: "chat",
      title: "AI Chat",
      description: "Intelligent conversations with GPT-4o Mini",
      icon: MessageSquare,
      color: "text-blue-500",
      badge: "GPT-4o Mini"
    },
    {
      id: "image",
      title: "Image Generation",
      description: "Create stunning visuals with DALL-E",
      icon: Image,
      color: "text-purple-500",
      badge: "DALL-E 3"
    },
    {
      id: "voice",
      title: "Premium Voice",
      description: "Ultra-realistic speech with ElevenLabs",
      icon: Mic,
      color: "text-green-500",
      badge: "ElevenLabs"
    },
    {
      id: "basic-voice",
      title: "Basic Voice",
      description: "Standard text-to-speech with OpenAI",
      icon: Volume2,
      color: "text-teal-500",
      badge: "TTS-1"
    },
    {
      id: "code",
      title: "Code Assistant",
      description: "AI-powered code analysis and optimization",
      icon: Code,
      color: "text-orange-500",
      badge: "Code AI"
    }
  ];

  const stats = [
    {
      title: "AI Models Available",
      value: "5+",
      description: "Advanced AI capabilities",
      icon: Brain,
      color: "text-blue-500"
    },
    {
      title: "Processing Speed",
      value: "< 2s",
      description: "Average response time",
      icon: Zap,
      color: "text-yellow-500"
    },
    {
      title: "Features Active",
      value: "100%",
      description: "All systems operational",
      icon: Cpu,
      color: "text-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Platform</h1>
              <p className="text-muted-foreground">Advanced AI capabilities at your fingertips</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm font-medium">{stat.title}</div>
                      <div className="text-xs text-muted-foreground">{stat.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-2">
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="hidden sm:inline">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

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
                  <Image className="w-5 h-5 text-purple-500" />
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

          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-500" />
                  AI Code Assistant
                  <Badge variant="secondary">Code AI</Badge>
                </CardTitle>
                <CardDescription>
                  Get help with code explanation, optimization, debugging, and language conversion using advanced AI.
                </CardDescription>
              </CardHeader>
            </Card>
            <AICodeAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;