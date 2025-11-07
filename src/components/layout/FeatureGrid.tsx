import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  badge?: string;
  content?: ReactNode;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: number;
  className?: string;
}

export function FeatureGrid({ features, columns = 3, className = "" }: FeatureGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "grid-cols-1 md:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-6 md:gap-8 ${className}`}>
      {features.map((feature, index) => (
        <Card 
          key={index} 
          className="h-full hover-scale border-border/50 touch-target"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="p-4 sm:p-5 md:p-6">
            <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
              <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-primary/10 flex-shrink-0">
                <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color || 'text-primary'}`} />
              </div>
              {feature.badge && (
                <Badge variant="outline" className="text-[10px] sm:text-xs whitespace-nowrap">
                  {feature.badge}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg sm:text-xl mb-2">{feature.title}</CardTitle>
            <CardDescription className="text-sm sm:text-base leading-relaxed">
              {feature.description}
            </CardDescription>
          </CardHeader>
          {feature.content && <CardContent>{feature.content}</CardContent>}
        </Card>
      ))}
    </div>
  );
}
