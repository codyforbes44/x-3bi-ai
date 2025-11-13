import { ReactNode, useEffect, useRef, useState } from "react";
import Hammer from "hammerjs";
import { cn } from "@/lib/utils";

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
}: GestureZoneProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (!zoneRef.current) return;

    const hammer = new Hammer.Manager(zoneRef.current);

    // Add recognizers
    hammer.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL }));
    hammer.add(new Hammer.Pinch());
    hammer.add(new Hammer.Rotate());

    // Swipe handlers
    hammer.on("swipeup", () => {
      onSwipeUp?.();
      if (navigator.vibrate) navigator.vibrate(15);
    });

    hammer.on("swipedown", () => {
      onSwipeDown?.();
      if (navigator.vibrate) navigator.vibrate(15);
    });

    hammer.on("swipeleft", () => {
      onSwipeLeft?.();
      if (navigator.vibrate) navigator.vibrate(15);
    });

    hammer.on("swiperight", () => {
      onSwipeRight?.();
      if (navigator.vibrate) navigator.vibrate(15);
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
  }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, onPinchIn, onPinchOut, onRotate]);

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

  return (
    <div
      ref={zoneRef}
      className={cn("relative touch-pan-y", className)}
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
