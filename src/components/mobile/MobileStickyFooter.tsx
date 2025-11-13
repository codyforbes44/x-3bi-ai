import { ReactNode, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHaptics } from "@/hooks/useHaptics";

interface MobileStickyFooterProps {
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    disabled?: boolean;
    loading?: boolean;
  };
  secondaryActions?: ReactNode;
  className?: string;
}

/**
 * Sticky footer for mobile with primary action button
 * Safe area aware for iOS and Android
 */
export function MobileStickyFooter({
  primaryAction,
  secondaryActions,
  className
}: MobileStickyFooterProps) {
  const haptics = useHaptics();
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handlePrimaryClick = () => {
    if (primaryAction && !primaryAction.disabled && !primaryAction.loading) {
      haptics.medium();
      primaryAction.onClick();
    }
  };
  
  if (!primaryAction && !secondaryActions) {
    return null;
  }
  
  return (
    <div className={cn(
      "sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border safe-bottom z-40",
      className
    )}>
      <div className="flex items-center gap-3 p-4">
        {/* Secondary actions */}
        {secondaryActions && (
          <div className="flex items-center gap-2">
            {secondaryActions}
          </div>
        )}
        
        {/* Primary action button */}
        {primaryAction && (
          <motion.button
            ref={buttonRef}
            onClick={handlePrimaryClick}
            disabled={primaryAction.disabled || primaryAction.loading}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-semibold transition-all touch-target",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 active:scale-95",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            whileTap={{ scale: primaryAction.disabled ? 1 : 0.95 }}
            aria-label={primaryAction.label}
          >
            {primaryAction.loading ? (
              <>
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {primaryAction.icon && <span aria-hidden="true">{primaryAction.icon}</span>}
                <span>{primaryAction.label}</span>
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
