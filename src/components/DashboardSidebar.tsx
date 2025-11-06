import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DASHBOARD_NAV_GROUPS, ROUTES } from "@/config/routes";
import * as LucideIcons from "lucide-react";
import kalpeshLogo from "@/assets/kalpesh-logo.png";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const getInitials = (name: string | null, email: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      {/* Logo Header */}
      <SidebarHeader className="border-b">
        <Link
          to="/"
          className="flex items-center gap-2 px-2 py-4 hover:bg-sidebar-accent rounded-md transition-colors"
        >
          <img
            src={kalpeshLogo}
            alt="3BI.AI Logo"
            className="w-8 h-8 object-contain flex-shrink-0"
          />
          <span className="text-lg font-bold">3BI.AI</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        {DASHBOARD_NAV_GROUPS.map((group) => {
          const hasActiveItem = group.items.some((item) => isActive(item.href));

          return (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                              isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "hover:bg-sidebar-accent/50"
                            }
                          >
                            {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                            <span>{item.name}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter className="border-t">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-4"
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-xs">
                    {getInitials(
                      user.user_metadata?.display_name,
                      user.email
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left overflow-hidden">
                  <span className="text-sm font-medium truncate w-full">
                    {user.user_metadata?.display_name || "User"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate w-full">
                    {user.email}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <LucideIcons.User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={ROUTES.API_KEYS} className="cursor-pointer">
                  <LucideIcons.Key className="mr-2 h-4 w-4" />
                  API Keys
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/security" className="cursor-pointer">
                  <LucideIcons.Shield className="mr-2 h-4 w-4" />
                  Security
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={signOut}
                className="cursor-pointer text-destructive"
              >
                <LucideIcons.LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/auth">
            <Button variant="ghost" className="w-full">
              Sign In
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
