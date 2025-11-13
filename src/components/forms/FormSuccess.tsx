import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormSuccessProps {
  /**
   * Success message
   */
  message: string;
  /**
   * Variant
   */
  variant?: 'inline' | 'alert' | 'toast';
  /**
   * Custom className
   */
  className?: string;
  /**
   * Dismiss callback
   */
  onDismiss?: () => void;
  /**
   * Auto-dismiss after duration (ms)
   */
  autoDismiss?: number;
}

/**
 * Form Success Component
 * Displays success messages after form submission
 */
export function FormSuccess({
  message,
  variant = 'inline',
  className,
  onDismiss,
  autoDismiss,
}: FormSuccessProps) {
  // Auto-dismiss functionality
  if (autoDismiss && onDismiss) {
    setTimeout(onDismiss, autoDismiss);
  }

  if (variant === 'inline') {
    return (
      <p
        className={cn(
          "text-sm font-medium text-success flex items-center gap-1.5 mt-1",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
        {message}
      </p>
    );
  }

  if (variant === 'alert') {
    return (
      <Alert
        className={cn(
          "border-success/50 bg-success/10 text-success",
          className
        )}
      >
        <CheckCircle2 className="h-4 w-4 text-success" />
        <AlertDescription className="ml-2 text-success-foreground">
          {message}
        </AlertDescription>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 text-success/70 hover:text-success"
            aria-label="Dismiss success message"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </Alert>
    );
  }

  // Toast variant
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
      <span className="text-sm text-foreground">{message}</span>
    </div>
  );
}
