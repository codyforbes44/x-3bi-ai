import { useState, useEffect, useCallback } from 'react';
import { useRecentlyViewed } from './useRecentlyViewed';

interface UserPreferences {
  favoriteFeatures: string[];
  preferredLayout: 'grid' | 'list';
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
}

interface UserActivity {
  mostUsedFeatures: Array<{ id: string; count: number }>;
  lastVisit: number;
  totalSessions: number;
}

const PREFERENCES_KEY = 'user-preferences';
const ACTIVITY_KEY = 'user-activity';

const defaultPreferences: UserPreferences = {
  favoriteFeatures: [],
  preferredLayout: 'grid',
  theme: 'system',
  notifications: true,
};

export function usePersonalization() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [activity, setActivity] = useState<UserActivity>({
    mostUsedFeatures: [],
    lastVisit: Date.now(),
    totalSessions: 0,
  });
  const { recentItems } = useRecentlyViewed();

  // Load preferences and activity
  useEffect(() => {
    const storedPrefs = localStorage.getItem(PREFERENCES_KEY);
    const storedActivity = localStorage.getItem(ACTIVITY_KEY);

    if (storedPrefs) {
      try {
        setPreferences(JSON.parse(storedPrefs));
      } catch (error) {
        console.error('Failed to load preferences:', error);
      }
    }

    if (storedActivity) {
      try {
        const parsed = JSON.parse(storedActivity);
        setActivity({
          ...parsed,
          totalSessions: parsed.totalSessions + 1,
        });
      } catch (error) {
        console.error('Failed to load activity:', error);
      }
    }
  }, []);

  // Save preferences
  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Track feature usage
  const trackFeatureUsage = useCallback((featureId: string) => {
    setActivity(prev => {
      const existing = prev.mostUsedFeatures.find(f => f.id === featureId);
      
      let updated: UserActivity;
      if (existing) {
        updated = {
          ...prev,
          mostUsedFeatures: prev.mostUsedFeatures
            .map(f => f.id === featureId ? { ...f, count: f.count + 1 } : f)
            .sort((a, b) => b.count - a.count),
        };
      } else {
        updated = {
          ...prev,
          mostUsedFeatures: [
            ...prev.mostUsedFeatures,
            { id: featureId, count: 1 }
          ].sort((a, b) => b.count - a.count),
        };
      }

      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Toggle favorite feature
  const toggleFavorite = useCallback((featureId: string) => {
    updatePreferences({
      favoriteFeatures: preferences.favoriteFeatures.includes(featureId)
        ? preferences.favoriteFeatures.filter(id => id !== featureId)
        : [...preferences.favoriteFeatures, featureId],
    });
  }, [preferences.favoriteFeatures, updatePreferences]);

  // Get personalized recommendations based on usage
  const getRecommendations = useCallback(() => {
    const topFeatures = activity.mostUsedFeatures.slice(0, 5);
    const recentPaths = recentItems.slice(0, 5).map(item => item.path);
    
    return {
      suggestedFeatures: topFeatures,
      recentlyViewed: recentPaths,
      shouldOnboard: activity.totalSessions < 3,
    };
  }, [activity, recentItems]);

  return {
    preferences,
    activity,
    updatePreferences,
    trackFeatureUsage,
    toggleFavorite,
    getRecommendations,
  };
}
