import { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormStep {
  id: string;
  title: string;
  description?: string;
}

interface FormStepperProps {
  steps: FormStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickPreviousSteps?: boolean;
  className?: string;
}

/**
 * Form Stepper Component
 * Visual progress indicator for multi-step forms
 */
export function FormStepper({
  steps,
  currentStep,
  onStepClick,
  allowClickPreviousSteps = true,
  className,
}: FormStepperProps) {
  const handleStepClick = (index: number) => {
    if (onStepClick && allowClickPreviousSteps && index < currentStep) {
      onStepClick(index);
    }
  };

  return (
    <nav aria-label="Progress" className={className}>
      <ol
        role="list"
        className="flex items-center justify-between gap-2 md:gap-4"
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = allowClickPreviousSteps && isCompleted;

          return (
            <li
              key={step.id}
              className={cn("flex items-center flex-1", {
                "flex-shrink-0": index === steps.length - 1,
              })}
            >
              <div className="flex items-center gap-2 md:gap-3 w-full">
                {/* Step indicator */}
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "flex h-8 w-8 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    {
                      "bg-primary border-primary text-primary-foreground":
                        isCompleted,
                      "border-primary text-primary": isCurrent,
                      "border-muted-foreground/30 text-muted-foreground":
                        !isCompleted && !isCurrent,
                      "cursor-pointer hover:border-primary/70": isClickable,
                      "cursor-default": !isClickable,
                    }
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <span className="text-sm md:text-base font-medium">
                      {index + 1}
                    </span>
                  )}
                </button>

                {/* Step title (hidden on mobile) */}
                <div className="hidden md:block flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors",
                      {
                        "text-foreground": isCurrent,
                        "text-muted-foreground": !isCurrent,
                      }
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden md:block h-0.5 flex-1 transition-colors",
                      {
                        "bg-primary": isCompleted,
                        "bg-muted-foreground/30": !isCompleted,
                      }
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Mobile step title */}
      <div className="md:hidden mt-4 text-center">
        <p className="text-sm font-medium text-foreground">
          {steps[currentStep].title}
        </p>
        {steps[currentStep].description && (
          <p className="text-xs text-muted-foreground mt-1">
            {steps[currentStep].description}
          </p>
        )}
      </div>
    </nav>
  );
}
