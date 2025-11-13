import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { IconSidebar } from "@/components/navigation/IconSidebar";
import { DashboardTopBar } from "./DashboardTopBar";
import { DashboardFeatureHeader } from "./DashboardFeatureHeader";

interface DashboardLayoutProps {
  activeTab: string;
  isMobile: boolean;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

/**
 * Dashboard layout wrapper
 * Provides sidebar, top bar, and main content area
 */
export const DashboardLayout = ({ 
  activeTab, 
  isMobile, 
  onTabChange, 
  children 
}: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen w-full flex bg-background">
        <IconSidebar />

        <SidebarInset className="flex-1 min-w-0">
          <div className="h-full">
            <DashboardTopBar 
              activeTab={activeTab}
              isMobile={isMobile}
              onOverviewClick={() => onTabChange("overview")}
            />

            {/* Main Content */}
            <div className="px-4 md:px-6 py-6 md:py-8 max-w-7xl mx-auto">
              {activeTab !== "overview" && (
                <DashboardFeatureHeader activeTab={activeTab} />
              )}
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
