import { ReactNode } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { IconSidebar } from "@/components/navigation/IconSidebar";
import { DashboardTopBar } from "./DashboardTopBar";
import { DashboardFeatureHeader } from "./DashboardFeatureHeader";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  activeTab: string;
  isMobile: boolean;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

/**
 * Dashboard layout wrapper
 * Provides sidebar, top bar, and main content area
 * Mobile-first responsive design with collapsible sidebar
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
        {/* Icon Sidebar - Hidden on mobile by default */}
        <IconSidebar />

        <SidebarInset className="flex-1 min-w-0">
          <div className="h-full flex flex-col">
            {/* Top Bar with Sidebar Trigger */}
            <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 sm:px-4 h-14 sm:h-16">
              <SidebarTrigger className="touch-target" />
              <DashboardTopBar 
                activeTab={activeTab}
                isMobile={isMobile}
                onOverviewClick={() => onTabChange("overview")}
              />
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto">
              <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl mx-auto">
                {activeTab !== "overview" && (
                  <DashboardFeatureHeader activeTab={activeTab} />
                )}
                {children}
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
