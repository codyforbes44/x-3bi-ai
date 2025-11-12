import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Brain, Code2, ImagePlus, Workflow, Zap, Eye, CheckCircle2, Star, TrendingUp, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/config/routes";
import { PLATFORM_STATS, AI_MODELS, getModelsByCategory } from "@/config/platform-capabilities";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const chatModels = getModelsByCategory('chat');
  const imageModels = getModelsByCategory('image');
  const voiceModels = getModelsByCategory('voice');

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden pt-20 pb-16">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 dark-pattern-grid opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl pulse-primary"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6 animate-fade-in">
            <Badge variant="secondary" className="bg-primary/10 backdrop-blur-sm border-primary/20 hover:bg-primary/20">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
              Premium X Verified
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 backdrop-blur-sm border-primary/20 hover:bg-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              {PLATFORM_STATS.totalFeatures} AI Features
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 backdrop-blur-sm border-primary/20 hover:bg-primary/20">
              <Brain className="w-4 h-4 mr-2" />
              {PLATFORM_STATS.totalModels} Latest Models
            </Badge>
          </div>
          
          {/* Main heading with gradient animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-6 leading-[1.1] animate-fade-in">
            <span className="gradient-text inline-block">
              The Complete AI Platform
            </span>
            <br />
            <span className="gradient-text inline-block">
              for Modern Teams
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Access <strong>Grok 3</strong>, <strong>Claude Opus 4</strong>, <strong>GPT-5</strong>, <strong>Gemini 2.0</strong>, and {PLATFORM_STATS.totalModels - 4}+ more models—all unified in one enterprise platform
          </p>
          
          {/* Key stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 text-foreground px-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">{chatModels.length}</div>
              <div className="text-sm text-muted-foreground">Chat Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">{imageModels.length}</div>
              <div className="text-sm text-muted-foreground">Image Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">{voiceModels.length}+</div>
              <div className="text-sm text-muted-foreground">Voice Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>

          {/* Model showcase pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 px-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/15 transition-smooth">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-foreground text-sm font-medium">Grok 3</span>
              <Badge variant="outline" className="text-xs border-border">Real-time</Badge>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/15 transition-smooth">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-foreground text-sm font-medium">Claude Opus 4</span>
              <Badge variant="outline" className="text-xs border-border">200K</Badge>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/15 transition-smooth">
              <ImagePlus className="w-4 h-4 text-primary" />
              <span className="text-foreground text-sm font-medium">DALL-E 3</span>
              <Badge variant="outline" className="text-xs border-border">HD</Badge>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/15 transition-smooth">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-foreground text-sm font-medium">GPT-5</span>
              <Badge variant="outline" className="text-xs border-border">Multimodal</Badge>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/15 transition-smooth">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-foreground text-sm font-medium">Gemini 2.0</span>
              <Badge variant="outline" className="text-xs border-border">1M Context</Badge>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-4 max-w-xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:flex-1 h-14 text-lg shadow-elegant hover-scale touch-target group"
              onClick={() => navigate(user ? ROUTES.DASHBOARD : ROUTES.AUTH)}
            >
              <span>{user ? 'Go to Dashboard' : 'Start Free Trial'}</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:flex-1 h-14 text-lg border-border hover:bg-accent backdrop-blur-sm touch-target"
              onClick={() => navigate(ROUTES.FEATURES)}
            >
              Explore Features
            </Button>
          </div>

          {/* Trust footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>No credit card required</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>14-day free trial</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;