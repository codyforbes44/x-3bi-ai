import { lazy, Suspense } from "react";
import { HeroHeadline } from "./HeroHeadline";
import { HeroCTA } from "./HeroCTA";
import { HeroTrustIndicators } from "./HeroTrustIndicators";
import { HeroStats } from "./HeroStats";
import { HeroBackground } from "./background";
import { GestureZone } from "@/components/future/GestureZone";
import { GestureHint } from "./GestureHint";

// Lazy load heavy animation component
const NeuralVisualization = lazy(() => 
  import("./NeuralVisualization").then(m => ({ default: m.NeuralVisualization }))
);

interface HeroSectionProps {
  onNavigate: (path: string, actionName: string) => void;
  predictions?: Array<{ action: string; probability: number; context: string }>;
}

export function HeroSection({ onNavigate, predictions = [] }: HeroSectionProps) {
  return (
    <GestureZone
      gestureType="horizontal"
      threshold={100}
      velocity={0.8}
      onSwipeLeft={() => onNavigate('/free-ai-tools', 'swipe_ai_tools')}
      onSwipeRight={() => onNavigate('/grok', 'swipe_grok')}
      className="relative"
    >
      <section 
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        {/* Pixel grid background */}
        <HeroBackground intensity="medium" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" aria-hidden="true" />
        
        {/* Main content */}
        <div className="relative z-10 text-center space-y-8 max-w-6xl mx-auto w-full">
          <HeroHeadline />
          
          {/* Neural visualization - lazy loaded for performance */}
          <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
            <NeuralVisualization />
          </Suspense>
          
          <HeroCTA onNavigate={onNavigate} predictions={predictions} />
          <HeroTrustIndicators />
          <HeroStats />
        </div>

        {/* Gesture hint */}
        <GestureHint />
      </section>
    </GestureZone>
  );
}
