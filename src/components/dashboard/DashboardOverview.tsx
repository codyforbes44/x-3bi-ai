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
import { Activity, Zap, Users, TrendingUp } from "lucide-react";
import { LongPressTooltip } from "@/components/visual/LongPressTooltip";

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
  
  const [favorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteFeatures");
    return saved ? JSON.parse(saved) : [];
  });

  const favoriteFeatures = features.filter(f => favorites.includes(f.id));

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
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-10 w-10 rounded-lg mb-2" />
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Icon-Only Stats - No Text Labels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <LongPressTooltip key={stat.label} content={stat.label}>
            <NeonCard
              variant={stat.variant}
              glass={true}
              size="sm"
              className="cursor-default"
            >
              <div className="flex flex-col items-start gap-2">
                <stat.icon className="w-8 h-8 text-foreground/80" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </div>
            </NeonCard>
          </LongPressTooltip>
        ))}
      </div>

      {/* Favorites Section - Icon Only Header */}
      {favoriteFeatures.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-2xl font-bold">{favoriteFeatures.length}</span>
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
                  className="cursor-pointer h-full"
                >
                  <AccentDot color="pink" />
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-${feature.color.replace('text-', '')}/10`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                    </div>
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
            <h2 className={`text-2xl font-bold mb-4 ${colorClass}`}>
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
            </h2>
            <BentoGrid>
              {items.map((feature, index) => (
                <BentoItem key={feature.id}>
                  <NeonCard
                    variant={neonVariant}
                    glass={true}
                    size="md"
                    onClick={() => onFeatureSelect(feature.id)}
                    className="cursor-pointer h-full hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-${feature.color.replace('text-', '')}/10`}>
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                      </div>
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
