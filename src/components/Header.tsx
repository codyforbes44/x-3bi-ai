import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Lovable</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Community</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Pricing</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Enterprise</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Learn</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Launched</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Log in</Button>
          <Button variant="hero">Get started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;