import { ReactNode, useEffect, useRef, useState } from "react";
import Hammer from "hammerjs";
import { cn } from "@/lib/utils";

type GestureType = 'all' | 'horizontal' | 'vertical' | 'none';

interface GestureZoneProps {
  children: ReactNode;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPinchIn?: () => void;
  onPinchOut?: () => void;
  onRotate?: (angle: number) => void;
  showTrails?: boolean;
  className?: string;
  enableGestures?: boolean;
  gestureType?: GestureType;
  threshold?: number;
  velocity?: number;
}

export function GestureZone({
  children,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onPinchIn,
  onPinchOut,
  onRotate,
  showTrails = true,
  className = "",
  enableGestures = true,
  gestureType = 'all',
  threshold = 80,
  velocity = 0.6,
}: GestureZoneProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (!zoneRef.current || !enableGestures || gestureType === 'none') return;

    const hammer = new Hammer.Manager(zoneRef.current);

    // Configure swipe direction based on gestureType
    let direction = Hammer.DIRECTION_ALL;
    if (gestureType === 'horizontal') {
      direction = Hammer.DIRECTION_HORIZONTAL;
    } else if (gestureType === 'vertical') {
      direction = Hammer.DIRECTION_VERTICAL;
    }

    // Add recognizers with smart thresholds
    hammer.add(new Hammer.Swipe({ 
      direction,
      threshold,
      velocity
    }));
    hammer.add(new Hammer.Pinch());
    hammer.add(new Hammer.Rotate());

    // Swipe handler with direction dominance
    hammer.on("swipe", (e) => {
      const deltaX = Math.abs(e.deltaX);
      const deltaY = Math.abs(e.deltaY);

      // Only trigger if movement is primarily in the intended direction
      if (gestureType === 'all' || gestureType === 'vertical') {
        if (deltaY > deltaX * 1.5) {
          if (e.direction === Hammer.DIRECTION_UP && onSwipeUp) {
            onSwipeUp();
            if (navigator.vibrate) navigator.vibrate(15);
          } else if (e.direction === Hammer.DIRECTION_DOWN && onSwipeDown) {
            onSwipeDown();
            if (navigator.vibrate) navigator.vibrate(15);
          }
        }
      }

      if (gestureType === 'all' || gestureType === 'horizontal') {
        if (deltaX > deltaY * 1.5) {
          if (e.direction === Hammer.DIRECTION_LEFT && onSwipeLeft) {
            onSwipeLeft();
            if (navigator.vibrate) navigator.vibrate(15);
          } else if (e.direction === Hammer.DIRECTION_RIGHT && onSwipeRight) {
            onSwipeRight();
            if (navigator.vibrate) navigator.vibrate(15);
          }
        }
      }
    });

    // Pinch handlers
    hammer.on("pinchin", () => {
      onPinchIn?.();
      if (navigator.vibrate) navigator.vibrate(10);
    });

    hammer.on("pinchout", () => {
      onPinchOut?.();
      if (navigator.vibrate) navigator.vibrate(10);
    });

    // Rotate handler
    hammer.on("rotate", (e) => {
      onRotate?.(e.rotation);
    });

    return () => {
      hammer.destroy();
    };
  }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, onPinchIn, onPinchOut, onRotate, enableGestures, gestureType, threshold, velocity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showTrails) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newTrail = { x, y, id: Date.now() };
    setTrails((prev) => [...prev.slice(-5), newTrail]);

    // Remove trail after animation
    setTimeout(() => {
      setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
    }, 1000);
  };

  // Determine touch-action CSS class
  const touchActionClass = 
    gestureType === 'horizontal' ? 'touch-pan-y' :
    gestureType === 'vertical' ? 'touch-pan-x' :
    gestureType === 'none' ? 'touch-auto' :
    '';

  return (
    <div
      ref={zoneRef}
      className={cn("relative", touchActionClass, className)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {/* Gesture trails */}
      {showTrails && trails.map((trail) => (
        <div
          key={trail.id}
          className="absolute w-3 h-3 rounded-full bg-primary/50 pointer-events-none animate-ping"
          style={{
            left: `${trail.x}%`,
            top: `${trail.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
