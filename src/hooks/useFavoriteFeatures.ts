import { useState, useCallback } from "react";

const STORAGE_KEY = "favoriteFeatures";

export const useFavoriteFeatures = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = useCallback((featureId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback((featureId: string) => {
    return favorites.includes(featureId);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
