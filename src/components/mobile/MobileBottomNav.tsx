import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavTabButton } from "./NavTabButton";
import { useLongPress } from "@/hooks/useLongPress";
import { isRouteActive } from "@/utils/routeMapper";
import { useHaptics } from "@/hooks/useHaptics";
import { PRIMARY_NAV_ITEMS, type NavItem } from "@/config/mobile-nav";

interface MobileBottomNavProps {
  className?: string;
  items?: NavItem[];
}

export function MobileBottomNav({ 
  className,
  items = PRIMARY_NAV_ITEMS 
}: MobileBottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const haptics = useHaptics();

  const isActive = (route: string) => {
    if (route === '/') return location.pathname === '/';
    return isRouteActive(location.pathname, location.search, route);
  };

  const handleNavigation = (route: string) => {
    haptics.light();
    navigate(route);
  };

  return (
    <nav 
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50 safe-bottom",
        className
      )}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around items-center h-16 px-2 max-w-screen-sm mx-auto">
        {items.map((item) => {
          const active = isActive(item.route);
          
          const longPressHandlers = useLongPress({
            onLongPress: () => {
              // Future: Could show quick actions menu on long press
              haptics.medium();
            },
            onClick: () => handleNavigation(item.route),
          });
          
          return (
            <div key={item.route} {...longPressHandlers}>
              <NavTabButton
                icon={item.icon}
                label={item.label}
                category={item.category}
                isActive={active}
                onClick={() => handleNavigation(item.route)}
                badge={item.badge}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
