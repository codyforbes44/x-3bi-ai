import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <section className="min-h-[85vh] md:min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden pt-14 md:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 md:-top-40 -right-20 md:-right-40 w-60 h-60 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 md:-bottom-40 -left-20 md:-left-40 w-60 h-60 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-6 md:mb-8">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
            <span className="text-white text-xs md:text-sm font-medium">Free AI Resources for Everyone</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
            AI Technology
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              For All Humanity
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            KALPESH is a non-profit platform providing free access to advanced AI tools. 
            No fees, no barriers—just powerful AI technology for everyone.
          </p>
          
          {/* Prompt input */}
          <div className="max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            <div className="relative group">
              <Input
                placeholder="Try our free AI tools - no signup required..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-12 md:h-16 text-base md:text-lg bg-white/95 backdrop-blur-sm border-0 shadow-elegant rounded-xl md:rounded-2xl pr-12 md:pr-16 placeholder:text-muted-foreground/60"
              />
              <Button 
                size="icon" 
                variant="hero"
                className="absolute right-1.5 md:right-2 top-1.5 md:top-2 h-9 w-9 md:h-12 md:w-12 rounded-lg md:rounded-xl shadow-glow group-hover:scale-105 transition-spring"
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-3 md:mt-4 space-x-4">
              <div className="flex items-center space-x-2 text-white/80 text-xs md:text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>100% Free • No Signup Required</span>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 px-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto sm:min-w-[160px] md:min-w-[180px] h-12 md:h-14 text-base md:text-lg shadow-elegant"
              onClick={() => window.location.href = '/dashboard'}
            >
              Explore Free Tools
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto sm:min-w-[160px] md:min-w-[180px] h-12 md:h-14 text-base md:text-lg border-white/20 text-white hover:bg-white/10"
              onClick={() => window.location.href = '/dashboard'}
            >
              Explore All Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;