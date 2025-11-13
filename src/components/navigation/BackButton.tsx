import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  /**
   * Custom fallback route if no history
   */
  fallbackRoute?: string;
  /**
   * Custom label
   */
  label?: string;
  /**
   * Variant
   */
  variant?: 'default' | 'ghost' | 'outline';
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom onClick handler
   */
  onClick?: () => void;
}

/**
 * Back Button Component
 * Smart navigation back button
 */
export function BackButton({
  fallbackRoute = '/',
  label = 'Back',
  variant = 'ghost',
  className,
  onClick,
}: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to specified route
      navigate(fallbackRoute);
    }
  };

  // Don't show on home page
  if (location.pathname === '/') return null;

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      className={cn("gap-2", className)}
      aria-label={label}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
