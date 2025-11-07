import { useState, useCallback } from "react";
import { Feature } from "@/components/dashboard/FeatureCategories";

const STORAGE_KEY = "recentFeatures";
const MAX_RECENT = 5;

export const useRecentFeatures = (allFeatures: Feature[]) => {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const addRecentFeature = useCallback((featureId: string) => {
    setRecentIds((prev) => {
      const updated = [featureId, ...prev.filter((id) => id !== featureId)].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const recentFeatures = recentIds
    .map((id) => allFeatures.find((f) => f.id === id))
    .filter(Boolean) as Feature[];

  return {
    recentFeatures,
    addRecentFeature,
  };
};
