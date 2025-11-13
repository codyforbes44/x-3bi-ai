import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useDevice } from "@/hooks/useDevice";
import { useAccessibilityPreferences } from "@/hooks/useAccessibilityPreferences";

interface AmbientParticlesProps {
  count?: number;
  className?: string;
  interactive?: boolean;
}

export function AmbientParticles({
  count = 50,
  className = "",
  interactive = true,
}: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { shouldEnableParticles, performanceTier } = useDevice();
  const { reducedMotion } = useAccessibilityPreferences();
  
  // Don't render if device can't handle it or user prefers reduced motion
  if (!shouldEnableParticles || reducedMotion) {
    return null;
  }
  
  // Adjust particle count based on performance tier
  const adjustedCount = performanceTier === 'high' ? count : performanceTier === 'medium' ? Math.floor(count / 2) : Math.floor(count / 4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
    }

    const particles: Particle[] = Array.from({ length: adjustedCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      hue: Math.random() * 60 + 200, // Blue to purple range
    }));

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        if (interactive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx -= (dx / distance) * force * 0.1;
            particle.vy -= (dy / distance) * force * 0.1;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, 0.6)`;
        ctx.fill();

        // Draw connections
        particles.forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [adjustedCount, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none opacity-40", className)}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
