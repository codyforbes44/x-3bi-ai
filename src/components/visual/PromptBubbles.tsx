import { MessageSquare, Image, Code, Sparkles, Mic, FileText } from "lucide-react";
import { IconButton } from "./IconButton";

interface PromptBubble {
  icon: typeof MessageSquare;
  label: string;
  prompt: string;
  variant: 'pink' | 'cyan' | 'purple' | 'blue';
}

const suggestions: PromptBubble[] = [
  { icon: MessageSquare, label: "Ask anything", prompt: "Tell me a creative story", variant: 'purple' },
  { icon: Image, label: "Generate image", prompt: "Create a beautiful sunset", variant: 'pink' },
  { icon: Code, label: "Write code", prompt: "Create a React component", variant: 'cyan' },
  { icon: Sparkles, label: "Get ideas", prompt: "Give me 5 creative ideas", variant: 'blue' },
];

interface PromptBubblesProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export function PromptBubbles({ onSelect, disabled }: PromptBubblesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {suggestions.map((suggestion) => (
        <IconButton
          key={suggestion.label}
          icon={suggestion.icon}
          label={suggestion.label}
          onClick={() => onSelect(suggestion.prompt)}
          variant={suggestion.variant}
          size="lg"
          disabled={disabled}
          showLabel={true}
        />
      ))}
    </div>
  );
}
