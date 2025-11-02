/**
 * Form validation schemas using Zod
 * Centralized validation for all forms in the application
 */

import { z } from "zod";

/**
 * Contact form validation
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters")
});

/**
 * Newsletter subscription validation
 */
export const newsletterSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  interests: z.array(z.string()).optional()
});

/**
 * Profile update validation
 */
export const profileSchema = z.object({
  display_name: z.string().trim().min(1, "Display name is required").max(100, "Display name must be less than 100 characters")
    .refine(val => !val.includes('@'), "Display name should not contain email addresses")
    .refine(val => !/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(val), "Display name should not contain phone numbers"),
  bio: z.string().trim().max(500, "Bio must be less than 500 characters").optional(),
  avatar_url: z.string().url("Invalid URL").optional().or(z.literal(''))
});

/**
 * Volunteer application validation
 */
export const volunteerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  role: z.string().trim().min(1, "Role is required").max(100, "Role must be less than 100 characters"),
  experience: z.string().trim().min(10, "Please provide more details about your experience").max(2000, "Experience must be less than 2000 characters"),
  motivation: z.string().trim().min(10, "Please provide more details about your motivation").max(2000, "Motivation must be less than 2000 characters")
});

/**
 * Donation validation
 */
export const donationSchema = z.object({
  amount: z.string().refine(val => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num <= 100000;
  }, "Amount must be a valid number between $0 and $100,000"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters").optional(),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional()
});

/**
 * Issue report validation
 */
export const issueSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().trim().min(10, "Please provide more details").max(5000, "Description must be less than 5000 characters"),
  category: z.string().min(1, "Category is required")
});

/**
 * Workspace creation validation
 */
export const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Workspace name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().trim().max(500, "Description must be less than 500 characters").optional()
});

/**
 * Workflow creation validation
 */
export const workflowSchema = z.object({
  name: z.string().trim().min(1, "Workflow name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().trim().max(500, "Description must be less than 500 characters").optional(),
  trigger_type: z.enum(['manual', 'schedule', 'webhook', 'event'])
});

/**
 * AI prompt validation (for chat/image/code generation)
 */
export const aiPromptSchema = z.object({
  prompt: z.string().trim().min(1, "Prompt is required").max(10000, "Prompt must be less than 10,000 characters"),
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().min(1).max(32000).optional()
});

/**
 * Generic text input validation
 */
export const textInputSchema = z.object({
  text: z.string().trim().min(1, "Input is required").max(10000, "Input must be less than 10,000 characters")
});

/**
 * URL validation
 */
export const urlSchema = z.object({
  url: z.string().url("Invalid URL format").max(2048, "URL must be less than 2048 characters")
});

/**
 * File upload validation helper
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = [] } = options; // Default 5MB

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
    };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  return { valid: true };
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Validate and sanitize user input
 */
export function sanitizeInput(input: string, maxLength: number = 10000): string {
  let sanitized = input.trim();
  
  // Remove any HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}
