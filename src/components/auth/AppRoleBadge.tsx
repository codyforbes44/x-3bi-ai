import { Shield, UserCog, Crown } from "lucide-react";
import { LongPressTooltip } from "../visual/LongPressTooltip";
import { cn } from "@/lib/utils";
import { AppRole } from "@/hooks/useUserRole";

interface AppRoleBadgeProps {
  role: AppRole;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const roleConfig = {
  super_admin: { icon: Crown, color: "text-yellow-500", label: "Super Admin" },
  admin: { icon: Shield, color: "text-blue-500", label: "Admin" },
  moderator: { icon: UserCog, color: "text-purple-500", label: "Moderator" },
  user: { icon: null, color: "", label: "User" }, // Regular users don't get a badge
};

export function AppRoleBadge({ role, size = "md", showTooltip = true }: AppRoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;
  
  // Don't show badge for regular users
  if (role === 'user' || !Icon) return null;
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const badge = (
    <Icon className={cn(sizeClasses[size], config.color)} />
  );

  if (!showTooltip) return badge;

  return (
    <LongPressTooltip content={config.label}>
      {badge}
    </LongPressTooltip>
  );
}
