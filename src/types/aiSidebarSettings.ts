import { GrokModel } from '@/config/grok';

export interface AISidebarSettings {
  // Appearance
  defaultState: 'collapsed' | 'compact' | 'expanded';
  position: 'left' | 'right';
  theme: 'auto' | 'light' | 'dark';
  
  // Behavior
  autoOpenOnDashboard: boolean;
  persistConversations: boolean;
  contextAwarenessEnabled: boolean;
  suggestionsEnabled: boolean;
  
  // Voice
  voiceInputEnabled: boolean;
  voiceOutputEnabled: boolean;
  voiceProvider: 'browser' | 'elevenlabs';
  selectedVoice: string;
  
  // AI Models
  defaultModel: GrokModel;
  enableMultiModel: boolean;
  
  // Keyboard
  keyboardShortcut: string;
  enableGlobalShortcut: boolean;
  
  // Privacy
  analyticsEnabled: boolean;
  conversationHistory: 'all' | 'session' | 'none';
}

export const DEFAULT_AI_SIDEBAR_SETTINGS: AISidebarSettings = {
  defaultState: 'collapsed',
  position: 'right',
  theme: 'auto',
  autoOpenOnDashboard: false,
  persistConversations: true,
  contextAwarenessEnabled: true,
  suggestionsEnabled: true,
  voiceInputEnabled: false,
  voiceOutputEnabled: false,
  voiceProvider: 'browser',
  selectedVoice: 'default',
  defaultModel: 'grok-4-0709',
  enableMultiModel: true,
  keyboardShortcut: 'Ctrl+Shift+G',
  enableGlobalShortcut: true,
  analyticsEnabled: true,
  conversationHistory: 'all',
};
