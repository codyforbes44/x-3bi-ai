import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getPalette, type PaletteName } from "@/config/pixel-palette";
import { getPixelProgress, getPositionColor, getRandomColor } from "@/utils/pixelAnimations";

interface PixelGridBackgroundProps {
  gridWidth?: number;
  gridHeight?: number;
  pixelSize?: number;
  animationSpeed?: 'slow' | 'medium' | 'fast';
  colorPalette?: PaletteName;
  showGrid?: boolean;
  className?: string;
}

export function PixelGridBackground({
  gridWidth = 80,
  gridHeight = 45,
  pixelSize = 16,
  animationSpeed = 'medium',
  colorPalette = 'brand',
  showGrid = true,
  className = "",
}: PixelGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const pixelStatesRef = useRef<Map<string, { color: string; alpha: number }>>(new Map());
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isInitialized, setIsInitialized] = useState(false);

  const palette = getPalette(colorPalette);
  
  // Speed multipliers
  const speedMap = { slow: 0.5, medium: 1, fast: 1.5 };
  const speed = speedMap[animationSpeed];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const width = gridWidth * pixelSize;
    const height = gridHeight * pixelSize;
    canvas.width = width;
    canvas.height = height;

    // Initialize pixel states
    pixelStatesRef.current.clear();
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const key = `${x},${y}`;
        const color = getPositionColor(x, y, palette, 'noise');
        pixelStatesRef.current.set(key, { color, alpha: 0 });
      }
    }

    setIsInitialized(true);

    // Animation function
    let lastActivityTime = 0;
    const ACTIVITY_INTERVAL = prefersReducedMotion ? 2000 : 800;
    const WAVE_DURATION = prefersReducedMotion ? 4000 : 8000;

    function animate(time: number) {
      if (!ctx || !canvas) return;

      if (startTimeRef.current === 0) {
        startTimeRef.current = time;
      }

      const elapsed = time - startTimeRef.current;
      const waveProgress = Math.min(1, elapsed / (WAVE_DURATION * speed));

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pixels
      for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
          const key = `${x},${y}`;
          const pixelState = pixelStatesRef.current.get(key);
          if (!pixelState) continue;

          let alpha = pixelState.alpha;

          // Wave animation phase (0-8s)
          if (waveProgress < 1) {
            const progress = getPixelProgress(x, y, elapsed, gridWidth, gridHeight, 'diagonal');
            alpha = progress * 0.6; // Max 60% opacity during wave
            pixelStatesRef.current.set(key, { ...pixelState, alpha });
          }
          // Living canvas phase (after wave)
          else if (!prefersReducedMotion) {
            // Keep current alpha or slowly fade in
            if (alpha < 0.6) {
              alpha = Math.min(0.6, alpha + 0.001);
              pixelStatesRef.current.set(key, { ...pixelState, alpha });
            }
          }

          // Draw pixel
          if (alpha > 0) {
            ctx.fillStyle = pixelState.color;
            ctx.globalAlpha = alpha;
            ctx.fillRect(
              x * pixelSize,
              y * pixelSize,
              pixelSize - (showGrid ? 1 : 0),
              pixelSize - (showGrid ? 1 : 0)
            );
          }
        }
      }

      // Reset alpha
      ctx.globalAlpha = 1;

      // Living canvas: Random pixel activity (after wave completes)
      if (waveProgress >= 1 && !prefersReducedMotion && time - lastActivityTime > ACTIVITY_INTERVAL) {
        lastActivityTime = time;
        
        // Change 2-3 random pixels
        const numChanges = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < numChanges; i++) {
          const x = Math.floor(Math.random() * gridWidth);
          const y = Math.floor(Math.random() * gridHeight);
          const key = `${x},${y}`;
          const newColor = getRandomColor(palette);
          pixelStatesRef.current.set(key, { color: newColor, alpha: 0.7 });
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gridWidth, gridHeight, pixelSize, palette, showGrid, speed, prefersReducedMotion]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      
      {/* Canvas container with centering */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full"
          style={{
            imageRendering: 'pixelated',
            willChange: isInitialized ? 'auto' : 'transform',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/30" />
    </div>
  );
}
