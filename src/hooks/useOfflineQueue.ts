import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface QueuedAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

/**
 * Hook to queue actions when offline and process them when back online
 * Useful for chat messages, form submissions, etc.
 */
export function useOfflineQueue() {
  const [queue, setQueue] = useState<QueuedAction[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    // Load queue from localStorage on mount
    const savedQueue = localStorage.getItem('offline-queue');
    if (savedQueue) {
      try {
        setQueue(JSON.parse(savedQueue));
      } catch (error) {
        console.error('Failed to load offline queue:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save queue to localStorage whenever it changes
    if (queue.length > 0) {
      localStorage.setItem('offline-queue', JSON.stringify(queue));
    } else {
      localStorage.removeItem('offline-queue');
    }
  }, [queue]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (queue.length > 0) {
        toast({
          title: 'Back online',
          description: `Processing ${queue.length} queued action${queue.length > 1 ? 's' : ''}...`,
        });
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: 'No internet connection',
        description: 'Your actions will be saved and sent when you\'re back online.',
        variant: 'destructive',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [queue.length, toast]);

  const addToQueue = useCallback((type: string, payload: any) => {
    const action: QueuedAction = {
      id: crypto.randomUUID(),
      type,
      payload,
      timestamp: Date.now(),
    };
    
    setQueue(prev => [...prev, action]);
    
    toast({
      title: 'Saved for later',
      description: 'Your action will be sent when you\'re back online.',
    });

    return action.id;
  }, [toast]);

  const processQueue = useCallback(async (
    processor: (action: QueuedAction) => Promise<void>
  ) => {
    if (!isOnline || queue.length === 0) return;

    const processedIds: string[] = [];
    
    for (const action of queue) {
      try {
        await processor(action);
        processedIds.push(action.id);
      } catch (error) {
        console.error('Failed to process queued action:', error);
        // Keep failed actions in queue
      }
    }

    // Remove successfully processed actions
    if (processedIds.length > 0) {
      setQueue(prev => prev.filter(action => !processedIds.includes(action.id)));
      
      toast({
        title: 'Queue processed',
        description: `${processedIds.length} action${processedIds.length > 1 ? 's' : ''} completed.`,
      });
    }
  }, [isOnline, queue, toast]);

  const clearQueue = useCallback(() => {
    setQueue([]);
    localStorage.removeItem('offline-queue');
  }, []);

  return {
    queue,
    isOnline,
    addToQueue,
    processQueue,
    clearQueue,
    queueCount: queue.length,
  };
}
