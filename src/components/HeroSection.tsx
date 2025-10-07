import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Brain, Code2, ImagePlus, Workflow, Database, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/config/routes";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="min-h-[calc(100vh-3.5rem)] md:min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden pt-6 pb-12 md:pt-0 md:pb-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 md:mb-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            24 Advanced AI Features • Enterprise Ready
          </Badge>
          
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-[1.1] sm:leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Complete AI Platform for
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Chat, code, create images, generate voice, build workflows, and collaborate—all powered by the world's most advanced AI models. From prototypes to production.
          </p>
          
          {/* AI Capabilities Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
              <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm whitespace-nowrap">Claude 4 AI</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
              <ImagePlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm whitespace-nowrap">Image Generation</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm whitespace-nowrap">Code Assistant</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
              <Workflow className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm whitespace-nowrap">Workflows</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm whitespace-nowrap">Team Workspaces</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
              <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm whitespace-nowrap">Analytics</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4 max-w-lg mx-auto">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] h-12 sm:h-14 text-base md:text-lg shadow-elegant hover-scale touch-target"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <span className="truncate">Get Started Free</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] h-12 sm:h-14 text-base md:text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm touch-target"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <span className="truncate">Learn More</span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-white/70 text-xs sm:text-sm px-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="whitespace-nowrap">All Systems Operational</span>
            </div>
            <span className="whitespace-nowrap">•</span>
            <span className="whitespace-nowrap">24 AI Features Available</span>
            <span className="whitespace-nowrap">•</span>
            <span className="whitespace-nowrap">No Credit Card Required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
