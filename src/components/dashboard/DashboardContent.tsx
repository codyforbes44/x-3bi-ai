import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import EnterpriseSection from "./EnterpriseSection";
import AISection from "./AISection";
import AIToolsSection from "./AIToolsSection";
import UtilitiesSection from "./UtilitiesSection";

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardContent = ({ activeTab, onTabChange }: DashboardContentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [activeTab]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

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
