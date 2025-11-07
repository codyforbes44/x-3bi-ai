import { ScrollArea } from "@/components/ui/scroll-area";
import { Feature } from "@/components/dashboard/FeatureCategories";
import { MobileFeatureCard } from "./MobileFeatureCard";
import { LucideIcon } from "lucide-react";

interface MobileFeatureListProps {
  features: Feature[];
  activeTab: string;
  favorites: string[];
  onSelect: (featureId: string) => void;
  onToggleFavorite: (featureId: string, e: React.MouseEvent) => void;
  emptyState?: {
    icon?: LucideIcon;
    title: string;
    description: string;
  };
}

export const MobileFeatureList = ({
  features,
  activeTab,
  favorites,
  onSelect,
  onToggleFavorite,
  emptyState,
}: MobileFeatureListProps) => {
  if (features.length === 0 && emptyState) {
    const Icon = emptyState.icon;
    return (
      <ScrollArea className="h-full px-4 pb-4">
        <div className="text-center py-12">
          {Icon && <Icon className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />}
          <p className="text-muted-foreground">{emptyState.title}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {emptyState.description}
          </p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-full px-4 pb-4">
      <div className="grid grid-cols-1 gap-3 py-4">
        {features.map((feature) => (
          <MobileFeatureCard
            key={feature.id}
            feature={feature}
            isActive={activeTab === feature.id}
            isFavorite={favorites.includes(feature.id)}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
