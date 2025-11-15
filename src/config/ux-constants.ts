/**
 * UX Constants
 * Centralized UX-related constants for consistent user experience
 */

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
} as const;

/**
 * Touch target sizes (in pixels)
 */
export const TOUCH_TARGET = {
  minimum: 44, // WCAG AAA minimum
  comfortable: 48,
  large: 56,
} as const;

/**
 * Debounce delays (in milliseconds)
 */
export const DEBOUNCE_DELAY = {
  search: 300,
  input: 500,
  resize: 150,
  scroll: 100,
} as const;

/**
 * Auto-save intervals (in milliseconds)
 */
export const AUTO_SAVE_DELAY = {
  fast: 1000,
  normal: 3000,
  slow: 5000,
} as const;

/**
 * Toast notification durations (in milliseconds)
 */
export const TOAST_DURATION = {
  short: 3000,
  normal: 5000,
  long: 7000,
  persistent: Infinity,
} as const;

/**
 * Loading states
 */
export const LOADING_STATE = {
  minDuration: 300, // Minimum time to show loading state (prevents flash)
  timeout: 30000, // Maximum time before showing timeout error
} as const;

/**
 * Retry configuration
 */
export const RETRY_CONFIG = {
  maxAttempts: 3,
  backoffMultiplier: 2,
  initialDelay: 1000,
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
  maxPageSize: 100,
} as const;

/**
 * File upload
 */
export const FILE_UPLOAD = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  maxSizeMB: 10,
  allowedImageTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  allowedDocumentTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

/**
 * Form validation
 */
export const FORM_VALIDATION = {
  minPasswordLength: 8,
  maxPasswordLength: 128,
  minUsernameLength: 3,
  maxUsernameLength: 30,
  maxBioLength: 500,
  maxTitleLength: 100,
  maxDescriptionLength: 500,
} as const;

/**
 * Breakpoints (must match tailwind.config.ts)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Z-index layers (must match layout-config.ts)
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  overlay: 40,
  toast: 50,
} as const;

/**
 * Skeleton loading
 */
export const SKELETON = {
  minItems: 3,
  maxItems: 12,
  defaultCount: 6,
} as const;

/**
 * Accessibility
 */
export const A11Y = {
  announceDelay: 100, // Delay before announcing to screen readers
  focusDelay: 50, // Delay before focusing an element
  skipLinkOffset: 10, // Offset for skip links
} as const;

/**
 * Search
 */
export const SEARCH = {
  minQueryLength: 2,
  maxQueryLength: 100,
  debounceDelay: DEBOUNCE_DELAY.search,
  maxResults: 50,
} as const;

/**
 * Keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
  commandPalette: ["ctrl+k", "cmd+k"],
  search: ["/"],
  help: ["?"],
  escape: ["esc"],
  submit: ["ctrl+enter", "cmd+enter"],
} as const;

/**
 * Empty state messages
 */
export const EMPTY_STATE_MESSAGES = {
  noResults: "No results found",
  noData: "No data available",
  noPermission: "You don't have permission to view this",
  networkError: "Unable to load data. Please check your connection.",
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  generic: "Something went wrong. Please try again.",
  network: "Network error. Please check your connection.",
  timeout: "Request timed out. Please try again.",
  unauthorized: "You need to log in to access this.",
  forbidden: "You don't have permission to do that.",
  notFound: "The requested resource was not found.",
  validation: "Please check your input and try again.",
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  saved: "Changes saved successfully",
  created: "Created successfully",
  updated: "Updated successfully",
  deleted: "Deleted successfully",
  copied: "Copied to clipboard",
} as const;
