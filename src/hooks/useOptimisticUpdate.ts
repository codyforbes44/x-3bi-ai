import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

interface OptimisticUpdateOptions<T> {
  /**
   * The async function that performs the actual update
   */
  updateFn: () => Promise<T>;
  /**
   * Success callback
   */
  onSuccess?: (result: T) => void;
  /**
   * Error callback
   */
  onError?: (error: Error) => void;
  /**
   * Success message to show
   */
  successMessage?: string;
  /**
   * Error message to show
   */
  errorMessage?: string;
  /**
   * Whether to show toast notifications
   */
  showToast?: boolean;
}

/**
 * Hook for optimistic UI updates
 * Immediately applies the optimistic update, then syncs with the server
 */
export function useOptimisticUpdate<TData, TOptimistic = TData>() {
  const [isPending, setIsPending] = useState(false);

  const performUpdate = useCallback(
    async <T = TData>(
      currentData: TData,
      optimisticData: TOptimistic,
      options: OptimisticUpdateOptions<T>
    ): Promise<{ data: TData; rollback: () => void }> => {
      const {
        updateFn,
        onSuccess,
        onError,
        successMessage,
        errorMessage = "Update failed",
        showToast = true,
      } = options;

      // Store the original data for rollback
      const originalData = currentData;

      // Function to rollback the optimistic update
      const rollback = () => {
        return originalData;
      };

      try {
        setIsPending(true);

        // Immediately return the optimistic data
        const optimisticResult = {
          data: optimisticData as unknown as TData,
          rollback,
        };

        // Perform the actual update in the background
        const result = await updateFn();

        // Success!
        if (onSuccess) {
          onSuccess(result);
        }

        if (showToast && successMessage) {
          toast({
            title: "Success",
            description: successMessage,
          });
        }

        return optimisticResult;
      } catch (error) {
        // On error, we need to rollback
        if (onError && error instanceof Error) {
          onError(error);
        }

        if (showToast) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error instanceof Error ? error.message : errorMessage,
          });
        }

        // Return the original data
        return {
          data: originalData,
          rollback,
        };
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return {
    performUpdate,
    isPending,
  };
}

/**
 * Simpler version for toggle operations
 */
export function useOptimisticToggle() {
  const [isPending, setIsPending] = useState(false);

  const toggle = useCallback(
    async (
      currentValue: boolean,
      updateFn: (value: boolean) => Promise<void>,
      options?: {
        successMessage?: string;
        errorMessage?: string;
      }
    ): Promise<boolean> => {
      const optimisticValue = !currentValue;

      try {
        setIsPending(true);

        // Immediately return optimistic value
        // Update happens in background
        await updateFn(optimisticValue);

        if (options?.successMessage) {
          toast({
            description: options.successMessage,
          });
        }

        return optimisticValue;
      } catch (error) {
        // Rollback on error
        toast({
          variant: "destructive",
          description:
            error instanceof Error
              ? error.message
              : options?.errorMessage || "Update failed",
        });

        return currentValue;
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return {
    toggle,
    isPending,
  };
}
