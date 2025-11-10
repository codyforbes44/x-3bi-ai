import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Sparkles, BookOpen, User, MessageSquare } from "lucide-react";
import { MOBILE_QUICK_NAV } from "@/config/routes";

export function MobileBottomNav() {
  const location = useLocation();

  const getIcon = (iconName: string) => {
    const icons = {
      Home,
      LayoutDashboard,
      Sparkles,
      BookOpen,
      User,
      MessageSquare,
    };
    return icons[iconName as keyof typeof icons] || Home;
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t z-50 safe-area-pb">
      <div className="flex justify-around items-center h-14 sm:h-16 px-1 sm:px-2">
        {MOBILE_QUICK_NAV.map((item) => {
          const Icon = getIcon(item.icon);
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 sm:gap-1 transition-all touch-target ${
                active
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              }`}
            >
              <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${active ? "fill-current" : ""}`} />
              <span className="text-[9px] sm:text-[10px] font-medium leading-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
