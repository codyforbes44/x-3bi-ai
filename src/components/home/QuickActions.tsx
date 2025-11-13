import { Sparkles, Brain, Zap, Users } from "lucide-react";
import { NeuralButton } from "@/components/future/NeuralButton";

interface QuickActionsProps {
  onNavigate: (path: string, actionName: string) => void;
  predictions: Array<{ action: string; probability: number; context: string }>;
}

export function QuickActions({ onNavigate, predictions }: QuickActionsProps) {
  return (
    <div className="flex gap-8 justify-center flex-wrap">
      <NeuralButton
        icon={<Sparkles className="w-10 h-10" />}
        onClick={() => onNavigate('/free-ai-tools', 'click_ai_tools')}
        variant="primary"
        predictive={predictions.some(p => p.action.includes('/free-ai-tools'))}
      >
        <span className="text-sm font-medium">AI Tools</span>
      </NeuralButton>
      <NeuralButton
        icon={<Brain className="w-10 h-10" />}
        onClick={() => onNavigate('/grok', 'click_grok')}
        variant="primary"
        predictive={predictions.some(p => p.action.includes('/grok'))}
      >
        <span className="text-sm font-medium">Grok AI</span>
      </NeuralButton>
      <NeuralButton
        icon={<Zap className="w-10 h-10" />}
        onClick={() => onNavigate('/dashboard', 'click_dashboard')}
        variant="secondary"
        predictive={predictions.some(p => p.action.includes('/dashboard'))}
      >
        <span className="text-sm font-medium">Dashboard</span>
      </NeuralButton>
      <NeuralButton
        icon={<Users className="w-10 h-10" />}
        onClick={() => onNavigate('/workspaces', 'click_team')}
        variant="ghost"
      >
        <span className="text-sm font-medium">Workspaces</span>
      </NeuralButton>
    </div>
  );
}
