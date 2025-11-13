import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'pink' | 'cyan' | 'purple' | 'blue';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  active?: boolean;
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-28 w-28',
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 28,
  xl: 36,
};

const variantClasses = {
  default: 'glass-card hover:glass-dark',
  pink: 'bg-gradient-to-br from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600',
  cyan: 'bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500',
  purple: 'bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600',
  blue: 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600',
};

export function IconButton({
  icon: Icon,
  label,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  active = false,
  showLabel = false,
  className
}: IconButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={onClick}
              disabled={disabled}
              className={cn(
                sizeClasses[size],
                variantClasses[variant],
                'rounded-2xl shadow-lg transition-all duration-300',
                'hover:scale-110 hover:shadow-xl',
                active && 'ring-2 ring-white ring-offset-2 ring-offset-background scale-105',
                disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
                className
              )}
            >
              <Icon size={iconSizes[size]} className="text-white" />
            </Button>
            {showLabel && (
              <span className="text-xs font-medium text-muted-foreground">
                {label}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="glass-card border border-white/10">
          <p className="text-sm font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
