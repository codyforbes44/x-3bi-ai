import { LucideIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { LongPressTooltip } from "./LongPressTooltip";

interface IconToggleProps {
  icon: LucideIcon;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function IconToggle({ icon: Icon, label, checked, onCheckedChange, disabled }: IconToggleProps) {
  return (
    <LongPressTooltip content={label}>
      <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all">
        <Icon className="w-5 h-5 text-primary" />
        <Switch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
      </div>
    </LongPressTooltip>
  );
}
