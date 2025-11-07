import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Feature } from "@/components/dashboard/FeatureCategories";

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
  return (
    <button
      onClick={() => onSelect(feature.id)}
      className={`w-full flex items-start gap-3 p-4 text-sm rounded-xl text-left transition-all border-2 ${
        isActive
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border hover:border-primary/50 hover:bg-muted/50'
      }`}
    >
      <div className={`p-2.5 rounded-lg bg-background ${isActive ? 'ring-2 ring-primary' : ''}`}>
        <feature.icon className={`w-5 h-5 ${feature.color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-base">{feature.title}</h3>
          <button
            onClick={(e) => onToggleFavorite(feature.id, e)}
            className="flex-shrink-0"
          >
            <Star
              className={`w-4 h-4 ${
                isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
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
    </button>
  );
};
