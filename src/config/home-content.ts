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
      text: "27 AI Features"
    },
    title: {
      line1: "Premium AI Platform",
      line2: "Built for Excellence"
    },
    description: "Claude 4, Grok, GPT-5, Gemini 2.0, DALL-E, Stable Diffusion, ElevenLabs, and more—all in one unified platform with enterprise features.",
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
      { type: "text", text: "ApplyAI" }
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
    "27 Advanced AI Features - Grok, Claude 4, GPT-5, Gemini 2.0, image, voice, and more",
    "Latest AI Models - Premium access to cutting-edge models with real-time updates",
    "X Premium Integration - Verified organization with Grok AI capabilities",
    "Team Workspaces - Collaborate with unlimited members and role-based access",
    "Workflow Builder - Automate complex AI tasks with visual workflow editor",
    "Usage Analytics - Track performance, costs, and optimize AI usage",
    "Enterprise Security - Row-level security, audit logs, and compliance ready"
  ],

  cta: {
    title: "Ready to Transform Your Workflow?",
    description: "Join thousands of professionals using our platform with Grok, Claude 4, GPT-5, and 24+ other AI features. Enterprise-grade security, team collaboration, and dedicated support.",
    primaryButton: {
      text: "Start Free Trial",
      route: "/pricing"
    },
    secondaryButton: {
      text: "Enterprise Solutions",
      route: "/enterprise"
    },
    footer: "14-day free trial • No credit card required • Cancel anytime"
  },

  seo: {
    title: "Enterprise AI Platform with Grok, Claude 4, GPT-5",
    description: "Transform your business with 3BI.AI's premium AI platform. Access Grok, Claude 4, GPT-5, and more. Advanced multi-modal memory, real-time collaboration, and enterprise-grade tools.",
    keywords: ['AI platform', 'Grok AI', 'Claude 4', 'GPT-5', 'enterprise AI', 'AI chat', 'multi-modal AI', 'AI memory system', 'business AI', 'AI tools'],
    ogImage: "https://3bi.ai/og/home.png",
    canonical: "https://3bi.ai/"
  }
};
