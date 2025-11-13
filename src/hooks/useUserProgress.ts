import { useState, useEffect, useCallback } from 'react';

interface ProgressItem {
  id: string;
  type: 'tutorial' | 'course' | 'lesson';
  completed: boolean;
  progress: number; // 0-100
  startedAt?: number;
  completedAt?: number;
  lastAccessedAt: number;
}

interface CourseProgress {
  courseId: string;
  lessons: ProgressItem[];
  overallProgress: number;
}

const PROGRESS_KEY = 'user-progress';

export function useUserProgress() {
  const [progress, setProgress] = useState<Map<string, ProgressItem>>(new Map());

  // Load progress from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress(new Map(Object.entries(parsed)));
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((progressMap: Map<string, ProgressItem>) => {
    const obj = Object.fromEntries(progressMap);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(obj));
  }, []);

  // Start or update progress for an item
  const updateProgress = useCallback((
    id: string,
    type: 'tutorial' | 'course' | 'lesson',
    progressPercent: number
  ) => {
    setProgress(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(id);
      
      const updated: ProgressItem = {
        id,
        type,
        completed: progressPercent >= 100,
        progress: Math.min(100, Math.max(0, progressPercent)),
        startedAt: existing?.startedAt || Date.now(),
        completedAt: progressPercent >= 100 ? Date.now() : existing?.completedAt,
        lastAccessedAt: Date.now(),
      };

      newMap.set(id, updated);
      saveProgress(newMap);
      return newMap;
    });
  }, [saveProgress]);

  // Mark item as completed
  const markComplete = useCallback((id: string) => {
    setProgress(prev => {
      const existing = prev.get(id);
      if (!existing) return prev;

      const newMap = new Map(prev);
      newMap.set(id, {
        ...existing,
        completed: true,
        progress: 100,
        completedAt: Date.now(),
        lastAccessedAt: Date.now(),
      });
      
      saveProgress(newMap);
      return newMap;
    });
  }, [saveProgress]);

  // Get progress for a specific item
  const getProgress = useCallback((id: string): ProgressItem | undefined => {
    return progress.get(id);
  }, [progress]);

  // Get all completed items
  const getCompletedItems = useCallback((type?: 'tutorial' | 'course' | 'lesson') => {
    return Array.from(progress.values()).filter(
      item => item.completed && (!type || item.type === type)
    );
  }, [progress]);

  // Get in-progress items
  const getInProgressItems = useCallback((type?: 'tutorial' | 'course' | 'lesson') => {
    return Array.from(progress.values()).filter(
      item => !item.completed && item.progress > 0 && (!type || item.type === type)
    );
  }, [progress]);

  // Calculate course progress from multiple lessons
  const getCourseProgress = useCallback((courseId: string, lessonIds: string[]): CourseProgress => {
    const lessons = lessonIds.map(id => progress.get(id)).filter(Boolean) as ProgressItem[];
    const totalProgress = lessons.reduce((sum, lesson) => sum + lesson.progress, 0);
    const overallProgress = lessonIds.length > 0 ? totalProgress / lessonIds.length : 0;

    return {
      courseId,
      lessons,
      overallProgress,
    };
  }, [progress]);

  // Reset progress for an item
  const resetProgress = useCallback((id: string) => {
    setProgress(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      saveProgress(newMap);
      return newMap;
    });
  }, [saveProgress]);

  // Clear all progress
  const clearAllProgress = useCallback(() => {
    setProgress(new Map());
    localStorage.removeItem(PROGRESS_KEY);
  }, []);

  return {
    updateProgress,
    markComplete,
    getProgress,
    getCompletedItems,
    getInProgressItems,
    getCourseProgress,
    resetProgress,
    clearAllProgress,
  };
}
