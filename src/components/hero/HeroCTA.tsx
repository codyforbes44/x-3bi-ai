import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Zap, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCTAProps {
  onNavigate: (path: string, actionName: string) => void;
  predictions?: Array<{ action: string; probability: number; context: string }>;
}

const quickActions = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    label: "AI Tools",
    path: "/free-ai-tools",
    actionName: "click_ai_tools",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    label: "Grok AI",
    path: "/grok",
    actionName: "click_grok",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Dashboard",
    path: "/dashboard",
    actionName: "click_dashboard",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Workspaces",
    path: "/workspaces",
    actionName: "click_workspaces",
  },
];

export function HeroCTA({ onNavigate, predictions = [] }: HeroCTAProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Primary + Secondary CTAs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-4 max-w-2xl mx-auto">
        <Button 
          size="lg" 
          className="w-full sm:flex-1 h-14 text-lg group"
          onClick={() => onNavigate('/dashboard', 'click_dashboard')}
        >
          <Sparkles className="mr-2 w-5 h-5" />
          <span>Start Free Now</span>
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full sm:flex-1 h-14 text-lg"
          onClick={() => onNavigate('/features', 'click_features')}
        >
          See All Features
        </Button>
      </div>

      {/* Quick Actions - show on larger screens or if authenticated */}
      <div className="hidden md:flex gap-3 justify-center flex-wrap">
        {quickActions.map((action) => {
          const isPredicted = predictions.some(p => p.action.includes(action.path));
          
          return (
            <Button
              key={action.path}
              variant="ghost"
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
    </div>
  );
}
