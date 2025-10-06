import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ExternalLink, Info } from "lucide-react";
import { getAllFeatures } from "./FeatureCategories";
import { useState } from "react";
import { toast } from "sonner";

interface FeatureHeaderProps {
  activeTab: string;
}

export const DashboardFeatureHeader = ({ activeTab }: FeatureHeaderProps) => {
  const features = getAllFeatures();
  const activeFeature = features.find(f => f.id === activeTab);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteFeatures");
    return saved ? JSON.parse(saved) : [];
  });

  if (!activeFeature) return null;

  const isFavorite = favorites.includes(activeFeature.id);

  const toggleFavorite = () => {
    const updated = isFavorite
      ? favorites.filter(id => id !== activeFeature.id)
      : [...favorites, activeFeature.id];
    setFavorites(updated);
    localStorage.setItem("favoriteFeatures", JSON.stringify(updated));
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const helpLinks: Record<string, string> = {
    'multi-chat': 'https://docs.lovable.dev',
    'claude': 'https://docs.anthropic.com',
    'advanced': 'https://docs.lovable.dev',
    'advanced-image': 'https://platform.openai.com/docs/guides/images',
    'enhanced-voice': 'https://elevenlabs.io/docs',
    // Add more as needed
  };

  return (
    <Card className="p-4 sm:p-6 mb-6 border-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-muted ${activeFeature.color}`}>
            <activeFeature.icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{activeFeature.title}</h1>
              <Badge variant="secondary" className="text-xs">
                {activeFeature.badge}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              {activeFeature.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className="flex-shrink-0"
          >
            <Star
              className={`w-5 h-5 ${
                isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
              }`}
            />
          </Button>
          
          {helpLinks[activeFeature.id] && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(helpLinks[activeFeature.id], '_blank')}
              className="flex-shrink-0"
            >
              <Info className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
