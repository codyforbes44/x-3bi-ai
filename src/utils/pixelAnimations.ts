/**
 * Animation utilities for pixel grid backgrounds
 */

export type EasingFunction = (t: number) => number;

/**
 * Easing functions for smooth animations
 */
export const easing = {
  linear: (t: number) => t,
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOut: (t: number) => t * (2 - t),
  easeIn: (t: number) => t * t,
} as const;

/**
 * Wave pattern generators
 */
export const wavePatterns = {
  diagonal: (x: number, y: number, speed: number = 50) => (x + y) * speed,
  
  horizontal: (x: number, y: number, speed: number = 100) => x * speed,
  
  vertical: (x: number, y: number, speed: number = 100) => y * speed,
  
  circular: (x: number, y: number, centerX: number, centerY: number, speed: number = 50) => {
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.sqrt(dx * dx + dy * dy) * speed;
  },
  
  ripple: (x: number, y: number, centerX: number, centerY: number, speed: number = 30) => {
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return Math.sin(distance / 5) * 1000 + distance * speed;
  },
} as const;

/**
 * Calculate animation progress for a pixel
 */
export function getPixelProgress(
  x: number,
  y: number,
  time: number,
  gridWidth: number,
  gridHeight: number,
  pattern: keyof typeof wavePatterns = 'diagonal'
): number {
  let delay: number;
  
  if (pattern === 'circular' || pattern === 'ripple') {
    const centerX = gridWidth / 2;
    const centerY = gridHeight / 2;
    delay = wavePatterns[pattern](x, y, centerX, centerY);
  } else {
    delay = wavePatterns[pattern](x, y);
  }
  
  const progress = Math.max(0, Math.min(1, (time - delay) / 1000));
  return easing.easeInOut(progress);
}

/**
 * Simple noise function for organic patterns
 */
export function simpleNoise(x: number, y: number, seed: number = 0): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Get random color from palette
 */
export function getRandomColor(palette: readonly string[]): string {
  return palette[Math.floor(Math.random() * palette.length)];
}

/**
 * Get color based on position (for patterns)
 */
export function getPositionColor(
  x: number,
  y: number,
  palette: readonly string[],
  pattern: 'grid' | 'noise' | 'random' = 'grid'
): string {
  if (pattern === 'random') {
    return getRandomColor(palette);
  }
  
  if (pattern === 'noise') {
    const noise = simpleNoise(x / 10, y / 10);
    const index = Math.floor(noise * palette.length);
    return palette[index];
  }
  
  // Grid pattern (default)
  const index = (x + y) % palette.length;
  return palette[index];
}
