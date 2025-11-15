import { useEffect, useRef } from "react";

interface ConfettiProps {
  /**
   * Number of confetti pieces
   */
  count?: number;
  /**
   * Duration in milliseconds
   */
  duration?: number;
  /**
   * Colors to use
   */
  colors?: string[];
  /**
   * Spread angle (0-360)
   */
  spread?: number;
  /**
   * Origin point (0-1)
   */
  origin?: { x: number; y: number };
}

/**
 * Confetti Component
 * Celebration animation using CSS
 */
export function Confetti({
  count = 50,
  duration = 3000,
  colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
  spread = 360,
  origin = { x: 0.5, y: 0.5 },
}: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const pieces: HTMLDivElement[] = [];

    // Create confetti pieces
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180);
      const velocity = Math.random() * 50 + 50;
      const rotation = Math.random() * 360;
      const delay = Math.random() * 200;

      piece.style.position = "absolute";
      piece.style.width = `${size}px`;
      piece.style.height = `${size}px`;
      piece.style.backgroundColor = color;
      piece.style.left = `${origin.x * 100}%`;
      piece.style.top = `${origin.y * 100}%`;
      piece.style.transform = `rotate(${rotation}deg)`;
      piece.style.pointerEvents = "none";
      piece.style.opacity = "1";
      piece.style.transition = `all ${duration}ms ease-out ${delay}ms`;

      containerRef.current.appendChild(piece);
      pieces.push(piece);

      // Animate after a tick
      requestAnimationFrame(() => {
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity + 100; // Add gravity

        piece.style.transform = `translate(${x}vh, ${y}vh) rotate(${
          rotation + 360
        }deg)`;
        piece.style.opacity = "0";
      });
    }

    // Cleanup
    const timer = setTimeout(() => {
      pieces.forEach((piece) => piece.remove());
    }, duration + 500);

    return () => {
      clearTimeout(timer);
      pieces.forEach((piece) => piece.remove());
    };
  }, [count, duration, colors, spread, origin]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden="true"
    />
  );
}

/**
 * Hook to trigger confetti
 */
export function useConfetti() {
  const trigger = (options?: ConfettiProps) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    // Create a temporary React root would be ideal here,
    // but for simplicity we'll use vanilla JS
    const count = options?.count || 50;
    const duration = options?.duration || 3000;
    const colors =
      options?.colors || [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ];
    const spread = options?.spread || 360;
    const origin = options?.origin || { x: 0.5, y: 0.5 };

    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "100";

    // Create pieces
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180);
      const velocity = Math.random() * 50 + 50;
      const rotation = Math.random() * 360;
      const delay = Math.random() * 200;

      piece.style.position = "absolute";
      piece.style.width = `${size}px`;
      piece.style.height = `${size}px`;
      piece.style.backgroundColor = color;
      piece.style.left = `${origin.x * 100}%`;
      piece.style.top = `${origin.y * 100}%`;
      piece.style.transform = `rotate(${rotation}deg)`;
      piece.style.opacity = "1";
      piece.style.transition = `all ${duration}ms ease-out ${delay}ms`;

      container.appendChild(piece);

      requestAnimationFrame(() => {
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity + 100;

        piece.style.transform = `translate(${x}vh, ${y}vh) rotate(${
          rotation + 360
        }deg)`;
        piece.style.opacity = "0";
      });
    }

    // Cleanup
    setTimeout(() => {
      container.remove();
    }, duration + 500);
  };

  return { trigger };
}
