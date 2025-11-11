import { useCallback, useRef } from 'react';

interface BatchedRequest<T> {
  key: string;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
}

interface BatchOptions {
  maxBatchSize?: number;
  batchDelay?: number;
}

export function useRequestBatcher<T>(
  batchFn: (keys: string[]) => Promise<Map<string, T>>,
  options: BatchOptions = {}
) {
  const { maxBatchSize = 10, batchDelay = 50 } = options;
  const queue = useRef<BatchedRequest<T>[]>([]);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const processBatch = useCallback(async () => {
    if (queue.current.length === 0) return;

    const batch = queue.current.splice(0, maxBatchSize);
    const keys = batch.map(req => req.key);

    try {
      const results = await batchFn(keys);
      
      batch.forEach(req => {
        const result = results.get(req.key);
        if (result !== undefined) {
          req.resolve(result);
        } else {
          req.reject(new Error(`No result for key: ${req.key}`));
        }
      });
    } catch (error) {
      batch.forEach(req => req.reject(error as Error));
    }

    // Process remaining items if any
    if (queue.current.length > 0) {
      timeout.current = setTimeout(processBatch, 0);
    }
  }, [batchFn, maxBatchSize]);

  const request = useCallback((key: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      queue.current.push({ key, resolve, reject });

      // Clear existing timeout
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      // Schedule batch processing
      if (queue.current.length >= maxBatchSize) {
        // Process immediately if batch is full
        processBatch();
      } else {
        // Wait for more requests
        timeout.current = setTimeout(processBatch, batchDelay);
      }
    });
  }, [processBatch, maxBatchSize, batchDelay]);

  return { request };
}
