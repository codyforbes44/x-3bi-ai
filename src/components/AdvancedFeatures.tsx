import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Code2, BarChart3, Image, Mic, MessageSquare, Brain } from "lucide-react";

const AdvancedFeatures = () => {
  const features = [
    {
      title: "AI Code Architect",
      description: "Generate complete applications with production-ready code",
      icon: Code2,
      color: "text-purple-400",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Advanced Analytics",
      description: "Business intelligence and predictive insights",
      icon: BarChart3,
      color: "text-blue-400",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Premium Voice AI",
      description: "Ultra-realistic speech with ElevenLabs technology",
      icon: Mic,
      color: "text-green-400",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "DALL-E Integration",
      description: "Create stunning visuals from text descriptions",
      icon: Image,
      color: "text-pink-400",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Intelligent Chat",
      description: "Conversations powered by GPT-4o technology",
      icon: MessageSquare,
      color: "text-orange-400",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      title: "Neural Processing",
      description: "Advanced AI models for complex tasks",
      icon: Brain,
      color: "text-violet-400",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Brain className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Advanced AI Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Beyond Traditional Platforms
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our platform integrates cutting-edge AI technologies to deliver unprecedented 
            capabilities for development, analysis, and creativity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 group">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-white/70">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">7+</div>
              <div className="text-white/80">AI Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1.5s</div>
              <div className="text-white/80">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-white/80">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;