import { ScrollArea } from "@/components/ui/scroll-area";
import { Feature } from "@/components/dashboard/FeatureCategories";
import { MobileFeatureCard } from "./MobileFeatureCard";
import { CATEGORY_LABELS, CATEGORY_ORDER, CATEGORY_ICONS } from "@/config/dashboard-features";

interface MobileCategorySectionProps {
  features: Feature[];
  activeTab: string;
  favorites: string[];
  onSelect: (featureId: string) => void;
  onToggleFavorite: (featureId: string, e: React.MouseEvent) => void;
}

export const MobileCategorySection = ({
  features,
  activeTab,
  favorites,
  onSelect,
  onToggleFavorite,
}: MobileCategorySectionProps) => {
  return (
    <ScrollArea className="h-full px-4 pb-4">
      <div className="space-y-6 py-4">
        {CATEGORY_ORDER.map((category) => {
          const categoryFeatures = features.filter((f) => f.category === category);
          if (categoryFeatures.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{CATEGORY_ICONS[category]}</span>
                <div>
                  <h3 className="font-semibold text-base">
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {categoryFeatures.length} feature{categoryFeatures.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {categoryFeatures.map((feature) => (
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
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
