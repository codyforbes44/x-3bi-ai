import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineErrorProps {
  message?: string;
  className?: string;
}

export function InlineError({ message, className }: InlineErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-2 text-sm text-destructive mt-1.5",
        "animate-in slide-in-from-top-1 duration-200",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
