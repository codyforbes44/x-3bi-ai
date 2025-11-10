import { 
  Brain, Code2, ImagePlus, Mic2, Zap, Sparkles, 
  Workflow, Eye, MessageSquare, Database, Network,
  Boxes, GitBranch, BarChart, Shield, Users,
  FileText, Globe, Search, Lightbulb, Cpu,
  Binary, Layers, TrendingUp, Bot, Wand2
} from "lucide-react";

// AI Models Configuration
export const AI_MODELS = [
  {
    id: "grok-3",
    name: "Grok 3",
    provider: "xAI",
    category: "chat",
    description: "X's most advanced AI with real-time knowledge up to October 2025",
    features: ["Real-time data", "Vision", "Function calling", "Extended context"],
    contextWindow: "128K tokens",
    capabilities: ["text", "vision", "tools"],
    icon: Zap,
    color: "blue",
    verified: true
  },
  {
    id: "claude-opus-4",
    name: "Claude Opus 4",
    provider: "Anthropic",
    category: "chat",
    description: "Most capable model for complex reasoning and analysis",
    features: ["Superior reasoning", "200K context", "Vision", "Tool use"],
    contextWindow: "200K tokens",
    capabilities: ["text", "vision", "tools"],
    icon: Brain,
    color: "purple",
    verified: true
  },
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    category: "chat",
    description: "Balanced performance and intelligence for most tasks",
    features: ["Fast responses", "200K context", "Vision", "Coding"],
    contextWindow: "200K tokens",
    capabilities: ["text", "vision", "tools", "code"],
    icon: Brain,
    color: "purple",
    verified: true
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    category: "chat",
    description: "OpenAI's latest multimodal model with advanced reasoning",
    features: ["Multimodal", "Vision", "128K context", "Tool use"],
    contextWindow: "128K tokens",
    capabilities: ["text", "vision", "tools"],
    icon: Sparkles,
    color: "green",
    verified: true
  },
  {
    id: "gemini-2-pro",
    name: "Gemini 2.0 Pro",
    provider: "Google",
    category: "chat",
    description: "Google's advanced multimodal AI with native tool use",
    features: ["Multimodal", "Native tools", "1M context", "Real-time"],
    contextWindow: "1M tokens",
    capabilities: ["text", "vision", "audio", "tools"],
    icon: Sparkles,
    color: "orange",
    verified: true
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    category: "image",
    description: "Advanced image generation with precise prompt following",
    features: ["High quality", "Precise prompts", "1024x1024 to 1792x1024"],
    capabilities: ["text-to-image"],
    icon: ImagePlus,
    color: "pink",
    verified: true
  },
  {
    id: "stable-diffusion-3",
    name: "Stable Diffusion 3",
    provider: "Stability AI",
    category: "image",
    description: "Open-source image generation with advanced quality",
    features: ["Open source", "High quality", "Fast generation"],
    capabilities: ["text-to-image", "image-to-image"],
    icon: ImagePlus,
    color: "purple",
    verified: true
  },
  {
    id: "flux-pro",
    name: "FLUX Pro",
    provider: "Black Forest Labs",
    category: "image",
    description: "State-of-the-art image generation with photorealism",
    features: ["Photorealistic", "High detail", "Fast"],
    capabilities: ["text-to-image"],
    icon: Wand2,
    color: "cyan",
    verified: true
  },
  {
    id: "elevenlabs-turbo",
    name: "ElevenLabs Turbo",
    provider: "ElevenLabs",
    category: "voice",
    description: "Premium voice synthesis with natural emotions",
    features: ["Studio quality", "29 languages", "Voice cloning", "Real-time"],
    capabilities: ["text-to-speech", "voice-cloning"],
    icon: Mic2,
    color: "cyan",
    verified: true
  },
  {
    id: "whisper-large",
    name: "Whisper Large v3",
    provider: "OpenAI",
    category: "voice",
    description: "Advanced speech recognition and transcription",
    features: ["Multilingual", "High accuracy", "Timestamps"],
    capabilities: ["speech-to-text"],
    icon: Mic2,
    color: "green",
    verified: true
  },
  {
    id: "runway-gen3",
    name: "Runway Gen-3",
    provider: "Runway",
    category: "video",
    description: "Text and image to video generation",
    features: ["10s videos", "High quality", "Camera control"],
    capabilities: ["text-to-video", "image-to-video"],
    icon: Eye,
    color: "orange",
    verified: true
  },
  {
    id: "suno-v4",
    name: "Suno v4",
    provider: "Suno",
    category: "audio",
    description: "AI music and audio generation",
    features: ["Full songs", "Multiple genres", "Vocals"],
    capabilities: ["text-to-audio"],
    icon: Mic2,
    color: "purple",
    verified: true
  }
] as const;

// Platform Features Configuration (27 AI Features)
export const PLATFORM_FEATURES = [
  {
    id: "grok-chat",
    name: "Grok AI Chat",
    category: "ai-tools",
    icon: Zap,
    color: "blue",
    badge: "X Verified",
    description: "X's premium AI with real-time knowledge, vision capabilities, and advanced function calling",
    models: ["grok-3"],
    capabilities: ["Real-time data", "Vision analysis", "Function calling", "Web search"],
    route: "/grok-chat",
    featured: true
  },
  {
    id: "claude-chat",
    name: "Claude 4 Chat",
    category: "ai-tools",
    icon: Brain,
    color: "purple",
    badge: "Most Capable",
    description: "Claude Opus 4 & Sonnet 4 for superior reasoning, context understanding, and conversations",
    models: ["claude-opus-4", "claude-sonnet-4"],
    capabilities: ["200K context", "Vision", "Tool use", "Advanced reasoning"],
    route: "/ai-chat",
    featured: true
  },
  {
    id: "ai-code",
    name: "AI Code Assistant",
    category: "ai-tools",
    icon: Code2,
    color: "green",
    badge: "Developer Pro",
    description: "Generate, analyze, debug, and optimize code with Claude Sonnet 4 and GPT-5",
    models: ["claude-sonnet-4", "gpt-5"],
    capabilities: ["Code generation", "Debugging", "Refactoring", "Documentation"],
    route: "/ai-code",
    featured: true
  },
  {
    id: "image-gen",
    name: "AI Image Generation",
    category: "ai-tools",
    icon: ImagePlus,
    color: "pink",
    badge: "Multi-Model",
    description: "DALL-E 3, Stable Diffusion 3, FLUX Pro, and more cutting-edge image models",
    models: ["dall-e-3", "stable-diffusion-3", "flux-pro"],
    capabilities: ["Text-to-image", "Image editing", "Style transfer", "Upscaling"],
    route: "/ai-image",
    featured: true
  },
  {
    id: "voice-ai",
    name: "Voice AI",
    category: "ai-tools",
    icon: Mic2,
    color: "cyan",
    badge: "Studio Quality",
    description: "ElevenLabs premium voice synthesis and real-time conversational AI",
    models: ["elevenlabs-turbo", "whisper-large"],
    capabilities: ["Text-to-speech", "Voice cloning", "Speech-to-text", "Real-time"],
    route: "/ai-voice",
    featured: true
  },
  {
    id: "system-architect",
    name: "AI System Architect",
    category: "ai-tools",
    icon: Boxes,
    color: "orange",
    badge: "Enterprise",
    description: "Design complex architectures and technical solutions with Claude Opus 4",
    models: ["claude-opus-4"],
    capabilities: ["Architecture design", "System analysis", "Tech stack recommendations"],
    route: "/ai-architect",
    featured: true
  },
  {
    id: "grok-vision",
    name: "Grok Vision",
    category: "advanced-ai",
    icon: Eye,
    color: "blue",
    badge: "Vision AI",
    description: "Analyze images, understand visual context, and extract insights with Grok",
    models: ["grok-3"],
    capabilities: ["Image analysis", "OCR", "Object detection", "Scene understanding"],
    route: "/grok-vision",
    featured: false
  },
  {
    id: "google-gemini",
    name: "Google Gemini",
    category: "advanced-ai",
    icon: Sparkles,
    color: "orange",
    badge: "Multimodal",
    description: "Google's advanced multimodal AI with 1M context window",
    models: ["gemini-2-pro"],
    capabilities: ["1M context", "Multimodal", "Native tools", "Real-time"],
    route: "/google-gemini",
    featured: false
  },
  {
    id: "workflow-builder",
    name: "Workflow Builder",
    category: "enterprise",
    icon: Workflow,
    color: "purple",
    badge: "Automation",
    description: "Build complex AI workflows with visual editor and multi-step automation",
    models: ["grok-3", "claude-sonnet-4"],
    capabilities: ["Visual editor", "Multi-step", "Conditional logic", "Triggers"],
    route: "/workflows",
    featured: false
  },
  {
    id: "multi-agent",
    name: "Multi-Agent Collaboration",
    category: "advanced-ai",
    icon: Users,
    color: "green",
    badge: "Advanced",
    description: "Orchestrate multiple AI agents working together on complex tasks",
    models: ["claude-opus-4", "grok-3"],
    capabilities: ["Agent coordination", "Task delegation", "Parallel processing"],
    route: "/predictive-ai",
    featured: false
  },
  {
    id: "knowledge-graph",
    name: "Knowledge Graph",
    category: "advanced-ai",
    icon: Network,
    color: "cyan",
    badge: "Smart Memory",
    description: "Build and query intelligent knowledge graphs from unstructured data",
    models: ["claude-opus-4"],
    capabilities: ["Graph building", "Semantic search", "Relationship mapping"],
    route: "/predictive-ai",
    featured: false
  },
  {
    id: "digital-twin",
    name: "Digital Twin AI",
    category: "advanced-ai",
    icon: Bot,
    color: "purple",
    badge: "Predictive",
    description: "Create AI digital twins that learn and predict user patterns",
    models: ["claude-opus-4"],
    capabilities: ["Pattern learning", "Behavior prediction", "Personalization"],
    route: "/predictive-ai",
    featured: false
  },
  {
    id: "temporal-ai",
    name: "Temporal Intelligence",
    category: "advanced-ai",
    icon: TrendingUp,
    color: "orange",
    badge: "Forecasting",
    description: "Time-series analysis and future trend prediction",
    models: ["claude-opus-4"],
    capabilities: ["Time-series", "Forecasting", "Anomaly detection"],
    route: "/predictive-ai",
    featured: false
  },
  {
    id: "multimodal-memory",
    name: "Multi-Modal Memory",
    category: "enterprise",
    icon: Database,
    color: "blue",
    badge: "Advanced Memory",
    description: "Store and retrieve conversations, images, voice, and context across sessions",
    models: ["claude-opus-4", "grok-3"],
    capabilities: ["Cross-session", "Multimodal", "Semantic search", "Context aware"],
    route: "/memory",
    featured: false
  },
  {
    id: "ai-insights",
    name: "AI Insights",
    category: "utilities",
    icon: Lightbulb,
    color: "yellow",
    badge: "Analytics",
    description: "Get AI-powered insights and recommendations from your data",
    models: ["claude-sonnet-4"],
    capabilities: ["Data analysis", "Insights", "Recommendations", "Trends"],
    route: "/ai-insights",
    featured: false
  },
  {
    id: "web-scraper",
    name: "AI Web Scraper",
    category: "utilities",
    icon: Globe,
    color: "green",
    badge: "Data Collection",
    description: "Intelligent web scraping and data extraction with AI",
    models: ["grok-3"],
    capabilities: ["Smart extraction", "Real-time", "Structured output"],
    route: "/web-scraper",
    featured: false
  },
  {
    id: "usage-analytics",
    name: "Usage Analytics",
    category: "enterprise",
    icon: BarChart,
    color: "purple",
    badge: "Enterprise",
    description: "Track AI usage, costs, and optimize spending across all models",
    models: [],
    capabilities: ["Cost tracking", "Usage metrics", "Optimization", "Reporting"],
    route: "/usage-analytics",
    featured: false
  },
  {
    id: "realtime-analytics",
    name: "Real-Time Analytics",
    category: "enterprise",
    icon: TrendingUp,
    color: "orange",
    badge: "Live Monitoring",
    description: "Monitor system health, performance, and live activity in real-time",
    models: [],
    capabilities: ["Live monitoring", "Performance", "Health checks", "Alerts"],
    route: "/analytics/realtime",
    featured: false
  },
  {
    id: "workspaces",
    name: "Team Workspaces",
    category: "enterprise",
    icon: Users,
    color: "blue",
    badge: "Collaboration",
    description: "Collaborate with unlimited team members and role-based access control",
    models: [],
    capabilities: ["Team management", "RBAC", "Shared resources", "Collaboration"],
    route: "/workspaces",
    featured: false
  },
  {
    id: "api-access",
    name: "API Access",
    category: "utilities",
    icon: Binary,
    color: "green",
    badge: "Developer",
    description: "Full REST API access to all AI features with SDKs and documentation",
    models: ["all"],
    capabilities: ["REST API", "SDKs", "Webhooks", "Documentation"],
    route: "/api-access",
    featured: false
  },
  {
    id: "integrations",
    name: "Integration Hub",
    category: "enterprise",
    icon: Layers,
    color: "purple",
    badge: "Marketplace",
    description: "Connect with Slack, Zapier, Make, and 50+ third-party services",
    models: [],
    capabilities: ["50+ integrations", "Webhooks", "OAuth", "Custom"],
    route: "/integrations",
    featured: false
  },
  {
    id: "security-dashboard",
    name: "Security Dashboard",
    category: "enterprise",
    icon: Shield,
    color: "red",
    badge: "Enterprise",
    description: "Advanced security monitoring, audit logs, and compliance tools",
    models: [],
    capabilities: ["Audit logs", "Compliance", "Monitoring", "Access control"],
    route: "/security-dashboard",
    featured: false
  },
  {
    id: "white-label",
    name: "White Label",
    category: "enterprise",
    icon: Wand2,
    color: "purple",
    badge: "Custom Branding",
    description: "Fully customizable branding, domains, and white-label solutions",
    models: [],
    capabilities: ["Custom branding", "Custom domains", "Theme editor"],
    route: "/white-label",
    featured: false
  },
  {
    id: "ai-assistant",
    name: "AI Assistant Settings",
    category: "utilities",
    icon: Bot,
    color: "cyan",
    badge: "Personalization",
    description: "Customize AI assistant behavior, tone, and preferences",
    models: ["all"],
    capabilities: ["Custom instructions", "Tone settings", "Model selection"],
    route: "/ai-assistant-settings",
    featured: false
  },
  {
    id: "replicate-ai",
    name: "Replicate AI",
    category: "advanced-ai",
    icon: Cpu,
    color: "green",
    badge: "Model Hub",
    description: "Access to hundreds of open-source AI models via Replicate",
    models: ["replicate-*"],
    capabilities: ["100+ models", "Open source", "Custom models"],
    route: "/replicate-ai",
    featured: false
  },
  {
    id: "stability-ai",
    name: "Stability AI",
    category: "advanced-ai",
    icon: ImagePlus,
    color: "purple",
    badge: "Image AI",
    description: "Advanced image generation with Stable Diffusion models",
    models: ["stable-diffusion-3"],
    capabilities: ["Text-to-image", "Image-to-image", "Inpainting"],
    route: "/stability-ai",
    featured: false
  },
  {
    id: "runwayml",
    name: "RunwayML",
    category: "advanced-ai",
    icon: Eye,
    color: "orange",
    badge: "Video AI",
    description: "Text and image to video generation with Gen-3",
    models: ["runway-gen3"],
    capabilities: ["Text-to-video", "Image-to-video", "Camera control"],
    route: "/runwayml",
    featured: false
  }
] as const;

// Feature categories
export const FEATURE_CATEGORIES = [
  {
    id: "ai-tools",
    name: "Core AI Tools",
    description: "Essential AI features for everyday use",
    icon: Brain,
    color: "purple"
  },
  {
    id: "advanced-ai",
    name: "Advanced AI",
    description: "Cutting-edge AI capabilities and models",
    icon: Sparkles,
    color: "blue"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Team collaboration and business features",
    icon: Users,
    color: "green"
  },
  {
    id: "utilities",
    name: "Utilities",
    description: "Supporting tools and integrations",
    icon: Layers,
    color: "orange"
  }
] as const;

// Platform statistics
export const PLATFORM_STATS = {
  totalFeatures: 27,
  totalModels: 12,
  modelCategories: ["chat", "image", "voice", "video", "audio"],
  integrations: "50+",
  uptime: "99.9%",
  contextWindow: "200K tokens (max)",
  processingSpeed: "< 100ms latency"
} as const;

// Helper functions
export const getFeaturesByCategory = (category: string) => {
  return PLATFORM_FEATURES.filter(f => f.category === category);
};

export const getFeaturedFeatures = () => {
  return PLATFORM_FEATURES.filter(f => f.featured);
};

export const getModelsByCategory = (category: string) => {
  return AI_MODELS.filter(m => m.category === category);
};

export const getFeatureById = (id: string) => {
  return PLATFORM_FEATURES.find(f => f.id === id);
};

export const getModelById = (id: string) => {
  return AI_MODELS.find(m => m.id === id);
};