import { ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLongPress } from "@/hooks/useLongPress";

interface LongPressTooltipProps {
  content: string;
  children: ReactNode;
  onClick?: () => void;
}

export function LongPressTooltip({ content, children, onClick }: LongPressTooltipProps) {
  const [open, setOpen] = useState(false);

  const handleLongPress = () => setOpen(true);

  const longPressHandlers = useLongPress({
    onLongPress: handleLongPress,
    onClick: onClick,
    delay: 500,
  });

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <div {...longPressHandlers}>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-sm">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
