import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, Settings, LogOut, Home, LayoutDashboard, FileText, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedLogo } from "@/components/visual/AnimatedLogo";
import { MAIN_NAVIGATION, ROUTES } from "@/config/routes";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { OnboardingProgressIndicator } from "@/components/onboarding/OnboardingProgressIndicator";
import { IconNavButton } from "@/components/visual/IconNavButton";

// Map navigation items to icons
const NAV_ICONS: Record<string, any> = {
  "Home": Home,
  "Dashboard": LayoutDashboard,
  "Features": Sparkles,
  "Documentation": FileText,
};
const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get auth context with fallback
  let user = null;
  let signOut = () => Promise.resolve();
  try {
    const auth = useAuth();
    user = auth.user;
    signOut = auth.signOut;
  } catch (error) {
    console.warn('AuthProvider not available');
  }

  const getInitials = (name: string | null, email: string | null) => {
    if (name) return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
    return email?.charAt(0).toUpperCase() || 'U';
  };

  const isActiveRoute = (href: string) => location.pathname === href;

  return (
    <>
      {user && <OnboardingProgressIndicator />}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-3 md:px-4 h-14 md:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center hover:opacity-80 transition-opacity"
            aria-label="3BI.AI Home"
          >
            <AnimatedLogo size="md" showText={true} />
          </Link>
          
          {/* Desktop Navigation - Icons Only */}
          <nav className="hidden md:flex items-center space-x-2">
            {MAIN_NAVIGATION.map(item => {
              const Icon = NAV_ICONS[item.name] || Sparkles;
              return (
                <IconNavButton
                  key={item.name}
                  icon={Icon}
                  label={item.name}
                  href={item.href}
                  isActive={isActiveRoute(item.href)}
                />
              );
            })}
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
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.DASHBOARD} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.PROFILE} className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : (
            <>
              <Button variant="ghost" asChild>
                <Link to={ROUTES.AUTH}>Sign In</Link>
              </Button>
              <Button className="bg-gradient-hero text-primary-foreground" asChild>
                <Link to={ROUTES.AUTH}>Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col space-y-6 mt-6">
                <AnimatedLogo size="lg" showText={true} />
                
                <nav className="flex flex-col space-y-3">
                  {MAIN_NAVIGATION.map(item => {
                    const Icon = NAV_ICONS[item.name] || Sparkles;
                    return (
                      <Link 
                        key={item.name} 
                        to={item.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all"
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  {user && (
                    <>
                      <div className="border-t border-border my-2" />
                      <Link 
                        to={"/settings"}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          navigate(ROUTES.HOME);
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all text-left w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;