import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MobileSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const MobileSearchBar = ({
  value,
  onChange,
  onClear,
}: MobileSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search features..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 h-11"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};
