import { useNavigate, useLocation } from "react-router-dom";
import { 
  Sparkles, MessageSquare, Image, Code, Mic, Video, 
  Brain, Zap, FileText, Calculator, Settings, User,
  LayoutDashboard, Users, Workflow, Shield, Key, Palette
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { CategoryDot } from "@/components/visual/CategoryDot";
import { LongPressTooltip } from "@/components/visual/LongPressTooltip";
import { AnimatedLogo } from "@/components/visual/AnimatedLogo";
import { cn } from "@/lib/utils";
import { getFeatureRoute, isRouteActive } from "@/utils/routeMapper";

const FEATURES = [
  { id: 'chat', icon: MessageSquare, route: getFeatureRoute('chat'), category: 'ai-tools' as const, label: 'Chat' },
  { id: 'image', icon: Image, route: getFeatureRoute('image'), category: 'ai-tools' as const, label: 'Image' },
  { id: 'code', icon: Code, route: getFeatureRoute('code'), category: 'ai-tools' as const, label: 'Code' },
  { id: 'voice', icon: Mic, route: getFeatureRoute('voice'), category: 'ai-tools' as const, label: 'Voice' },
  { id: 'video', icon: Video, route: getFeatureRoute('video'), category: 'advanced-ai' as const, label: 'Video' },
  { id: 'brain', icon: Brain, route: getFeatureRoute('grok'), category: 'advanced-ai' as const, label: 'Grok' },
  { id: 'enhance', icon: Zap, route: getFeatureRoute('enhance'), category: 'ai-tools' as const, label: 'Enhance' },
  { id: 'summary', icon: FileText, route: getFeatureRoute('summary'), category: 'utilities' as const, label: 'Summary' },
  { id: 'dashboard', icon: LayoutDashboard, route: '/dashboard', category: 'workspace' as const, label: 'Dashboard' },
  { id: 'workflows', icon: Workflow, route: '/workflow-automation', category: 'enterprise' as const, label: 'Workflows' },
  { id: 'team', icon: Users, route: '/team-collaboration', category: 'enterprise' as const, label: 'Team' },
  { id: 'security', icon: Shield, route: '/security-compliance', category: 'enterprise' as const, label: 'Security' },
  { id: 'settings', icon: Settings, route: '/settings', category: 'account' as const, label: 'Settings' },
  { id: 'profile', icon: User, route: '/profile', category: 'account' as const, label: 'Profile' },
];

export function IconSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route: string) => isRouteActive(location.pathname, location.search, route);

  return (
    <Sidebar className="w-20 border-r border-border/50">
      <SidebarContent className="py-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <LongPressTooltip content="Home" onClick={() => navigate('/')}>
            <AnimatedLogo size="md" />
          </LongPressTooltip>
        </div>

        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const active = isActive(feature.route);
              
              return (
                <SidebarMenuItem key={feature.id}>
                  <LongPressTooltip content={feature.label} onClick={() => navigate(feature.route)}>
                    <SidebarMenuButton
                      className={cn(
                        "w-14 h-14 mx-auto flex items-center justify-center rounded-xl relative transition-all",
                        active 
                          ? "bg-primary/20 text-primary shadow-lg shadow-primary/20" 
                          : "hover:bg-muted/50"
                      )}
                      aria-label={`${feature.label} - ${active ? 'Active' : 'Navigate to'}`}
                    >
                      <Icon className="w-6 h-6" aria-hidden="true" />
                      <CategoryDot 
                        category={feature.category} 
                        size="sm" 
                        className="absolute top-1 right-1"
                        aria-label={`Category: ${feature.category}`}
                      />
                    </SidebarMenuButton>
                  </LongPressTooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
