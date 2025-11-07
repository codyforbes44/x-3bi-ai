import { Building2, GitBranch, Brain, Cpu, Bot, MessageSquare, Globe, Code2, BarChart3, Image, Mic, Volume2, Code, Sparkles, Rocket, Download, FileText, Wand2, Users, Music, Video, Phone, Zap, Eye, Wrench, Database, Key } from "lucide-react";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  badge: string;
  category: 'enterprise' | 'advanced-ai' | 'ai-tools' | 'utilities';
}

export const features: Feature[] = [
  // Enterprise Features
  {
    id: "workspace",
    title: "Workspaces",
    description: "Collaborative AI workspaces for teams",
    icon: Building2,
    color: "text-cyan-500",
    badge: "Enterprise",
    category: "enterprise"
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Advanced usage analytics and insights",
    icon: BarChart3,
    color: "text-indigo-500",
    badge: "Enterprise",
    category: "enterprise"
  },
  {
    id: "workflows",
    title: "Workflows",
    description: "Automated AI workflow builder",
    icon: GitBranch,
    color: "text-emerald-500",
    badge: "Enterprise",
    category: "enterprise"
  },
  
  // Advanced AI Features
  {
    id: "advanced",
    title: "Advanced AI",
    description: "Claude 4, Perplexity, and multi-modal capabilities",
    icon: Brain,
    color: "text-purple-500",
    badge: "Claude 4",
    category: "advanced-ai"
  },
  {
    id: "local",
    title: "Local AI",
    description: "Privacy-first AI models running in your browser",
    icon: Cpu,
    color: "text-orange-500",
    badge: "WebGPU",
    category: "advanced-ai"
  },
  {
    id: "realtime",
    title: "Real-Time Voice",
    description: "Direct audio conversations with OpenAI Realtime API",
    icon: Bot,
    color: "text-red-500",
    badge: "WebRTC",
    category: "advanced-ai"
  },
  {
    id: "conversation",
    title: "AI Conversation",
    description: "Voice + text conversations with ElevenLabs",
    icon: Bot,
    color: "text-emerald-500",
    badge: "Voice AI",
    category: "advanced-ai"
  },
  {
    id: "claude",
    title: "Claude 4 Chat",
    description: "Direct conversation with Claude 4 Sonnet",
    icon: Sparkles,
    color: "text-purple-500",
    badge: "Latest Model",
    category: "advanced-ai"
  },
  {
    id: "grok",
    title: "Grok Chat",
    description: "Chat with xAI's Grok model with streaming responses",
    icon: Zap,
    color: "text-amber-500",
    badge: "xAI",
    category: "advanced-ai"
  },

  // AI Tools
  {
    id: "chat",
    title: "AI Chat",
    description: "Intelligent conversations with GPT-4o Mini",
    icon: MessageSquare,
    color: "text-blue-500",
    badge: "GPT-4o Mini",
    category: "ai-tools"
  },
  {
    id: "voice",
    title: "Premium Voice",
    description: "Ultra-realistic speech with ElevenLabs",
    icon: Mic,
    color: "text-green-500",
    badge: "ElevenLabs",
    category: "ai-tools"
  },
  {
    id: "basic-voice",
    title: "Basic Voice",
    description: "Standard text-to-speech with OpenAI",
    icon: Volume2,
    color: "text-teal-500",
    badge: "TTS-1",
    category: "ai-tools"
  },
  {
    id: "image",
    title: "Image Generation",
    description: "Create stunning visuals with DALL-E",
    icon: Image,
    color: "text-pink-500",
    badge: "DALL-E 3",
    category: "ai-tools"
  },

  // Utilities
  {
    id: "scraper",
    title: "Web Scraper",
    description: "Extract data from any website",
    icon: Globe,
    color: "text-cyan-500",
    badge: "Data Extraction",
    category: "utilities"
  },
  {
    id: "architect",
    title: "Code Architect",
    description: "Generate complete applications with AI",
    icon: Code2,
    color: "text-purple-500",
    badge: "GPT-4o",
    category: "utilities"
  },
  {
    id: "insights",
    title: "AI Insights",
    description: "Advanced analytics and predictions",
    icon: BarChart3,
    color: "text-indigo-500",
    badge: "Analytics AI",
    category: "utilities"
  },
  {
    id: "code",
    title: "Code Assistant",
    description: "AI-powered code analysis and optimization",
    icon: Code,
    color: "text-orange-500",
    badge: "Code AI",
    category: "utilities"
  },
  {
    id: "deploy",
    title: "Deploypad Deploy",
    description: "Deploy projects to Deploypad with one click",
    icon: Rocket,
    color: "text-blue-500",
    badge: "Deploy",
    category: "utilities"
  },
  {
    id: "multi-chat",
    title: "Multi-Model Chat",
    description: "Compare responses from multiple AI models",
    icon: MessageSquare,
    color: "text-purple-500",
    badge: "Compare",
    category: "advanced-ai"
  },
  {
    id: "advanced-huggingface",
    title: "Advanced Hugging Face",
    description: "Access powerful AI models for image generation, NLP, vision, and audio",
    icon: Sparkles,
    color: "text-yellow-500",
    badge: "Premium Models",
    category: "advanced-ai"
  },
  {
    id: "suno-ai",
    title: "Suno AI Music",
    description: "Generate custom music and songs with AI",
    icon: Music,
    color: "text-pink-500",
    badge: "Music Generation",
    category: "advanced-ai"
  },
  {
    id: "replicate-ai",
    title: "Replicate AI",
    description: "Access hundreds of AI models - image, video, upscaling",
    icon: Sparkles,
    color: "text-blue-500",
    badge: "Multi-Model",
    category: "advanced-ai"
  },
  {
    id: "elevenlabs-conversation",
    title: "ElevenLabs Voice Agents",
    description: "Real-time voice conversations with AI agents",
    icon: Phone,
    color: "text-green-500",
    badge: "Voice AI",
    category: "advanced-ai"
  },
  {
    id: "stability-ai",
    title: "Stability AI",
    description: "Professional image generation with Stable Diffusion 3",
    icon: Wand2,
    color: "text-purple-500",
    badge: "SD3",
    category: "advanced-ai"
  },
  {
    id: "google-gemini",
    title: "Google Gemini",
    description: "Multimodal AI with 2M token context",
    icon: Sparkles,
    color: "text-orange-500",
    badge: "Gemini 2.0",
    category: "advanced-ai"
  },
  {
    id: "runwayml",
    title: "RunwayML Gen-3",
    description: "Advanced AI video generation",
    icon: Video,
    color: "text-red-500",
    badge: "Video AI",
    category: "advanced-ai"
  },
  {
    id: "grok-chat",
    title: "Grok Chat",
    description: "Real-time AI conversations with X's Grok",
    icon: Zap,
    color: "text-blue-500",
    badge: "xAI",
    category: "advanced-ai"
  },
  {
    id: "grok-vision",
    title: "Grok Vision",
    description: "Image understanding with Grok Vision",
    icon: Eye,
    color: "text-cyan-500",
    badge: "Vision AI",
    category: "advanced-ai"
  },
  {
    id: "grok-tools",
    title: "Grok Function Calling",
    description: "Grok with advanced function calling capabilities",
    icon: Wrench,
    color: "text-purple-500",
    badge: "Tools",
    category: "advanced-ai"
  },
  {
    id: "enhanced-voice",
    title: "Enhanced Voice",
    description: "Advanced voice synthesis with multiple providers",
    icon: Mic,
    color: "text-green-500",
    badge: "Premium",
    category: "ai-tools"
  },
  {
    id: "voice-history",
    title: "Voice History",
    description: "Manage and replay voice recordings",
    icon: Volume2,
    color: "text-cyan-500",
    badge: "Library",
    category: "utilities"
  },
  {
    id: "templates",
    title: "Template Library",
    description: "Pre-built prompts for common tasks",
    icon: FileText,
    color: "text-orange-500",
    badge: "Templates",
    category: "utilities"
  },
  {
    id: "advanced-image",
    title: "Advanced Image Gen",
    description: "Enhanced image generation with controls",
    icon: Wand2,
    color: "text-pink-500",
    badge: "gpt-image-1",
    category: "ai-tools"
  },
  {
    id: "workflow-templates",
    title: "Workflow Templates",
    description: "Pre-built automation workflows",
    icon: GitBranch,
    color: "text-indigo-500",
    badge: "Automation",
    category: "enterprise"
  },
  {
    id: "usage-analytics",
    title: "Usage Analytics",
    description: "Track usage, costs, and performance",
    icon: BarChart3,
    color: "text-blue-500",
    badge: "Insights",
    category: "enterprise"
  },
  {
    id: "export",
    title: "Export Center",
    description: "Export all your AI-generated content",
    icon: Download,
    color: "text-gray-500",
    badge: "Data",
    category: "utilities"
  },
  {
    id: "api-keys",
    title: "API Keys",
    description: "Manage API keys for third-party integrations",
    icon: Key,
    color: "text-amber-500",
    badge: "API",
    category: "utilities"
  },
  {
    id: "memory",
    title: "Multi-Modal Memory",
    description: "TIMP-inspired vector storage with Grok Vision analysis",
    icon: Database,
    color: "text-violet-500",
    badge: "pgvector",
    category: "advanced-ai"
  }
];

export const getFeaturesByCategory = (category: Feature['category']) => 
  features.filter(feature => feature.category === category);

export const getAllFeatures = () => features;