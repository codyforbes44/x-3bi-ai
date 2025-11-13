import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface HologramCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
}

export function HologramCard({
  children,
  className = "",
  depth = 20,
  glowColor = "hsl(var(--primary))",
}: HologramCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -depth;
    const rotateYValue = ((x - centerX) / centerX) * depth;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm p-6"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Holographic glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glowColor}40, transparent 70%)`,
            transform: "translateZ(-20px)",
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 rounded-xl opacity-20 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(${glowColor}20 1px, transparent 1px), linear-gradient(90deg, ${glowColor}20 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }} />
        </div>

        {/* Content */}
        <div className="relative" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>

        {/* Floating shadow */}
        <div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-primary/10 blur-xl rounded-full"
          style={{ transform: `translateZ(-40px)` }}
        />
      </motion.div>
    </motion.div>
  );
}
