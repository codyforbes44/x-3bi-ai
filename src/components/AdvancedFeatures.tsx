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
    <section className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 mb-4 sm:mb-5 md:mb-6">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <span className="text-white font-medium text-sm sm:text-base">Advanced AI Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6 px-4">
            Beyond Traditional Platforms
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed">
            Our platform integrates cutting-edge AI technologies to deliver unprecedented 
            capabilities for development, analysis, and creativity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 group touch-target">
              <CardHeader className="p-4 sm:p-5 md:p-6 pb-4 sm:pb-5 md:pb-6">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-2.5 sm:p-3 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <CardTitle className="text-white text-base sm:text-lg mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 sm:mt-12 md:mt-16 text-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center py-4">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">7+</div>
              <div className="text-white/80 text-sm sm:text-base">AI Models</div>
            </div>
            <div className="text-center py-4">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">1.5s</div>
              <div className="text-white/80 text-sm sm:text-base">Response Time</div>
            </div>
            <div className="text-center py-4">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-white/80 text-sm sm:text-base">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;