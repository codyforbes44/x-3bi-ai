/**
 * Centralized Dashboard Voice Commands Configuration
 * Maps voice phrases to dashboard feature IDs and actions
 */

export interface DashboardVoiceCommand {
  phrases: string[];
  featureId: string;
  description: string;
  category: 'enterprise' | 'advanced-ai' | 'ai-tools' | 'utilities';
}

export const DASHBOARD_VOICE_COMMANDS: DashboardVoiceCommand[] = [
  // Enterprise Commands
  {
    phrases: ['show analytics', 'open analytics', 'analytics dashboard', 'show stats', 'display statistics'],
    featureId: 'analytics',
    description: 'Open Analytics Dashboard',
    category: 'enterprise'
  },
  {
    phrases: ['show workspaces', 'open workspaces', 'my workspaces', 'workspace manager'],
    featureId: 'workspace',
    description: 'Manage Workspaces',
    category: 'enterprise'
  },
  {
    phrases: ['show workflows', 'open workflows', 'automation', 'workflow builder', 'create workflow'],
    featureId: 'workflows',
    description: 'Open Workflow Automation',
    category: 'enterprise'
  },

  // Advanced AI Commands
  {
    phrases: ['open claude', 'talk to claude', 'claude chat', 'claude 4', 'use claude'],
    featureId: 'claude',
    description: 'Chat with Claude 4',
    category: 'advanced-ai'
  },
  {
    phrases: ['open grok', 'grok chat', 'talk to grok', 'use grok'],
    featureId: 'grok',
    description: 'Chat with Grok',
    category: 'advanced-ai'
  },
  {
    phrases: ['show vision', 'grok vision', 'image analysis', 'vision ai', 'analyze image'],
    featureId: 'grok-vision',
    description: 'Grok Vision Analysis',
    category: 'advanced-ai'
  },
  {
    phrases: ['multi-model chat', 'compare models', 'multi chat', 'multiple models'],
    featureId: 'multi-chat',
    description: 'Multi-Model Comparison',
    category: 'advanced-ai'
  },
  {
    phrases: ['voice conversation', 'voice agent', 'talk to ai', 'voice call', 'elevenlabs conversation'],
    featureId: 'conversation',
    description: 'Voice Conversation',
    category: 'advanced-ai'
  },
  {
    phrases: ['advanced ai', 'premium ai', 'advanced features'],
    featureId: 'advanced',
    description: 'Advanced AI Features',
    category: 'advanced-ai'
  },
  {
    phrases: ['local ai', 'privacy mode', 'offline ai', 'browser ai'],
    featureId: 'local',
    description: 'Local AI (Privacy Mode)',
    category: 'advanced-ai'
  },
  {
    phrases: ['real-time voice', 'realtime voice', 'live voice', 'voice realtime'],
    featureId: 'realtime',
    description: 'Real-Time Voice',
    category: 'advanced-ai'
  },

  // AI Tools Commands
  {
    phrases: ['generate image', 'create image', 'make image', 'dall-e', 'image generation', 'draw'],
    featureId: 'image',
    description: 'Generate Images',
    category: 'ai-tools'
  },
  {
    phrases: ['text to speech', 'voice synthesis', 'premium voice', 'elevenlabs voice', 'speak text'],
    featureId: 'voice',
    description: 'Premium Voice Synthesis',
    category: 'ai-tools'
  },
  {
    phrases: ['basic voice', 'simple voice', 'openai voice', 'tts'],
    featureId: 'basic-voice',
    description: 'Basic Voice Synthesis',
    category: 'ai-tools'
  },
  {
    phrases: ['ai chat', 'chat assistant', 'chatbot', 'talk', 'conversation'],
    featureId: 'chat',
    description: 'AI Chat Assistant',
    category: 'ai-tools'
  },

  // Utilities Commands
  {
    phrases: ['web scraper', 'scrape website', 'extract data', 'scraper'],
    featureId: 'scraper',
    description: 'Web Scraper',
    category: 'utilities'
  },
  {
    phrases: ['code generator', 'generate code', 'code gen', 'write code'],
    featureId: 'code-gen',
    description: 'Code Generator',
    category: 'utilities'
  },
  {
    phrases: ['code assistant', 'code help', 'coding help', 'programming'],
    featureId: 'code',
    description: 'Code Assistant',
    category: 'utilities'
  },
  {
    phrases: ['deploy', 'deployment', 'deploy app'],
    featureId: 'deploy',
    description: 'Deploy Application',
    category: 'utilities'
  },
  {
    phrases: ['insights', 'show insights', 'ai insights'],
    featureId: 'insights',
    description: 'AI Insights',
    category: 'utilities'
  },
];

// Quick navigation commands
export const DASHBOARD_NAV_COMMANDS = [
  {
    phrases: ['go back', 'return to overview', 'show overview', 'dashboard home'],
    action: 'overview',
    description: 'Return to Dashboard Overview'
  },
];
