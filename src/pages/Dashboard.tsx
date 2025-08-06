import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnterpriseSection from "@/components/dashboard/EnterpriseSection";
import AISection from "@/components/dashboard/AISection";
import AIToolsSection from "@/components/dashboard/AIToolsSection";
import UtilitiesSection from "@/components/dashboard/UtilitiesSection";
import { getAllFeatures } from "@/components/dashboard/FeatureCategories";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const features = getAllFeatures();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with stats */}
        <DashboardHeader />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-15 text-xs">
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-1 text-xs">
                <feature.icon className={`w-3 h-3 ${feature.color}`} />
                <span className="hidden lg:inline text-xs">{feature.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

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
  );
};

export default Dashboard;