import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
import { Menu } from "lucide-react";

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

              {/* Mobile Menu Button */}
              {isMobile && (
                <div className="mt-4 mb-4">
                  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Menu className="w-5 h-5" />
                        <span>Browse Features</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] p-0">
                      <div className="py-6 px-4">
                        <h2 className="text-lg font-semibold mb-4">Dashboard Menu</h2>
                        <div className="space-y-6">
                          {/* Group by category */}
                          {['enterprise', 'advanced-ai', 'ai-tools', 'utilities'].map((category) => {
                            const categoryFeatures = features.filter(f => f.category === category);
                            const categoryLabels = {
                              enterprise: 'Enterprise',
                              'advanced-ai': 'Advanced AI',
                              'ai-tools': 'AI Tools',
                              utilities: 'Utilities',
                            };
                            
                            return (
                              <div key={category}>
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                  {categoryLabels[category as keyof typeof categoryLabels]}
                                </h3>
                                <div className="space-y-1">
                                  {categoryFeatures.map((feature) => (
                                    <button
                                      key={feature.id}
                                      onClick={() => {
                                        setActiveTab(feature.id);
                                        setMobileMenuOpen(false);
                                      }}
                                      className={`w-full flex items-center gap-3 px-3 py-3 text-sm rounded-lg text-left transition-colors ${
                                        activeTab === feature.id 
                                          ? 'bg-primary text-primary-foreground' 
                                          : 'text-foreground hover:bg-muted'
                                      }`}
                                    >
                                      <feature.icon className={`w-5 h-5 flex-shrink-0 ${activeTab === feature.id ? 'text-primary-foreground' : feature.color}`} />
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">{feature.title}</div>
                                        <div className="text-xs opacity-70 truncate">{feature.badge}</div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
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