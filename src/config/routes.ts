// Centralized route configuration
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  AUTH: '/auth',
  PROFILE: '/profile',
  
  // Community & Info
  COMMUNITY: '/community',
  LEARN: '/learn',
  MISSION: '/mission',
  TEAM: '/team',
  IMPACT: '/impact',
  PARTNERS: '/partners',
  LAUNCHED: '/launched',
  
  // Business
  PRICING: '/pricing',
  ENTERPRISE: '/enterprise',
  
  // Support & Contact
  CONTACT: '/contact',
  ISSUES: '/issues',
  NEWSLETTER: '/newsletter',
  VOLUNTEER: '/volunteer',
  DONATE: '/donate',
  
  // Resources
  FREE_AI_TOOLS: '/free-ai-tools',
  TUTORIALS: '/tutorials',
  DOCUMENTATION: '/documentation',
  API_ACCESS: '/api-access',
  API_DEMOS: '/api-demos',
  
  // Workspaces
  WORKSPACES: '/workspaces',
  INTEGRATIONS: '/integrations',
} as const;

export const TUTORIAL_ROUTES = {
  AI_CHAT: '/tutorials/ai-chat',
  CODE_GENERATION: '/tutorials/code-generation',
  IMAGE_GENERATION: '/tutorials/image-generation',
  VOICE_AI: '/tutorials/voice-ai',
  SYSTEM_ARCHITECTURE: '/tutorials/system-architecture',
} as const;

// Navigation groups for Header
export const MAIN_NAVIGATION = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD },
  { name: 'Learn', href: ROUTES.LEARN },
  { name: 'Community', href: ROUTES.COMMUNITY },
  { name: 'Our Mission', href: ROUTES.MISSION },
  { name: 'Partners', href: ROUTES.PARTNERS },
  { name: 'Issues', href: ROUTES.ISSUES },
] as const;
