import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NavDropdown as NavDropdownType } from "@/config/navigation";

interface NavDropdownProps {
  dropdown: NavDropdownType;
  className?: string;
}

export function NavDropdown({ dropdown, className }: NavDropdownProps) {
  const { t } = useTranslation();

  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger className={cn("gap-1", className)}>
          <dropdown.icon className="w-4 h-4" />
          <span>{t(dropdown.name)}</span>
          <ChevronDown className="w-3 h-3" />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2">
            {dropdown.groups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-3">
                {group.title && (
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t(group.title)}
                  </h4>
                )}
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-muted-foreground" />
                            <div className="text-sm font-medium leading-none">
                              {t(item.name)}
                            </div>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {t(item.description)}
                            </p>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
