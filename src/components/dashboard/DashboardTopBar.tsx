import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import { NeonSearch } from "@/components/ui/neon-search";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="sticky top-0 z-10 glass-dark border-b border-border/50">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-4">
          <SidebarTrigger className="shrink-0 sidebar-trigger" />
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <NeonSearch
              neon={true}
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
        {!isMobile && activeTab !== "overview" && (
          <div className="mt-3">
            <DashboardBreadcrumbs activeTab={activeTab} />
          </div>
        )}
      </div>
    </div>
  );
};
