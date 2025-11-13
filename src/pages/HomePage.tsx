import { SEO } from "@/components/SEO";
import { PageLayout } from "@/components/layout/PageLayout";
import { useNavigate } from "react-router-dom";
import { SEO_CONFIG, PAGE_SEO } from "@/config/seo-config";
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateSoftwareAppSchema,
  generateFAQSchema,
  combineSchemas 
} from "@/utils/structuredData";
import { getFAQs } from "@/components/home/sections/FAQSection";
import { ModelIconGlobe } from "@/components/visual/ModelIconGlobe";
import { IconCTA } from "@/components/visual/IconCTA";
import { Sparkles, Zap, Brain, Users } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const structuredData = combineSchemas(
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateSoftwareAppSchema(),
    generateFAQSchema(getFAQs())
  );

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
        breadcrumbs={[{ name: 'Home', url: '/' }]}
      />
      <PageLayout className="p-0">
        {/* Visual Hero - Icon Globe */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          
          <div className="relative z-10 text-center space-y-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              24 AI • One Platform
            </h1>
            
            <ModelIconGlobe />
            
            {/* Icon CTAs */}
            <div className="flex gap-8 justify-center flex-wrap">
              <IconCTA 
                icon={Sparkles} 
                onClick={() => navigate('/ai-chat')}
                variant="primary"
                size="xl"
              />
              <IconCTA 
                icon={Brain} 
                onClick={() => navigate('/grok-chat')}
                variant="primary"
                size="xl"
              />
              <IconCTA 
                icon={Zap} 
                onClick={() => navigate('/dashboard')}
                variant="secondary"
                size="lg"
              />
              <IconCTA 
                icon={Users} 
                onClick={() => navigate('/team-collaboration')}
                variant="secondary"
                size="lg"
              />
            </div>

            {/* Minimal stats - icon + number only */}
            <div className="flex gap-12 justify-center text-center pt-12">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">24</div>
                <Sparkles className="w-6 h-6 mx-auto text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">12</div>
                <Brain className="w-6 h-6 mx-auto text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">∞</div>
                <Zap className="w-6 h-6 mx-auto text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default HomePage;
