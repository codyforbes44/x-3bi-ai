import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardMobileMenu } from "@/components/dashboard/DashboardMobileMenu";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DashboardFeatureHeader } from "@/components/dashboard/DashboardFeatureHeader";
import { QuickAccess } from "@/components/dashboard/QuickAccess";
import { getAllFeatures } from "@/components/dashboard/FeatureCategories";
import { useIsMobile } from "@/hooks/use-mobile";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ProductTour } from "@/components/onboarding/ProductTour";
import { RateLimitIndicator } from "@/components/usage/RateLimitIndicator";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useAISidebarContext } from "@/contexts/AISidebarContext";
import { SEO_CONFIG, BREADCRUMB_CONFIG } from "@/config/seo-config";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [runTour, setRunTour] = useState(false);
  const isMobile = useIsMobile();
  const { hasCompletedTour } = useOnboarding();
  const { setCurrentFeature } = useAISidebarContext();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Update AI sidebar context when tab changes
  useEffect(() => {
    setCurrentFeature(activeTab);
  }, [activeTab, setCurrentFeature]);
  
  // Start tour for first-time users
  useEffect(() => {
    if (!hasCompletedTour && !isMobile) {
      const timer = setTimeout(() => setRunTour(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedTour, isMobile]);
  
  // Listen for feature switch events from keyboard shortcuts
  useEffect(() => {
    const handleSwitchFeature = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveTab(customEvent.detail);
    };
    
    window.addEventListener("switchFeature", handleSwitchFeature);
    return () => window.removeEventListener("switchFeature", handleSwitchFeature);
  }, []);

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
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="min-h-screen w-full flex bg-background">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <SidebarInset className="flex-1 min-w-0">
            <div className="h-full">
              {/* Top Bar - Sticky */}
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
                <div className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <SidebarTrigger className="shrink-0 sidebar-trigger" />
                      </div>
                      {!isMobile && <DashboardBreadcrumbs activeTab={activeTab} />}
                    </div>
                    {!isMobile && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("overview")}
                        className="shrink-0"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Overview
                      </Button>
                    )}
                  </div>
                  
                  {/* Mobile Breadcrumbs */}
                  {isMobile && activeTab !== "overview" && (
                    <div className="mt-3">
                      <DashboardBreadcrumbs activeTab={activeTab} />
                    </div>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="px-4 md:px-6 py-6 md:py-8 max-w-7xl mx-auto">
                {activeTab !== "overview" && (
                  <DashboardFeatureHeader activeTab={activeTab} />
                )}

                {activeTab === "overview" ? (
                  <QuickAccess onFeatureSelect={setActiveTab} />
                ) : (
                  <DashboardContent 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                  />
                )}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
