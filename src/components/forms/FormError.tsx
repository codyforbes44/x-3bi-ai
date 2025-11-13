import { AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormErrorProps {
  /**
   * Error message
   */
  message: string;
  /**
   * Field name (for accessibility)
   */
  fieldId?: string;
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
}

/**
 * Form Error Component
 * Displays validation or submission errors
 */
export function FormError({
  message,
  fieldId,
  variant = 'inline',
  className,
  onDismiss,
}: FormErrorProps) {
  if (variant === 'inline') {
    return (
      <p
        id={fieldId ? `${fieldId}-error` : undefined}
        className={cn(
          "text-sm font-medium text-destructive flex items-center gap-1.5 mt-1",
          className
        )}
        role="alert"
        aria-live="polite"
      >
        <XCircle className="h-3.5 w-3.5 flex-shrink-0" />
        {message}
      </p>
    );
  }

  if (variant === 'alert') {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">{message}</AlertDescription>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 text-destructive-foreground/70 hover:text-destructive-foreground"
            aria-label="Dismiss error"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </Alert>
    );
  }

  // Toast variant
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
      <span className="text-sm text-foreground">{message}</span>
    </div>
  );
}

/**
 * Form Errors List Component
 * Displays multiple errors
 */
export function FormErrorsList({
  errors,
  className,
}: {
  errors: string[];
  className?: string;
}) {
  if (errors.length === 0) return null;

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <ul className="ml-2 list-disc list-inside space-y-1">
          {errors.map((error, index) => (
            <li key={index} className="text-sm">
              {error}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
