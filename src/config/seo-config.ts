/**
 * Advanced SEO Configuration
 * Centralized SEO settings for the entire platform
 */

export const SEO_CONFIG = {
  siteName: '3BI.AI',
  siteUrl: 'https://3bi.ai',
  defaultTitle: '3BI.AI - Access 12 AI Models in One Platform',
  defaultDescription: 'Access 12 premium AI models in one unified platform. Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro, and more. Enterprise workflows, team collaboration, and advanced analytics for serious AI work.',
  twitterHandle: '@3bi_ai',
  twitterSite: '@3bi_ai',
  
  // Core keywords for the platform
  coreKeywords: [
    'AI platform',
    'Grok AI',
    'Claude 4',
    'GPT-5',
    'enterprise AI',
    'AI chat',
    'multi-modal AI',
    'AI memory system',
    'AI collaboration',
    'workflow automation'
  ],

  // Default OG images by route category
  ogImages: {
    default: 'https://3bi.ai/og/default.png',
    dashboard: 'https://3bi.ai/og/dashboard.png',
    aiTools: 'https://3bi.ai/og/ai-tools.png',
    grok: 'https://3bi.ai/og/grok.png',
    documentation: 'https://3bi.ai/og/documentation.png',
    features: 'https://3bi.ai/og/features.png',
    learn: 'https://3bi.ai/og/learn.png',
    community: 'https://3bi.ai/og/community.png',
  },

  // Preconnect to critical domains
  preconnectDomains: [
    'https://jmazzsxnatfewblgpxfq.supabase.co',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],

  // DNS prefetch for external resources
  dnsPrefetchDomains: [
    'https://www.google-analytics.com',
    'https://api.openai.com',
  ],

  // Organization structured data
  organization: {
    '@type': 'Organization',
    name: '3BI.AI',
    url: 'https://3bi.ai',
    logo: 'https://3bi.ai/og/default.png',
    description: 'Enterprise AI platform with advanced multi-modal capabilities',
    sameAs: [
      'https://twitter.com/3bi_ai',
      'https://github.com/3bi-ai',
      'https://linkedin.com/company/3bi-ai',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@3bi.ai',
      availableLanguage: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'],
    },
  },

  // Website structured data
  website: {
    '@type': 'WebSite',
    name: '3BI.AI',
    url: 'https://3bi.ai',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://3bi.ai/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },

  // Software application structured data
  softwareApplication: {
    '@type': 'SoftwareApplication',
    name: '3BI.AI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  },
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: 'Access Multiple AI Models in One Platform',
    description: 'All-in-one AI platform with Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro, and 8 more premium models. Enterprise workflows, team collaboration, and advanced analytics. Built for teams who need real AI capabilities.',
    keywords: [
      // Core Platform
      'AI platform',
      'multi-model AI',
      'unified AI platform',
      'enterprise AI tools',
      
      // Specific Models (factual)
      'Grok 3',
      'Grok AI',
      'Claude Opus 4',
      'Claude Sonnet 4',
      'GPT-5',
      'Gemini 2.0 Pro',
      'DALL-E 3',
      'Stable Diffusion 3',
      
      // Actual Features
      'AI workflow automation',
      'team AI workspace',
      'multi-modal AI',
      'AI collaboration tools',
      'AI analytics dashboard',
      
      // Use Cases
      'AI code generation',
      'AI image generation',
      'AI voice synthesis',
      'AI chat platform',
      'system architecture AI',
      
      // Target Audience
      'business AI platform',
      'developer AI tools',
      'team AI solution',
    ],
    ogType: 'website',
  },
  
  documentation: {
    title: 'API Documentation - Complete Developer Guide',
    description: 'Complete API documentation for 3BI.AI. Access Grok, Claude 4, GPT-5 via REST API. Code examples in JavaScript, Python, cURL. Authentication, endpoints, SDKs, best practices.',
    keywords: [
      'AI API',
      'API documentation',
      'developer guide',
      'REST API',
      'Grok API',
      'Claude API',
      'GPT-5 API',
      'AI integration',
      'API reference',
      'SDK documentation',
      'API endpoints',
      'API authentication',
    ],
  },
  
  grok: {
    title: 'Grok Chat - xAI Conversational AI',
    description: 'Chat with xAI\'s Grok 3 model. Advanced conversational AI with real-time streaming responses, persistent conversation history, and multi-modal support. Access Grok Vision for image analysis.',
    keywords: [
      'Grok 3',
      'Grok AI chat',
      'xAI Grok',
      'Grok Vision',
      'conversational AI',
      'AI chat interface',
      'streaming AI responses',
      'Grok conversation',
      'xAI platform',
      'Grok 3 chat',
    ],
  },
  
  features: {
    title: '27 AI Features - 100% Free Platform',
    description: '27 AI capabilities completely free: Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro, image generation (DALL-E 3, Stable Diffusion), voice synthesis (ElevenLabs), workflow automation, analytics, team collaboration. No subscriptions, no hidden costs.',
    keywords: [
      'free AI platform',
      '12 AI models free',
      'multi-model platform',
      'AI workflow automation',
      'AI image generation',
      'AI voice synthesis',
      'team collaboration AI',
      'AI analytics dashboard',
      'enterprise AI tools',
      'unified AI platform',
    ],
  },
  
  learn: {
    title: 'Learn AI - Courses, Tutorials & Resources',
    description: 'Master AI with comprehensive courses, tutorials, and guides. From beginner to advanced AI techniques. Video tutorials, API guides, best practices, and certification courses.',
    keywords: [
      'AI courses',
      'AI learning',
      'AI education',
      'AI training',
      'AI tutorials',
      'AI certification',
      'learn AI',
      'AI development',
      'AI skills',
      'AI mastery',
    ],
  },
  
  community: {
    title: 'Community - Connect with AI Developers & Experts',
    description: 'Join the 3BI.AI community of developers, AI enthusiasts, and experts. Share knowledge, collaborate on projects, get help, and stay updated with latest AI trends.',
    keywords: [
      'AI community',
      'developer community',
      'AI forum',
      'AI developers',
      'AI networking',
      'AI collaboration',
      'AI support',
      'AI discussion',
    ],
  },
};

// Breadcrumb configuration for improved navigation
export const BREADCRUMB_CONFIG = {
  home: { label: 'Home', url: '/' },
  dashboard: { label: 'Dashboard', url: '/dashboard' },
  documentation: { label: 'Documentation', url: '/documentation' },
  features: { label: 'Features', url: '/features' },
  learn: { label: 'Learn', url: '/learn' },
  community: { label: 'Community', url: '/community' },
  grok: { label: 'Grok Chat', url: '/grok' },
};
