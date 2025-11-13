import { useState, useEffect } from "react";
import { QuickAccess } from "./QuickAccess";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { NeonCard } from "@/components/ui/neon-card";
import { AccentDot } from "@/components/ui/accent-dot";
import { getAllFeatures } from "./FeatureCategories";
import { CATEGORY_NEON_MAP, CATEGORY_LABELS } from "@/config/neon-config";
import { getNeonVariantForFeature } from "@/utils/neonHelpers";
import { Activity, Zap, Users, TrendingUp, History, Star } from "lucide-react";
import { LongPressTooltip } from "@/components/visual/LongPressTooltip";
import { usePersonalization } from "@/hooks/usePersonalization";
import { Badge } from "@/components/ui/badge";

interface DashboardOverviewProps {
  onFeatureSelect: (featureId: string) => void;
}

/**
 * Dashboard overview page
 * Shows quick access and getting started information
 */
export const DashboardOverview = ({ onFeatureSelect }: DashboardOverviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const features = getAllFeatures();
  const { preferences, activity, toggleFavorite } = usePersonalization();
  
  const favoriteFeatures = features.filter(f => 
    preferences.favoriteFeatures.includes(f.id)
  );
  
  // Get recently used features from activity
  const recentlyUsedFeatures = activity.mostUsedFeatures
    .slice(0, 6)
    .map(({ id }) => features.find(f => f.id === id))
    .filter(Boolean) as typeof features;

  const stats = [
    { label: 'Active Users', value: '2.4K', icon: Users, variant: 'pink' as const },
    { label: 'API Calls', value: '1.2M', icon: Activity, variant: 'cyan' as const },
    { label: 'Uptime', value: '99.9%', icon: Zap, variant: 'purple' as const },
    { label: 'Growth', value: '+45%', icon: TrendingUp, variant: 'blue' as const },
  ];

  const categorizedFeatures = {
    'enterprise': features.filter(f => f.category === 'enterprise'),
    'advanced-ai': features.filter(f => f.category === 'advanced-ai'),
    'ai-tools': features.filter(f => f.category === 'ai-tools'),
    'utilities': features.filter(f => f.category === 'utilities'),
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-6 sm:h-8 w-32 sm:w-48 mb-2" />
          <Skeleton className="h-3 sm:h-4 w-64 sm:w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="touch-target">
              <CardHeader className="p-4 sm:p-6">
                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg mb-2" />
                <Skeleton className="h-4 sm:h-5 w-3/4 mb-1" />
                <Skeleton className="h-3 sm:h-4 w-full" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Skeleton className="h-8 sm:h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Icon-Only Stats - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <LongPressTooltip key={stat.label} content={stat.label}>
            <NeonCard
              variant={stat.variant}
              glass={true}
              size="sm"
              className="cursor-default touch-target"
            >
              <div className="flex flex-col items-start gap-2">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-foreground/80" />
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              </div>
            </NeonCard>
          </LongPressTooltip>
        ))}
      </div>

      {/* Recently Used Section */}
      {recentlyUsedFeatures.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <History className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Recently Used</h2>
            <Badge variant="secondary" className="ml-auto text-xs">
              {recentlyUsedFeatures.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {recentlyUsedFeatures.map((feature) => (
              <NeonCard
                key={feature.id}
                variant={CATEGORY_NEON_MAP[feature.category]}
                glass={true}
                size="md"
                onClick={() => onFeatureSelect(feature.id)}
                className="cursor-pointer hover:scale-[1.02] transition-transform touch-target"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-${feature.color.replace('text-', '')}/10 flex-shrink-0`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
        </section>
      )}

      {/* Favorites Section */}
      {favoriteFeatures.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Your Favorites</h2>
            <Badge variant="secondary" className="ml-auto text-xs">
              {favoriteFeatures.length}
            </Badge>
          </div>
          <BentoGrid>
            {favoriteFeatures.slice(0, 6).map((feature, index) => (
              <BentoItem
                key={feature.id}
                span={index === 0 ? { desktop: 'lg:col-span-2' } : undefined}
              >
                <NeonCard
                  variant={CATEGORY_NEON_MAP[feature.category]}
                  glass={true}
                  glow={true}
                  size={index === 0 ? 'lg' : 'md'}
                  onClick={() => onFeatureSelect(feature.id)}
                  className="cursor-pointer h-full touch-target"
                >
                  <AccentDot color="pink" />
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-${feature.color.replace('text-', '')}/10 flex-shrink-0`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(feature.id);
                      }}
                      className="p-1 hover:bg-background/50 rounded-md transition-colors flex-shrink-0"
                      aria-label="Remove from favorites"
                    >
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </button>
                  </div>
                </NeonCard>
              </BentoItem>
            ))}
          </BentoGrid>
        </section>
      )}

      {/* All Features by Category */}
      {Object.entries(categorizedFeatures).map(([category, items]) => {
        if (items.length === 0) return null;
        
        const neonVariant = CATEGORY_NEON_MAP[category as keyof typeof CATEGORY_NEON_MAP];
        const colorClass = 
          category === 'enterprise' ? 'text-pink-500' :
          category === 'advanced-ai' ? 'text-purple-500' :
          category === 'ai-tools' ? 'text-cyan-400' :
          'text-blue-500';

        return (
          <section key={category}>
            <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${colorClass} flex items-center gap-2`}>
              <span>{CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}</span>
              <Badge variant="outline" className="text-xs">
                {items.length}
              </Badge>
            </h2>
            <BentoGrid>
              {items.map((feature, index) => (
                <BentoItem key={feature.id}>
                  <NeonCard
                    variant={neonVariant}
                    glass={true}
                    size="md"
                    onClick={() => onFeatureSelect(feature.id)}
                    className="cursor-pointer h-full hover:scale-[1.02] transition-transform touch-target"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-${feature.color.replace('text-', '')}/10 flex-shrink-0`}>
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(feature.id);
                        }}
                        className={`p-1 hover:bg-background/50 rounded-md transition-colors flex-shrink-0 ${
                          preferences.favoriteFeatures.includes(feature.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label={preferences.favoriteFeatures.includes(feature.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Star 
                          className={`w-4 h-4 ${
                            preferences.favoriteFeatures.includes(feature.id) 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      </button>
                    </div>
                  </NeonCard>
                </BentoItem>
              ))}
            </BentoGrid>
          </section>
        );
      })}
    </div>
  );
};
