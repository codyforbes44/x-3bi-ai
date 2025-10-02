import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DashboardMobileMenu } from "@/components/dashboard/DashboardMobileMenu";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { getAllFeatures } from "@/components/dashboard/FeatureCategories";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("advanced");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const features = getAllFeatures();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <Header />
        
        <div className="flex-1 flex w-full pt-14 md:pt-16">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          )}

          {/* Main Content Area */}
          <main className="flex-1 w-full overflow-auto">
            <div className="container mx-auto px-3 md:px-4 py-3 md:py-8 max-w-7xl">
              {/* Sidebar Toggle - Desktop Only */}
              {!isMobile && (
                <div className="mb-6">
                  <SidebarTrigger />
                </div>
              )}

              {/* Dashboard Header with Stats */}
              <DashboardHeader />

              {/* Mobile Feature Menu */}
              {isMobile && (
                <div className="my-6">
                  <DashboardMobileMenu
                    features={features}
                    activeTab={activeTab}
                    open={mobileMenuOpen}
                    onOpenChange={setMobileMenuOpen}
                    onTabSelect={setActiveTab}
                  />
                </div>
              )}

              {/* Feature Content */}
              <DashboardContent 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
