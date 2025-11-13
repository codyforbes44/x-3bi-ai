import { ReactNode, useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHaptics } from "@/hooks/useHaptics";

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  snapPoints?: number[]; // [0.3, 0.6, 1] - percentage of screen height
  className?: string;
}

/**
 * Mobile bottom sheet with swipe-to-dismiss
 * Supports snap points for multiple heights
 */
export function MobileSheet({
  isOpen,
  onClose,
  children,
  title,
  snapPoints = [1],
  className
}: MobileSheetProps) {
  const [currentSnap, setCurrentSnap] = useState(0);
  const haptics = useHaptics();
  
  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.y;
    const offset = info.offset.y;
    
    // Swipe down to dismiss
    if (offset > threshold || velocity > 500) {
      haptics.medium();
      onClose();
      return;
    }
    
    // Snap to next point
    if (snapPoints.length > 1) {
      const direction = offset > 0 ? 1 : -1;
      const nextSnap = Math.min(snapPoints.length - 1, Math.max(0, currentSnap + direction));
      
      if (nextSnap !== currentSnap) {
        haptics.light();
        setCurrentSnap(nextSnap);
      }
    }
  }, [currentSnap, snapPoints, onClose, haptics]);
  
  const height = snapPoints[currentSnap] * 100;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            aria-hidden="true"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: `${100 - height}%` }}
            exit={{ y: "100%" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl max-h-[95vh] flex flex-col",
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Sheet"}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted rounded-full" aria-hidden="true" />
            </div>
            
            {/* Title */}
            {title && (
              <div className="px-6 py-3 border-b border-border">
                <h2 className="text-lg font-semibold">{title}</h2>
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
