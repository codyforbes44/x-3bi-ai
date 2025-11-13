import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/config/routes";

export function HeroCTAs() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="space-y-6 mb-12">
      {/* Primary and Secondary CTAs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-4 max-w-2xl mx-auto">
        <Button 
          size="lg" 
          className="w-full sm:flex-1 h-14 text-lg shadow-glow hover:shadow-glow-accent transition-all duration-300 hover-scale touch-target group bg-success hover:bg-success/90 text-success-foreground"
          onClick={() => navigate(user ? ROUTES.DASHBOARD : ROUTES.AUTH)}
        >
          <Sparkles className="mr-2 w-5 h-5" />
          <span>{user ? 'Go to Dashboard' : 'Start Free Trial'}</span>
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full sm:flex-1 h-14 text-lg border-border hover:bg-primary/10 hover:border-primary/30 backdrop-blur-sm touch-target transition-all duration-300"
          onClick={() => navigate(ROUTES.GROK)}
        >
          See Live Demo
        </Button>
      </div>

      {/* Tertiary CTA - Video/Tour */}
      <div className="text-center">
        <button 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors touch-target group"
          onClick={() => navigate(ROUTES.TUTORIALS)}
          aria-label="Watch 2-minute platform overview"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Play className="w-4 h-4 text-primary fill-primary" />
          </div>
          <span className="text-sm font-medium">Watch 2-min Overview</span>
        </button>
      </div>

      {/* Trust indicators */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-muted-foreground text-sm px-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>14-day free trial</span>
        </div>
        <span className="hidden sm:inline text-border">•</span>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>No credit card required</span>
        </div>
        <span className="hidden sm:inline text-border">•</span>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}
