import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
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
        <Card key={index} className="h-full hover-scale">
          <CardHeader>
            <feature.icon className={`w-10 h-10 md:w-12 md:h-12 mb-4 ${feature.color || 'text-primary'}`} />
            <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          {feature.content && <CardContent>{feature.content}</CardContent>}
        </Card>
      ))}
    </div>
  );
}
