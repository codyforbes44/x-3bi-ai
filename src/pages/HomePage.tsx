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
import { NeuralButton } from "@/components/future/NeuralButton";
import { GestureZone } from "@/components/future/GestureZone";
import { AmbientParticles } from "@/components/future/AmbientParticles";
import { VoiceVisualizer } from "@/components/future/VoiceVisualizer";
import { usePredictiveUI } from "@/hooks/usePredictiveUI";
import { useState } from "react";
import { Sparkles, Zap, Brain, Users } from "lucide-react";

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

        {/* 2035 Neural Hero Section */}
        <GestureZone
          onSwipeUp={() => handleNavigate('/dashboard', 'swipe_dashboard')}
          onSwipeLeft={() => handleNavigate('/ai-chat', 'swipe_ai_chat')}
          onSwipeRight={() => handleNavigate('/grok-chat', 'swipe_grok')}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          
          <div className="relative z-10 text-center space-y-12 max-w-6xl mx-auto">
            {/* Neural network hero - replaces text header */}
            <NeuralHero />
            
            {/* Neural Button CTAs with predictive highlighting */}
            <div className="flex gap-8 justify-center flex-wrap">
              <NeuralButton
                icon={<Sparkles className="w-10 h-10" />}
                onClick={() => handleNavigate('/ai-chat', 'click_ai_chat')}
                variant="primary"
                predictive={predictions.some(p => p.action.includes('/ai-chat'))}
              />
              <NeuralButton
                icon={<Brain className="w-10 h-10" />}
                onClick={() => handleNavigate('/grok-chat', 'click_grok')}
                variant="primary"
                predictive={predictions.some(p => p.action.includes('/grok'))}
              />
              <NeuralButton
                icon={<Zap className="w-10 h-10" />}
                onClick={() => handleNavigate('/dashboard', 'click_dashboard')}
                variant="secondary"
                predictive={predictions.some(p => p.action.includes('/dashboard'))}
              />
              <NeuralButton
                icon={<Users className="w-10 h-10" />}
                onClick={() => handleNavigate('/team-collaboration', 'click_team')}
                variant="ghost"
              />
            </div>

            {/* Floating stats with particle effects */}
            <div className="flex gap-16 justify-center text-center pt-12">
              <div className="relative group">
                <div className="text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                  24
                </div>
                <Sparkles className="w-8 h-8 mx-auto mt-3 text-primary/70 group-hover:text-primary transition-colors" />
                <div className="absolute -inset-2 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative group">
                <div className="text-6xl font-bold bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent">
                  12
                </div>
                <Brain className="w-8 h-8 mx-auto mt-3 text-accent/70 group-hover:text-accent transition-colors" />
                <div className="absolute -inset-2 bg-accent/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative group">
                <div className="text-6xl font-bold bg-gradient-to-br from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ∞
                </div>
                <Zap className="w-8 h-8 mx-auto mt-3 text-purple-500/70 group-hover:text-purple-500 transition-colors" />
                <div className="absolute -inset-2 bg-purple-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Gesture hint overlay */}
            <div className="pt-8 text-xs text-muted-foreground/50 space-y-1">
              <p>Swipe ↑ Dashboard • ← AI Chat • → Grok</p>
            </div>
          </div>
        </GestureZone>

        {/* Voice Command Interface */}
        <VoiceVisualizer
          isListening={voiceEnabled}
          transcript={transcript}
          onToggle={() => setVoiceEnabled(!voiceEnabled)}
        />
      </PageLayout>
    </>
  );
};

export default HomePage;
