import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnterpriseSection from "@/components/dashboard/EnterpriseSection";
import AISection from "@/components/dashboard/AISection";
import AIToolsSection from "@/components/dashboard/AIToolsSection";
import UtilitiesSection from "@/components/dashboard/UtilitiesSection";
import { getAllFeatures } from "@/components/dashboard/FeatureCategories";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const features = getAllFeatures();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-14 md:pt-16">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-8">
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

          {/* Main Content with Sidebar */}
          <div className="flex gap-4 md:gap-6 mt-4 md:mt-6">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block w-56 xl:w-64 space-y-2 flex-shrink-0">
              <div className="bg-card rounded-lg border p-3">
                <nav className="space-y-1">
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => setActiveTab(feature.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md text-left transition-colors min-h-[44px] ${
                        activeTab === feature.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <feature.icon className={`w-4 h-4 flex-shrink-0 ${activeTab === feature.id ? 'text-primary-foreground' : feature.color}`} />
                      <span>{feature.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;