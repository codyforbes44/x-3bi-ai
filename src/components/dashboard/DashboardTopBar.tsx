import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";

interface DashboardTopBarProps {
  activeTab: string;
  isMobile: boolean;
  onOverviewClick: () => void;
}

/**
 * Dashboard top bar with navigation and breadcrumbs
 * Handles mobile and desktop layouts
 */
export const DashboardTopBar = ({ activeTab, isMobile, onOverviewClick }: DashboardTopBarProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="shrink-0 sidebar-trigger" />
            </div>
            {!isMobile && <DashboardBreadcrumbs activeTab={activeTab} />}
          </div>
          {!isMobile && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOverviewClick}
              className="shrink-0"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Overview
            </Button>
          )}
        </div>
        
        {/* Mobile Breadcrumbs */}
        {isMobile && activeTab !== "overview" && (
          <div className="mt-3">
            <DashboardBreadcrumbs activeTab={activeTab} />
          </div>
        )}
      </div>
    </div>
  );
};
