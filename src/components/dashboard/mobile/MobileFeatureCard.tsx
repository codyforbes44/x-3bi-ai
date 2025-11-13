import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Feature } from "@/components/dashboard/FeatureCategories";
import { NeonCard } from "@/components/ui/neon-card";
import { AccentDot } from "@/components/ui/accent-dot";
import { useNeonVariant } from "@/hooks/useNeonVariant";

interface MobileFeatureCardProps {
  feature: Feature;
  isActive: boolean;
  isFavorite: boolean;
  onSelect: (featureId: string) => void;
  onToggleFavorite: (featureId: string, e: React.MouseEvent) => void;
}

export const MobileFeatureCard = ({
  feature,
  isActive,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: MobileFeatureCardProps) => {
  const neonVariant = useNeonVariant(feature.category as any);
  
  return (
    <NeonCard
      variant={isActive ? neonVariant : 'none'}
      glass={true}
      glow={isActive}
      size="sm"
      onClick={() => onSelect(feature.id)}
      className="w-full"
    >
      {isActive && <AccentDot color="cyan" />}
      
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-lg bg-background/50 ${isActive ? 'ring-2 ring-primary' : ''}`}>
          <feature.icon className={`w-5 h-5 ${feature.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base">{feature.title}</h3>
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
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {feature.description}
          </p>
          <Badge variant="secondary" className="text-[10px] h-5">
            {feature.badge}
          </Badge>
        </div>
      </div>
    </NeonCard>
  );
};
