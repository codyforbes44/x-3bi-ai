import { ReactNode } from "react";
import { X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MobileFeatureHeaderProps {
  title: string;
  icon?: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  actions?: ReactNode;
  progress?: number;
  className?: string;
}

/**
 * Sticky header for mobile feature pages
 * Includes back button, title, actions, and optional progress indicator
 */
export function MobileFeatureHeader({
  title,
  icon,
  onBack,
  onClose,
  actions,
  progress,
  className
}: MobileFeatureHeaderProps) {
  return (
    <div className={cn("sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border", className)}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left: Back button */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="touch-target flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          {/* Title with icon */}
          <div className="flex items-center gap-2 min-w-0">
            {icon && <div className="flex-shrink-0" aria-hidden="true">{icon}</div>}
            <h1 className="text-lg font-semibold truncate">{title}</h1>
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="touch-target"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      {typeof progress === 'number' && (
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress"
          />
        </div>
      )}
    </div>
  );
}
