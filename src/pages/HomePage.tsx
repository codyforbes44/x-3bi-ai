import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Code2, 
  ImagePlus, 
  Mic2,
  Lightbulb,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MiniAIChat from "@/components/home/MiniAIChat";
import MiniImageGenerator from "@/components/home/MiniImageGenerator";
import MiniCodeAssistant from "@/components/home/MiniCodeAssistant";
import MiniVoiceInterface from "@/components/home/MiniVoiceInterface";
import { ROUTES } from "@/config/routes";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const aiCapabilities = [
    {
      icon: Zap,
      title: "Grok AI",
      description: "X's premium AI with real-time knowledge, vision capabilities, and advanced function calling",
      badge: "X Verified",
      color: "text-blue-500"
    },
    {
      icon: Brain,
      title: "Claude 4 Chat",
      description: "Claude Opus 4 & Sonnet 4 for superior reasoning, context understanding, and intelligent conversations",
      badge: "Most Capable",
      color: "text-purple-500"
    },
    {
      icon: Code2,
      title: "AI Code Assistant",
      description: "Generate, analyze, debug, and optimize code with Claude Sonnet 4 and GPT-5's programming expertise",
      badge: "Developer Pro",
      color: "text-green-500"
    },
    {
      icon: ImagePlus,
      title: "Image Generation",
      description: "DALL-E, Stable Diffusion 3, FLUX, Grok Vision, and more cutting-edge image models",
      badge: "Multi-Model",
      color: "text-pink-500"
    },
    {
      icon: Rocket,
      title: "System Architect",
      description: "Design complex architectures and technical solutions with Claude Opus 4's maximum intelligence",
      badge: "Enterprise",
      color: "text-orange-500"
    },
    {
      icon: Mic2,
      title: "Voice AI",
      description: "ElevenLabs premium voice synthesis and real-time conversational AI with natural emotions",
      badge: "Studio Quality",
      color: "text-cyan-500"
    }
  ];

  const platformBenefits = [
    "27 Advanced AI Features - Grok, Claude 4, GPT-5, Gemini 2.0, image, voice, and more",
    "Latest AI Models - Premium access to cutting-edge models with real-time updates",
    "X Premium Integration - Verified organization with Grok AI capabilities",
    "Team Workspaces - Collaborate with unlimited members and role-based access",
    "Workflow Builder - Automate complex AI tasks with visual workflow editor",
    "Usage Analytics - Track performance, costs, and optimize AI usage",
    "Enterprise Security - Row-level security, audit logs, and compliance ready"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Grok AI Spotlight Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-950/20 via-background to-purple-950/20 border-y border-border/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
                <Zap className="w-4 h-4 mr-2" />
                Powered by X (Twitter)
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Grok AI Integration
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                Experience X's most advanced AI directly in our platform. Built by xAI, Grok brings real-time knowledge, 
                multimodal understanding, and powerful reasoning to your workflows.
              </p>
              
              {/* Feature List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                    <Brain className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Grok 3 - Latest Model</h3>
                    <p className="text-sm text-muted-foreground">Advanced reasoning and real-time knowledge up to October 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                    <ImagePlus className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Vision Capabilities</h3>
                    <p className="text-sm text-muted-foreground">Analyze images, understand visual context, and extract insights</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg flex-shrink-0">
                    <Code2 className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Function Calling</h3>
                    <p className="text-sm text-muted-foreground">Execute tools, search data, and automate complex workflows</p>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto group"
                onClick={() => navigate(ROUTES.DASHBOARD)}
              >
                Try Grok Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right Visual Card */}
            <div className="relative">
              <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-950/30 to-purple-950/30 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Chat Example */}
                    <div className="space-y-3">
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                          <p className="text-sm">Analyze this market trend and give insights</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-semibold text-blue-500">Grok</span>
                          </div>
                          <p className="text-sm">Based on current data, I'm seeing a 23% upward trend in Q4 2025. Key factors include...</p>
                        </div>
                      </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Real-time Data
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Vision AI
                      </Badge>
                      <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Function Calling
                      </Badge>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        X Verified
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-xl animate-pulse-slow">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Start Hub - Working Mini Tools */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Cᴏᴅʏ Fᴏʀʙᴇꜱ
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Try AI Features Now</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto px-4">
              Experience premium AI instantly. No signup required—just start creating with enterprise-grade tools.
            </p>
          </div>
          
          {/* Working Mini Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
            <div className="h-[500px]">
              <MiniAIChat />
            </div>
            <div className="h-[500px]">
              <MiniImageGenerator />
            </div>
            <div className="h-[500px]">
              <MiniCodeAssistant />
            </div>
            <div className="h-[500px]">
              <MiniVoiceInterface />
            </div>
          </div>

          {/* AI Capabilities Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
            {aiCapabilities.map((capability, index) => (
              <Card 
                key={capability.title} 
                className="h-full hover:shadow-lg transition-all hover-scale border-border/50 touch-target"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                    <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg bg-primary/10 flex-shrink-0`}>
                      <capability.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${capability.color}`} />
                    </div>
                    <Badge variant="outline" className="text-[10px] sm:text-xs whitespace-nowrap">
                      {capability.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-2">{capability.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    {capability.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center px-4">
            <Button 
              size="lg" 
              className="bg-gradient-hero text-white w-full sm:w-auto min-w-[250px] h-12 sm:h-14 text-base sm:text-lg touch-target"
              onClick={() => navigate(ROUTES.PRICING)}
            >
              View Pricing & Plans →
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-hero text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-7 md:mb-8 max-w-xl lg:max-w-2xl mx-auto opacity-90 px-4 leading-relaxed">
            Join thousands of professionals using our platform with Grok, Claude 4, GPT-5, and 24+ other AI features. Enterprise-grade security, team collaboration, and dedicated support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-lg mx-auto">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 touch-target"
              onClick={() => navigate(ROUTES.PRICING)}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 border-white text-white hover:bg-white/10 touch-target"
              onClick={() => navigate(ROUTES.ENTERPRISE)}
            >
              Enterprise Solutions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
