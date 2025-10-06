import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface PageHeroProps {
  title: string;
  description: string;
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  actions?: ReactNode;
  className?: string;
}

export function PageHero({ title, description, badge, actions, className = "" }: PageHeroProps) {
  return (
    <section className={`container mx-auto px-4 py-12 md:py-16 text-center ${className}`}>
      {badge && (
        <Badge variant="secondary" className="mb-4 md:mb-6">
          {badge.icon && <badge.icon className="w-3 h-3 mr-1" />}
          {badge.text}
        </Badge>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-hero bg-clip-text text-transparent px-2">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4">
        {description}
      </p>
      {actions && (
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          {actions}
        </div>
      )}
    </section>
  );
}
