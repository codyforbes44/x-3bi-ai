import { Info, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FeatureContext } from '@/utils/aiSidebarContext';

interface AISidebarContextPanelProps {
  context: FeatureContext;
  onPromptClick: (prompt: string) => void;
  isLoading?: boolean;
}

export function AISidebarContextPanel({
  context,
  onPromptClick,
  isLoading = false,
}: AISidebarContextPanelProps) {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{context.featureName}</h3>
          <p className="text-xs text-muted-foreground mt-1">{context.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {context.capabilities.slice(0, 3).map((capability) => (
          <Badge key={capability} variant="secondary" className="text-xs">
            {capability}
          </Badge>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-accent" />
          <span className="text-xs font-medium text-foreground">Suggested prompts</span>
        </div>
        <div className="space-y-1">
          {context.suggestedPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-muted/50"
              onClick={() => onPromptClick(prompt)}
              disabled={isLoading}
            >
              <span className="line-clamp-2">{prompt}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
