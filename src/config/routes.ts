// Centralized route configuration with comprehensive navigation structure
export const ROUTES = {
  // Core
  HOME: '/',
  DASHBOARD: '/dashboard',
  AUTH: '/auth',
  PROFILE: '/profile',
  
  // AI Tools & Features
  FREE_AI_TOOLS: '/free-ai-tools',
  MEMORY: '/memory',
  ANALYTICS: '/analytics',
  
  // Business
  PRICING: '/pricing',
  ENTERPRISE: '/enterprise',
  
  // Learning & Resources
  LEARN: '/learn',
  TUTORIALS: '/tutorials',
  DOCUMENTATION: '/documentation',
  API_ACCESS: '/api-access',
  API_DEMOS: '/api-demos',
  
  // Community & Company
  COMMUNITY: '/community',
  MISSION: '/mission',
  TEAM: '/team',
  IMPACT: '/impact',
  PARTNERS: '/partners',
  LAUNCHED: '/launched',
  
  // Support
  CONTACT: '/contact',
  NEWSLETTER: '/newsletter',
  
  // Platform Features
  WORKSPACES: '/workspaces',
  INTEGRATIONS: '/integrations',
  INTEGRATIONS_HUB: '/integrations-hub',
  
  // Account & Settings
  SECURITY: '/security',
  REFERRALS: '/referrals',
  INSTALL: '/install',
  API_KEYS: '/api-keys',
} as const;

export const TUTORIAL_ROUTES = {
  AI_CHAT: '/tutorials/ai-chat',
  CODE_GENERATION: '/tutorials/code-generation',
  IMAGE_GENERATION: '/tutorials/image-generation',
  VOICE_AI: '/tutorials/voice-ai',
  SYSTEM_ARCHITECTURE: '/tutorials/system-architecture',
} as const;

// Main Header Navigation (visible to all users)
export const MAIN_NAVIGATION = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { name: 'AI Tools', href: ROUTES.FREE_AI_TOOLS, icon: 'Sparkles' },
  { name: 'Learn', href: ROUTES.LEARN, icon: 'BookOpen' },
  { name: 'Docs', href: ROUTES.DOCUMENTATION, icon: 'FileText' },
  { name: 'Pricing', href: ROUTES.PRICING, icon: 'DollarSign' },
  { name: 'Enterprise', href: ROUTES.ENTERPRISE, icon: 'Building2' },
  { name: 'Community', href: ROUTES.COMMUNITY, icon: 'Users' },
] as const;

// Dashboard Sidebar Navigation (for authenticated users in dashboard)
export const DASHBOARD_NAV_GROUPS = [
  {
    title: 'AI Features',
    items: [
      { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
      { name: 'AI Tools', href: ROUTES.FREE_AI_TOOLS, icon: 'Sparkles' },
      { name: 'Memory', href: ROUTES.MEMORY, icon: 'Brain' },
      { name: 'Analytics', href: ROUTES.ANALYTICS, icon: 'BarChart3' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { name: 'Workspaces', href: ROUTES.WORKSPACES, icon: 'FolderKanban' },
      { name: 'Integrations', href: ROUTES.INTEGRATIONS_HUB, icon: 'Plug' },
      { name: 'API Access', href: ROUTES.API_ACCESS, icon: 'Code2' },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Profile', href: ROUTES.PROFILE, icon: 'User' },
      { name: 'Security', href: ROUTES.SECURITY, icon: 'Shield' },
      { name: 'Referrals', href: ROUTES.REFERRALS, icon: 'Gift' },
      { name: 'Install App', href: ROUTES.INSTALL, icon: 'Download' },
    ],
  },
] as const;

// Footer Navigation Groups
export const FOOTER_NAV_GROUPS = [
  {
    title: 'Product',
    items: [
      { name: 'Dashboard', href: ROUTES.DASHBOARD },
      { name: 'AI Tools', href: ROUTES.FREE_AI_TOOLS },
      { name: 'Pricing', href: ROUTES.PRICING },
      { name: 'Enterprise', href: ROUTES.ENTERPRISE },
      { name: 'Integrations', href: ROUTES.INTEGRATIONS_HUB },
    ],
  },
  {
    title: 'Resources',
    items: [
      { name: 'Learn', href: ROUTES.LEARN },
      { name: 'Tutorials', href: ROUTES.TUTORIALS },
      { name: 'Documentation', href: ROUTES.DOCUMENTATION },
      { name: 'API Access', href: ROUTES.API_ACCESS },
      { name: 'API Demos', href: ROUTES.API_DEMOS },
      { name: 'Community', href: ROUTES.COMMUNITY },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'Mission', href: ROUTES.MISSION },
      { name: 'Team', href: ROUTES.TEAM },
      { name: 'Impact', href: ROUTES.IMPACT },
      { name: 'Partners', href: ROUTES.PARTNERS },
      { name: 'Launched', href: ROUTES.LAUNCHED },
    ],
  },
  {
    title: 'Support',
    items: [
      { name: 'Contact', href: ROUTES.CONTACT },
      { name: 'Newsletter', href: ROUTES.NEWSLETTER },
    ],
  },
] as const;

// Mobile Quick Actions (bottom navigation for mobile)
export const MOBILE_QUICK_NAV = [
  { name: 'Home', href: ROUTES.HOME, icon: 'Home' },
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { name: 'AI Tools', href: ROUTES.FREE_AI_TOOLS, icon: 'Sparkles' },
  { name: 'Learn', href: ROUTES.LEARN, icon: 'BookOpen' },
  { name: 'Profile', href: ROUTES.PROFILE, icon: 'User' },
] as const;
