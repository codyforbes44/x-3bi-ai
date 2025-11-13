import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface FormSuccessProps {
  message: string;
  variant?: 'inline' | 'alert' | 'toast';
  className?: string;
  onDismiss?: () => void;
  autoDismiss?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function FormSuccess({ message, variant = 'inline', className, onDismiss, autoDismiss, action }: FormSuccessProps) {
  if (autoDismiss && onDismiss) {
    setTimeout(onDismiss, autoDismiss);
  }

  if (variant === 'inline') {
    return (
      <div className={cn("space-y-2", className)}>
        <p className="text-sm font-medium text-success flex items-center gap-1.5" role="status" aria-live="polite">
          <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
          {message}
        </p>
        {action && (
          <Button variant="outline" size="sm" onClick={action.onClick} className="w-full">
            {action.label}
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'alert') {
    return (
      <div className={cn("space-y-2", className)}>
        <Alert className="border-success/50 bg-success/10 text-success">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <AlertDescription className="ml-2 text-success-foreground">{message}</AlertDescription>
          {onDismiss && (
            <button onClick={onDismiss} className="absolute top-3 right-3 text-success/70 hover:text-success" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          )}
        </Alert>
        {action && (
          <Button variant="outline" size="sm" onClick={action.onClick} className="w-full">
            {action.label}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-start gap-2">
        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
        <span className="text-sm text-foreground">{message}</span>
      </div>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick} className="w-full">
          {action.label}
        </Button>
      )}
    </div>
  );
}
