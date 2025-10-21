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
  NEWSLETTER: '/newsletter',
  
  // Resources
  FREE_AI_TOOLS: '/free-ai-tools',
  TUTORIALS: '/tutorials',
  DOCUMENTATION: '/documentation',
  API_ACCESS: '/api-access',
  API_DEMOS: '/api-demos',
  
  // Workspaces
  WORKSPACES: '/workspaces',
  INTEGRATIONS: '/integrations',
  
  // Multi-Modal Memory
  MEMORY: '/memory',
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
  { name: 'Pricing', href: ROUTES.PRICING },
  { name: 'Enterprise', href: ROUTES.ENTERPRISE },
  { name: 'Learn', href: ROUTES.LEARN },
  { name: 'About', href: ROUTES.MISSION },
] as const;
