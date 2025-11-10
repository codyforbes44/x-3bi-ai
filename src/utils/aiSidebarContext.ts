import { CATEGORY_LABELS } from '@/config/dashboard-features';

export interface FeatureContext {
  featureId: string;
  featureName: string;
  category: string;
  suggestedPrompts: string[];
  capabilities: string[];
  description: string;
}

const FEATURE_CONTEXTS: Record<string, FeatureContext> = {
  'ai-chat': {
    featureId: 'ai-chat',
    featureName: 'AI Chat',
    category: 'AI Tools',
    description: 'Multi-model AI conversation interface',
    capabilities: ['Multi-model support', 'Streaming responses', 'Context awareness'],
    suggestedPrompts: [
      'Compare different AI models for my use case',
      'How do I optimize prompts for better responses?',
      'What are the differences between Grok models?',
      'Help me choose the right model for coding tasks',
    ],
  },
  'workflows': {
    featureId: 'workflows',
    featureName: 'Workflow Builder',
    category: 'Enterprise',
    description: 'AI-powered workflow automation',
    capabilities: ['Visual workflow builder', 'Multi-step automation', 'Integration support'],
    suggestedPrompts: [
      'Create a workflow for content generation',
      'How do I chain multiple AI steps together?',
      'What integrations are available for workflows?',
      'Show me examples of common workflows',
    ],
  },
  'memory': {
    featureId: 'memory',
    featureName: 'Multi-Modal Memory',
    category: 'Advanced AI',
    description: 'Persistent AI memory across sessions',
    capabilities: ['Multi-modal storage', 'Context retrieval', 'Session management'],
    suggestedPrompts: [
      'How does multi-modal memory work?',
      'Search my previous conversations',
      'What types of data can I store in memory?',
      'How do I optimize memory for better recall?',
    ],
  },
  'analytics': {
    featureId: 'analytics',
    featureName: 'Enterprise Analytics',
    category: 'Enterprise',
    description: 'Advanced analytics and insights',
    capabilities: ['Usage tracking', 'Performance metrics', 'Custom reports'],
    suggestedPrompts: [
      'What metrics should I track for AI usage?',
      'How do I interpret the analytics data?',
      'Create a custom report for team usage',
      'What are the key performance indicators?',
    ],
  },
  'workspace': {
    featureId: 'workspace',
    featureName: 'Workspace Management',
    category: 'Enterprise',
    description: 'Team collaboration and workspace organization',
    capabilities: ['Team management', 'Permission controls', 'Resource sharing'],
    suggestedPrompts: [
      'How do I set up a new workspace?',
      'What are the best practices for team collaboration?',
      'How do I manage permissions effectively?',
      'Explain workspace organization strategies',
    ],
  },
  'grok-chat': {
    featureId: 'grok-chat',
    featureName: 'Grok Chat',
    category: 'AI Tools',
    description: 'Conversation with xAI Grok models',
    capabilities: ['Multiple Grok models', 'Conversation history', 'Streaming responses'],
    suggestedPrompts: [
      'What makes Grok different from other AI models?',
      'How do I use Grok for coding assistance?',
      'Explain Grok 4 vs Grok 3 capabilities',
      'What are the best use cases for Grok?',
    ],
  },
  'ai-image': {
    featureId: 'ai-image',
    featureName: 'AI Image Generation',
    category: 'AI Tools',
    description: 'Generate images with AI',
    capabilities: ['Text-to-image', 'Multiple styles', 'High-resolution output'],
    suggestedPrompts: [
      'How do I write effective image prompts?',
      'What styles are available for image generation?',
      'Generate a professional product image',
      'What are best practices for AI images?',
    ],
  },
  'ai-code': {
    featureId: 'ai-code',
    featureName: 'AI Code Assistant',
    category: 'AI Tools',
    description: 'AI-powered code generation and assistance',
    capabilities: ['Code generation', 'Bug fixing', 'Code explanation'],
    suggestedPrompts: [
      'Help me debug this code issue',
      'Generate a React component for [feature]',
      'Explain this code pattern to me',
      'What are best practices for this implementation?',
    ],
  },
};

const DEFAULT_CONTEXT: FeatureContext = {
  featureId: 'dashboard',
  featureName: 'Dashboard',
  category: 'General',
  description: 'Main dashboard overview',
  capabilities: ['Feature navigation', 'Quick access', 'Overview'],
  suggestedPrompts: [
    'What features are available on this platform?',
    'How do I get started with AI tools?',
    'Show me the most popular features',
    'Help me understand the dashboard layout',
  ],
};

export function getFeatureContext(featureId: string | null): FeatureContext {
  if (!featureId) return DEFAULT_CONTEXT;
  return FEATURE_CONTEXTS[featureId] || DEFAULT_CONTEXT;
}

export function getContextualSystemPrompt(context: FeatureContext): string {
  return `You are an AI assistant helping with the ${context.featureName} feature. 
Current context: ${context.description}
Key capabilities: ${context.capabilities.join(', ')}

Provide helpful, contextual assistance related to this feature. Be concise and actionable.`;
}
