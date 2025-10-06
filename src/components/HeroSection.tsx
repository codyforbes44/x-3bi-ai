import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Brain, Code2, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[85vh] md:min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden pt-20 md:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 md:mb-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Claude Opus 4, GPT Image-1 & ElevenLabs
          </Badge>
          
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight animate-fade-in">
            AI That Works
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              For You
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Get instant access to powerful AI tools built with your needs first - 
            no complexity, just results that help you succeed
          </p>
          
          {/* AI Capabilities Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12 px-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Brain className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Claude Opus 4</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Code2 className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Claude Sonnet 4</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <ImagePlus className="w-4 h-4 text-white" />
              <span className="text-white text-sm">GPT Image-1</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto min-w-[200px] h-14 text-lg shadow-elegant hover-scale"
              onClick={() => navigate('/dashboard')}
            >
              Explore All Features
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto min-w-[200px] h-14 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => navigate('/issues')}
            >
              Get AI Guidance
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Easy to Use</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>Always Free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
