import { LucideIcon } from "lucide-react";
import { LongPressTooltip } from "./LongPressTooltip";
import { cn } from "@/lib/utils";

interface IconStatProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function IconStat({ icon: Icon, value, label, trend, className }: IconStatProps) {
  const trendIcon = trend === "up" ? "↗" : trend === "down" ? "↘" : "";
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "";

  return (
    <LongPressTooltip content={label}>
      <div className={cn(
        "flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all",
        className
      )}>
        <Icon className="w-8 h-8 text-primary" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{value}</span>
          {trend && <span className={cn("text-sm", trendColor)}>{trendIcon}</span>}
        </div>
      </div>
    </LongPressTooltip>
  );
}
