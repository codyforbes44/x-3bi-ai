import { Building2, GitBranch, Brain, Cpu, Bot, MessageSquare, Globe, Code2, BarChart3, Image, Mic, Volume2, Code, Sparkles } from "lucide-react";

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
  }
];

export const getFeaturesByCategory = (category: Feature['category']) => 
  features.filter(feature => feature.category === category);

export const getAllFeatures = () => features;