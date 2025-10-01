import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Menu, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const isMobile = useIsMobile();
  const {
    theme,
    setTheme
  } = useTheme();

  // Safely get auth context with fallback
  let user = null;
  let signOut = () => Promise.resolve();
  try {
    const auth = useAuth();
    user = auth.user;
    signOut = auth.signOut;
  } catch (error) {
    // AuthProvider not available yet
    console.warn('AuthProvider not available');
  }
  const navigate = useNavigate();
  const getInitials = (name: string | null, email: string | null) => {
    if (name) return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
    return email?.charAt(0).toUpperCase() || 'U';
  };
  const navigation = [{
    name: "Community",
    href: "/community"
  }, {
    name: "Pricing",
    href: "/pricing"
  }, {
    name: "Enterprise",
    href: "/enterprise"
  }, {
    name: "Learn",
    href: "/learn"
  }, {
    name: "Launched",
    href: "/launched"
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">NEXUS</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map(item => <a key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground transition-smooth">
              {item.name}
            </a>)}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          
          
          {/* User Menu or Auth Buttons */}
          {user ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.email || ''} />
                    <AvatarFallback>
                      {getInitials(null, user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <>
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button className="bg-gradient-hero text-white" onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </>}
        </div>

        {/* Mobile Menu */}
        {isMobile && <Sheet>
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
                  {navigation.map(item => <a key={item.name} href={item.href} className="text-lg text-muted-foreground hover:text-foreground transition-smooth">
                      {item.name}
                    </a>)}
                </nav>
                
                <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                  {/* Mobile Theme Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="relative h-6 w-11 p-0 bg-muted border-0">
                        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-md transition-transform ${theme === "dark" ? "translate-x-5" : "translate-x-0.5"}`} />
                      </Button>
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>}
      </div>
    </header>;
};
export default Header;