import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressStep {
  label: string;
  description?: string;
}

interface ProgressStepsProps {
  steps: ProgressStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  variant?: "default" | "compact";
  className?: string;
}

/**
 * Progress Steps Component
 * Visual progress indicator with clickable completed steps
 */
export function ProgressSteps({
  steps,
  currentStep,
  onStepClick,
  variant = "default",
  className,
}: ProgressStepsProps) {
  const isCompact = variant === "compact";

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop/Tablet view */}
      <div className="hidden md:block">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <li
                key={index}
                className={cn("flex items-center", {
                  "flex-1": index < steps.length - 1,
                })}
              >
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => isClickable && onStepClick(index)}
                    disabled={!isClickable}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      {
                        "bg-primary border-primary text-primary-foreground":
                          isCompleted,
                        "border-primary bg-background text-primary": isCurrent,
                        "border-muted bg-background text-muted-foreground":
                          !isCompleted && !isCurrent,
                        "cursor-pointer hover:scale-110": isClickable,
                        "cursor-default": !isClickable,
                      }
                    )}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{index + 1}</span>
                    )}
                  </button>

                  {!isCompact && (
                    <div className="mt-2 text-center">
                      <p
                        className={cn("text-sm font-medium", {
                          "text-foreground": isCurrent,
                          "text-muted-foreground": !isCurrent,
                        })}
                      >
                        {step.label}
                      </p>
                      {step.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {step.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-4 transition-colors",
                      {
                        "bg-primary": isCompleted,
                        "bg-muted": !isCompleted,
                      }
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile view - horizontal scroll */}
      <div className="md:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={index} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={cn(
                    "h-8 w-8 flex items-center justify-center rounded-full border-2",
                    {
                      "bg-primary border-primary text-primary-foreground":
                        isCompleted,
                      "border-primary bg-background text-primary": isCurrent,
                      "border-muted bg-background text-muted-foreground":
                        !isCompleted && !isCurrent,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={cn("h-0.5 w-8", {
                      "bg-primary": isCompleted,
                      "bg-muted": !isCompleted,
                    })}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Current step label on mobile */}
        <p className="text-sm font-medium text-center mt-2">
          {steps[currentStep].label}
        </p>
        {steps[currentStep].description && (
          <p className="text-xs text-muted-foreground text-center mt-1">
            {steps[currentStep].description}
          </p>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
