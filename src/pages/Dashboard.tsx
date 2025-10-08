import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { DashboardMobileMenu } from "@/components/dashboard/DashboardMobileMenu";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardBreadcrumbs } from "@/components/dashboard/DashboardBreadcrumbs";
import { DashboardFeatureHeader } from "@/components/dashboard/DashboardFeatureHeader";
import { QuickAccess } from "@/components/dashboard/QuickAccess";
import { getAllFeatures } from "@/components/dashboard/FeatureCategories";
import { useIsMobile } from "@/hooks/use-mobile";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("grok-chat");
  const isMobile = useIsMobile();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
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
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <Header />
        
        <div className="flex-1 flex w-full pt-14 md:pt-16">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <SidebarInset className="flex-1 min-w-0">
            <div className="h-full">
              {/* Top Bar - Sticky */}
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
                <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <SidebarTrigger className="shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground md:hidden animate-pulse">TAP HERE</span>
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
              <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-7xl">
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
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
