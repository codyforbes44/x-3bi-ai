/**
 * Shared TypeScript type definitions
 */

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Pagination types
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// User types
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// Workspace types (extend from WorkspaceContext)
export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface WorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  role: WorkspaceRole;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  expiresAt: string;
}

// Workflow types (extend from WorkflowContext)
export type WorkflowStatus = 'draft' | 'active' | 'paused' | 'archived';
export type StepType = 'ai_chat' | 'image_gen' | 'voice_gen' | 'code_gen' | 'http_request' | 'condition' | 'transform';

export interface WorkflowExecutionLog {
  id: string;
  executionId: string;
  stepId: string;
  timestamp: string;
  status: 'success' | 'error' | 'skipped';
  duration: number;
  input?: any;
  output?: any;
  error?: string;
}

// AI types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ChatConversation {
  id: string;
  userId: string;
  workspaceId?: string;
  title: string;
  messages: ChatMessage[];
  model: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageGenerationRequest {
  prompt: string;
  model?: string;
  size?: string;
  quality?: string;
  n?: number;
}

export interface ImageGenerationResult {
  url: string;
  revisedPrompt?: string;
  metadata?: {
    model: string;
    size: string;
    quality: string;
  };
}

export interface VoiceGenerationRequest {
  text: string;
  voiceId: string;
  model?: string;
  stability?: number;
  similarityBoost?: number;
}

export interface VoiceGenerationResult {
  audioUrl: string;
  duration: number;
  metadata?: {
    voiceId: string;
    model: string;
    characterCount: number;
  };
}

// File types
export interface UploadedFile {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  bucket: string;
  createdAt: string;
}

export interface FileUploadProgress {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Analytics types
export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

export interface UsageStats {
  aiRequests: number;
  imageGenerations: number;
  voiceGenerations: number;
  storageUsed: number;
  apiCalls: number;
  period: {
    start: string;
    end: string;
  };
}

// Navigation types
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
}

// Form types
export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormState<T = any> {
  values: T;
  errors: FormFieldError[];
  touched: Set<string>;
  isValid: boolean;
  isSubmitting: boolean;
}

// Table types
export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface TableSort {
  column: string;
  direction: 'asc' | 'desc';
}

// Filter types
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface ActiveFilter {
  field: string;
  value: string | string[];
  operator?: 'eq' | 'ne' | 'gt' | 'lt' | 'in' | 'contains';
}

// Toast/Notification types
export interface ToastNotification {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: Error | null;
  data?: any;
}

export interface AsyncState<T = any> extends LoadingState {
  data?: T;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  theme: Theme;
  colors: Record<string, string>;
  fonts: Record<string, string>;
}

// Export/Import types
export interface ExportOptions {
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  includeMetadata?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ImportResult {
  success: boolean;
  totalRecords: number;
  successCount: number;
  errorCount: number;
  errors?: Array<{
    row: number;
    message: string;
  }>;
}

// Integration types
export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  config: Record<string, any>;
  lastSyncedAt?: string;
  createdAt: string;
}

export interface IntegrationConfig {
  apiKey?: string;
  webhookUrl?: string;
  settings?: Record<string, any>;
}

// Search types
export interface SearchResult<T = any> {
  id: string;
  title: string;
  description?: string;
  type: string;
  data: T;
  relevance: number;
}

export interface SearchParams {
  query: string;
  filters?: ActiveFilter[];
  limit?: number;
  offset?: number;
}
