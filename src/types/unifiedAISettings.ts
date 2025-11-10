import { GrokModel } from '@/config/grok';

/**
 * Unified AI Settings
 * Used across both browser extension and in-app AI interfaces
 */
export interface UnifiedAISettings {
  // ===== MODEL CONFIGURATION =====
  defaultModel: GrokModel;
  temperature: number;
  maxTokens: number;
  streamingEnabled: boolean;
  
  // ===== APPEARANCE =====
  theme: 'auto' | 'light' | 'dark';
  sidebarPosition: 'left' | 'right';
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  defaultState: 'collapsed' | 'compact' | 'expanded';
  
  // ===== BEHAVIOR =====
  autoOpen: boolean; // Auto-open in-app sidebar on page load
  autoOpenOnDashboard: boolean; // Auto-open specifically on dashboard
  persistConversations: boolean;
  contextAwarenessEnabled: boolean;
  suggestionsEnabled: boolean;
  showSuggestedPrompts: boolean;
  enableMultiModel: boolean;
  
  // ===== VOICE (ElevenLabs) =====
  voiceInputEnabled: boolean;
  voiceOutputEnabled: boolean;
  voiceProvider: 'browser' | 'elevenlabs';
  voiceId: string; // ElevenLabs voice ID
  voiceModel: string; // ElevenLabs voice model
  
  // ===== KEYBOARD =====
  keyboardShortcut: string;
  enableGlobalShortcut: boolean;
  
  // ===== PRIVACY & DATA =====
  analyticsEnabled: boolean;
  saveHistory: boolean;
  conversationHistory: 'all' | 'session' | 'none';
  
  // ===== EXTENSION SPECIFIC =====
  enableExtensionSidePanel: boolean;
  extensionAutoOpenOnStartup: boolean;
  
  // ===== VERSION =====
  version?: number; // For future schema migrations
}

export const DEFAULT_UNIFIED_AI_SETTINGS: UnifiedAISettings = {
  // Model
  defaultModel: 'grok-4-0709',
  temperature: 0.7,
  maxTokens: 2000,
  streamingEnabled: true,
  
  // Appearance
  theme: 'auto',
  sidebarPosition: 'right',
  fontSize: 'medium',
  compactMode: false,
  defaultState: 'collapsed',
  
  // Behavior
  autoOpen: false,
  autoOpenOnDashboard: false,
  persistConversations: true,
  contextAwarenessEnabled: true,
  suggestionsEnabled: true,
  showSuggestedPrompts: true,
  enableMultiModel: true,
  
  // Voice
  voiceInputEnabled: false,
  voiceOutputEnabled: false,
  voiceProvider: 'browser',
  voiceId: '9BWtsMINqrJLrRacOk9x', // Aria - default ElevenLabs voice
  voiceModel: 'eleven_turbo_v2_5',
  
  // Keyboard
  keyboardShortcut: 'Ctrl+Shift+G',
  enableGlobalShortcut: true,
  
  // Privacy
  analyticsEnabled: true,
  saveHistory: true,
  conversationHistory: 'all',
  
  // Extension
  enableExtensionSidePanel: true,
  extensionAutoOpenOnStartup: false,
  
  // Version
  version: 1,
};

// ElevenLabs Voice Options
export const ELEVENLABS_VOICES = [
  { value: '9BWtsMINqrJLrRacOk9x', label: 'Aria (Female)' },
  { value: 'CwhRBWXzGAHq8TQ4Fs17', label: 'Roger (Male)' },
  { value: 'EXAVITQu4vr4xnSDxMaL', label: 'Sarah (Female)' },
  { value: 'FGY2WhTYpPnrIDTdsKH5', label: 'Laura (Female)' },
  { value: 'IKne3meq5aSn9XLyUdCD', label: 'Charlie (Male)' },
  { value: 'JBFqnCBsd6RMkjVDRZzb', label: 'George (Male)' },
  { value: 'N2lVS1w4EtoT3dr4eOWO', label: 'Callum (Male)' },
  { value: 'SAz9YHcvj6GT2YYXdXww', label: 'River (Neutral)' },
  { value: 'TX3LPaxmHKxFdv7VOQHJ', label: 'Liam (Male)' },
  { value: 'XB0fDUnXU5powFXDhCwa', label: 'Charlotte (Female)' },
  { value: 'Xb7hH8MSUJpSbSDYk0k2', label: 'Alice (Female)' },
  { value: 'XrExE9yKIg1WjnnlVkGX', label: 'Matilda (Female)' },
  { value: 'bIHbv24MWmeRgasZH58o', label: 'Will (Male)' },
  { value: 'cgSgspJ2msm6clMCkdW9', label: 'Jessica (Female)' },
  { value: 'cjVigY5qzO86Huf0OWal', label: 'Eric (Male)' },
  { value: 'iP95p4xoKVk53GoZ742B', label: 'Chris (Male)' },
  { value: 'nPczCjzI2devNBz1zQrb', label: 'Brian (Male)' },
  { value: 'onwK4e9ZLuTAKqWW03F9', label: 'Daniel (Male)' },
  { value: 'pFZP5JQG7iQjIQuC4Bku', label: 'Lily (Female)' },
  { value: 'pqHfZKP75CvOlQylNhV4', label: 'Bill (Male)' },
] as const;

export const ELEVENLABS_MODELS = [
  { value: 'eleven_multilingual_v2', label: 'Multilingual v2 - Most life-like' },
  { value: 'eleven_turbo_v2_5', label: 'Turbo v2.5 - Fast & high quality' },
  { value: 'eleven_turbo_v2', label: 'Turbo v2 - Fast English-only' },
  { value: 'eleven_monolingual_v1', label: 'English v1 - Classic' },
] as const;

/**
 * Migrate old settings formats to unified format
 */
export function migrateSettings(oldSettings: any): UnifiedAISettings {
  const merged: any = { ...DEFAULT_UNIFIED_AI_SETTINGS };
  
  // Handle old aiSettings format
  if (oldSettings.defaultModel) merged.defaultModel = oldSettings.defaultModel;
  if (oldSettings.temperature !== undefined) merged.temperature = oldSettings.temperature;
  if (oldSettings.maxTokens !== undefined) merged.maxTokens = oldSettings.maxTokens;
  if (oldSettings.streamingEnabled !== undefined) merged.streamingEnabled = oldSettings.streamingEnabled;
  if (oldSettings.theme) merged.theme = oldSettings.theme;
  if (oldSettings.fontSize) merged.fontSize = oldSettings.fontSize;
  if (oldSettings.compactMode !== undefined) merged.compactMode = oldSettings.compactMode;
  if (oldSettings.autoOpen !== undefined) merged.autoOpen = oldSettings.autoOpen;
  if (oldSettings.showSuggestedPrompts !== undefined) merged.suggestionsEnabled = oldSettings.showSuggestedPrompts;
  if (oldSettings.showSuggestedPrompts !== undefined) merged.showSuggestedPrompts = oldSettings.showSuggestedPrompts;
  if (oldSettings.enableVoiceInput !== undefined) merged.voiceInputEnabled = oldSettings.enableVoiceInput;
  if (oldSettings.enableVoiceOutput !== undefined) merged.voiceOutputEnabled = oldSettings.enableVoiceOutput;
  if (oldSettings.voiceId) merged.voiceId = oldSettings.voiceId;
  if (oldSettings.voiceModel) merged.voiceModel = oldSettings.voiceModel;
  if (oldSettings.saveHistory !== undefined) merged.saveHistory = oldSettings.saveHistory;
  if (oldSettings.analyticsEnabled !== undefined) merged.analyticsEnabled = oldSettings.analyticsEnabled;
  if (oldSettings.enableExtensionSidePanel !== undefined) merged.enableExtensionSidePanel = oldSettings.enableExtensionSidePanel;
  if (oldSettings.extensionAutoOpenOnStartup !== undefined) merged.extensionAutoOpenOnStartup = oldSettings.extensionAutoOpenOnStartup;
  
  // Handle old aiSidebarSettings format
  if (oldSettings.defaultState) merged.defaultState = oldSettings.defaultState;
  if (oldSettings.position) merged.sidebarPosition = oldSettings.position;
  if (oldSettings.autoOpenOnDashboard !== undefined) merged.autoOpenOnDashboard = oldSettings.autoOpenOnDashboard;
  if (oldSettings.persistConversations !== undefined) merged.persistConversations = oldSettings.persistConversations;
  if (oldSettings.contextAwarenessEnabled !== undefined) merged.contextAwarenessEnabled = oldSettings.contextAwarenessEnabled;
  if (oldSettings.suggestionsEnabled !== undefined) merged.suggestionsEnabled = oldSettings.suggestionsEnabled;
  if (oldSettings.voiceInputEnabled !== undefined) merged.voiceInputEnabled = oldSettings.voiceInputEnabled;
  if (oldSettings.voiceOutputEnabled !== undefined) merged.voiceOutputEnabled = oldSettings.voiceOutputEnabled;
  if (oldSettings.voiceProvider) merged.voiceProvider = oldSettings.voiceProvider;
  if (oldSettings.selectedVoice) merged.voiceId = oldSettings.selectedVoice;
  if (oldSettings.enableMultiModel !== undefined) merged.enableMultiModel = oldSettings.enableMultiModel;
  if (oldSettings.keyboardShortcut) merged.keyboardShortcut = oldSettings.keyboardShortcut;
  if (oldSettings.enableGlobalShortcut !== undefined) merged.enableGlobalShortcut = oldSettings.enableGlobalShortcut;
  if (oldSettings.conversationHistory) merged.conversationHistory = oldSettings.conversationHistory;
  
  // Set version
  merged.version = 1;
  
  return merged as UnifiedAISettings;
}
