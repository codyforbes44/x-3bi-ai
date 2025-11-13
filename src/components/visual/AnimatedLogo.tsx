import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function AnimatedLogo({ size = 'md', className }: AnimatedLogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Sparkles 
        className={cn(
          SIZES[size],
          "text-primary animate-pulse"
        )}
      />
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
    </div>
  );
}
