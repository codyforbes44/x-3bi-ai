import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, Code2, ImagePlus, Mic, Search, Database, Zap, 
  Globe, MessageSquare, FileText, BarChart, Palette, 
  Video, Music, Shield, Cloud, Workflow, Box, Sparkles,
  CheckCircle2, ArrowRight, ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Integrations = () => {
  const navigate = useNavigate();

  const activeIntegrations = [
    {
      icon: Brain,
      name: "Anthropic Claude",
      models: ["Claude Opus 4", "Claude Sonnet 4", "Claude Haiku 3.5"],
      description: "Industry-leading AI for reasoning, analysis, and conversation",
      category: "Core AI",
      status: "active",
      features: ["200K context", "Vision", "Tool use", "Extended thinking"]
    },
    {
      icon: Code2,
      name: "OpenAI",
      models: ["GPT-5", "GPT-4.1", "o3", "o4-mini", "GPT Image-1"],
      description: "Advanced language and image generation models",
      category: "Core AI",
      status: "active",
      features: ["Reasoning", "Vision", "Image gen", "Function calling"]
    },
    {
      icon: Mic,
      name: "ElevenLabs",
      models: ["Multilingual v2.5", "Turbo v2.5"],
      description: "Premium text-to-speech with emotional voice synthesis",
      category: "Voice AI",
      status: "active",
      features: ["32 languages", "Voice cloning", "Low latency", "Emotional range"]
    },
    {
      icon: Search,
      name: "Perplexity AI",
      models: ["Sonar Large", "Sonar Huge"],
      description: "Real-time web search with AI-powered answers",
      category: "Search AI",
      status: "active",
      features: ["Live web data", "Citations", "Fast responses", "Fact-checking"]
    }
  ];

  const suggestedIntegrations = [
    {
      icon: Database,
      name: "Pinecone",
      description: "Vector database for semantic search and RAG applications",
      category: "Database",
      useCases: ["Knowledge bases", "Semantic search", "Recommendations", "Memory systems"]
    },
    {
      icon: Zap,
      name: "LangChain",
      description: "Framework for building AI agent workflows and chains",
      category: "Framework",
      useCases: ["Agent orchestration", "Multi-step reasoning", "Tool integration", "Memory management"]
    },
    {
      icon: Globe,
      name: "Google Gemini",
      description: "Multimodal AI for text, image, video, and audio analysis",
      category: "AI Models",
      useCases: ["Multimodal understanding", "Video analysis", "Long context", "Code generation"]
    },
    {
      icon: MessageSquare,
      name: "Cohere",
      description: "Enterprise AI for search, classification, and generation",
      category: "AI Models",
      useCases: ["Embeddings", "Reranking", "Classification", "Generation"]
    },
    {
      icon: FileText,
      name: "AssemblyAI",
      description: "Speech-to-text with speaker detection and summarization",
      category: "Audio AI",
      useCases: ["Transcription", "Sentiment analysis", "Topic detection", "PII redaction"]
    },
    {
      icon: BarChart,
      name: "Replicate",
      description: "Run open-source AI models via API",
      category: "Model Hosting",
      useCases: ["Stable Diffusion", "Llama models", "Custom models", "Image processing"]
    },
    {
      icon: Palette,
      name: "Stability AI",
      description: "Advanced image generation and editing models",
      category: "Image AI",
      useCases: ["Image generation", "Upscaling", "Inpainting", "Style transfer"]
    },
    {
      icon: Video,
      name: "Runway ML",
      description: "AI-powered video generation and editing tools",
      category: "Video AI",
      useCases: ["Video generation", "Frame interpolation", "Background removal", "Motion tracking"]
    },
    {
      icon: Music,
      name: "Suno / Udio",
      description: "AI music generation and composition",
      category: "Audio AI",
      useCases: ["Music generation", "Sound effects", "Voice synthesis", "Audio editing"]
    },
    {
      icon: Shield,
      name: "Guardrails AI",
      description: "Content moderation and safety for AI outputs",
      category: "Safety",
      useCases: ["Content filtering", "Bias detection", "PII protection", "Compliance"]
    },
    {
      icon: Cloud,
      name: "Weaviate",
      description: "Open-source vector database with hybrid search",
      category: "Database",
      useCases: ["Hybrid search", "Multi-tenancy", "GraphQL", "Real-time indexing"]
    },
    {
      icon: Workflow,
      name: "n8n / Zapier",
      description: "Workflow automation connecting AI with apps",
      category: "Automation",
      useCases: ["Workflow automation", "Data pipelines", "Event triggers", "Multi-app integration"]
    },
    {
      icon: Box,
      name: "Hugging Face",
      description: "Access to thousands of open-source AI models",
      category: "Model Hub",
      useCases: ["Model inference", "Fine-tuning", "Embeddings", "Open models"]
    },
    {
      icon: Sparkles,
      name: "Mistral AI",
      description: "High-performance open and commercial AI models",
      category: "AI Models",
      useCases: ["Fast inference", "Code generation", "Multilingual", "Function calling"]
    },
    {
      icon: Brain,
      name: "AI21 Labs",
      description: "Advanced language models with specialized capabilities",
      category: "AI Models",
      useCases: ["Summarization", "Paraphrasing", "Contextual answers", "Text improvements"]
    },
    {
      icon: Database,
      name: "Qdrant",
      description: "High-performance vector search engine",
      category: "Database",
      useCases: ["Vector similarity", "Filtering", "Payload indexing", "Distributed search"]
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Best-in-Class AI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            AI Integrations
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Leverage the world's most advanced AI models and services through our unified platform
          </p>
        </section>

        {/* Active Integrations */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              Active Integrations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeIntegrations.map((integration, index) => (
                <Card key={index} className="border-2 border-green-500/20 bg-green-500/5">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-green-500/10">
                        <integration.icon className="w-6 h-6 text-green-500" />
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                        {integration.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{integration.name}</CardTitle>
                    <CardDescription className="text-base mb-2">
                      {integration.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {integration.models.map((model, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {integration.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Suggested Integrations */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Potential Integration Partners</h2>
              <p className="text-lg text-muted-foreground">
                Expand capabilities with these powerful AI services and tools
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedIntegrations.map((integration, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover-scale">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <integration.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="outline">{integration.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold mb-2">Use Cases:</p>
                      {integration.useCases.map((useCase, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Integrate with 3BI.AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Unified API</h3>
                <p className="text-muted-foreground">
                  Access multiple AI providers through a single, consistent API interface
                </p>
              </Card>
              <Card className="p-6">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Built-in Safety</h3>
                <p className="text-muted-foreground">
                  Automatic content moderation and safety checks across all integrations
                </p>
              </Card>
              <Card className="p-6">
                <BarChart className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Cost Optimization</h3>
                <p className="text-muted-foreground">
                  Smart routing to the most cost-effective model for each task
                </p>
              </Card>
              <Card className="p-6">
                <Workflow className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Easy Switching</h3>
                <p className="text-muted-foreground">
                  Seamlessly switch between providers without code changes
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-hero text-white rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Request an Integration
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Need a specific AI service? Let us know and we'll prioritize adding it to our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8"
                onClick={() => navigate('/contact')}
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 border-white text-white hover:bg-white/10"
                onClick={() => navigate('/documentation')}
              >
                View API Docs
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Integrations;