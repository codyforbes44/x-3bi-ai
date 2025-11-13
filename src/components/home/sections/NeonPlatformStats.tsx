import { NeonCard } from "@/components/ui/neon-card";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { PLATFORM_STATS } from "@/config/platform-capabilities";
import { Activity, Zap, Users, TrendingUp, Brain, Code, ImagePlus, Mic } from "lucide-react";

export function NeonPlatformStatsSection() {
  const stats = [
    { 
      icon: Brain, 
      label: 'AI Models', 
      value: `${PLATFORM_STATS.totalModels}+`,
      variant: 'purple' as const,
      description: 'Latest AI models'
    },
    { 
      icon: Code, 
      label: 'Features', 
      value: `${PLATFORM_STATS.totalFeatures}+`,
      variant: 'cyan' as const,
      description: 'Integrated tools'
    },
    { 
      icon: Users, 
      label: 'Active Users', 
      value: '2.4K+',
      variant: 'pink' as const,
      description: 'Daily active users'
    },
    { 
      icon: TrendingUp, 
      label: 'Uptime', 
      value: '99.9%',
      variant: 'blue' as const,
      description: 'Service reliability'
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <BentoGrid className="grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <BentoItem key={stat.label}>
              <NeonCard
                variant={stat.variant}
                glass={true}
                glow={index === 0}
                size="sm"
                className="h-full"
              >
                <div className="flex flex-col items-start gap-3">
                  <stat.icon className="w-8 h-8 text-foreground/80" />
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-foreground/90 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </NeonCard>
            </BentoItem>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
