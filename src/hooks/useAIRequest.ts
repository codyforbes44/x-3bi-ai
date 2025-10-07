import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseAIRequestOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useAIRequest(functionName: string, options: UseAIRequestOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const execute = async (body: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase.functions.invoke(functionName, {
        body,
      });

      if (supabaseError) throw supabaseError;

      if (options.successMessage) {
        toast({
          title: 'Success',
          description: options.successMessage,
        });
      }

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      return data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      
      console.error(`Error in ${functionName}:`, error);
      
      toast({
        title: 'Error',
        description: options.errorMessage || `Failed to execute ${functionName}. Please try again.`,
        variant: 'destructive',
      });

      if (options.onError) {
        options.onError(error);
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
}
