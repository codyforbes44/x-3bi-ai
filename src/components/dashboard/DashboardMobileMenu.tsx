import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, Grid, Clock, Star } from "lucide-react";
import { Feature } from "./FeatureCategories";
import { useFavoriteFeatures } from "@/hooks/useFavoriteFeatures";
import { useRecentFeatures } from "@/hooks/useRecentFeatures";
import { useFeatureSearch } from "@/hooks/useFeatureSearch";
import { MobileSearchBar } from "./mobile/MobileSearchBar";
import { MobileFeatureList } from "./mobile/MobileFeatureList";
import { MobileCategorySection } from "./mobile/MobileCategorySection";
import { EMPTY_STATES } from "@/config/dashboard-features";
import { useNavigate } from "react-router-dom";

// Map feature IDs to their standalone routes
const STANDALONE_ROUTES: Record<string, string> = {
  'grok': '/grok-chat',
  'memory': '/memory',
  'analytics': '/analytics',
};

interface MobileMenuProps {
  features: Feature[];
  activeTab: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTabSelect: (tabId: string) => void;
}

export const DashboardMobileMenu = ({
  features,
  activeTab,
  open,
  onOpenChange,
  onTabSelect
}: MobileMenuProps) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavoriteFeatures();
  const { recentFeatures, addRecentFeature } = useRecentFeatures(features);
  const { searchQuery, setSearchQuery, filteredFeatures } = useFeatureSearch(features);

  const favoriteFeatures = features.filter((f) => favorites.includes(f.id));

  const handleFeatureSelect = (featureId: string) => {
    const standaloneRoute = STANDALONE_ROUTES[featureId];
    
    if (standaloneRoute) {
      navigate(standaloneRoute);
      onOpenChange(false);
    } else {
      onTabSelect(featureId);
      onOpenChange(false);
    }
    
    addRecentFeature(featureId);
  };

  const handleToggleFavorite = (featureId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(featureId);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2 h-12 text-base">
          <Menu className="w-5 h-5" />
          <span className="font-medium">Browse Features</span>
          <Badge variant="secondary" className="ml-auto">
            {features.length}
          </Badge>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[90vh] p-0 flex flex-col">
        <SheetHeader className="px-4 py-4 border-b bg-muted/30">
          <SheetTitle className="text-xl">AI Features</SheetTitle>
          
          <div className="mt-3">
            <MobileSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />
          </div>
        </SheetHeader>
        
        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-4 mx-4 mt-4">
            <TabsTrigger value="all" className="text-xs">
              <Grid className="w-3.5 h-3.5 mr-1" />
              All
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-xs">
              <Clock className="w-3.5 h-3.5 mr-1" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs">
              <Star className="w-3.5 h-3.5 mr-1" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-xs">
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1 mt-0">
            <MobileFeatureList
              features={searchQuery ? filteredFeatures : features}
              activeTab={activeTab}
              favorites={favorites}
              onSelect={handleFeatureSelect}
              onToggleFavorite={handleToggleFavorite}
              emptyState={searchQuery ? EMPTY_STATES.search : undefined}
            />
          </TabsContent>

          <TabsContent value="recent" className="flex-1 mt-0">
            <MobileFeatureList
              features={recentFeatures}
              activeTab={activeTab}
              favorites={favorites}
              onSelect={handleFeatureSelect}
              onToggleFavorite={handleToggleFavorite}
              emptyState={{ icon: Clock, ...EMPTY_STATES.recent }}
            />
          </TabsContent>

          <TabsContent value="favorites" className="flex-1 mt-0">
            <MobileFeatureList
              features={favoriteFeatures}
              activeTab={activeTab}
              favorites={favorites}
              onSelect={handleFeatureSelect}
              onToggleFavorite={handleToggleFavorite}
              emptyState={{ icon: Star, ...EMPTY_STATES.favorites }}
            />
          </TabsContent>

          <TabsContent value="categories" className="flex-1 mt-0">
            <MobileCategorySection
              features={filteredFeatures}
              activeTab={activeTab}
              favorites={favorites}
              onSelect={handleFeatureSelect}
              onToggleFavorite={handleToggleFavorite}
            />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
