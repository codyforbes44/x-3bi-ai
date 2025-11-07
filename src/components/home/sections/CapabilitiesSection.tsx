import { FeatureGrid } from "@/components/layout/FeatureGrid";
import { homeContent } from "@/config/home-content";

export function CapabilitiesSection() {
  const { aiCapabilities } = homeContent;

  // Transform content data to match FeatureGrid interface
  const features = aiCapabilities.map(capability => ({
    icon: capability.icon,
    title: capability.title,
    description: capability.description,
    color: capability.color,
    badge: capability.badge
  }));

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
      <FeatureGrid features={features} columns={3} />
    </section>
  );
}
