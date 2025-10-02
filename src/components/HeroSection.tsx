import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Free AI Resources for Everyone</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI Technology
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              For All Humanity
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            KALPESH is a non-profit platform providing free access to advanced AI tools. 
            No fees, no barriers—just powerful AI technology for everyone.
          </p>
          
          {/* Prompt input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Input
                placeholder="Try our free AI tools - no signup required..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-16 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-elegant rounded-2xl pr-16 placeholder:text-muted-foreground/60"
              />
              <Button 
                size="icon" 
                variant="hero"
                className="absolute right-2 top-2 h-12 w-12 rounded-xl shadow-glow group-hover:scale-105 transition-spring"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-4 space-x-4">
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>100% Free • No Signup Required</span>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              variant="secondary" 
              className="min-w-[180px] h-14 text-lg shadow-elegant"
              onClick={() => window.location.href = '/dashboard'}
            >
              Explore Free Tools
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="min-w-[180px] h-14 text-lg border-white/20 text-white hover:bg-white/10"
              onClick={() => window.location.href = '/community'}
            >
              About Our Mission
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;