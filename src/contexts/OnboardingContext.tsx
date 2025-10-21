import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface OnboardingState {
  hasCompletedTour: boolean;
  hasSeenFeature: (featureId: string) => boolean;
  markFeatureAsSeen: (featureId: string) => void;
  resetOnboarding: () => void;
  completeTour: () => void;
}

const OnboardingContext = createContext<OnboardingState | undefined>(undefined);

const STORAGE_KEY = '3bi-onboarding';

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [hasCompletedTour, setHasCompletedTour] = useState(false);
  const [seenFeatures, setSeenFeatures] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      setHasCompletedTour(data.hasCompletedTour || false);
      setSeenFeatures(new Set(data.seenFeatures || []));
    }
  }, []);

  const hasSeenFeature = (featureId: string) => {
    return seenFeatures.has(featureId);
  };

  const markFeatureAsSeen = (featureId: string) => {
    setSeenFeatures(prev => {
      const newSet = new Set(prev);
      newSet.add(featureId);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        hasCompletedTour,
        seenFeatures: Array.from(newSet)
      }));
      
      return newSet;
    });
  };

  const completeTour = () => {
    setHasCompletedTour(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      hasCompletedTour: true,
      seenFeatures: Array.from(seenFeatures)
    }));
  };

  const resetOnboarding = () => {
    setHasCompletedTour(false);
    setSeenFeatures(new Set());
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <OnboardingContext.Provider 
      value={{ 
        hasCompletedTour, 
        hasSeenFeature, 
        markFeatureAsSeen, 
        resetOnboarding,
        completeTour 
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
