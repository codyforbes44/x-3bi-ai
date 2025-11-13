import { useState, useEffect, useCallback } from 'react';

interface RecentItem {
  id: string;
  title: string;
  path: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

const STORAGE_KEY = 'recently-viewed';
const MAX_ITEMS = 10;

export function useRecentlyViewed(category?: string) {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  const storageKey = category ? `${STORAGE_KEY}-${category}` : STORAGE_KEY;

  // Load recent items from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const items = JSON.parse(stored);
        setRecentItems(items);
      } catch (error) {
        console.error('Failed to load recent items:', error);
      }
    }
  }, [storageKey]);

  // Add item to recently viewed
  const addRecentItem = useCallback((item: Omit<RecentItem, 'timestamp'>) => {
    setRecentItems(prev => {
      // Remove existing item with same id
      const filtered = prev.filter(i => i.id !== item.id);
      
      // Add new item at the beginning with timestamp
      const newItems = [
        { ...item, timestamp: Date.now() },
        ...filtered
      ].slice(0, MAX_ITEMS);

      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify(newItems));
      
      return newItems;
    });
  }, [storageKey]);

  // Remove item from recently viewed
  const removeRecentItem = useCallback((id: string) => {
    setRecentItems(prev => {
      const filtered = prev.filter(i => i.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(filtered));
      return filtered;
    });
  }, [storageKey]);

  // Clear all recent items
  const clearRecentItems = useCallback(() => {
    setRecentItems([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  // Get items from the last N days
  const getRecentItemsSince = useCallback((days: number) => {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return recentItems.filter(item => item.timestamp >= cutoff);
  }, [recentItems]);

  return {
    recentItems,
    addRecentItem,
    removeRecentItem,
    clearRecentItems,
    getRecentItemsSince,
  };
}
