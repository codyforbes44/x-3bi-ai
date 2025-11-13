import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageSquare, Image, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryDot } from "./visual/CategoryDot";
import { useLongPress } from "@/hooks/useLongPress";

const NAV_ITEMS = [
  { icon: Home, route: '/', label: 'Home', category: 'utilities' as const },
  { icon: MessageSquare, route: '/ai-chat', label: 'Chat', category: 'ai-tools' as const },
  { icon: Image, route: '/ai-image', label: 'Image', category: 'ai-tools' as const },
  { icon: LayoutDashboard, route: '/dashboard', label: 'Dashboard', category: 'workspace' as const },
  { icon: Settings, route: '/settings', label: 'Settings', category: 'account' as const },
];

export function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route: string) => {
    if (route === '/') return location.pathname === '/';
    return location.pathname.startsWith(route);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50 safe-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.route);
          
          const longPressHandlers = useLongPress({
            onLongPress: () => {},
            onClick: () => {
              if ('vibrate' in navigator) navigator.vibrate(10);
              navigate(item.route);
            },
          });
          
          return (
            <button
              key={item.route}
              {...longPressHandlers}
              className={cn(
                "flex flex-col items-center justify-center relative w-16 h-16 rounded-xl transition-all touch-target",
                active 
                  ? "bg-primary/20 text-primary scale-110" 
                  : "text-muted-foreground hover:bg-muted/50"
              )}
              aria-label={item.label}
            >
              <Icon className="w-6 h-6" />
              <CategoryDot 
                category={item.category} 
                size="sm" 
                className="absolute top-2 right-2"
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

