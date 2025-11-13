interface OrbConfig {
  size: number;
  position: string;
  className: string;
  delay: number;
}

interface GlowOrbsLayerProps {
  orbs: OrbConfig[];
}

export function GlowOrbsLayer({ orbs }: GlowOrbsLayerProps) {
  return (
    <>
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute w-${orb.size} h-${orb.size} rounded-full blur-3xl animate-pulse ${orb.position} ${orb.className}`}
          style={{ 
            animationDelay: `${orb.delay}ms`,
            willChange: 'transform, opacity',
            width: `${orb.size}px`,
            height: `${orb.size}px`,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
