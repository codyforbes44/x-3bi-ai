import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  text?: string;
}

const SIZES = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const TEXT_SIZES = {
  sm: 'text-base',
  md: 'text-lg md:text-xl',
  lg: 'text-2xl md:text-3xl',
};

export function AnimatedLogo({ size = 'md', className, showText = false, text = "3BI.AI" }: AnimatedLogoProps) {
  return (
    <div className={cn("flex items-center gap-2 md:gap-3", className)}>
      <div className="relative">
        <Sparkles 
          className={cn(
            SIZES[size],
            "text-primary animate-pulse"
          )}
        />
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
      </div>
      {showText && (
        <span className={cn(
          TEXT_SIZES[size],
          "font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
        )}>
          {text}
        </span>
      )}
    </div>
  );
}
