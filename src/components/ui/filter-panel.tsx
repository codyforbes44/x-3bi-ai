import { ReactNode, useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  defaultOpen?: boolean;
}

interface FilterPanelProps {
  groups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  className?: string;
  children?: ReactNode;
}

export function FilterPanel({
  groups,
  selectedFilters,
  onFilterChange,
  onClearAll,
  className,
  children,
}: FilterPanelProps) {
  const totalSelected = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <aside
      className={cn(
        "w-full md:w-64 border rounded-lg p-4 space-y-4 h-fit sticky top-4",
        className
      )}
      role="complementary"
      aria-label="Filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        {totalSelected > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Custom children (e.g., search, date picker) */}
      {children && (
        <>
          {children}
          <Separator />
        </>
      )}

      {/* Filter Groups */}
      <div className="space-y-4">
        {groups.map((group) => (
          <FilterGroupSection
            key={group.id}
            group={group}
            selectedOptions={selectedFilters[group.id] || []}
            onFilterChange={onFilterChange}
          />
        ))}
      </div>

      {/* Active Filters Count */}
      {totalSelected > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {totalSelected} filter{totalSelected !== 1 ? "s" : ""} active
          </p>
        </div>
      )}
    </aside>
  );
}

interface FilterGroupSectionProps {
  group: FilterGroup;
  selectedOptions: string[];
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
}

function FilterGroupSection({
  group,
  selectedOptions,
  onFilterChange,
}: FilterGroupSectionProps) {
  const [isOpen, setIsOpen] = useState(group.defaultOpen ?? true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full group">
        <h4 className="text-sm font-medium text-foreground">{group.label}</h4>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3 space-y-3">
        {group.options.map((option) => {
          const isChecked = selectedOptions.includes(option.id);
          return (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`${group.id}-${option.id}`}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  onFilterChange(group.id, option.id, checked as boolean)
                }
              />
              <Label
                htmlFor={`${group.id}-${option.id}`}
                className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
              >
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    {option.count}
                  </span>
                )}
              </Label>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
