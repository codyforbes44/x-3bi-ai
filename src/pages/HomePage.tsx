import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Zap, 
  Brain, 
  Mic, 
  Image, 
  Code, 
  MessageCircle,
  Star,
  Users,
  Shield,
  Rocket,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Assistant",
      description: "Intelligent conversations powered by cutting-edge language models"
    },
    {
      icon: Mic,
      title: "Voice Interface",
      description: "Natural voice interactions with real-time processing"
    },
    {
      icon: Image,
      title: "AI Image Generation",
      description: "Create stunning visuals from simple text descriptions"
    },
    {
      icon: Code,
      title: "Code Assistant",
      description: "AI-powered coding help across multiple programming languages"
    },
    {
      icon: MessageCircle,
      title: "Smart Conversations",
      description: "Context-aware discussions that understand your needs"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for instant AI responses"
    }
  ];

  const benefits = [
    "Completely free forever",
    "No signup required for basic tools",
    "Open access to AI technology",
    "Community-driven development",
    "Privacy-focused and ethical",
    "Educational resources included"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm">
            🌍 Non-Profit AI Resource Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Free AI for Everyone
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
            KALPESH provides free access to advanced AI technology for all humanity. 
            No costs, no barriers—just powerful AI tools to help you create, learn, and innovate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-hero text-white text-lg px-8 py-4"
              onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
            >
              {user ? 'Go to Dashboard' : 'Access Free Tools'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => navigate('/dashboard')}
            >
              <Rocket className="mr-2 w-5 h-5" />
              View All Resources
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Free Access</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Free AI Tools for Everyone</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access powerful AI technology at no cost. Our mission is to democratize AI and make it accessible to all.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why KALPESH?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                A non-profit initiative dedicated to making AI technology accessible to everyone, everywhere.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="bg-gradient-hero text-white"
                onClick={() => navigate('/dashboard')}
              >
                Start Using Free AI
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Free</h3>
                <p className="text-sm text-muted-foreground">Always free, no hidden costs</p>
              </Card>
              <Card className="text-center p-6">
                <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Accessible</h3>
                <p className="text-sm text-muted-foreground">No barriers to entry</p>
              </Card>
              <Card className="text-center p-6">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">Built by and for everyone</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Non-Profit</h3>
                <p className="text-sm text-muted-foreground">Mission-driven organization</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the AI Revolution</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Be part of a global community accessing free AI technology. Together, we're democratizing AI for all humanity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-4"
              onClick={() => navigate('/dashboard')}
            >
              Access Free Tools
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/community')}
            >
              Learn About Our Mission
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;