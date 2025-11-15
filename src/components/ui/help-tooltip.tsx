import { ReactNode, useState } from "react";
import { HelpCircle, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HelpTooltipProps {
  /**
   * Help content
   */
  content: ReactNode;
  /**
   * Title for the help content
   */
  title?: string;
  /**
   * Link to more information
   */
  learnMoreUrl?: string;
  /**
   * Link text
   */
  learnMoreLabel?: string;
  /**
   * Whether the tooltip can be dismissed permanently
   */
  dismissible?: boolean;
  /**
   * Storage key for dismissed state
   */
  storageKey?: string;
  /**
   * Custom trigger element
   */
  trigger?: ReactNode;
  /**
   * Tooltip size
   */
  size?: "sm" | "md" | "lg";
  /**
   * Custom className for content
   */
  className?: string;
}

/**
 * Help Tooltip Component
 * Contextual help with rich content support
 */
export function HelpTooltip({
  content,
  title,
  learnMoreUrl,
  learnMoreLabel = "Learn more",
  dismissible = false,
  storageKey,
  trigger,
  size = "md",
  className,
}: HelpTooltipProps) {
  const [isDismissed, setIsDismissed] = useState(() => {
    if (!dismissible || !storageKey) return false;
    return localStorage.getItem(storageKey) === "true";
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleDismiss = () => {
    if (storageKey) {
      localStorage.setItem(storageKey, "true");
    }
    setIsDismissed(true);
    setIsOpen(false);
  };

  if (isDismissed) {
    return null;
  }

  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-sm",
    lg: "max-w-md",
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {trigger || (
          <button
            type="button"
            className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-4", sizeClasses[size], className)}
        align="start"
      >
        <div className="space-y-3">
          {/* Header */}
          {(title || dismissible) && (
            <div className="flex items-start justify-between gap-2">
              {title && (
                <h4 className="font-semibold text-sm text-foreground">
                  {title}
                </h4>
              )}
              {dismissible && (
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="text-sm text-muted-foreground">
            {content}
          </div>

          {/* Learn more link */}
          {learnMoreUrl && (
            <div className="pt-2 border-t">
              <a
                href={learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                {learnMoreLabel}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
