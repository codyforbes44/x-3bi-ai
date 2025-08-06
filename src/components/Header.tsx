import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();

  const navigation = [
    { name: "Community", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Enterprise", href: "#" },
    { name: "Learn", href: "#" },
    { name: "Launched", href: "#" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Lovable</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost">Log in</Button>
          <Button variant="hero">Get started</Button>
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Lovable</span>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
                
                <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                  <Button variant="ghost" className="justify-start">Log in</Button>
                  <Button variant="hero" className="justify-start">Get started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default Header;