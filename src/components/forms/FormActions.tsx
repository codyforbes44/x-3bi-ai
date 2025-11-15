import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormActionsProps {
  /**
   * Submit button text
   */
  submitLabel?: string;
  /**
   * Cancel button text
   */
  cancelLabel?: string;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Disable submit button
   */
  isDisabled?: boolean;
  /**
   * Cancel callback
   */
  onCancel?: () => void;
  /**
   * Submit callback (optional, form handles submit)
   */
  onSubmit?: () => void;
  /**
   * Custom actions to render
   */
  customActions?: ReactNode;
  /**
   * Alignment
   */
  align?: "left" | "right" | "center" | "between";
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Form Actions Component
 * Consistent button placement and states for forms
 */
export function FormActions({
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  isLoading = false,
  isDisabled = false,
  onCancel,
  onSubmit,
  customActions,
  align = "right",
  className,
}: FormActionsProps) {
  const alignmentClasses = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
    between: "justify-between",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 pt-6 border-t",
        alignmentClasses[align],
        className
      )}
    >
      {align === "between" && customActions}
      
      <div className="flex items-center gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
        )}

        <Button
          type="submit"
          disabled={isDisabled || isLoading}
          onClick={onSubmit}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>

        {align !== "between" && customActions}
      </div>
    </div>
  );
}
