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
import { NeuralHero } from "@/components/future/NeuralHero";
import { GestureZone } from "@/components/future/GestureZone";
import { AmbientParticles } from "@/components/future/AmbientParticles";
import { VoiceVisualizer } from "@/components/future/VoiceVisualizer";
import { HeroContent } from "@/components/home/HeroContent";
import { StatsDisplay } from "@/components/home/StatsDisplay";
import { QuickActions } from "@/components/home/QuickActions";
import { usePredictiveUI } from "@/hooks/usePredictiveUI";
import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HomePage = () => {
  const navigate = useNavigate();
  const { predictions, trackAction } = usePredictiveUI();
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [transcript, setTranscript] = useState("");

  const structuredData = combineSchemas(
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateSoftwareAppSchema(),
    generateFAQSchema(getFAQs())
  );

  const handleNavigate = (path: string, actionName: string) => {
    trackAction(actionName);
    navigate(path);
  };

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
        {/* Ambient particles background */}
        <AmbientParticles count={30} />

        {/* Neural Hero Section with Clear Value Proposition */}
        <GestureZone
          onSwipeUp={() => handleNavigate('/dashboard', 'swipe_dashboard')}
          onSwipeLeft={() => handleNavigate('/free-ai-tools', 'swipe_ai_tools')}
          onSwipeRight={() => handleNavigate('/grok', 'swipe_grok')}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          
          <div className="relative z-10 text-center space-y-12 max-w-6xl mx-auto">
            {/* Hero Content with clear headline */}
            <HeroContent className="mb-8" />
            
            {/* Neural network visualization */}
            <NeuralHero />
            
            {/* Quick Actions with Labels */}
            <QuickActions 
              onNavigate={handleNavigate}
              predictions={predictions}
            />

            {/* Stats with Context */}
            <div className="pt-12">
              <StatsDisplay />
            </div>

            {/* Gesture hint with tooltip */}
            <TooltipProvider>
              <div className="pt-8 flex items-center justify-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-muted-foreground/50 hover:text-muted-foreground"
                    >
                      <Info className="w-3 h-3 mr-1" />
                      Gesture Controls Available
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1 text-xs">
                      <p>Swipe ↑ for Dashboard</p>
                      <p>Swipe ← for AI Tools</p>
                      <p>Swipe → for Grok Chat</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </GestureZone>

        {/* Voice Command Interface */}
        <div className="fixed bottom-8 right-8 z-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <VoiceVisualizer
                    isListening={voiceEnabled}
                    transcript={transcript}
                    onToggle={() => setVoiceEnabled(!voiceEnabled)}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">Voice Commands</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PageLayout>
    </>
  );
};

export default HomePage;
