/**
 * Color palettes for pixel grid backgrounds
 * Uses HSL values for theme integration
 */

export const PIXEL_PALETTES = {
  vibrant: [
    'hsl(330, 100%, 50%)', // Neon Pink
    'hsl(190, 100%, 50%)', // Cyan
    'hsl(270, 100%, 58%)', // Purple
    'hsl(45, 100%, 50%)',  // Gold
    'hsl(160, 100%, 50%)', // Mint
    'hsl(0, 100%, 60%)',   // Red
    'hsl(240, 100%, 60%)', // Blue
    'hsl(35, 100%, 50%)',  // Orange
    'hsl(328, 100%, 54%)', // Deep Pink
    'hsl(181, 100%, 41%)', // Turquoise
  ],
  
  brand: [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--neon-pink))',
    'hsl(var(--neon-cyan))',
    'hsl(var(--neon-purple))',
    'hsl(var(--neon-blue))',
  ],
  
  pastel: [
    'hsl(330, 70%, 70%)',
    'hsl(190, 70%, 70%)',
    'hsl(270, 70%, 75%)',
    'hsl(45, 70%, 70%)',
    'hsl(160, 70%, 70%)',
    'hsl(0, 70%, 75%)',
  ],
} as const;

export type PaletteName = keyof typeof PIXEL_PALETTES;

export function getPalette(name: PaletteName = 'brand'): readonly string[] {
  return PIXEL_PALETTES[name];
}
