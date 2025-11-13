import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  trend: "up" | "down" | "neutral";
  value?: number;
  className?: string;
}

export function TrendIndicator({ trend, value, className }: TrendIndicatorProps) {
  const Icon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  const colorClass = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground";

  return (
    <div className={cn("flex items-center gap-1", colorClass, className)}>
      <Icon className="w-4 h-4" />
      {value !== undefined && (
        <span className="text-sm font-medium">{Math.abs(value)}%</span>
      )}
    </div>
  );
}
