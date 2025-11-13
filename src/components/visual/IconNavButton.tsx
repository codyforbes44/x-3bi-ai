import { LucideIcon } from "lucide-react";
import { LongPressTooltip } from "./LongPressTooltip";
import { Button } from "@/components/ui/button";

interface IconNavButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  href?: string;
  isActive?: boolean;
}

export function IconNavButton({ icon: Icon, label, onClick, href, isActive }: IconNavButtonProps) {
  const buttonContent = (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="icon"
      onClick={onClick}
      className="relative"
    >
      <Icon className="w-5 h-5" />
    </Button>
  );

  return (
    <LongPressTooltip content={label}>
      {href ? (
        <a href={href}>
          {buttonContent}
        </a>
      ) : (
        buttonContent
      )}
    </LongPressTooltip>
  );
}
