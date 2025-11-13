import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationPage {
  path: string;
  title: string;
  timestamp: number;
}

const STORAGE_KEY = 'navigation-history';
const FAVORITES_KEY = 'navigation-favorites';
const MAX_HISTORY = 20;

/**
 * Navigation History Hook
 * Tracks and manages navigation history and favorites
 */
export function useNavigationHistory() {
  const location = useLocation();
  const [recentPages, setRecentPages] = useState<NavigationPage[]>([]);
  const [favoritePages, setFavoritePages] = useState<NavigationPage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);

    if (storedHistory) {
      try {
        setRecentPages(JSON.parse(storedHistory));
      } catch (e) {
        console.error('Failed to parse navigation history:', e);
      }
    }

    if (storedFavorites) {
      try {
        setFavoritePages(JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
  }, []);

  // Track navigation
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Skip tracking for auth and error pages
    if (currentPath === '/auth' || currentPath === '/404') {
      return;
    }

    // Get page title from document or generate from path
    const title = document.title || formatPathToTitle(currentPath);

    const newPage: NavigationPage = {
      path: currentPath,
      title,
      timestamp: Date.now(),
    };

    setRecentPages((prev) => {
      // Remove duplicate if exists
      const filtered = prev.filter((page) => page.path !== currentPath);
      
      // Add new page to beginning
      const updated = [newPage, ...filtered].slice(0, MAX_HISTORY);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return updated;
    });
  }, [location.pathname]);

  /**
   * Toggle favorite status of a page
   */
  const toggleFavorite = (path: string, title?: string) => {
    setFavoritePages((prev) => {
      const exists = prev.find((page) => page.path === path);

      let updated: NavigationPage[];
      if (exists) {
        // Remove from favorites
        updated = prev.filter((page) => page.path !== path);
      } else {
        // Add to favorites
        const pageTitle = title || formatPathToTitle(path);
        updated = [
          ...prev,
          { path, title: pageTitle, timestamp: Date.now() },
        ];
      }

      // Save to localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  /**
   * Check if a page is favorited
   */
  const isFavorite = (path: string): boolean => {
    return favoritePages.some((page) => page.path === path);
  };

  /**
   * Clear navigation history
   */
  const clearHistory = () => {
    setRecentPages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavoritePages([]);
    localStorage.removeItem(FAVORITES_KEY);
  };

  return {
    recentPages,
    favoritePages,
    toggleFavorite,
    isFavorite,
    clearHistory,
    clearFavorites,
  };
}

/**
 * Format path to readable title
 */
function formatPathToTitle(path: string): string {
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length === 0) return 'Home';

  const lastSegment = segments[segments.length - 1];
  
  return lastSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
