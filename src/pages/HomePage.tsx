import { SEO } from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import { PageLayout } from "@/components/layout/PageLayout";
import { CTASection } from "@/components/layout/CTASection";
import { GrokSpotlightSection } from "@/components/home/sections/GrokSpotlightSection";
import { QuickStartSection } from "@/components/home/sections/QuickStartSection";
import { CapabilitiesSection } from "@/components/home/sections/CapabilitiesSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { homeContent } from "@/config/home-content";
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateSoftwareAppSchema,
  combineSchemas 
} from "@/utils/structuredData";

const HomePage = () => {
  const navigate = useNavigate();

  const structuredData = combineSchemas(
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateSoftwareAppSchema()
  );

  const { seo, cta } = homeContent;

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogImage={seo.ogImage}
        canonical={seo.canonical}
        structuredData={structuredData}
        preconnect={['https://jmazzsxnatfewblgpxfq.supabase.co']}
      />
      <PageLayout className="p-0">
        <HeroSection />
        <GrokSpotlightSection />
        <QuickStartSection />
        <CapabilitiesSection />
        <CTASection
          title={cta.title}
          description={cta.description}
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
