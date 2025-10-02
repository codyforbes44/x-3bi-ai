import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, Code, Image, Mic, Brain, Workflow, 
  Database, FileSearch, Globe, Zap 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FreeAITools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: MessageSquare,
      title: "AI Chat",
      description: "Conversational AI powered by Claude Sonnet 4 for natural dialogues, questions, and assistance.",
      features: ["Natural conversations", "Context awareness", "Multi-turn dialogue"],
      model: "Claude Sonnet 4",
      category: "Chat",
      free: true
    },
    {
      icon: Brain,
      title: "AI Conversation",
      description: "Advanced reasoning and analysis with Claude Sonnet 4 for complex problem-solving.",
      features: ["Deep reasoning", "Multi-step analysis", "Problem solving"],
      model: "Claude Sonnet 4",
      category: "Analysis",
      free: true
    },
    {
      icon: Code,
      title: "AI Code Assistant",
      description: "Generate, review, and debug code with Claude Sonnet 4's programming expertise.",
      features: ["Code generation", "Bug fixing", "Code review"],
      model: "Claude Sonnet 4",
      category: "Development",
      free: true
    },
    {
      icon: Workflow,
      title: "AI Architect",
      description: "System design and architecture planning powered by Claude Opus 4.",
      features: ["System design", "Architecture patterns", "Best practices"],
      model: "Claude Opus 4",
      category: "Architecture",
      free: true
    },
    {
      icon: Database,
      title: "AI Insights",
      description: "Data analysis and insights generation using Claude Sonnet 4.",
      features: ["Data analysis", "Pattern recognition", "Insights generation"],
      model: "Claude Sonnet 4",
      category: "Analytics",
      free: true
    },
    {
      icon: Image,
      title: "AI Image Generator",
      description: "Create stunning images from text descriptions using GPT-Image-1.",
      features: ["Text to image", "Style variations", "High quality output"],
      model: "GPT-Image-1",
      category: "Creative",
      free: true
    },
    {
      icon: Mic,
      title: "AI Voice",
      description: "Premium text-to-speech with natural-sounding voices from ElevenLabs.",
      features: ["Natural voices", "Multiple languages", "Voice cloning"],
      model: "ElevenLabs",
      category: "Voice",
      free: true
    },
    {
      icon: Globe,
      title: "Web Scraper",
      description: "Extract and analyze web content with intelligent parsing.",
      features: ["Content extraction", "Data parsing", "URL analysis"],
      model: "Built-in",
      category: "Utility",
      free: true
    },
    {
      icon: FileSearch,
      title: "Free Text Analysis",
      description: "Analyze text for sentiment, entities, and key information.",
      features: ["Sentiment analysis", "Entity extraction", "Summarization"],
      model: "Transformers.js",
      category: "Analysis",
      free: true
    },
    {
      icon: Zap,
      title: "Workflow Builder",
      description: "Automate tasks by combining multiple AI capabilities.",
      features: ["Task automation", "Multi-step workflows", "Integration"],
      model: "Multiple",
      category: "Automation",
      free: true
    }
  ];

  const categories = ["All", "Chat", "Analysis", "Development", "Creative", "Voice", "Utility"];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Free AI Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Access powerful AI capabilities completely free. No credit card required, no hidden fees—just pure AI innovation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Badge variant="secondary" className="text-base px-4 py-2">
              10+ Free Tools
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">
              Best-in-class Models
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">
              No Credit Card
            </Badge>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {tools.map((tool, index) => (
              <Card key={index} className="p-6 hover-scale">
                <div className="flex items-start justify-between mb-4">
                  <tool.icon className="w-10 h-10 text-primary" />
                  {tool.free && (
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                      FREE
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                
                <div className="space-y-2 mb-4">
                  {tool.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-xs text-muted-foreground">{tool.model}</span>
                  <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Our Free Tools Stand Out</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="font-semibold mb-2">Free Forever</p>
                <p className="text-sm text-muted-foreground">No trials, no hidden costs</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">6+</div>
                <p className="font-semibold mb-2">AI Models</p>
                <p className="text-sm text-muted-foreground">Best providers integrated</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="font-semibold mb-2">Available</p>
                <p className="text-sm text-muted-foreground">Use anytime, anywhere</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Using Free AI Tools Now</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users already leveraging free AI to transform their work and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-hero text-white text-lg px-8 py-6"
                onClick={() => navigate('/dashboard')}
              >
                Access All Tools
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/tutorials')}
              >
                View Tutorials
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FreeAITools;
