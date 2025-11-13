import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { NeonCard } from "@/components/ui/neon-card";
import { AccentDot } from "@/components/ui/accent-dot";
import { Feature } from "@/components/dashboard/FeatureCategories";
import { useNeonVariant } from "@/hooks/useNeonVariant";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface BentoDashboardProps {
  features: Feature[];
  activeFeature: string;
  favorites: string[];
  onFeatureSelect: (featureId: string) => void;
  onToggleFavorite: (featureId: string, e: React.MouseEvent) => void;
}

export function BentoDashboard({
  features,
  activeFeature,
  favorites,
  onFeatureSelect,
  onToggleFavorite,
}: BentoDashboardProps) {
  const getFeaturedSize = (index: number): 'sm' | 'md' | 'lg' => {
    // Create varied sizes for visual interest
    if (index === 0) return 'lg';
    if (index % 5 === 0) return 'md';
    return 'sm';
  };

  const getSpan = (index: number) => {
    // First item spans 2 columns on tablet and desktop
    if (index === 0) {
      return {
        mobile: 'col-span-1' as const,
        tablet: 'md:col-span-2' as const,
        desktop: 'lg:col-span-2' as const,
      };
    }
    // Every 5th item spans 2 columns on desktop
    if (index % 5 === 0) {
      return {
        desktop: 'lg:col-span-2' as const,
      };
    }
    return undefined;
  };

  return (
    <BentoGrid>
      {features.map((feature, index) => {
        const isActive = activeFeature === feature.id;
        const isFavorite = favorites.includes(feature.id);
        const neonVariant = useNeonVariant(feature.category as any);
        const size = getFeaturedSize(index);

        return (
          <BentoItem key={feature.id} span={getSpan(index)}>
            <NeonCard
              variant={isActive ? neonVariant : 'none'}
              glass={true}
              glow={isActive}
              size={size}
              onClick={() => onFeatureSelect(feature.id)}
            >
              {isActive && <AccentDot color="cyan" />}
              
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className={`p-2 rounded-lg bg-background/50 ${isActive ? 'ring-2 ring-primary' : ''}`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(feature.id, e);
                    }}
                    className="flex-shrink-0"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star
                      className={`w-4 h-4 transition-colors ${
                        isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2 flex-1">
                    {feature.description}
                  </p>
                  <Badge variant="secondary" className="text-[10px] h-5 w-fit">
                    {feature.badge}
                  </Badge>
                </div>
              </div>
            </NeonCard>
          </BentoItem>
        );
      })}
    </BentoGrid>
  );
}
