import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantumLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function QuantumLoader({ size = "md", className = "" }: QuantumLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    rotation: (i * 360) / 8,
  }));

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Central core */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Quantum particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary"
          style={{
            transformOrigin: "0 0",
          }}
          animate={{
            rotate: [particle.rotation, particle.rotation + 360],
            x: [0, 30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Probability wave */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/30"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
