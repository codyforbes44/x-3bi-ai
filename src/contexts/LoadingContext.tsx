import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';

interface LoadingState {
  [key: string]: boolean;
}

interface LoadingContextType {
  isLoading: (key: string) => boolean;
  setLoading: (key: string, loading: boolean) => void;
  withLoading: <T>(key: string, fn: () => Promise<T>) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading
    }));
  }, []);

  const withLoading = useCallback(async <T,>(key: string, fn: () => Promise<T>): Promise<T> => {
    setLoading(key, true);
    try {
      const result = await fn();
      return result;
    } catch (error: any) {
      console.error(`Error in ${key}:`, error);
      toast.error(error?.message || `Operation failed: ${key}`);
      throw error;
    } finally {
      setLoading(key, false);
    }
  }, [setLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, withLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
