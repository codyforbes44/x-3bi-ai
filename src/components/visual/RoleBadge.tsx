import { Crown, Shield, User, Users, Star } from "lucide-react";
import { LongPressTooltip } from "./LongPressTooltip";
import { cn } from "@/lib/utils";

type Role = "owner" | "admin" | "member" | "viewer" | "guest";

interface RoleBadgeProps {
  role: Role;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const roleConfig = {
  owner: { icon: Crown, color: "text-yellow-500", label: "Owner" },
  admin: { icon: Shield, color: "text-blue-500", label: "Admin" },
  member: { icon: Users, color: "text-green-500", label: "Member" },
  viewer: { icon: User, color: "text-gray-500", label: "Viewer" },
  guest: { icon: Star, color: "text-purple-500", label: "Guest" },
};

export function RoleBadge({ role, size = "md", showTooltip = true }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;
  
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
