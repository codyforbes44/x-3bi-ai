import { Suspense, useState } from "react";
import { SEO } from "@/components/SEO";
import { ProductTour } from "@/components/onboarding/ProductTour";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { DashboardVoiceIndicator } from "@/components/dashboard/DashboardVoiceIndicator";
import { VoiceCommandList } from "@/components/voice/VoiceCommandList";
import { useDashboard } from "@/hooks/useDashboard";
import { useDashboardVoiceControl } from "@/hooks/useDashboardVoiceControl";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { SEO_CONFIG, BREADCRUMB_CONFIG } from "@/config/seo-config";
import { useToast } from "@/hooks/use-toast";

/**
 * Main Dashboard Page
 * Unified AI platform dashboard with 27+ features
 */
const Dashboard = () => {
  const { activeTab, setActiveTab, runTour, setRunTour, isMobile } = useDashboard();
  const { toast } = useToast();
  const [showCommandList, setShowCommandList] = useState(false);

  // Dashboard voice control integration
  const { commands } = useDashboardVoiceControl({
    activeTab,
    onTabChange: setActiveTab,
    enabled: true,
  });

  const {
    isListening,
    isSupported,
    transcript,
    error,
    isAwaitingCommand,
    startListening,
    stopListening,
  } = useVoiceRecognition({
    commands,
    requireWakeWord: true,
    wakeWords: ['hey 3bi', 'hey three bi'],
  });

  const handleVoiceToggle = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Voice commands are not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      <SEO
        title="AI Dashboard - 27 Features & Tools"
        description="Access Grok AI, Claude 4, GPT-5, and 27+ AI features. Multi-modal memory, workflow automation, analytics, and enterprise AI tools in one platform."
        keywords={['AI dashboard', 'Grok chat', 'Claude 4', 'GPT-5', 'AI tools', 'enterprise AI', 'workflow automation', 'AI analytics']}
        ogImage={SEO_CONFIG.ogImages.dashboard}
        noIndex={true}
        breadcrumbs={[
          { name: BREADCRUMB_CONFIG.home.label, url: BREADCRUMB_CONFIG.home.url },
          { name: BREADCRUMB_CONFIG.dashboard.label, url: BREADCRUMB_CONFIG.dashboard.url }
        ]}
      />
      
      <ProductTour runTour={runTour} onComplete={() => setRunTour(false)} />
      
      <VoiceCommandList
        isOpen={showCommandList}
        onClose={() => setShowCommandList(false)}
        requireWakeWord={true}
      />

      <DashboardVoiceIndicator
        isListening={isListening}
        isAwaitingCommand={isAwaitingCommand}
        transcript={transcript}
        error={error}
        onToggle={handleVoiceToggle}
      />
      
      <DashboardLayout 
        activeTab={activeTab}
        isMobile={isMobile}
        onTabChange={setActiveTab}
      >
        <Suspense fallback={<PageSkeleton variant="card-grid" count={6} />}>
          {activeTab === "overview" ? (
            <DashboardOverview onFeatureSelect={setActiveTab} />
          ) : (
            <DashboardContent 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          )}
        </Suspense>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
