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
  PREDICTIVE_AI: '/predictive-ai',
  
  // Phase 7: Platform Domination
  REALTIME_ANALYTICS: '/analytics/realtime',
  PERMISSIONS: '/enterprise/permissions',
  MARKETPLACE: '/marketplace',
  SECURITY_DASHBOARD: '/security-dashboard',
  WEBHOOKS: '/webhooks',
  WHITE_LABEL: '/enterprise/white-label',
  
  // Account & Settings
  SECURITY: '/security',
  REFERRALS: '/referrals',
  INSTALL: '/install',
  API_KEYS: '/api-keys',
  GROK_CHAT: '/grok-chat',
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
  { name: 'Grok Chat', href: ROUTES.GROK_CHAT, icon: 'MessageSquare' },
  { name: 'Learn', href: ROUTES.LEARN, icon: 'BookOpen' },
  { name: 'Tutorials', href: ROUTES.TUTORIALS, icon: 'GraduationCap' },
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
      { name: 'Grok Chat', href: ROUTES.GROK_CHAT, icon: 'MessageSquare' },
      { name: 'Memory', href: ROUTES.MEMORY, icon: 'Brain' },
      { name: 'Analytics', href: ROUTES.ANALYTICS, icon: 'BarChart3' },
      { name: 'Realtime Analytics', href: ROUTES.REALTIME_ANALYTICS, icon: 'Activity' },
      { name: 'Predictive AI', href: '/predictive-ai', icon: 'TrendingUp' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { name: 'Workspaces', href: ROUTES.WORKSPACES, icon: 'FolderKanban' },
      { name: 'Integrations', href: ROUTES.INTEGRATIONS_HUB, icon: 'Plug' },
      { name: 'Marketplace', href: ROUTES.MARKETPLACE, icon: 'Store' },
      { name: 'API Access', href: ROUTES.API_ACCESS, icon: 'Code2' },
      { name: 'API Keys', href: ROUTES.API_KEYS, icon: 'Key' },
      { name: 'Webhooks', href: ROUTES.WEBHOOKS, icon: 'Webhook' },
    ],
  },
  {
    title: 'Enterprise',
    items: [
      { name: 'Permissions', href: ROUTES.PERMISSIONS, icon: 'UserCog' },
      { name: 'Security Dashboard', href: ROUTES.SECURITY_DASHBOARD, icon: 'ShieldCheck' },
      { name: 'White Label', href: ROUTES.WHITE_LABEL, icon: 'Palette' },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Profile', href: ROUTES.PROFILE, icon: 'User' },
      { name: 'Security Settings', href: ROUTES.SECURITY, icon: 'Shield' },
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
      { name: 'Grok Chat', href: ROUTES.GROK_CHAT },
      { name: 'Memory', href: ROUTES.MEMORY },
      { name: 'Analytics', href: ROUTES.ANALYTICS },
      { name: 'Workspaces', href: ROUTES.WORKSPACES },
      { name: 'Pricing', href: ROUTES.PRICING },
      { name: 'Enterprise', href: ROUTES.ENTERPRISE },
    ],
  },
  {
    title: 'Platform',
    items: [
      { name: 'Integrations', href: ROUTES.INTEGRATIONS_HUB },
      { name: 'Marketplace', href: ROUTES.MARKETPLACE },
      { name: 'API Access', href: ROUTES.API_ACCESS },
      { name: 'API Demos', href: ROUTES.API_DEMOS },
      { name: 'Security', href: ROUTES.SECURITY_DASHBOARD },
      { name: 'Install App', href: ROUTES.INSTALL },
    ],
  },
  {
    title: 'Resources',
    items: [
      { name: 'Learn', href: ROUTES.LEARN },
      { name: 'Tutorials', href: ROUTES.TUTORIALS },
      { name: 'Documentation', href: ROUTES.DOCUMENTATION },
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
  { name: 'Grok', href: ROUTES.GROK_CHAT, icon: 'MessageSquare' },
  { name: 'Learn', href: ROUTES.LEARN, icon: 'BookOpen' },
  { name: 'Profile', href: ROUTES.PROFILE, icon: 'User' },
] as const;
