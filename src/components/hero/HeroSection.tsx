import { HeroContent } from "./HeroContent";
import { HeroActions } from "./HeroActions";
import { HeroStats } from "./HeroStats";
import { HeroBackground } from "./background";
import { GestureZone } from "@/components/future/GestureZone";
import { NeuralVisualization } from "./NeuralVisualization";

interface HeroSectionProps {
  onNavigate: (path: string, actionName: string) => void;
  predictions?: Array<{ action: string; probability: number; context: string }>;
}

export function HeroSection({ onNavigate, predictions = [] }: HeroSectionProps) {
  return (
    <GestureZone
      onSwipeUp={() => onNavigate('/dashboard', 'swipe_dashboard')}
      onSwipeLeft={() => onNavigate('/free-ai-tools', 'swipe_ai_tools')}
      onSwipeRight={() => onNavigate('/grok', 'swipe_grok')}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Pixel grid background */}
      <HeroBackground intensity="medium" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-12 max-w-6xl mx-auto w-full">
        <HeroContent />
        <NeuralVisualization />
        <HeroActions onNavigate={onNavigate} predictions={predictions} />
        <HeroStats />
      </div>
    </GestureZone>
  );
}
