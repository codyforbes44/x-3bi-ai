import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { InlineError } from "./InlineError";

interface SimpleFormFieldProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Simple Form Field Wrapper
 * Standalone component for forms without react-hook-form
 */
export function SimpleFormField({
  label,
  error,
  helper,
  required,
  children,
  className = "",
}: SimpleFormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {children}
      {error && <InlineError message={error} />}
      {helper && !error && (
        <p className="text-xs text-muted-foreground">{helper}</p>
      )}
    </div>
  );
}
