/**
 * Formatting utilities for consistent data presentation
 */

import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { DATE_FORMATS } from '@/config/constants';

/**
 * Format a date to a readable string
 */
export function formatDate(
  date: Date | string | null | undefined,
  formatString: string = DATE_FORMATS.SHORT
): string {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) return '-';
  
  return format(dateObj, formatString);
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) return '-';
  
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Format a number as currency
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(
  num: number,
  decimals: number = 0,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format bytes to human-readable file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Convert snake_case to Title Case
 */
export function snakeToTitleCase(str: string): string {
  if (!str) return '';
  
  return str
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Format duration in seconds to readable format (e.g., "2h 30m")
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);
  
  return parts.join(' ');
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * Pluralize a word based on count
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const pluralForm = plural || `${singular}s`;
  return count === 1 ? singular : pluralForm;
}

/**
 * Format a count with singular/plural text (e.g., "5 items")
 */
export function formatCount(count: number, singular: string, plural?: string): string {
  return `${formatNumber(count)} ${pluralize(count, singular, plural)}`;
}

/**
 * Convert camelCase to Sentence case
 */
export function camelToSentenceCase(str: string): string {
  if (!str) return '';
  
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}

/**
 * Format initials from name (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string, maxLength: number = 2): string {
  if (!name) return '';
  
  const parts = name.trim().split(/\s+/);
  const initials = parts
    .map(part => part.charAt(0).toUpperCase())
    .join('');
    
  return initials.substring(0, maxLength);
}

/**
 * Format URL to display version (removes protocol, www, trailing slash)
 */
export function formatDisplayUrl(url: string): string {
  if (!url) return '';
  
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

/**
 * Mask sensitive information (e.g., email, credit card)
 */
export function maskString(str: string, visibleChars: number = 4, maskChar: string = '*'): string {
  if (!str || str.length <= visibleChars) return str;
  
  const visible = str.slice(-visibleChars);
  const masked = maskChar.repeat(str.length - visibleChars);
  
  return masked + visible;
}

/**
 * Format API key for display (shows first and last 4 characters)
 */
export function formatApiKey(key: string): string {
  if (!key || key.length < 8) return key;
  
  const start = key.substring(0, 4);
  const end = key.substring(key.length - 4);
  const middle = '•'.repeat(Math.min(key.length - 8, 12));
  
  return `${start}${middle}${end}`;
}
