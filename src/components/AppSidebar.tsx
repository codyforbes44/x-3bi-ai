import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getAllFeatures } from "@/components/dashboard/FeatureCategories";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { open } = useSidebar();
  const features = getAllFeatures();
  
  // Group features by category
  const categories = {
    enterprise: features.filter(f => f.category === 'enterprise'),
    'advanced-ai': features.filter(f => f.category === 'advanced-ai'),
    'ai-tools': features.filter(f => f.category === 'ai-tools'),
    utilities: features.filter(f => f.category === 'utilities'),
  };

  const categoryLabels = {
    enterprise: 'Enterprise',
    'advanced-ai': 'Advanced AI',
    'ai-tools': 'AI Tools',
    utilities: 'Utilities',
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        {Object.entries(categories).map(([categoryKey, categoryFeatures]) => (
          <SidebarGroup key={categoryKey}>
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider">
              {categoryLabels[categoryKey as keyof typeof categoryLabels]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {categoryFeatures.map((feature) => {
                  const isActive = activeTab === feature.id;
                  return (
                    <SidebarMenuItem key={feature.id}>
                      <SidebarMenuButton
                        onClick={() => onTabChange(feature.id)}
                        isActive={isActive}
                        tooltip={feature.title}
                      >
                        <feature.icon className={`flex-shrink-0 ${isActive ? 'text-primary' : feature.color}`} />
                        <span className="truncate">{feature.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
