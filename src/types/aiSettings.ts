export interface AISettings {
  // Model Configuration
  defaultModel: string;
  temperature: number;
  maxTokens: number;
  streamingEnabled: boolean;
  
  // Appearance
  theme: 'auto' | 'light' | 'dark';
  sidebarPosition: 'left' | 'right';
  compactMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  
  // Behavior
  autoOpen: boolean;
  persistConversations: boolean;
  showSuggestedPrompts: boolean;
  enableVoiceInput: boolean;
  enableVoiceOutput: boolean;
  voiceId: string;
  voiceModel: string;
  
  // Extension-specific
  enableExtensionSidePanel: boolean;
  extensionAutoOpenOnStartup: boolean;
  
  // Privacy
  saveHistory: boolean;
  analyticsEnabled: boolean;
}

export const DEFAULT_AI_SETTINGS: AISettings = {
  // Model Configuration
  defaultModel: 'grok-beta',
  temperature: 0.7,
  maxTokens: 2000,
  streamingEnabled: true,
  
  // Appearance
  theme: 'auto',
  sidebarPosition: 'right',
  compactMode: false,
  fontSize: 'medium',
  
  // Behavior
  autoOpen: false,
  persistConversations: true,
  showSuggestedPrompts: true,
  enableVoiceInput: false,
  enableVoiceOutput: false,
  voiceId: '9BWtsMINqrJLrRacOk9x', // Aria
  voiceModel: 'eleven_turbo_v2_5',
  
  // Extension-specific
  enableExtensionSidePanel: true,
  extensionAutoOpenOnStartup: false,
  
  // Privacy
  saveHistory: true,
  analyticsEnabled: true,
};

export const AVAILABLE_MODELS = [
  { value: 'grok-beta', label: 'Grok Beta', provider: 'xAI' },
  { value: 'grok-vision-beta', label: 'Grok Vision Beta', provider: 'xAI' },
  { value: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash', provider: 'Google' },
  { value: 'google/gemini-2.5-pro', label: 'Gemini 2.5 Pro', provider: 'Google' },
  { value: 'openai/gpt-5', label: 'GPT-5', provider: 'OpenAI' },
  { value: 'openai/gpt-5-mini', label: 'GPT-5 Mini', provider: 'OpenAI' },
] as const;

export const VOICE_OPTIONS = [
  { value: '9BWtsMINqrJLrRacOk9x', label: 'Aria (Female)' },
  { value: 'EXAVITQu4vr4xnSDxMaL', label: 'Sarah (Female)' },
  { value: 'FGY2WhTYpPnrIDTdsKH5', label: 'Laura (Female)' },
  { value: 'XB0fDUnXU5powFXDhCwa', label: 'Charlotte (Female)' },
  { value: 'Xb7hH8MSUJpSbSDYk0k2', label: 'Alice (Female)' },
  { value: 'CwhRBWXzGAHq8TQ4Fs17', label: 'Roger (Male)' },
  { value: 'IKne3meq5aSn9XLyUdCD', label: 'Charlie (Male)' },
  { value: 'N2lVS1w4EtoT3dr4eOWO', label: 'Callum (Male)' },
  { value: 'TX3LPaxmHKxFdv7VOQHJ', label: 'Liam (Male)' },
  { value: 'bIHbv24MWmeRgasZH58o', label: 'Will (Male)' },
] as const;

export const VOICE_MODELS = [
  { value: 'eleven_turbo_v2_5', label: 'Turbo v2.5 (Fastest, 32 languages)' },
  { value: 'eleven_multilingual_v2', label: 'Multilingual v2 (Highest quality, 29 languages)' },
  { value: 'eleven_turbo_v2', label: 'Turbo v2 (Fast, English only)' },
] as const;
