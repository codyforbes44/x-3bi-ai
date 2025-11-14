import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { PRIMARY_NAV, isNavDropdown } from "@/config/navigation";
import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState } from "react";

interface MobileNavMenuProps {
  isAuthenticated: boolean;
  userEmail?: string;
  onSignOut: () => void;
  onSignIn: () => void;
}

export function MobileNavMenu({ isAuthenticated, userEmail, onSignOut, onSignIn }: MobileNavMenuProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActiveRoute = (path: string) => location.pathname === path;

  const renderNavItem = (item: NavItem) => (
    <Link
      key={item.href}
      to={item.href}
      onClick={() => setOpen(false)}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
        isActiveRoute(item.href)
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{t(item.name)}</span>
    </Link>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>{t('nav.menu')}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Navigation Items */}
          <nav className="space-y-1">
            {PRIMARY_NAV.map((item) => {
              if (isNavDropdown(item)) {
                // Render dropdown items as grouped sections
                return (
                  <div key={item.name} className="space-y-3">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-muted-foreground">
                        {t(item.name)}
                      </span>
                    </div>
                    {item.groups.map((group, groupIdx) => (
                      <div key={groupIdx} className="ml-3 space-y-1">
                        {group.title && (
                          <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
                            {t(group.title)}
                          </div>
                        )}
                        {group.items.map(renderNavItem)}
                      </div>
                    ))}
                  </div>
                );
              }
              return renderNavItem(item);
            })}
          </nav>

          <Separator />

          {/* Language Switcher */}
          <div className="px-3">
            <LanguageSwitcher />
          </div>

          <Separator />

          {/* Auth Actions */}
          <div className="space-y-2 px-3">
            {isAuthenticated ? (
              <>
                {userEmail && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {userEmail}
                  </p>
                )}
                <Button 
                  onClick={() => {
                    onSignOut();
                    setOpen(false);
                  }} 
                  variant="outline" 
                  className="w-full"
                >
                  {t('nav.signOut')}
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  onSignIn();
                  setOpen(false);
                }} 
                className="w-full"
              >
                {t('nav.signIn')}
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
