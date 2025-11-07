import { useState, useMemo } from "react";
import { Feature } from "@/components/dashboard/FeatureCategories";

export const useFeatureSearch = (features: Feature[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeatures = useMemo(() => {
    if (!searchQuery) return features;

    const query = searchQuery.toLowerCase();
    return features.filter(
      (feature) =>
        feature.title.toLowerCase().includes(query) ||
        feature.description.toLowerCase().includes(query) ||
        feature.badge.toLowerCase().includes(query)
    );
  }, [features, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFeatures,
  };
};
