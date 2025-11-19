import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { CategoryDot } from "@/components/visual/CategoryDot";
import { type NavCategory } from "@/config/mobile-nav";

interface NavTabButtonProps {
  icon: LucideIcon;
  label: string;
  category: NavCategory;
  isActive: boolean;
  onClick: () => void;
  badge?: string | number;
}

export function NavTabButton({
  icon: Icon,
  label,
  category,
  isActive,
  onClick,
  badge,
}: NavTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center relative w-16 h-16 rounded-xl transition-all touch-target group",
        isActive 
          ? "bg-primary/20 text-primary scale-110" 
          : "text-muted-foreground hover:bg-muted/50 active:bg-muted"
      )}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Icon */}
      <Icon 
        className={cn(
          "w-6 h-6 transition-transform",
          isActive && "scale-110"
        )} 
      />
      
      {/* Label - hidden by default, shown on hover/active */}
      <span className={cn(
        "text-[10px] mt-1 font-medium transition-opacity absolute -bottom-1",
        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
      )}>
        {label}
      </span>
      
      {/* Category indicator dot */}
      <CategoryDot 
        category={category} 
        size="sm" 
        className="absolute top-2 right-2"
      />
      
      {/* Badge for notifications/counts */}
      {badge && (
        <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {badge}
        </span>
      )}
    </button>
  );
}
