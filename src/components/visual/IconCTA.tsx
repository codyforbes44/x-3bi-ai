import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconCTAProps {
  icon: LucideIcon;
  label?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZES = {
  md: { button: 'w-16 h-16', icon: 'w-8 h-8' },
  lg: { button: 'w-20 h-20', icon: 'w-10 h-10' },
  xl: { button: 'w-28 h-28', icon: 'w-14 h-14' },
};

export function IconCTA({ icon: Icon, label, onClick, variant = 'primary', size = 'lg', className }: IconCTAProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={onClick}
        variant={variant === 'primary' ? 'neon-primary' : 'glass'}
        className={cn(
          "rounded-full flex items-center justify-center transition-all hover:scale-110",
          SIZES[size].button,
          className
        )}
        aria-label={label}
      >
        <Icon className={SIZES[size].icon} />
      </Button>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}
