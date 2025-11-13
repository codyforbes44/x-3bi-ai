export interface BackgroundConfig {
  particles: {
    count: number;
    reducedMotionCount: number;
    minSize: number;
    maxSize: number;
    animationDuration: { min: number; max: number };
  };
  orbs: Array<{
    size: number;
    position: string;
    className: string;
    delay: number;
  }>;
  layers: {
    gradientWave: { enabled: boolean };
    gridPattern: { enabled: boolean; opacity: number };
    particles: { enabled: boolean };
    accentLines: { enabled: boolean };
    glowOrbs: { enabled: boolean };
  };
}

export const BACKGROUND_CONFIG: Record<'low' | 'medium' | 'high', BackgroundConfig> = {
  low: {
    particles: {
      count: 0,
      reducedMotionCount: 0,
      minSize: 3,
      maxSize: 4,
      animationDuration: { min: 8, max: 12 },
    },
    orbs: [
      { size: 384, position: '-top-40 -right-40', className: 'pulse-primary', delay: 0 },
      { size: 320, position: '-bottom-40 -left-40', className: 'bg-accent/10', delay: 700 },
    ],
    layers: {
      gradientWave: { enabled: true },
      gridPattern: { enabled: false, opacity: 0 },
      particles: { enabled: false },
      accentLines: { enabled: false },
      glowOrbs: { enabled: true },
    },
  },
  medium: {
    particles: {
      count: 30,
      reducedMotionCount: 0,
      minSize: 3,
      maxSize: 4,
      animationDuration: { min: 8, max: 12 },
    },
    orbs: [
      { size: 384, position: '-top-40 -right-40', className: 'pulse-primary', delay: 0 },
      { size: 320, position: '-bottom-40 -left-40', className: 'bg-accent/10', delay: 700 },
      { size: 384, position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', className: 'bg-primary/5', delay: 1400 },
      { size: 256, position: 'top-1/4 right-1/4', className: 'bg-primary/10', delay: 2100 },
    ],
    layers: {
      gradientWave: { enabled: true },
      gridPattern: { enabled: true, opacity: 0.1 },
      particles: { enabled: true },
      accentLines: { enabled: true },
      glowOrbs: { enabled: true },
    },
  },
  high: {
    particles: {
      count: 50,
      reducedMotionCount: 0,
      minSize: 2,
      maxSize: 5,
      animationDuration: { min: 6, max: 10 },
    },
    orbs: [
      { size: 384, position: '-top-40 -right-40', className: 'pulse-primary', delay: 0 },
      { size: 320, position: '-bottom-40 -left-40', className: 'bg-accent/10', delay: 700 },
      { size: 384, position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', className: 'bg-primary/5', delay: 1400 },
      { size: 256, position: 'top-1/4 right-1/4', className: 'bg-primary/10', delay: 2100 },
      { size: 200, position: 'bottom-1/4 left-1/3', className: 'bg-accent/5', delay: 2800 },
    ],
    layers: {
      gradientWave: { enabled: true },
      gridPattern: { enabled: true, opacity: 0.15 },
      particles: { enabled: true },
      accentLines: { enabled: true },
      glowOrbs: { enabled: true },
    },
  },
};
