import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && <DashboardSidebar />}

        <div className="flex-1 flex flex-col w-full">
          {/* Header with sidebar trigger and controls */}
          <header className="sticky top-0 z-40 h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              {!isMobile && <SidebarTrigger />}
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-auto pb-20 md:pb-4">
            <Outlet />
          </main>

          {/* Mobile bottom navigation */}
          {isMobile && <MobileBottomNav />}
        </div>
      </div>
    </SidebarProvider>
  );
}
