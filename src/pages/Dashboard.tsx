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
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Header with stats */}
          <DashboardHeader />

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
            {/* Mobile: Horizontal scroll tabs, Desktop: Grid layout */}
            {isMobile ? (
              <ScrollArea className="w-full whitespace-nowrap">
                <TabsList className="inline-flex h-12 items-center justify-start space-x-1 bg-muted p-1 min-w-max">
                  {features.map((feature) => (
                    <TabsTrigger 
                      key={feature.id} 
                      value={feature.id} 
                      className="flex items-center gap-2 text-sm px-4 py-2 whitespace-nowrap"
                    >
                      <feature.icon className={`w-4 h-4 ${feature.color}`} />
                      <span>{feature.title.split(' ')[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
            ) : (
              <TabsList className="grid w-full grid-cols-15 text-xs">
                {features.map((feature) => (
                  <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-1 text-xs">
                    <feature.icon className={`w-3 h-3 ${feature.color}`} />
                    <span className="hidden lg:inline text-xs">{feature.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            )}

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
  );
};

export default Dashboard;