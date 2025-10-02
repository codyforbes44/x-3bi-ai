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
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const aiCapabilities = [
    {
      icon: Brain,
      title: "Claude Sonnet 4 Chat",
      description: "Advanced conversational AI with superior reasoning and context understanding",
      badge: "Most Intelligent",
      color: "text-blue-500"
    },
    {
      icon: Code2,
      title: "AI Code Assistant",
      description: "Powered by Claude Sonnet 4 for exceptional code analysis, debugging, and optimization",
      badge: "Best-in-Class",
      color: "text-green-500"
    },
    {
      icon: ImagePlus,
      title: "GPT Image Generation",
      description: "Create stunning images with gpt-image-1, the most powerful image generation model",
      badge: "Most Advanced",
      color: "text-purple-500"
    },
    {
      icon: Rocket,
      title: "AI Architect",
      description: "Claude Opus 4 powered architecture design for complex systems and applications",
      badge: "Maximum Intelligence",
      color: "text-orange-500"
    },
    {
      icon: Mic2,
      title: "ElevenLabs Voice",
      description: "Natural, emotionally rich voice synthesis with the industry's best TTS technology",
      badge: "Premium Quality",
      color: "text-pink-500"
    },
    {
      icon: Lightbulb,
      title: "AI Insights",
      description: "Deep data analysis and predictive insights powered by Claude's reasoning capabilities",
      badge: "Analytical",
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
    "Access to Claude Opus 4 & Sonnet 4 - the most intelligent AI models",
    "GPT Image-1 for advanced image generation with detailed control",
    "ElevenLabs premium voice synthesis for natural conversations",
    "Real-time AI assistance across multiple domains",
    "No usage limits on free tier features",
    "Privacy-focused with secure data handling"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* AI Capabilities Showcase */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Best-in-Class AI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              World-Class AI Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the most advanced AI models available, integrated into one powerful platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiCapabilities.map((capability, index) => (
              <Card 
                key={capability.title} 
                className="h-full hover:shadow-lg transition-all hover-scale border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-primary/10`}>
                      <capability.icon className={`w-6 h-6 ${capability.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {capability.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{capability.title}</CardTitle>
                  <CardDescription className="text-base">
                    {capability.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-hero text-white"
              onClick={() => navigate('/dashboard')}
            >
              Try AI Tools Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI Guidance Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">AI-Powered Guidance</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Help When You Need It
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Submit your concerns and receive AI-powered guidance for life's challenges - from health and legal matters to career and personal growth.
              </p>
              
              <div className="space-y-4 mb-8">
                {guidanceAreas.map((area) => (
                  <div key={area.title} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <area.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{area.title}</h3>
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/issues')}
              >
                Get AI Guidance
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div>
              <Card className="p-8 bg-gradient-subtle border-border/50">
                <h3 className="text-2xl font-bold mb-6">Platform Benefits</h3>
                <div className="space-y-4">
                  {platformBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Next-Gen AI?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Access Claude Opus 4, GPT Image-1, ElevenLabs Voice, and more - all in one platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8"
              onClick={() => navigate('/dashboard')}
            >
              Start Creating Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-white text-white hover:bg-white/10"
              onClick={() => navigate('/learn')}
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
