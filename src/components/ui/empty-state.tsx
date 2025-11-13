import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /**
   * Icon to display (Lucide icon)
   */
  icon?: LucideIcon;
  /**
   * Title text
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Action button or element
   */
  action?: ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Empty State Component
 * Shows when no data is available
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = 'md',
}: EmptyStateProps) {
  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'h-8 w-8',
      title: 'text-base',
      description: 'text-sm',
    },
    md: {
      container: 'py-12',
      icon: 'h-12 w-12',
      title: 'text-lg',
      description: 'text-sm',
    },
    lg: {
      container: 'py-16',
      icon: 'h-16 w-16',
      title: 'text-xl',
      description: 'text-base',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizes.container,
        className
      )}
      role="status"
      aria-live="polite"
    >
      {Icon && (
        <div className="mb-4 rounded-full bg-muted p-4">
          <Icon className={cn(sizes.icon, "text-muted-foreground")} />
        </div>
      )}
      
      <h3 className={cn("font-semibold text-foreground", sizes.title)}>
        {title}
      </h3>
      
      {description && (
        <p className={cn("mt-2 text-muted-foreground max-w-md", sizes.description)}>
          {description}
        </p>
      )}
      
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
