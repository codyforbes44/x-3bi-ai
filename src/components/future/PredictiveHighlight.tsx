import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PredictiveHighlightProps {
  children: ReactNode;
  probability?: number;
  className?: string;
  onPredicted?: () => void;
}

export function PredictiveHighlight({
  children,
  probability = 0,
  className = "",
  onPredicted,
}: PredictiveHighlightProps) {
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    if (probability > 0.5) {
      setIsGlowing(true);
      onPredicted?.();
    } else {
      setIsGlowing(false);
    }
  }, [probability, onPredicted]);

  const glowIntensity = Math.min(probability, 1);

  return (
    <motion.div
      className={cn("relative", className)}
      animate={{
        scale: isGlowing ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Predictive glow ring */}
      {isGlowing && (
        <motion.div
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/50 to-accent/50 blur-sm -z-10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: glowIntensity * 0.6,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            opacity: { duration: 0.3 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      )}

      {/* Probability indicator */}
      {probability > 0.3 && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {Math.round(probability * 100)}
        </motion.div>
      )}

      {children}
    </motion.div>
  );
}
