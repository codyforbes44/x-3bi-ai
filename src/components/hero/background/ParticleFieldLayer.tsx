import { useMemo } from "react";

interface ParticleFieldLayerProps {
  count: number;
  minSize: number;
  maxSize: number;
  animationDuration: { min: number; max: number };
}

export function ParticleFieldLayer({ 
  count, 
  minSize, 
  maxSize, 
  animationDuration 
}: ParticleFieldLayerProps) {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${animationDuration.min + Math.random() * (animationDuration.max - animationDuration.min)}s`,
      size: Math.random() > 0.5 ? maxSize : minSize,
    })), 
    [count, minSize, maxSize, animationDuration]
  );

  if (count === 0) return null;

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="energy-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </>
  );
}
