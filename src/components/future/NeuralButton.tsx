import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface NeuralButtonProps {
  children?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  predictive?: boolean;
  haptic?: boolean;
}

export function NeuralButton({
  children,
  icon,
  onClick,
  variant = "primary",
  className = "",
  predictive = true,
  haptic = true,
}: NeuralButtonProps) {
  const [isPredicted, setIsPredicted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleClick = () => {
    setIsThinking(true);
    
    // Haptic feedback
    if (haptic && navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    setTimeout(() => {
      onClick?.();
      setIsThinking(false);
    }, 150);
  };

  const handleMouseEnter = () => {
    if (predictive) {
      setIsPredicted(true);
    }
  };

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    ghost: "bg-transparent hover:bg-accent/10",
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsPredicted(false)}
      className={cn(
        "relative overflow-hidden rounded-full p-4 transition-all",
        variantStyles[variant],
        isPredicted && "ring-2 ring-primary/50 ring-offset-2",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isThinking ? { opacity: [1, 0.7, 1] } : {}}
      transition={{ duration: 0.15 }}
    >
      {/* Neural thinking animation */}
      {isThinking && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      {/* Predictive glow */}
      {isPredicted && (
        <motion.div
          className="absolute inset-0 bg-primary/20 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative flex items-center justify-center gap-2">
        {icon && (
          <motion.div
            animate={isThinking ? { rotate: 360 } : {}}
            transition={{ duration: 0.6, ease: "linear" }}
          >
            {icon}
          </motion.div>
        )}
        {children}
      </div>
    </motion.button>
  );
}
