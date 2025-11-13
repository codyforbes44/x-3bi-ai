import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TourStep {
  title: string;
  description: string;
  emoji: string;
  position: 'center' | 'top' | 'bottom';
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to Icon-First UI",
    description: "Tap icons to do things. No reading required!",
    emoji: "👋",
    position: 'center'
  },
  {
    title: "Speak or Tap",
    description: "Use your voice 🎤 or tap icons to interact",
    emoji: "💬",
    position: 'center'
  },
  {
    title: "Visual Styles",
    description: "Pick visual styles instead of typing descriptions",
    emoji: "🎨",
    position: 'center'
  },
  {
    title: "Long-press for Help",
    description: "Hold any icon to see what it does",
    emoji: "💡",
    position: 'center'
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSkip();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  if (!isVisible) return null;

  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-md w-full mx-4 glass-card rounded-3xl p-8 shadow-2xl animate-scale-in">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSkip}
          className="absolute top-4 right-4"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="text-center space-y-6">
          <div className="text-6xl mb-4 animate-bounce">
            {step.emoji}
          </div>
          
          <h2 className="text-2xl font-bold text-foreground">
            {step.title}
          </h2>
          
          <p className="text-muted-foreground">
            {step.description}
          </p>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground"
            >
              Skip
            </Button>
            
            <div className="flex gap-1">
              {tourSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === currentStep ? "w-8 bg-cyan-400" : "w-2 bg-white/20"
                  )}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-pink-600 to-purple-600"
            >
              {currentStep < tourSteps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
