import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Search, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  showRecentSearches?: boolean;
  autoFocus?: boolean;
}

const RECENT_SEARCHES_KEY = "recent-searches";
const MAX_RECENT_SEARCHES = 5;

export function SearchBar({
  placeholder = "Search...",
  onSearch,
  className,
  showRecentSearches = true,
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (showRecentSearches) {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    }
  }, [showRecentSearches]);

  // Keyboard shortcuts (Cmd/Ctrl + K to focus)
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim() || !showRecentSearches) return;

    const updated = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      saveRecentSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(query);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  const handleRecentClick = (recentQuery: string) => {
    setQuery(recentQuery);
    handleSearch(recentQuery);
    setIsFocused(false);
  };

  const showDropdown = isFocused && showRecentSearches && recentSearches.length > 0 && !query;

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="pl-10 pr-20"
          aria-label="Search"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 w-7 p-0"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Recent Searches Dropdown */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-lg z-50 py-2 animate-in fade-in-50 slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
            Recent Searches
          </div>
          {recentSearches.map((recent, index) => (
            <button
              key={index}
              onClick={() => handleRecentClick(recent)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent flex items-center gap-2 transition-colors"
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 truncate">{recent}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
