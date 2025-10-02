import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnterpriseSection from "@/components/dashboard/EnterpriseSection";
import AISection from "@/components/dashboard/AISection";
import AIToolsSection from "@/components/dashboard/AIToolsSection";
import UtilitiesSection from "@/components/dashboard/UtilitiesSection";
import { getAllFeatures } from "@/components/dashboard/FeatureCategories";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("advanced");
  const features = getAllFeatures();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <Header />
        
        <div className="flex-1 flex w-full pt-14 md:pt-16">
          {/* Sidebar - Hidden on mobile */}
          {!isMobile && (
            <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          )}

          {/* Main Content */}
          <main className="flex-1 w-full overflow-auto">
            <div className="container mx-auto px-3 md:px-4 py-3 md:py-8">
              {/* Sidebar Trigger - Desktop only */}
              {!isMobile && (
                <div className="mb-4">
                  <SidebarTrigger />
                </div>
              )}

              {/* Header with stats */}
              <DashboardHeader />

              {/* Mobile Navigation - Show at top on mobile */}
              {isMobile && (
                <div className="w-full mb-4 mt-4">
                  <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-card">
                    <div className="flex space-x-2 p-2">
                      {features.map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() => setActiveTab(feature.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-md whitespace-nowrap transition-colors min-h-[44px] ${
                            activeTab === feature.id 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <feature.icon className={`w-4 h-4 flex-shrink-0 ${activeTab === feature.id ? 'text-primary-foreground' : feature.color}`} />
                          <span className="font-medium">{feature.title.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {/* Main Content Area */}
              <div className="w-full">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {/* Enterprise Features */}
                  <EnterpriseSection />

                  {/* Advanced AI Features */}
                  <AISection />

                  {/* AI Tools */}
                  <AIToolsSection />

                  {/* Utilities */}
                  <UtilitiesSection />
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;