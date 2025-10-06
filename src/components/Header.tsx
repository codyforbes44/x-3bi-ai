import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, Settings, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import kalpeshLogo from "@/assets/kalpesh-logo.png";
const Header = () => {
  const isMobile = useIsMobile();

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
    name: "Workspaces",
    href: "/workspaces"
  }, {
    name: "Learn",
    href: "/learn"
  }, {
    name: "Our Mission",
    href: "/mission"
  }, {
    name: "Impact",
    href: "/impact"
  }, {
    name: "Partners",
    href: "/partners"
  }, {
    name: "Launched",
    href: "/launched"
  }, {
    name: "Issues",
    href: "/issues"
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-3 md:px-4 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src={kalpeshLogo} 
            alt="3BI.AI Logo" 
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-base md:text-xl font-bold leading-none">3BI.AI</span>
            <span className="text-[9px] md:text-xs text-muted-foreground hidden sm:block leading-none mt-0.5">Best-in-Class AI Platform</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navigation.map(item => <a key={item.name} href={item.href} className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-smooth">
              {item.name}
            </a>)}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
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
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-2">
                  <img 
                    src={kalpeshLogo} 
                    alt="3BI.AI Logo" 
                    className="w-10 h-10 object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">3BI.AI</span>
                    <span className="text-xs text-muted-foreground">Best-in-Class AI Platform</span>
                  </div>
                </div>
                
                <nav className="flex flex-col space-y-3">
                  {navigation.map(item => <a key={item.name} href={item.href} className="text-base text-muted-foreground hover:text-foreground transition-smooth py-2 touch-target">
                      {item.name}
                    </a>)}
                </nav>
                
                <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                  {/* Mobile Theme Toggle */}
                  <ThemeToggle variant="mobile" />
                  
                  {/* Mobile Auth */}
                  {user ? (
                    <>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => navigate('/dashboard')}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => navigate('/profile')}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Profile Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-destructive hover:text-destructive"
                        onClick={signOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => navigate('/auth')}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="bg-gradient-hero text-white justify-start"
                        onClick={() => navigate('/auth')}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>}
      </div>
    </header>;
};
export default Header;