import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function HeroContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {user ? (
        <>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Welcome Back, {user.email?.split('@')[0]}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Continue your AI-powered journey across 24 models
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="mt-4"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Your Complete AI Platform
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Access 24 cutting-edge AI models through one powerful interface. 
            From conversational AI to advanced analytics.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mt-6">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/features')}
            >
              Explore Features
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
