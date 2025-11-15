import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProgressSteps, ProgressStep } from "@/components/ui/progress-steps";
import { Sparkles, Target, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeFlowProps {
  /**
   * Whether the welcome flow is open
   */
  open: boolean;
  /**
   * Callback when the flow is completed or skipped
   */
  onComplete: () => void;
  /**
   * Show skip button
   */
  allowSkip?: boolean;
}

const steps: ProgressStep[] = [
  { label: "Welcome", description: "Get started" },
  { label: "Features", description: "What you can do" },
  { label: "Ready", description: "You're all set" },
];

/**
 * Welcome Flow Component
 * Multi-step onboarding wizard for first-time users
 */
export function WelcomeFlow({
  open,
  onComplete,
  allowSkip = true,
}: WelcomeFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save that user has completed onboarding
    localStorage.setItem("welcome-flow-completed", "true");
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem("welcome-flow-completed", "true");
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <ProgressSteps
            steps={steps}
            currentStep={currentStep}
            variant="compact"
          />
        </div>

        {/* Step Content */}
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4">
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="mx-auto rounded-full bg-primary/10 p-6 w-fit">
                <Sparkles className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Welcome to x-3bi-ai
                </h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Let's get you started with a quick tour of what you can do
                </p>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in w-full">
              <div className="mx-auto rounded-full bg-primary/10 p-6 w-fit">
                <Target className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-2 mb-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Powerful Features
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Here's what you can do with x-3bi-ai
                </p>
              </div>

              <div className="grid gap-4 max-w-lg mx-auto">
                {[
                  {
                    title: "AI Conversations",
                    description: "Chat with advanced AI models",
                  },
                  {
                    title: "Knowledge Graph",
                    description: "Visualize and explore your data",
                  },
                  {
                    title: "Multi-Agent Systems",
                    description: "Collaborate with AI agents",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-lg border bg-card text-left",
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="mx-auto rounded-full bg-primary/10 p-6 w-fit">
                <Rocket className="h-16 w-16 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  You're All Set!
                </h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Ready to explore? Let's dive in and start creating something
                  amazing
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div>
            {allowSkip && currentStep < steps.length - 1 && (
              <Button onClick={handleSkip} variant="ghost">
                Skip Tour
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
            )}
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
