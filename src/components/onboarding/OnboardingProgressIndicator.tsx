import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  id: string;
  label: string;
  completed: boolean;
  route?: string;
}

export const OnboardingProgressIndicator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsVisible(false);
      return;
    }

    // Check if user has dismissed the indicator
    const dismissed = localStorage.getItem(`onboarding-dismissed-${user.id}`);
    if (dismissed === 'true') {
      setIsDismissed(true);
      setIsVisible(false);
      return;
    }

    const checkOnboardingStatus = async () => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name, bio, avatar_url')
          .eq('user_id', user.id)
          .single();

        if (!profile) return;

        const onboardingSteps: OnboardingStep[] = [
          {
            id: 'display_name',
            label: 'Set display name',
            completed: !!profile.display_name && !profile.display_name.startsWith('user_'),
            route: '/onboarding/profile'
          },
          {
            id: 'avatar',
            label: 'Upload profile picture',
            completed: !!profile.avatar_url,
            route: '/onboarding/profile'
          },
          {
            id: 'bio',
            label: 'Add bio',
            completed: !!profile.bio,
            route: '/onboarding/profile'
          }
        ];

        setSteps(onboardingSteps);

        // Show indicator only if there are incomplete steps
        const hasIncompleteSteps = onboardingSteps.some(step => !step.completed);
        setIsVisible(hasIncompleteSteps);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  const handleDismiss = () => {
    if (user) {
      localStorage.setItem(`onboarding-dismissed-${user.id}`, 'true');
      setIsDismissed(true);
      setIsVisible(false);
    }
  };

  const handleCompleteProfile = () => {
    navigate('/onboarding/profile');
  };

  if (!isVisible || isDismissed || steps.length === 0) {
    return null;
  }

  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progressPercent = (completedSteps / totalSteps) * 100;

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm">
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-sm font-semibold text-foreground">
                Complete Your Profile
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Progress value={progressPercent} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground shrink-0">
                  {completedSteps}/{totalSteps}
                </span>
              </div>
              
              <div className="hidden md:flex flex-wrap gap-x-4 gap-y-1">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    {step.completed ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className={cn(
                      step.completed ? "text-muted-foreground line-through" : "text-foreground"
                    )}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Button
            size="sm"
            onClick={handleCompleteProfile}
            className="bg-gradient-hero text-white shrink-0"
          >
            Complete
          </Button>
        </div>
      </div>
    </Card>
  );
};
