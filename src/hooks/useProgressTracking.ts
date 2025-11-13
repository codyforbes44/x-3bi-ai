import { useState, useEffect } from "react";

interface ProgressData {
  completedItems: string[];
  startedItems: string[];
  lastUpdated: string;
}

const STORAGE_KEY = "learning_progress";

/**
 * Hook for tracking learning progress (tutorials, courses, etc.)
 * Stores progress in localStorage
 */
export const useProgressTracking = () => {
  const [progress, setProgress] = useState<ProgressData>({
    completedItems: [],
    startedItems: [],
    lastUpdated: new Date().toISOString()
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse progress data:", e);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: ProgressData) => {
    const updated = { ...newProgress, lastUpdated: new Date().toISOString() };
    setProgress(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Mark an item as started
  const markAsStarted = (itemId: string) => {
    if (!progress.startedItems.includes(itemId) && !progress.completedItems.includes(itemId)) {
      saveProgress({
        ...progress,
        startedItems: [...progress.startedItems, itemId]
      });
    }
  };

  // Mark an item as completed
  const markAsCompleted = (itemId: string) => {
    saveProgress({
      ...progress,
      completedItems: [...progress.completedItems, itemId],
      startedItems: progress.startedItems.filter(id => id !== itemId)
    });
  };

  // Reset progress for an item
  const resetProgress = (itemId: string) => {
    saveProgress({
      ...progress,
      completedItems: progress.completedItems.filter(id => id !== itemId),
      startedItems: progress.startedItems.filter(id => id !== itemId)
    });
  };

  // Clear all progress
  const clearAllProgress = () => {
    saveProgress({
      completedItems: [],
      startedItems: [],
      lastUpdated: new Date().toISOString()
    });
  };

  // Get status of an item
  const getItemStatus = (itemId: string): "not-started" | "in-progress" | "completed" => {
    if (progress.completedItems.includes(itemId)) return "completed";
    if (progress.startedItems.includes(itemId)) return "in-progress";
    return "not-started";
  };

  // Calculate completion percentage
  const getCompletionPercentage = (totalItems: number): number => {
    if (totalItems === 0) return 0;
    return Math.round((progress.completedItems.length / totalItems) * 100);
  };

  // Check if an item is completed
  const isCompleted = (itemId: string): boolean => {
    return progress.completedItems.includes(itemId);
  };

  // Check if an item is in progress
  const isInProgress = (itemId: string): boolean => {
    return progress.startedItems.includes(itemId);
  };

  return {
    progress,
    markAsStarted,
    markAsCompleted,
    resetProgress,
    clearAllProgress,
    getItemStatus,
    getCompletionPercentage,
    isCompleted,
    isInProgress,
    totalCompleted: progress.completedItems.length,
    totalInProgress: progress.startedItems.length
  };
}
