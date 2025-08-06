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

const HomePage = () => {
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
    "50+ AI models and tools",
    "Real-time processing",
    "Enterprise-grade security",
    "24/7 availability",
    "Multi-language support",
    "Custom integrations"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm">
            🚀 Next-Generation AI Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Build the Future with AI
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Unleash the power of artificial intelligence with our comprehensive platform. 
            From conversations to code, images to insights—everything you need to create amazing experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-hero text-white text-lg px-8 py-4">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Rocket className="mr-2 w-5 h-5" />
              View Dashboard
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">AI Interactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Powerful AI Tools at Your Fingertips</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive suite of AI tools helps you work smarter, create faster, and achieve more.
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
              <h2 className="text-4xl font-bold mb-6">Why Choose Our Platform?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Built for creators, developers, and businesses who demand the best AI technology.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="bg-gradient-hero text-white">
                Start Building Today
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Secure</h3>
                <p className="text-sm text-muted-foreground">Enterprise-grade security</p>
              </Card>
              <Card className="text-center p-6">
                <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Fast</h3>
                <p className="text-sm text-muted-foreground">Lightning-fast responses</p>
              </Card>
              <Card className="text-center p-6">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Collaborative</h3>
                <p className="text-sm text-muted-foreground">Team-friendly features</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Rated #1</h3>
                <p className="text-sm text-muted-foreground">Top AI platform</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of creators and businesses already using our AI platform to achieve extraordinary results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;