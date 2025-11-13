import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  /**
   * Loading message
   */
  message?: string;
  /**
   * Show backdrop
   */
  backdrop?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Full screen overlay
   */
  fullScreen?: boolean;
}

/**
 * Loading Overlay Component
 * Shows loading state with optional message
 */
export function LoadingOverlay({
  message,
  backdrop = true,
  className,
  size = 'md',
  fullScreen = false,
}: LoadingOverlayProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const spinnerSize = sizeClasses[size];

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={cn(spinnerSize, "animate-spin text-primary")} />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          backdrop && "bg-background/80 backdrop-blur-sm",
          className
        )}
        role="status"
        aria-live="polite"
        aria-label={message || "Loading"}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center py-8",
        backdrop && "bg-muted/50 rounded-lg",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={message || "Loading"}
    >
      {content}
    </div>
  );
}

/**
 * Inline Spinner Component
 */
export function Spinner({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <Loader2
      className={cn(sizeClasses[size], "animate-spin", className)}
      aria-label="Loading"
    />
  );
}
