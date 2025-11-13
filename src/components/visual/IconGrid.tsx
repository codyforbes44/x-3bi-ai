import { LucideIcon } from "lucide-react";
import { LongPressTooltip } from "./LongPressTooltip";
import { CategoryDot } from "./CategoryDot";
import { cn } from "@/lib/utils";

interface IconGridItem {
  icon: LucideIcon;
  label: string;
  category?: "account" | "advanced-ai" | "ai-tools" | "enterprise" | "utilities" | "workspace";
  onClick?: () => void;
  active?: boolean;
}

interface IconGridProps {
  items: IconGridItem[];
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function IconGrid({ items, columns = 4, className }: IconGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {items.map((item, index) => (
        <LongPressTooltip key={index} content={item.label}>
          <button
            onClick={item.onClick}
            className={cn(
              "relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all hover:scale-105",
              item.active 
                ? "bg-primary/20 border-primary shadow-lg shadow-primary/20" 
                : "bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50"
            )}
          >
            {item.category && (
              <CategoryDot category={item.category} className="absolute top-2 right-2" />
            )}
            <item.icon className="w-8 h-8 text-primary" />
          </button>
        </LongPressTooltip>
      ))}
    </div>
  );
}
