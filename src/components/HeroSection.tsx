import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Code2, ImagePlus, Eye, Zap, Shield } from "lucide-react";
import { PLATFORM_STATS } from "@/config/platform-capabilities";
import { HeroBackground } from "@/components/hero/background";
import { HeroCTAs } from "@/components/hero/HeroCTAs";
const HeroSection = () => {
  return <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-16">
      {/* Energy animated background with modular layer system */}
      <HeroBackground intensity="medium" />
      
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 animate-fade-in">
            <Badge variant="neon-purple" className="glass-card">
              <Sparkles className="w-4 h-4 mr-2" />
              All-in-One AI Platform
            </Badge>
            <Badge variant="neon-cyan" className="glass-card">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2" aria-label="Live indicator"></div>
              Premium X Verified
            </Badge>
            <Badge variant="neon-pink" className="glass-card">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise-Grade Security
            </Badge>
          </div>
          
          {/* Pre-headline */}
          <div className="text-sm md:text-base text-primary font-semibold mb-3 animate-fade-in uppercase tracking-wider" style={{
          animationDelay: '50ms'
        }}>
            The Complete AI Platform
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-6 leading-[1.1] animate-fade-in" style={{
          animationDelay: '100ms'
        }}>
            <span className="block mb-2">
              Access Multiple AI Models
            </span>
            <span className="gradient-text block">
              In One Unified Platform
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in" style={{
          animationDelay: '200ms'
        }}>
            Access <strong className="text-foreground">Grok 4</strong>, <strong className="text-foreground">Claude Opus 4</strong>, <strong className="text-foreground">GPT-5</strong>, <strong className="text-foreground">Gemini 2.0 Pro</strong>, and {PLATFORM_STATS.totalModels - 4}+ more models. Unified with enterprise workflows, team collaboration, and analytics.
          </p>

          {/* Model showcase pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 px-4 animate-fade-in" style={{
          animationDelay: '300ms'
        }}>
            <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-full border border-purple-500/30 neon-glow-purple hover:border-purple-500/50 transition-all cursor-pointer group" role="button" tabIndex={0} aria-label="Grok 4 - Real-time AI with X verification">
              <Zap className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-foreground text-sm font-medium">Grok 4</span>
              <Badge variant="neon-cyan" className="text-xs">Real-time</Badge>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-full border border-purple-500/30 neon-glow-purple hover:border-purple-500/50 transition-all cursor-pointer group" role="button" tabIndex={0} aria-label="Claude Opus 4 - 200K context window">
              <Brain className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-foreground text-sm font-medium">Claude Opus 4</span>
              <Badge variant="outline" className="text-xs border-primary/50 bg-primary/10">200K</Badge>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-primary/20 hover:bg-primary/15 hover:border-primary/30 hover:shadow-glow transition-all cursor-pointer group" role="button" tabIndex={0} aria-label="DALL-E 3 - HD image generation">
              <ImagePlus className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-foreground text-sm font-medium">DALL-E 3</span>
              <Badge variant="outline" className="text-xs border-accent/50 bg-accent/10 text-accent">HD</Badge>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-primary/20 hover:bg-primary/15 hover:border-primary/30 hover:shadow-glow transition-all cursor-pointer group" role="button" tabIndex={0} aria-label="GPT-5 - Multimodal AI">
              <Code2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-foreground text-sm font-medium">GPT-5</span>
              <Badge variant="outline" className="text-xs border-primary/50 bg-primary/10">Multimodal</Badge>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-primary/20 hover:bg-primary/15 hover:border-primary/30 hover:shadow-glow transition-all cursor-pointer group" role="button" tabIndex={0} aria-label="Gemini 2.0 Pro - 1M context window">
              <Eye className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-foreground text-sm font-medium">Gemini 2.0</span>
              <Badge variant="outline" className="text-xs border-accent/50 bg-accent/10 text-accent">1M Context</Badge>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="animate-fade-in" style={{
          animationDelay: '400ms'
        }}>
            <HeroCTAs />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;