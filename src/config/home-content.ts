import { 
  Brain, 
  Code2, 
  ImagePlus, 
  Mic2,
  Rocket,
  Zap,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const homeContent = {
  hero: {
    badge: {
      icon: Sparkles,
      text: "All-in-One AI Platform"
    },
    preHeadline: "The Complete AI Platform",
    title: {
      line1: "Access Multiple AI Models",
      line2: "In One Unified Platform"
    },
    description: "Access Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro, and more premium models. Unified with enterprise workflows, team collaboration, and analytics.",
    capabilities: [
      { icon: Zap, label: "Grok AI", color: "text-blue-300" },
      { icon: Brain, label: "Claude 4", color: "text-purple-300" },
      { icon: ImagePlus, label: "Image Gen", color: "text-pink-300" },
      { icon: Code2, label: "Code AI", color: "text-green-300" },
      { icon: Brain, label: "Vision AI", color: "text-cyan-300" },
      { icon: Rocket, label: "Workflows", color: "text-orange-300" }
    ],
    trustIndicators: [
      { type: "live", text: "Premium X Verified" },
      { type: "text", text: "27 AI Features" },
      { type: "text", text: "Built by ApplyAI" }
    ]
  },

  grokSpotlight: {
    badge: {
      icon: Zap,
      text: "Powered by X (Twitter)"
    },
    title: "Grok AI Integration",
    description: "Experience X's most advanced AI directly in our platform. Built by xAI, Grok brings real-time knowledge, multimodal understanding, and powerful reasoning to your workflows.",
    features: [
      {
        icon: Brain,
        title: "Grok 3 - Latest Model",
        description: "Advanced reasoning and real-time knowledge up to October 2025",
        color: "blue"
      },
      {
        icon: ImagePlus,
        title: "Vision Capabilities",
        description: "Analyze images, understand visual context, and extract insights",
        color: "purple"
      },
      {
        icon: Code2,
        title: "Function Calling",
        description: "Execute tools, search data, and automate complex workflows",
        color: "cyan"
      }
    ],
    chatExample: {
      user: "Analyze this market trend and give insights",
      grok: "Based on current data, I'm seeing a 23% upward trend in Q4 2025. Key factors include..."
    },
    featureBadges: [
      { label: "Real-time Data", color: "blue" },
      { label: "Vision AI", color: "purple" },
      { label: "Function Calling", color: "cyan" },
      { label: "X Verified", color: "green" }
    ]
  },

  quickStart: {
    badge: {
      icon: Sparkles,
      text: "Powered by Cᴏᴅʏ Fᴏʀʙᴇꜱ"
    },
    title: "Try AI Features Now",
    description: "Experience premium AI instantly. No signup required—just start creating with enterprise-grade tools."
  },

  aiCapabilities: [
    {
      icon: Zap,
      title: "Grok AI",
      description: "X's premium AI with real-time knowledge, vision capabilities, and advanced function calling",
      badge: "X Verified",
      color: "text-blue-500"
    },
    {
      icon: Brain,
      title: "Claude 4 Chat",
      description: "Claude Opus 4 & Sonnet 4 for superior reasoning, context understanding, and intelligent conversations",
      badge: "Most Capable",
      color: "text-purple-500"
    },
    {
      icon: Code2,
      title: "AI Code Assistant",
      description: "Generate, analyze, debug, and optimize code with Claude Sonnet 4 and GPT-5's programming expertise",
      badge: "Developer Pro",
      color: "text-green-500"
    },
    {
      icon: ImagePlus,
      title: "Image Generation",
      description: "DALL-E, Stable Diffusion 3, FLUX, Grok Vision, and more cutting-edge image models",
      badge: "Multi-Model",
      color: "text-pink-500"
    },
    {
      icon: Rocket,
      title: "System Architect",
      description: "Design complex architectures and technical solutions with Claude Opus 4's maximum intelligence",
      badge: "Enterprise",
      color: "text-orange-500"
    },
    {
      icon: Mic2,
      title: "Voice AI",
      description: "ElevenLabs premium voice synthesis and real-time conversational AI with natural emotions",
      badge: "Studio Quality",
      color: "text-cyan-500"
    }
  ],

  platformBenefits: [
    "12 Premium AI Models - Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro, DALL-E 3, FLUX Pro, Stable Diffusion 3, ElevenLabs Turbo, Whisper Large v3, Runway Gen-3, Suno v4, and more",
    "27 Advanced AI Features - Chat, code generation, image creation, voice synthesis, system architecture, workflow automation, analytics, and enterprise tools",
    "Real-Time AI Access - Grok 3 with live data up to October 2025, Gemini 2.0 Pro with 1M context window",
    "X Premium Integration - Verified organization account with exclusive Grok AI capabilities and function calling",
    "Team Workspaces - Unlimited team members, role-based access control (RBAC), shared resources, and real-time collaboration",
    "Visual Workflow Builder - Drag-and-drop automation with conditional logic, multi-step workflows, and 50+ integrations",
    "Multi-Modal Memory System - Cross-session memory for text, images, voice, and context with semantic search",
    "Usage Analytics & Optimization - Track costs across all models, optimize spending, performance metrics, and detailed reporting",
    "Enterprise Security & Compliance - Row-level security (RLS), audit logs, SOC 2 compliance, GDPR ready, and SSO support",
    "API Access & Webhooks - Full REST API, SDKs in 5 languages, webhook automation, and comprehensive developer documentation"
  ],

  cta: {
    title: "Ready to Transform Your Workflow?",
    description: "Access Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro, and more premium models in one platform. Features include workflows, analytics, and team collaboration with enterprise-grade security.",
    primaryButton: {
      text: "Get Started Free",
      route: "/dashboard"
    },
    secondaryButton: {
      text: "View Features",
      route: "/features"
    },
    footer: "100% Free • No credit card required"
  },

  seo: {
    title: "3BI.AI - Complete AI Platform | Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro, 27 Features",
    description: "The complete AI platform for teams. Access 12 premium models: Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro (1M context), DALL-E 3, FLUX Pro, ElevenLabs Turbo, and more. 27 enterprise features including workflow automation, multi-modal memory, team collaboration, and real-time analytics. Enterprise security, unlimited teams, and full API access.",
    keywords: [
      'AI platform', 'Grok 3', 'Claude Opus 4', 'GPT-5', 'Gemini 2.0 Pro', 'enterprise AI', 
      'AI chat', 'multi-modal AI', 'AI memory system', 'business AI', 'AI tools',
      'DALL-E 3', 'FLUX Pro', 'Stable Diffusion 3', 'ElevenLabs', 'AI voice synthesis',
      'workflow automation', 'team collaboration', 'AI analytics', 'API access',
      'X AI', 'xAI Grok', 'Anthropic Claude', 'OpenAI GPT-5', 'Google Gemini',
      'AI image generation', 'AI code assistant', 'system architect AI'
    ],
    ogImage: "https://3bi.ai/og/home.png",
    canonical: "https://3bi.ai/"
  }
};
