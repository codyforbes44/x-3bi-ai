import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { BACKGROUND_CONFIG, BackgroundConfig } from "./config";
import { GradientWaveLayer } from "./GradientWaveLayer";
import { GridPatternLayer } from "./GridPatternLayer";
import { ParticleFieldLayer } from "./ParticleFieldLayer";
import { GlowOrbsLayer } from "./GlowOrbsLayer";
import { AccentLinesLayer } from "./AccentLinesLayer";

interface HeroBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function HeroBackground({ 
  intensity = 'medium',
  className = "" 
}: HeroBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const config: BackgroundConfig = useMemo(() => {
    const baseConfig = BACKGROUND_CONFIG[intensity];
    
    // Respect reduced motion preference
    if (prefersReducedMotion) {
      return {
        ...baseConfig,
        particles: {
          ...baseConfig.particles,
          count: baseConfig.particles.reducedMotionCount,
        },
        layers: {
          ...baseConfig.layers,
          particles: { enabled: false },
          accentLines: { enabled: false },
        },
      };
    }
    
    return baseConfig;
  }, [intensity, prefersReducedMotion]);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} 
      aria-hidden="true"
    >
      {/* Layer 1: Animated gradient wave base */}
      {config.layers.gradientWave.enabled && <GradientWaveLayer />}

      {/* Layer 2: Neural network grid pattern */}
      {config.layers.gridPattern.enabled && (
        <GridPatternLayer opacity={config.layers.gridPattern.opacity} />
      )}

      {/* Layer 3,5,7: SVG paths, rays, and currents */}
      {config.layers.accentLines.enabled && <AccentLinesLayer />}

      {/* Layer 4: Energy particles */}
      {config.layers.particles.enabled && (
        <ParticleFieldLayer 
          count={config.particles.count}
          minSize={config.particles.minSize}
          maxSize={config.particles.maxSize}
          animationDuration={config.particles.animationDuration}
        />
      )}

      {/* Layer 6: Large glowing orbs */}
      {config.layers.glowOrbs.enabled && <GlowOrbsLayer orbs={config.orbs} />}

      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/20" />
    </div>
  );
}
