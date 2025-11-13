import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageSquare, Image, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryDot } from "./visual/CategoryDot";
import { useLongPress } from "@/hooks/useLongPress";
import { getFeatureRoute, isRouteActive } from "@/utils/routeMapper";
import { useHaptics } from "@/hooks/useHaptics";

const NAV_ITEMS = [
  { icon: Home, route: '/', label: 'Home', category: 'utilities' as const, featureId: null },
  { icon: MessageSquare, route: getFeatureRoute('chat'), label: 'Chat', category: 'ai-tools' as const, featureId: 'chat' },
  { icon: Image, route: getFeatureRoute('image'), label: 'Image', category: 'ai-tools' as const, featureId: 'image' },
  { icon: LayoutDashboard, route: '/dashboard', label: 'Dashboard', category: 'workspace' as const, featureId: null },
  { icon: Settings, route: '/settings', label: 'Settings', category: 'account' as const, featureId: null },
];

export function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const haptics = useHaptics();

  const isActive = (route: string) => {
    if (route === '/') return location.pathname === '/';
    return isRouteActive(location.pathname, location.search, route);
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
              haptics.light();
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

