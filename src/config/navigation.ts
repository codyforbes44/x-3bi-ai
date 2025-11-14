import { 
  Home, LayoutDashboard, BookOpen, Users, DollarSign,
  Sparkles, Palette, Code2, Mic, Image, Search, Brain,
  FileText, GraduationCap, Book, Key, Rocket, Grid2x2,
  User, Settings, LogOut, Languages, Moon, Sun,
  Mail, Shield, FileCheck, HelpCircle, MessageCircle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
  external?: boolean;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export interface NavDropdown {
  name: string;
  icon: LucideIcon;
  groups: NavGroup[];
}

export type NavigationItem = NavItem | NavDropdown;

// Helper to check if item is dropdown
export function isNavDropdown(item: NavigationItem): item is NavDropdown {
  return 'groups' in item;
}

// Primary Header Navigation
export const PRIMARY_NAV: NavigationItem[] = [
  {
    name: 'nav.home',
    href: '/',
    icon: Home,
  },
  {
    name: 'nav.platform',
    icon: Sparkles,
    groups: [
      {
        title: 'nav.aiFeatures',
        items: [
          {
            name: 'nav.aiChat',
            href: '/ai-chat',
            icon: Brain,
            description: 'nav.aiChatDesc',
          },
          {
            name: 'nav.codeGen',
            href: '/ai-code',
            icon: Code2,
            description: 'nav.codeGenDesc',
          },
          {
            name: 'nav.imageGen',
            href: '/ai-image',
            icon: Image,
            description: 'nav.imageGenDesc',
          },
          {
            name: 'nav.voiceSynth',
            href: '/premium-voice',
            icon: Mic,
            description: 'nav.voiceSynthDesc',
          },
        ],
      },
      {
        title: 'nav.features',
        items: [
          {
            name: 'nav.pixelBattle',
            href: '/pixel-battle',
            icon: Grid2x2,
            description: 'nav.pixelBattleDesc',
            badge: 'New',
          },
          {
            name: 'nav.dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
            description: 'nav.dashboardDesc',
          },
        ],
      },
    ],
  },
  {
    name: 'nav.resources',
    icon: Book,
    groups: [
      {
        items: [
          {
            name: 'nav.learn',
            href: '/learn',
            icon: GraduationCap,
            description: 'nav.learnDesc',
          },
          {
            name: 'nav.apiAccess',
            href: '/api-access',
            icon: Key,
            description: 'nav.apiAccessDesc',
          },
          {
            name: 'nav.apiDemos',
            href: '/api-demos',
            icon: Rocket,
            description: 'nav.apiDemosDesc',
          },
        ],
      },
    ],
  },
  {
    name: 'nav.pricing',
    href: '/pricing',
    icon: DollarSign,
  },
];

// User Menu Navigation (when authenticated)
export const USER_MENU_NAV: NavItem[] = [
  {
    name: 'nav.dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'nav.profile',
    href: '/profile',
    icon: User,
  },
  {
    name: 'nav.settings',
    href: '/settings',
    icon: Settings,
  },
];

// Footer Navigation Groups
export const FOOTER_NAV_GROUPS: NavGroup[] = [
  {
    title: 'footer.product',
    items: [
      {
        name: 'footer.features',
        href: '/dashboard',
        icon: Sparkles,
      },
      {
        name: 'footer.pricing',
        href: '/pricing',
        icon: DollarSign,
      },
      {
        name: 'footer.apiAccess',
        href: '/api-access',
        icon: Key,
      },
    ],
  },
  {
    title: 'footer.platform',
    items: [
      {
        name: 'footer.aiChat',
        href: '/ai-chat',
        icon: Brain,
      },
      {
        name: 'footer.imageGen',
        href: '/ai-image',
        icon: Image,
      },
      {
        name: 'footer.codeGen',
        href: '/ai-code',
        icon: Code2,
      },
    ],
  },
  {
    title: 'footer.resources',
    items: [
      {
        name: 'footer.learn',
        href: '/learn',
        icon: GraduationCap,
      },
      {
        name: 'footer.apiDemos',
        href: '/api-demos',
        icon: Rocket,
      },
      {
        name: 'footer.community',
        href: '/community',
        icon: Users,
      },
    ],
  },
  {
    title: 'footer.company',
    items: [
      {
        name: 'footer.launched',
        href: '/launched',
        icon: Rocket,
      },
      {
        name: 'footer.contact',
        href: '/contact',
        icon: Mail,
      },
    ],
  },
  {
    title: 'footer.legal',
    items: [
      {
        name: 'footer.privacy',
        href: '/privacy',
        icon: Shield,
      },
      {
        name: 'footer.terms',
        href: '/terms',
        icon: FileCheck,
      },
    ],
  },
  {
    title: 'footer.support',
    items: [
      {
        name: 'footer.help',
        href: '/help',
        icon: HelpCircle,
      },
      {
        name: 'footer.community',
        href: '/community',
        icon: MessageCircle,
      },
    ],
  },
];
