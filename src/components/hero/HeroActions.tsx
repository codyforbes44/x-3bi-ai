import { Sparkles, Brain, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroActionsProps {
  onNavigate: (path: string, actionName: string) => void;
  predictions: Array<{ action: string; probability: number; context: string }>;
}

interface ActionButton {
  icon: React.ReactNode;
  label: string;
  path: string;
  actionName: string;
  variant: "default" | "secondary" | "outline" | "ghost";
}

const actions: ActionButton[] = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    label: "AI Tools",
    path: "/free-ai-tools",
    actionName: "click_ai_tools",
    variant: "default",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    label: "Grok AI",
    path: "/grok",
    actionName: "click_grok",
    variant: "default",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Dashboard",
    path: "/dashboard",
    actionName: "click_dashboard",
    variant: "secondary",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Workspaces",
    path: "/workspaces",
    actionName: "click_workspaces",
    variant: "outline",
  },
];

export function HeroActions({ onNavigate, predictions }: HeroActionsProps) {
  return (
    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
      {actions.map((action) => {
        const isPredicted = predictions.some(p => p.action.includes(action.path));
        
        return (
          <Button
            key={action.path}
            variant={action.variant}
            size="lg"
            onClick={() => onNavigate(action.path, action.actionName)}
            className={cn(
              "gap-2 transition-all",
              isPredicted && "ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
            )}
          >
            {action.icon}
            <span className="hidden sm:inline">{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
