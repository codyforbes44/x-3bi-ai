import { cn } from "@/lib/utils";

interface CategoryDotProps {
  category: 'enterprise' | 'advanced-ai' | 'ai-tools' | 'utilities' | 'workspace' | 'account';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CATEGORY_COLORS = {
  'enterprise': 'bg-purple-500',
  'advanced-ai': 'bg-blue-500',
  'ai-tools': 'bg-green-500',
  'utilities': 'bg-orange-500',
  'workspace': 'bg-pink-500',
  'account': 'bg-cyan-500',
};

const SIZES = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export function CategoryDot({ category, size = 'md', className }: CategoryDotProps) {
  return (
    <div 
      className={cn(
        "rounded-full animate-pulse",
        CATEGORY_COLORS[category],
        SIZES[size],
        className
      )}
      aria-label={category}
    />
  );
}
