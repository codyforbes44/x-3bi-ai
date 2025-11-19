import { LucideIcon } from "lucide-react";
import { getFeatureRoute } from "@/utils/routeMapper";
import { 
  Home, 
  MessageSquare, 
  Image, 
  LayoutDashboard, 
  Settings,
  Sparkles,
  Brain,
  Zap
} from "lucide-react";

export type NavCategory = 'utilities' | 'ai-tools' | 'workspace' | 'account' | 'advanced-ai';

export interface NavItem {
  icon: LucideIcon;
  route: string;
  label: string;
  category: NavCategory;
  featureId: string | null;
  badge?: string | number;
}

/**
 * Primary navigation items for mobile bottom nav
 * Order determines visual layout (left to right)
 */
export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { 
    icon: Home, 
    route: '/', 
    label: 'Home', 
    category: 'utilities', 
    featureId: null 
  },
  { 
    icon: MessageSquare, 
    route: getFeatureRoute('chat'), 
    label: 'Chat', 
    category: 'ai-tools', 
    featureId: 'chat' 
  },
  { 
    icon: Sparkles, 
    route: getFeatureRoute('image'), 
    label: 'Generate', 
    category: 'ai-tools', 
    featureId: 'image' 
  },
  { 
    icon: LayoutDashboard, 
    route: '/dashboard', 
    label: 'Dashboard', 
    category: 'workspace', 
    featureId: null 
  },
  { 
    icon: Settings, 
    route: '/settings', 
    label: 'Settings', 
    category: 'account', 
    featureId: null 
  },
];

/**
 * Additional navigation items accessible via menu/drawer
 */
export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { 
    icon: Brain, 
    route: '/grok', 
    label: 'Grok AI', 
    category: 'advanced-ai', 
    featureId: null 
  },
  { 
    icon: Zap, 
    route: getFeatureRoute('claude'), 
    label: 'Claude', 
    category: 'advanced-ai', 
    featureId: 'claude' 
  },
  { 
    icon: Image, 
    route: getFeatureRoute('vision'), 
    label: 'Vision AI', 
    category: 'advanced-ai', 
    featureId: 'vision' 
  },
];

/**
 * Get category color for visual indicators
 */
export function getCategoryColor(category: NavCategory): string {
  const colors: Record<NavCategory, string> = {
    'utilities': 'bg-orange-500',
    'ai-tools': 'bg-blue-500',
    'workspace': 'bg-purple-500',
    'account': 'bg-green-500',
    'advanced-ai': 'bg-pink-500',
  };
  return colors[category] || 'bg-gray-500';
}
