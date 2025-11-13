import { useMemo } from "react";

interface SearchOptions {
  keys: string[]; // Object keys to search in
  threshold?: number; // 0-1, lower = stricter matching
}

/**
 * Client-side fuzzy search across object properties
 */
export const useFuzzySearch = <T extends Record<string, any>>(
  items: T[],
  query: string,
  options: SearchOptions
) => {
  const { keys, threshold = 0.3 } = options;
  
  const results = useMemo(() => {
    if (!query.trim()) return items;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return items.filter(item => {
      return keys.some(key => {
        const value = String(item[key] || '').toLowerCase();
        
        // Exact match
        if (value.includes(normalizedQuery)) return true;
        
        // Fuzzy match: check if all query chars appear in order
        let queryIndex = 0;
        for (let i = 0; i < value.length && queryIndex < normalizedQuery.length; i++) {
          if (value[i] === normalizedQuery[queryIndex]) {
            queryIndex++;
          }
        }
        
        const matchRatio = queryIndex / normalizedQuery.length;
        return matchRatio >= (1 - threshold);
      });
    });
  }, [items, query, keys, threshold]);
  
  return results;
};
