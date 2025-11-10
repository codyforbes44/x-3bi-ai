import { FeatureGrid } from "@/components/layout/FeatureGrid";
import { getFeaturedFeatures, PLATFORM_STATS } from "@/config/platform-capabilities";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function CapabilitiesSection() {
  const featuredFeatures = getFeaturedFeatures();

  // Transform to FeatureGrid format
  const features = featuredFeatures.map(feature => ({
    icon: feature.icon,
    title: feature.name,
    description: feature.description,
    color: feature.color,
    badge: feature.badge
  }));

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          {PLATFORM_STATS.totalFeatures} AI Features
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Platform Capabilities
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access the world's most advanced AI models and features in one unified platform
        </p>
      </div>
      <FeatureGrid features={features} columns={3} />
    </section>
  );
}
