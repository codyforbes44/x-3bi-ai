import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface ActionPrediction {
  action: string;
  probability: number;
  context: string;
}

interface UserPattern {
  path: string;
  timestamp: number;
  action?: string;
}

const STORAGE_KEY = "predictive-ui-patterns";
const MAX_PATTERNS = 100;

export function usePredictiveUI() {
  const location = useLocation();
  const [predictions, setPredictions] = useState<ActionPrediction[]>([]);

  // Load patterns from localStorage
  const loadPatterns = (): UserPattern[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Save pattern
  const savePattern = (pattern: UserPattern) => {
    const patterns = loadPatterns();
    patterns.push(pattern);
    
    // Keep only recent patterns
    const recent = patterns.slice(-MAX_PATTERNS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
  };

  // Analyze patterns and generate predictions
  const analyzePredictions = () => {
    const patterns = loadPatterns();
    const currentPath = location.pathname;
    
    // Find patterns that follow current path
    const relevantPatterns = patterns.filter((p, i) => 
      i > 0 && patterns[i - 1].path === currentPath
    );

    if (relevantPatterns.length === 0) {
      setPredictions([]);
      return;
    }

    // Count frequency of next actions
    const actionCounts = relevantPatterns.reduce((acc, pattern) => {
      const key = pattern.path + (pattern.action || "");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate probabilities
    const total = relevantPatterns.length;
    const newPredictions: ActionPrediction[] = Object.entries(actionCounts)
      .map(([key, count]) => ({
        action: key,
        probability: count / total,
        context: currentPath,
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3); // Top 3 predictions

    setPredictions(newPredictions);
  };

  // Track current page visit
  useEffect(() => {
    savePattern({
      path: location.pathname,
      timestamp: Date.now(),
    });

    analyzePredictions();
  }, [location.pathname]);

  // Track user action
  const trackAction = (action: string) => {
    savePattern({
      path: location.pathname,
      timestamp: Date.now(),
      action,
    });
  };

  return {
    predictions,
    trackAction,
  };
}
