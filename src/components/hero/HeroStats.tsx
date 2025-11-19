import { Sparkles, Brain, Zap } from "lucide-react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatItemProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}

function StatItem({ value, label, icon }: StatItemProps) {
  return (
    <div className="relative group">
      <div className="flex flex-col items-center gap-3">
        <div className="text-primary/70 group-hover:text-primary transition-colors">
          {icon}
        </div>
        <div 
          className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
          aria-label={`${value} ${label}`}
        >
          {value}
        </div>
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          {label}
        </span>
      </div>
      <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export function HeroStats() {
  return (
    <div className="pt-8 space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-6 sm:gap-12 md:gap-16 max-w-4xl mx-auto">
        <StatItem
          value={24}
          label="AI Models"
          icon={<Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />}
        />
        <StatItem
          value={12}
          label="Integrations"
          icon={<Brain className="w-6 h-6 sm:w-8 sm:h-8" />}
        />
        <StatItem
          value="∞"
          label="Possibilities"
          icon={<Zap className="w-6 h-6 sm:w-8 sm:h-8" />}
        />
      </div>

      {/* Gesture hint */}
      <TooltipProvider>
        <div className="flex items-center justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-muted-foreground/50 hover:text-muted-foreground gap-1"
              >
                <Info className="w-3 h-3" />
                <span className="hidden sm:inline">Gesture Controls Available</span>
                <span className="sm:hidden">Gestures</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-primary">Try swiping left or right!</p>
                <p>Swipe ← for AI Tools</p>
                <p>Swipe → for Grok Chat</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
