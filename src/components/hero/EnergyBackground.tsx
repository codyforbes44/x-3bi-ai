import { useEffect, useState } from "react";

interface EnergyBackgroundProps {
  className?: string;
}

export function EnergyBackground({ className = "" }: EnergyBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Generate energy particles with staggered animations
  const particles = Array.from({ length: prefersReducedMotion ? 0 : 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 4}s`,
    size: Math.random() > 0.5 ? 4 : 3,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Layer 1: Animated gradient wave base */}
      <div className="absolute inset-0 gradient-wave-bg"></div>

      {/* Layer 2: Neural network grid pattern */}
      <div className="absolute inset-0 dark-pattern-grid opacity-10 neural-pulse-layer"></div>

      {/* Layer 3: Neural connection lines (SVG) */}
      {!prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full opacity-5" aria-hidden="true">
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Dynamic neural paths */}
          <path 
            d="M 0 200 Q 400 100 800 200 T 1600 200" 
            stroke="url(#neural-gradient)" 
            strokeWidth="1" 
            fill="none"
            className="neural-pulse-layer"
          />
          <path 
            d="M 200 0 Q 300 400 200 800" 
            stroke="url(#neural-gradient)" 
            strokeWidth="1" 
            fill="none"
            className="neural-pulse-layer"
            style={{ animationDelay: '1s' }}
          />
          <path 
            d="M 1200 100 Q 900 400 1200 700" 
            stroke="url(#neural-gradient)" 
            strokeWidth="1" 
            fill="none"
            className="neural-pulse-layer"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      )}

      {/* Layer 4: Energy particles */}
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

      {/* Layer 5: Diagonal light rays */}
      {!prefersReducedMotion && (
        <>
          <div 
            className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-30"
            style={{ transform: 'rotate(15deg) translateY(-20%)', transformOrigin: 'top' }}
          ></div>
          <div 
            className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent opacity-30"
            style={{ transform: 'rotate(-15deg) translateY(-20%)', transformOrigin: 'top' }}
          ></div>
        </>
      )}

      {/* Layer 6: Large glowing orbs with advanced movement */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl pulse-primary"
        style={{ willChange: 'transform, opacity' }}
      ></div>
      <div 
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '700ms', willChange: 'transform, opacity' }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '1400ms', willChange: 'transform, opacity' }}
      ></div>
      <div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '2100ms', willChange: 'transform, opacity' }}
      ></div>

      {/* Layer 7: Electric currents (vertical flowing light streaks) */}
      {!prefersReducedMotion && (
        <>
          <div 
            className="absolute left-1/4 top-0 w-0.5 h-96 bg-gradient-to-b from-transparent via-primary/40 to-transparent electric-current"
            style={{ animationDelay: '0s' }}
          ></div>
          <div 
            className="absolute left-2/3 top-0 w-0.5 h-96 bg-gradient-to-b from-transparent via-accent/40 to-transparent electric-current"
            style={{ animationDelay: '1.5s' }}
          ></div>
          <div 
            className="absolute left-1/2 top-0 w-0.5 h-96 bg-gradient-to-b from-transparent via-primary/30 to-transparent electric-current"
            style={{ animationDelay: '3s' }}
          ></div>
        </>
      )}

      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/20"></div>
    </div>
  );
}
