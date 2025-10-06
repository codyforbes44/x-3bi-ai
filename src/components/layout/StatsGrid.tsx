import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Stat {
  icon?: LucideIcon;
  title?: string;
  value: string;
  description?: string;
  color?: string;
}

interface StatsGridProps {
  stats: Stat[];
  columns?: number;
  className?: string;
}

export function StatsGrid({ stats, columns = 3, className = "" }: StatsGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns] || "grid-cols-1 sm:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover-scale">
          <CardHeader>
            {stat.icon && (
              <stat.icon className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 ${stat.color || 'text-primary'}`} />
            )}
            <CardTitle className="text-2xl md:text-3xl font-bold">{stat.value}</CardTitle>
            {stat.description && (
              <CardDescription>{stat.description}</CardDescription>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
