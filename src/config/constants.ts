/**
 * Application-wide constants
 * Centralized location for magic numbers, strings, and configuration values
 */

// Application metadata
export const APP_NAME = 'AI Platform';
export const APP_DESCRIPTION = 'Comprehensive AI tools and services platform';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_TIMEOUT = 30000; // 30 seconds
export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1 second

// File Upload Limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'text/plain', 'application/msword'];

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// AI Configuration
export const DEFAULT_AI_MODEL = 'gpt-4o-mini';
export const MAX_TOKENS = 2000;
export const DEFAULT_TEMPERATURE = 0.7;

// Voice Configuration
export const DEFAULT_VOICE_ID = '9BWtsMINqrJLrRacOk9x'; // Aria
export const DEFAULT_VOICE_MODEL = 'eleven_multilingual_v2';

// Image Generation
export const DEFAULT_IMAGE_SIZE = '1024x1024';
export const DEFAULT_IMAGE_QUALITY = 'standard';

// Cache Duration (in seconds)
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  CURRENT_WORKSPACE: 'currentWorkspaceId',
  CHAT_HISTORY: 'chatHistory',
  USER_PREFERENCES: 'userPreferences',
  RECENT_SEARCHES: 'recentSearches',
} as const;

// Toast Duration
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Workspace Roles
export const WORKSPACE_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
  VIEWER: 'viewer',
} as const;

// Workflow Status
export const WORKFLOW_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ARCHIVED: 'archived',
} as const;

// Message Types
export const MESSAGE_TYPES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
  ERROR: 'error',
} as const;

// Feature Flags
export const FEATURES = {
  VOICE_ENABLED: true,
  IMAGE_GEN_ENABLED: true,
  WORKFLOW_BUILDER_ENABLED: true,
  ANALYTICS_ENABLED: true,
  EXPORT_ENABLED: true,
} as const;

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  PHONE: /^\+?[\d\s-()]+$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed size.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a supported file format.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  CREATED: 'Item created successfully.',
  UPDATED: 'Item updated successfully.',
  UPLOADED: 'File uploaded successfully.',
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  AI_REQUESTS_PER_MINUTE: 20,
  IMAGE_GEN_PER_HOUR: 50,
  VOICE_GEN_PER_HOUR: 100,
} as const;

// Navigation Groups
export const NAV_GROUPS = {
  MAIN: 'main',
  AI_TOOLS: 'ai-tools',
  UTILITIES: 'utilities',
  ENTERPRISE: 'enterprise',
} as const;

// Dashboard Tabs
export const DASHBOARD_TABS = {
  ENTERPRISE: 'enterprise',
  AI: 'ai',
  AI_TOOLS: 'ai-tools',
  UTILITIES: 'utilities',
} as const;

// Social Links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com',
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://linkedin.com',
  DISCORD: 'https://discord.com',
} as const;

// API Endpoints (for external APIs)
export const EXTERNAL_APIS = {
  OPENAI: 'https://api.openai.com/v1',
  ELEVENLABS: 'https://api.elevenlabs.io/v1',
  STABILITY: 'https://api.stability.ai',
  HUGGINGFACE: 'https://api-inference.huggingface.co',
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM d, yyyy',
  LONG: 'MMMM d, yyyy',
  WITH_TIME: 'MMM d, yyyy h:mm a',
  TIME_ONLY: 'h:mm a',
  ISO: 'yyyy-MM-dd',
} as const;

// Chart Colors (using semantic tokens)
export const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
] as const;

// z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  MODAL: 1100,
  POPOVER: 1200,
  TOOLTIP: 1300,
  TOAST: 1400,
} as const;
