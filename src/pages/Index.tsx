import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Image, Volume2, Code, Sparkles, ArrowRight, Zap, Brain, Cpu, Mic, Code2, BarChart3 } from "lucide-react";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import InteractiveDemo from "@/components/InteractiveDemo";
import LiveMetrics from "@/components/LiveMetrics";
import SocialProof from "@/components/SocialProof";
import CtaSection from "@/components/CtaSection";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI Chat Assistant",
      description: "Intelligent conversations with GPT-4o Mini for any task or question",
      icon: MessageSquare,
      color: "text-blue-500",
      badge: "GPT-4o Mini"
    },
    {
      title: "Image Generation",
      description: "Create stunning visuals with DALL-E 3 from simple text descriptions",
      icon: Image,
      color: "text-purple-500",
      badge: "DALL-E 3"
    },
    {
      title: "Voice Synthesis",
      description: "Convert text to natural speech with multiple high-quality voices",
      icon: Volume2,
      color: "text-green-500",
      badge: "TTS-1"
    },
    {
      title: "Code Assistant",
      description: "AI-powered code analysis, optimization, and debugging support",
      icon: Code,
      color: "text-orange-500",
      badge: "Code AI"
    }
  ];

  const capabilities = [
    {
      title: "Advanced AI Models",
      value: "4+ Models",
      description: "Latest OpenAI technology",
      icon: Brain
    },
    {
      title: "Lightning Fast",
      value: "< 2s Response",
      description: "Optimized performance",
      icon: Zap
    },
    {
      title: "100% Operational",
      value: "All Features",
      description: "Ready to use now",
      icon: Cpu
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <header className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AI Platform</span>
            </div>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="secondary"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Launch Platform
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Advanced AI Capabilities</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              AI Platform
              <br />
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Beyond Limits
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of AI with our comprehensive platform featuring chat, image generation, 
              voice synthesis, and code assistance - all powered by the latest OpenAI models.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="min-w-[200px] h-16 text-lg bg-white text-black hover:bg-white/90 shadow-glow"
              >
                Launch Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="min-w-[200px] h-16 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Explore Features
              </Button>
            </div>

            {/* Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {capabilities.map((capability) => (
                <Card key={capability.title} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center">
                    <capability.icon className="w-8 h-8 text-white mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white mb-2">{capability.value}</div>
                    <div className="text-white/90 font-medium mb-1">{capability.title}</div>
                    <div className="text-white/70 text-sm">{capability.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <AdvancedFeatures />
        
        {/* Interactive Demo Section */}
        <section className="py-20">
          <InteractiveDemo />
        </section>

        {/* Live Metrics Section */}
        <section className="py-20">
          <LiveMetrics />
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Powerful AI Features</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Our platform integrates multiple AI capabilities to provide comprehensive solutions for your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${feature.color}`}>
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white">{feature.title}</span>
                      <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-white/30">
                        {feature.badge}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-white/80 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20">
          <SocialProof />
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <CtaSection />
        </section>
      </div>
    </div>
  );
};

export default Index;
