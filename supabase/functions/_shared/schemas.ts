/**
 * Common validation schemas for edge functions
 */

// Simple validation helpers (Zod-like interface without the dependency)
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateString(value: any, field: string, options: { minLength?: number; maxLength?: number } = {}): string {
  if (typeof value !== 'string') {
    throw new ValidationError(`${field} must be a string`);
  }
  if (options.minLength && value.length < options.minLength) {
    throw new ValidationError(`${field} must be at least ${options.minLength} characters`);
  }
  if (options.maxLength && value.length > options.maxLength) {
    throw new ValidationError(`${field} must be at most ${options.maxLength} characters`);
  }
  return value;
}

function validateArray(value: any, field: string, options: { minLength?: number; maxLength?: number } = {}): any[] {
  if (!Array.isArray(value)) {
    throw new ValidationError(`${field} must be an array`);
  }
  if (options.minLength && value.length < options.minLength) {
    throw new ValidationError(`${field} must have at least ${options.minLength} items`);
  }
  if (options.maxLength && value.length > options.maxLength) {
    throw new ValidationError(`${field} must have at most ${options.maxLength} items`);
  }
  return value;
}

function validateBoolean(value: any, field: string): boolean {
  if (typeof value !== 'boolean') {
    throw new ValidationError(`${field} must be a boolean`);
  }
  return value;
}

function validateEnum<T extends string>(value: any, field: string, allowedValues: readonly T[]): T {
  if (!allowedValues.includes(value)) {
    throw new ValidationError(`${field} must be one of: ${allowedValues.join(', ')}`);
  }
  return value;
}

/**
 * Chat message schema
 */
export const ChatMessageSchema = {
  parse(data: any) {
    const messages = validateArray(data.messages, 'messages', { minLength: 1, maxLength: 100 });
    
    // Validate each message
    messages.forEach((msg: any, i: number) => {
      if (!msg.role || !msg.content) {
        throw new ValidationError(`Message at index ${i} must have role and content`);
      }
      validateString(msg.role, `messages[${i}].role`);
      validateString(msg.content, `messages[${i}].content`);
    });

    return {
      messages,
      model: data.model ? validateString(data.model, 'model', { maxLength: 100 }) : 'google/gemini-2.5-flash',
      stream: data.stream !== undefined ? validateBoolean(data.stream, 'stream') : false,
    };
  }
};

/**
 * Image generation schema
 */
export const ImageGenerationSchema = {
  parse(data: any) {
    return {
      prompt: validateString(data.prompt, 'prompt', { minLength: 1, maxLength: 5000 }),
      model: data.model || 'google/gemini-2.5-flash-image-preview',
    };
  }
};

/**
 * Code task schema
 */
const VALID_TASKS = ['explain', 'optimize', 'debug', 'convert'] as const;

export const CodeTaskSchema = {
  parse(data: any) {
    return {
      code: validateString(data.code, 'code', { maxLength: 50000 }),
      language: validateString(data.language, 'language', { maxLength: 50 }),
      task: validateEnum(data.task, 'task', VALID_TASKS),
      model: data.model ? validateString(data.model, 'model', { maxLength: 100 }) : 'google/gemini-2.5-flash',
    };
  }
};

/**
 * Prompt schema (generic)
 */
export const PromptSchema = {
  parse(data: any) {
    return {
      prompt: validateString(data.prompt, 'prompt', { minLength: 1, maxLength: 10000 }),
      model: data.model ? validateString(data.model, 'model', { maxLength: 100 }) : undefined,
    };
  }
};
