import { LucideIcon } from "lucide-react";
import { LongPressTooltip } from "./LongPressTooltip";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface VisualChartCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: number;
  sparklineData?: Array<{ value: number }>;
  className?: string;
}

export function VisualChartCard({ 
  icon: Icon, 
  value, 
  label, 
  trend, 
  trendValue,
  sparklineData,
  className 
}: VisualChartCardProps) {
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground";
  const trendSymbol = trend === "up" ? "↗" : trend === "down" ? "↘" : "→";

  return (
    <LongPressTooltip content={label}>
      <Card className={cn("hover:border-primary/50 transition-all", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Icon className="w-8 h-8 text-primary" />
            {trendValue !== undefined && (
              <span className={cn("text-sm font-medium", trendColor)}>
                {trendSymbol} {Math.abs(trendValue)}%
              </span>
            )}
          </div>
          
          <div className="text-3xl font-bold mb-2">{value}</div>
          
          {/* Sparkline - Visual Only */}
          {sparklineData && sparklineData.length > 0 && (
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={sparklineData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </LongPressTooltip>
  );
}
