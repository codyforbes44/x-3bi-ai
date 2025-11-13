import { ReactNode } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface BaseFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

interface TextFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number';
  maxLength?: number;
  showCharCount?: boolean;
}

interface TextareaFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: 'textarea';
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
}

interface CustomFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: 'custom';
  render: (field: any) => ReactNode;
}

type FormFieldProps<T extends FieldValues> =
  | TextFormFieldProps<T>
  | TextareaFormFieldProps<T>
  | CustomFormFieldProps<T>;

/**
 * Enhanced Form Field Component
 * Wrapper around react-hook-form with built-in validation and accessibility
 */
export function FormField<T extends FieldValues>(props: FormFieldProps<T>) {
  const {
    form,
    name,
    label,
    description,
    placeholder,
    className,
    disabled = false,
    required = false,
  } = props;

  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          
          <FormControl>
            {props.type === 'custom' ? (
              props.render(field)
            ) : props.type === 'textarea' ? (
              <div className="relative">
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  disabled={disabled}
                  rows={props.rows || 4}
                  maxLength={props.maxLength}
                  className={cn(
                    fieldState.error && "border-destructive focus-visible:ring-destructive"
                  )}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error
                      ? `${name}-error`
                      : description
                      ? `${name}-description`
                      : undefined
                  }
                />
                {props.showCharCount && props.maxLength && (
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {field.value?.length || 0}/{props.maxLength}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <Input
                  {...field}
                  type={props.type || 'text'}
                  placeholder={placeholder}
                  disabled={disabled}
                  maxLength={props.maxLength}
                  className={cn(
                    fieldState.error && "border-destructive focus-visible:ring-destructive"
                  )}
                  aria-invalid={!!fieldState.error}
                  aria-describedby={
                    fieldState.error
                      ? `${name}-error`
                      : description
                      ? `${name}-description`
                      : undefined
                  }
                />
                {props.showCharCount && props.maxLength && (
                  <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                    {field.value?.length || 0}/{props.maxLength}
                  </div>
                )}
              </div>
            )}
          </FormControl>
          
          {description && (
            <FormDescription id={`${name}-description`}>
              {description}
            </FormDescription>
          )}
          
          <FormMessage id={`${name}-error`} />
        </FormItem>
      )}
    />
  );
}
