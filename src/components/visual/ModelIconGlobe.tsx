import { Brain, Sparkles, Zap, Image, Code, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

const MODELS = [
  { icon: Brain, color: 'text-purple-500', delay: '0s' },
  { icon: Sparkles, color: 'text-blue-500', delay: '0.2s' },
  { icon: Zap, color: 'text-yellow-500', delay: '0.4s' },
  { icon: Image, color: 'text-green-500', delay: '0.6s' },
  { icon: Code, color: 'text-orange-500', delay: '0.8s' },
  { icon: Mic, color: 'text-pink-500', delay: '1s' },
];

export function ModelIconGlobe() {
  return (
    <div className="relative w-full max-w-md h-64 mx-auto">
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      
      {MODELS.map((model, index) => {
        const Icon = model.icon;
        const angle = (index / MODELS.length) * 2 * Math.PI;
        const radius = 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              animation: `float 3s ease-in-out infinite`,
              animationDelay: model.delay,
            }}
          >
            <div className={cn(
              "w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg",
              "hover:scale-110 transition-transform cursor-pointer"
            )}>
              <Icon className={cn("w-8 h-8", model.color)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
