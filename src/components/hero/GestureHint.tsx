import { ArrowLeftRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GestureHint() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute bottom-8 right-8 p-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 cursor-help">
            <ArrowLeftRight className="w-5 h-5 text-primary animate-pulse" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs">
          <p className="font-medium mb-1">Gesture Navigation</p>
          <p className="text-sm text-muted-foreground">
            Swipe left for AI Tools, swipe right for Grok AI
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
