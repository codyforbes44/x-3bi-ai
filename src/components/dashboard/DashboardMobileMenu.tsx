import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, Search, Star, Clock, Grid, X, ChevronDown } from "lucide-react";
import { Feature } from "./FeatureCategories";

interface MobileMenuProps {
  features: Feature[];
  activeTab: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTabSelect: (tabId: string) => void;
}

const CATEGORY_LABELS = {
  enterprise: 'Enterprise Features',
  'advanced-ai': 'Advanced AI',
  'ai-tools': 'AI Tools',
  utilities: 'Utilities',
} as const;

const CATEGORY_ORDER: Array<keyof typeof CATEGORY_LABELS> = [
  'enterprise',
  'advanced-ai',
  'ai-tools',
  'utilities'
];

const CATEGORY_ICONS = {
  enterprise: '🏢',
  'advanced-ai': '🧠',
  'ai-tools': '🤖',
  utilities: '🛠️',
};

export const DashboardMobileMenu = ({
  features,
  activeTab,
  open,
  onOpenChange,
  onTabSelect
}: MobileMenuProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    enterprise: true,
    'advanced-ai': true,
    'ai-tools': true,
    utilities: true,
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteFeatures");
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentFeatures");
    return saved ? JSON.parse(saved) : [];
  });

  const handleFeatureSelect = (featureId: string) => {
    onTabSelect(featureId);
    onOpenChange(false);
    
    // Update recently used
    const updated = [featureId, ...recentlyUsed.filter(id => id !== featureId)].slice(0, 5);
    setRecentlyUsed(updated);
    localStorage.setItem("recentFeatures", JSON.stringify(updated));
  };

  const toggleFavorite = (featureId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.includes(featureId)
      ? favorites.filter(id => id !== featureId)
      : [...favorites, featureId];
    setFavorites(updated);
    localStorage.setItem("favoriteFeatures", JSON.stringify(updated));
  };

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const filteredFeatures = useMemo(() => 
    features.filter(feature =>
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.badge.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [features, searchQuery]
  );

  const favoriteFeatures = useMemo(() => 
    features.filter(f => favorites.includes(f.id)),
    [features, favorites]
  );
  
  const recentFeatures = useMemo(() => 
    recentlyUsed
      .map(id => features.find(f => f.id === id))
      .filter(Boolean) as Feature[],
    [features, recentlyUsed]
  );

  const renderFeatureCard = (feature: Feature) => {
    const isFavorite = favorites.includes(feature.id);
    const isActive = activeTab === feature.id;

    return (
      <button
        key={feature.id}
        onClick={() => handleFeatureSelect(feature.id)}
        className={`w-full flex items-start gap-3 p-4 text-sm rounded-xl text-left transition-all border-2 ${
          isActive 
            ? 'border-primary bg-primary/5 shadow-sm' 
            : 'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
      >
        <div className={`p-2.5 rounded-lg bg-background ${isActive ? 'ring-2 ring-primary' : ''}`}>
          <feature.icon className={`w-5 h-5 ${feature.color}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base">{feature.title}</h3>
            <button
              onClick={(e) => toggleFavorite(feature.id, e)}
              className="flex-shrink-0"
            >
              <Star
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {feature.description}
          </p>
          <Badge variant="secondary" className="text-[10px] h-5">
            {feature.badge}
          </Badge>
        </div>
      </button>
    );
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
      
      <SheetContent side="bottom" className="h-[90vh] p-0 flex flex-col bg-background">
        <SheetHeader className="px-4 py-4 border-b bg-muted/30 shrink-0">
          <SheetTitle className="text-xl">AI Features</SheetTitle>
          
          {/* Search Bar */}
          <div className="relative mt-3 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
            <Input
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-11 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hover:bg-muted rounded-sm p-1 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
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
            <ScrollArea className="h-full px-4 pb-4">
              <div className="grid grid-cols-1 gap-3 py-4">
                {searchQuery ? (
                  filteredFeatures.length > 0 ? (
                    filteredFeatures.map(renderFeatureCard)
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No features found</p>
                      <p className="text-sm text-muted-foreground mt-1">Try a different search</p>
                    </div>
                  )
                ) : (
                  features.map(renderFeatureCard)
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent" className="flex-1 mt-0">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="grid grid-cols-1 gap-3 py-4">
                {recentFeatures.length > 0 ? (
                  recentFeatures.map(renderFeatureCard)
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No recent features</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Features you use will appear here
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="favorites" className="flex-1 mt-0">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="grid grid-cols-1 gap-3 py-4">
                {favoriteFeatures.length > 0 ? (
                  favoriteFeatures.map(renderFeatureCard)
                ) : (
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No favorites yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tap the star icon to save features
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="categories" className="flex-1 mt-0">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="space-y-4 py-4">
                {CATEGORY_ORDER.map((category) => {
                  const categoryFeatures = filteredFeatures.filter(f => f.category === category);
                  if (categoryFeatures.length === 0) return null;
                  const isExpanded = expandedCategories[category];

                  return (
                    <Collapsible
                      key={category}
                      open={isExpanded}
                      onOpenChange={() => toggleCategory(category)}
                    >
                      <CollapsibleTrigger asChild>
                        <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{CATEGORY_ICONS[category]}</span>
                            <div className="text-left">
                              <h3 className="font-semibold text-base">
                                {CATEGORY_LABELS[category]}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {categoryFeatures.length} feature{categoryFeatures.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="grid grid-cols-1 gap-3 mt-3">
                          {categoryFeatures.map(renderFeatureCard)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
