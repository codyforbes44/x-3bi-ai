import { useState } from 'react';
import { z, ZodError, ZodSchema } from 'zod';

interface ValidationOptions {
  /**
   * Sanitize input before validation
   */
  sanitize?: boolean;
  /**
   * Transform data after validation
   */
  transform?: (data: any) => any;
}

/**
 * Form Validation Hook
 * Provides client-side validation with Zod schemas
 */
export function useFormValidation<T extends ZodSchema>(
  schema: T,
  options: ValidationOptions = {}
) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  /**
   * Sanitize input string
   */
  const sanitizeInput = (value: any): any => {
    if (typeof value === 'string') {
      return value.trim();
    }
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).reduce((acc, key) => {
        acc[key] = sanitizeInput(value[key]);
        return acc;
      }, {} as any);
    }
    return value;
  };

  /**
   * Validate data against schema
   */
  const validate = async (data: any): Promise<{
    success: boolean;
    data?: z.infer<T>;
    errors?: Record<string, string>;
  }> => {
    setIsValidating(true);
    setErrors({});

    try {
      // Sanitize if enabled
      const inputData = options.sanitize ? sanitizeInput(data) : data;

      // Validate with schema
      const validatedData = await schema.parseAsync(inputData);

      // Transform if needed
      const finalData = options.transform
        ? options.transform(validatedData)
        : validatedData;

      setIsValidating(false);
      return { success: true, data: finalData };
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          const path = err.path.join('.');
          acc[path] = err.message;
          return acc;
        }, {} as Record<string, string>);

        setErrors(formattedErrors);
        setIsValidating(false);
        return { success: false, errors: formattedErrors };
      }

      setIsValidating(false);
      return {
        success: false,
        errors: { _form: 'An unexpected error occurred during validation' },
      };
    }
  };

  /**
   * Validate a single field
   */
  const validateField = async (
    fieldName: string,
    value: any
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Create a partial schema for the field
      const fieldSchema = (schema as any).shape?.[fieldName];
      
      if (!fieldSchema) {
        return { success: true };
      }

      const inputValue = options.sanitize ? sanitizeInput(value) : value;
      await fieldSchema.parseAsync(inputValue);

      // Clear field error
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });

      return { success: true };
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors[0]?.message || 'Invalid value';
        
        setErrors((prev) => ({
          ...prev,
          [fieldName]: errorMessage,
        }));

        return { success: false, error: errorMessage };
      }

      return { success: false, error: 'Validation error' };
    }
  };

  /**
   * Clear all errors
   */
  const clearErrors = () => {
    setErrors({});
  };

  /**
   * Clear specific field error
   */
  const clearFieldError = (fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  /**
   * Set custom error
   */
  const setError = (fieldName: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: message,
    }));
  };

  return {
    validate,
    validateField,
    errors,
    isValidating,
    clearErrors,
    clearFieldError,
    setError,
    hasErrors: Object.keys(errors).length > 0,
  };
}

/**
 * Common validation schemas
 */
export const commonSchemas = {
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),

  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),

  url: z.string()
    .trim()
    .url('Invalid URL')
    .max(2000, 'URL must be less than 2000 characters'),

  phone: z.string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),

  message: z.string()
    .trim()
    .min(1, 'Message is required')
    .max(1000, 'Message must be less than 1000 characters'),
};
