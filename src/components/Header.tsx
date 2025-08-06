import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu, Sun, Moon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";

const Header = () => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: "Community", href: "/community" },
    { name: "Pricing", href: "/pricing" },
    { name: "Enterprise", href: "/enterprise" },
    { name: "Learn", href: "/learn" },
    { name: "Launched", href: "/launched" }
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
          {/* Theme Toggle */}
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative h-6 w-11 p-0 bg-muted border-0"
            >
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-md transition-transform ${
                theme === "dark" ? "translate-x-5" : "translate-x-0.5"
              }`} />
            </Button>
            <Moon className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Dark</span>
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
                  {/* Mobile Theme Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="relative h-6 w-11 p-0 bg-muted border-0"
                      >
                        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-md transition-transform ${
                          theme === "dark" ? "translate-x-5" : "translate-x-0.5"
                        }`} />
                      </Button>
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
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