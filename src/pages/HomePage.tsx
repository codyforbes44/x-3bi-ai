import { SEO } from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import { PageLayout } from "@/components/layout/PageLayout";
import { CTASection } from "@/components/layout/CTASection";
import { GrokSpotlightSection } from "@/components/home/sections/GrokSpotlightSection";
import { QuickStartSection } from "@/components/home/sections/QuickStartSection";
import { CapabilitiesSection } from "@/components/home/sections/CapabilitiesSection";
import { PlatformStatsSection } from "@/components/home/sections/PlatformStatsSection";
import { ComparisonSection } from "@/components/home/sections/ComparisonSection";
import { TestimonialsSection } from "@/components/home/sections/TestimonialsSection";
import { FAQSection, getFAQs } from "@/components/home/sections/FAQSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { homeContent } from "@/config/home-content";
import { PLATFORM_STATS } from "@/config/platform-capabilities";
import { SEO_CONFIG, PAGE_SEO, BREADCRUMB_CONFIG } from "@/config/seo-config";
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateSoftwareAppSchema,
  generateFAQSchema,
  combineSchemas 
} from "@/utils/structuredData";

const HomePage = () => {
  const navigate = useNavigate();

  const structuredData = combineSchemas(
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateSoftwareAppSchema(),
    generateFAQSchema(getFAQs())
  );

  const { seo, cta } = homeContent;

  return (
    <>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        ogImage={SEO_CONFIG.ogImages.default}
        ogType="website"
        canonical={SEO_CONFIG.siteUrl}
        structuredData={structuredData}
        breadcrumbs={[
          { name: 'Home', url: '/' }
        ]}
      />
      <PageLayout className="p-0">
        <HeroSection />
        <PlatformStatsSection />
        <GrokSpotlightSection />
        <CapabilitiesSection />
        <ComparisonSection />
        <QuickStartSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection
          title={cta.title}
          description={`Get instant access to all ${PLATFORM_STATS.totalFeatures} AI features and ${PLATFORM_STATS.totalModels} models. Join thousands of teams building with the complete AI platform.`}
          variant="gradient"
          actions={
            <>
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 touch-target"
                onClick={() => navigate(cta.primaryButton.route)}
              >
                {cta.primaryButton.text}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 border-white text-white hover:bg-white/10 touch-target"
                onClick={() => navigate(cta.secondaryButton.route)}
              >
                {cta.secondaryButton.text}
              </Button>
            </>
          }
        />
      </PageLayout>
    </>
  );
};

export default HomePage;
