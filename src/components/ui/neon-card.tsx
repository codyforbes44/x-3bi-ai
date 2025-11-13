import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type NeonVariant = 'pink' | 'cyan' | 'purple' | 'blue' | 'mixed' | 'none';
type CardSize = 'sm' | 'md' | 'lg' | 'xl';

interface NeonCardProps {
  children: ReactNode;
  variant?: NeonVariant;
  size?: CardSize;
  glass?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
}

const SIZE_CLASSES = {
  sm: 'min-h-[120px]',
  md: 'min-h-[160px]',
  lg: 'min-h-[220px]',
  xl: 'min-h-[280px]',
};

const GRADIENT_CLASSES = {
  pink: 'before:bg-gradient-to-br before:from-pink-500 before:to-purple-600',
  cyan: 'before:bg-gradient-to-br before:from-cyan-400 before:to-blue-500',
  purple: 'before:bg-gradient-to-br before:from-purple-500 before:to-pink-500',
  blue: 'before:bg-gradient-to-br before:from-blue-500 before:to-cyan-400',
  mixed: 'before:bg-gradient-to-r before:from-pink-500 before:via-cyan-400 before:to-purple-500',
  none: '',
};

const GLOW_CLASSES = {
  pink: 'neon-glow-pink',
  cyan: 'neon-glow-cyan',
  purple: 'neon-glow-purple',
  blue: 'neon-glow-blue',
  mixed: 'neon-glow-mixed',
  none: '',
};

export function NeonCard({
  children,
  variant = 'none',
  size = 'md',
  glass = false,
  glow = false,
  className,
  onClick,
}: NeonCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-300',
        onClick && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        SIZE_CLASSES[size],
        
        // Gradient border effect using pseudo-element
        variant !== 'none' && [
          'p-[2px]',
          'before:absolute before:inset-0 before:rounded-2xl before:-z-10',
          GRADIENT_CLASSES[variant],
        ],
        
        // Glow effect
        glow && variant !== 'none' && GLOW_CLASSES[variant],
        
        className
      )}
    >
      <div
        className={cn(
          'relative h-full w-full rounded-2xl p-4',
          glass
            ? 'glass-card'
            : 'bg-card'
        )}
      >
        {children}
      </div>
    </div>
  );
}
