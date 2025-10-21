import { describe, it, expect, vi } from 'vitest';
import { debounce, throttle, memoize } from '@/utils/performance';

describe('Performance Utilities', () => {
  describe('debounce', () => {
    it('delays function execution', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();

      expect(fn).not.toHaveBeenCalled();

      await new Promise(resolve => setTimeout(resolve, 150));

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('limits function execution rate', async () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);

      throttled();
      throttled();
      throttled();

      expect(fn).toHaveBeenCalledTimes(1);

      await new Promise(resolve => setTimeout(resolve, 150));

      throttled();

      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('memoize', () => {
    it('caches function results', () => {
      const fn = vi.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);

      expect(fn).toHaveBeenCalledTimes(1);

      expect(memoized(10)).toBe(20);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
