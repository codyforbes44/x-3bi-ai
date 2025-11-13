import { Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";

interface QuickNavProps {
  /**
   * Show favorites
   */
  showFavorites?: boolean;
  /**
   * Show recent pages
   */
  showRecent?: boolean;
  /**
   * Maximum recent items to show
   */
  maxRecent?: number;
}

/**
 * Quick Navigation Component
 * Provides quick access to recent and favorite pages
 */
export function QuickNav({
  showFavorites = true,
  showRecent = true,
  maxRecent = 5,
}: QuickNavProps) {
  const { recentPages, favoritePages, toggleFavorite } = useNavigationHistory();

  const recentItems = recentPages.slice(0, maxRecent);

  // Don't show if no items
  if (recentItems.length === 0 && favoritePages.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Quick navigation">
          <Clock className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {showRecent && recentItems.length > 0 && (
          <>
            <DropdownMenuLabel className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Pages
            </DropdownMenuLabel>
            {recentItems.map((page) => (
              <DropdownMenuItem key={page.path} asChild>
                <Link
                  to={page.path}
                  className="flex items-center justify-between w-full"
                >
                  <span className="truncate">{page.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(page.timestamp)}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {showFavorites && favoritePages.length > 0 && (
          <>
            {showRecent && recentItems.length > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </DropdownMenuLabel>
            {favoritePages.map((page) => (
              <DropdownMenuItem key={page.path} asChild>
                <Link
                  to={page.path}
                  className="flex items-center justify-between w-full group"
                >
                  <span className="truncate">{page.title}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(page.path, page.title);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove from favorites"
                  >
                    <Star className="h-3 w-3 fill-primary text-primary" />
                  </button>
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {recentItems.length === 0 && favoritePages.length === 0 && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No recent pages
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Format timestamp for display
 */
function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
}
