import { cn } from "@/lib/utils";

interface AccentDotProps {
  color?: 'pink' | 'cyan' | 'purple' | 'blue';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  animate?: boolean;
  className?: string;
}

const COLOR_CLASSES = {
  pink: 'bg-pink-500',
  cyan: 'bg-cyan-400',
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
};

const POSITION_CLASSES = {
  'top-right': 'top-2 right-2',
  'top-left': 'top-2 left-2',
  'bottom-right': 'bottom-2 right-2',
  'bottom-left': 'bottom-2 left-2',
};

export function AccentDot({
  color = 'cyan',
  position = 'top-right',
  animate = true,
  className,
}: AccentDotProps) {
  return (
    <div
      className={cn(
        'absolute w-2 h-2 rounded-full',
        COLOR_CLASSES[color],
        POSITION_CLASSES[position],
        animate && 'animate-pulse',
        className
      )}
      aria-hidden="true"
    />
  );
}
