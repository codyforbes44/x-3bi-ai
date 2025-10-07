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
  Heart,
  Scale,
  Briefcase,
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

  const guidanceAreas = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Get AI guidance on physical health, mental wellness, and lifestyle"
    },
    {
      icon: Scale,
      title: "Legal Advice",
      description: "Understand your rights and navigate legal matters with AI support"
    },
    {
      icon: Briefcase,
      title: "Career Growth",
      description: "Navigate career transitions and professional development"
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
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              Get Started Free →
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              No credit card required • Full access to all features
            </p>
          </div>
        </div>
      </section>

      {/* AI Guidance Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">AI-Powered Guidance</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                Get intelligent assistance for real-world challenges. Our AI provides thoughtful guidance on health, legal matters, career decisions, and personal growth.
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-7 md:mb-8">
                {guidanceAreas.map((area) => (
                  <div key={area.title} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors touch-target">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <area.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{area.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto h-12 sm:h-14 text-base sm:text-lg touch-target"
                onClick={() => navigate('/issues')}
              >
                Get AI Guidance
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            
            <div className="mt-8 lg:mt-0">
              <Card className="p-5 sm:p-6 md:p-8 bg-gradient-subtle border-border/50">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 md:mb-6">Platform Benefits</h3>
                <div className="space-y-3 sm:space-y-4">
                  {platformBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2.5 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-hero text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready for Premium AI?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-7 md:mb-8 max-w-xl lg:max-w-2xl mx-auto opacity-90 px-4 leading-relaxed">
            Join teams using our platform with Grok, Claude 4, GPT-5, and 24+ other AI features. Enterprise-grade security, team workspaces, and premium support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-lg mx-auto">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 touch-target"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 border-white text-white hover:bg-white/10 touch-target"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
