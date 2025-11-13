import { AlertCircle, RefreshCw } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface ErrorStateProps {
  /**
   * Error title
   */
  title?: string;
  /**
   * Error object or message
   */
  error?: Error | string;
  /**
   * Retry callback
   */
  onRetry?: () => void;
  /**
   * Custom action
   */
  action?: ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Variant
   */
  variant?: 'inline' | 'page' | 'toast';
  /**
   * Show error details
   */
  showDetails?: boolean;
}

/**
 * Error State Component
 * Displays error messages with retry functionality
 */
export function ErrorState({
  title = "Something went wrong",
  error,
  onRetry,
  action,
  className,
  variant = 'inline',
  showDetails = false,
}: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  if (variant === 'inline') {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        {errorMessage && (
          <AlertDescription className="mt-2">
            {errorMessage}
          </AlertDescription>
        )}
        {(onRetry || action) && (
          <div className="mt-4 flex gap-2">
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="h-8"
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Try Again
              </Button>
            )}
            {action}
          </div>
        )}
      </Alert>
    );
  }

  if (variant === 'page') {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-16 px-4 text-center",
          className
        )}
        role="alert"
        aria-live="assertive"
      >
        <div className="mb-4 rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground">
          {title}
        </h3>
        
        {errorMessage && (
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            {errorMessage}
          </p>
        )}

        {showDetails && error instanceof Error && error.stack && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
              Show error details
            </summary>
            <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto max-w-2xl">
              {error.stack}
            </pre>
          </details>
        )}
        
        {(onRetry || action) && (
          <div className="mt-6 flex gap-3">
            {onRetry && (
              <Button onClick={onRetry} variant="default">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
            {action}
          </div>
        )}
      </div>
    );
  }

  // Toast variant
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium text-sm">{title}</p>
        {errorMessage && (
          <p className="text-xs text-muted-foreground mt-1">{errorMessage}</p>
        )}
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="ghost"
          size="sm"
          className="h-7 px-2"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
