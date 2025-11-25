import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { homeContent } from "@/config/home-content";

export function HeroHeadline() {
  const { user } = useAuth();
  const BadgeIcon = homeContent.hero.badge.icon;

  return (
    <div className="space-y-4">
      {user ? (
        <p className="text-lg text-muted-foreground">
          Welcome back, {user.email?.split('@')[0]}
        </p>
      ) : (
        <Badge variant="outline" className="border-primary/50">
          <BadgeIcon className="w-4 h-4 mr-2" />
          {homeContent.hero.badge.text}
        </Badge>
      )}
      
      <h1 
        id="hero-heading"
        className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent leading-tight"
      >
        {homeContent.hero.title.line1}
        <span className="block">{homeContent.hero.title.line2}</span>
      </h1>
      
      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
        {homeContent.hero.description}
      </p>
    </div>
  );
}
