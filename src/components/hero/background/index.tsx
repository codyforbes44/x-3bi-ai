import { PixelGridBackground } from "./PixelGridBackground";

interface HeroBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function HeroBackground({ 
  intensity = 'medium',
  className = "" 
}: HeroBackgroundProps) {
  // Map intensity to animation speed
  const speedMap = {
    low: 'slow' as const,
    medium: 'medium' as const,
    high: 'fast' as const,
  };

  return (
    <PixelGridBackground
      animationSpeed={speedMap[intensity]}
      colorPalette="brand"
      showGrid={true}
      className={className}
    />
  );
}
