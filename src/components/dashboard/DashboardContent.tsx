import { Tabs } from "@/components/ui/tabs";
import EnterpriseSection from "./EnterpriseSection";
import AISection from "./AISection";
import AIToolsSection from "./AIToolsSection";
import UtilitiesSection from "./UtilitiesSection";

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardContent = ({ activeTab, onTabChange }: DashboardContentProps) => {
  return (
    <div className="w-full animate-fade-in">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <EnterpriseSection />
        <AISection />
        <AIToolsSection />
        <UtilitiesSection />
      </Tabs>
    </div>
  );
};
