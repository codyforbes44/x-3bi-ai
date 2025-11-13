import { useAuth } from "@/contexts/AuthContext";

interface HeroContentProps {
  className?: string;
}

export function HeroContent({ className = "" }: HeroContentProps) {
  const { user } = useAuth();

  return (
    <div className={className}>
      {user ? (
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Continue your AI-powered journey
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent">
            Your Complete AI Platform
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Access 24 cutting-edge AI models through one powerful interface. 
            From conversational AI to advanced analytics.
          </p>
        </div>
      )}
    </div>
  );
}
