import { useState, useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getAllFeatures, Feature } from "@/components/dashboard/FeatureCategories";
import { Search, Star, Clock, Sparkles, X, ChevronDown } from "lucide-react";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { open } = useSidebar();
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

  const features = getAllFeatures();

  // Track feature usage
  const handleFeatureClick = (featureId: string) => {
    onTabChange(featureId);
    
    // Update recently used
    const updated = [featureId, ...recentlyUsed.filter(id => id !== featureId)].slice(0, 5);
    setRecentlyUsed(updated);
    localStorage.setItem("recentFeatures", JSON.stringify(updated));
  };

  // Toggle favorite
  const toggleFavorite = (featureId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.includes(featureId)
      ? favorites.filter(id => id !== featureId)
      : [...favorites, featureId];
    setFavorites(updated);
    localStorage.setItem("favoriteFeatures", JSON.stringify(updated));
  };

  // Toggle category expansion
  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  // Memoized filtered features for performance
  const filteredFeatures = useMemo(() => 
    features.filter(feature =>
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.badge.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [features, searchQuery]
  );

  // Memoized grouped features
  const categories = useMemo(() => ({
    enterprise: filteredFeatures.filter(f => f.category === 'enterprise'),
    'advanced-ai': filteredFeatures.filter(f => f.category === 'advanced-ai'),
    'ai-tools': filteredFeatures.filter(f => f.category === 'ai-tools'),
    utilities: filteredFeatures.filter(f => f.category === 'utilities'),
  }), [filteredFeatures]);

  const categoryLabels = {
    enterprise: 'Enterprise',
    'advanced-ai': 'Advanced AI',
    'ai-tools': 'AI Tools',
    utilities: 'Utilities',
  };

  const categoryDescriptions = {
    enterprise: 'Team collaboration & analytics',
    'advanced-ai': 'Cutting-edge AI models',
    'ai-tools': 'Core AI capabilities',
    utilities: 'Productivity tools',
  };

  // Memoized quick access sections
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

  const renderFeatureButton = (feature: Feature) => {
    const isActive = activeTab === feature.id;
    const isFavorite = favorites.includes(feature.id);

    return (
      <SidebarMenuItem key={feature.id}>
        <SidebarMenuButton
          onClick={() => handleFeatureClick(feature.id)}
          isActive={isActive}
          tooltip={open ? undefined : feature.title}
          className="group relative"
        >
          <feature.icon 
            className={`flex-shrink-0 ${isActive ? 'text-primary' : feature.color}`} 
          />
          {open && (
            <>
              <div className="flex-1 flex flex-col items-start min-w-0">
                <span className="truncate font-medium">{feature.title}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {feature.badge}
                </span>
              </div>
              <button
                onClick={(e) => toggleFavorite(feature.id, e)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
                  }`}
                />
              </button>
            </>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Header with Search */}
      <SidebarHeader className="border-b">
        {open && (
          <div className="px-3 py-2 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI Features
              </h2>
              <Badge variant="secondary" className="text-xs">
                {features.length}
              </Badge>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          {/* Recently Used - Only show when not searching */}
          {!searchQuery && recentFeatures.length > 0 && (
            <>
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  {open && "Recent"}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {recentFeatures.map(renderFeatureButton)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <Separator className="my-2" />
            </>
          )}

          {/* Favorites - Only show when not searching */}
          {!searchQuery && favoriteFeatures.length > 0 && (
            <>
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5" />
                  {open && "Favorites"}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {favoriteFeatures.map(renderFeatureButton)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <Separator className="my-2" />
            </>
          )}

          {/* All Features by Category - Collapsible */}
          {Object.entries(categories).map(([categoryKey, categoryFeatures]) => {
            if (categoryFeatures.length === 0) return null;
            const isExpanded = expandedCategories[categoryKey];

            return (
              <Collapsible
                key={categoryKey}
                open={isExpanded}
                onOpenChange={() => toggleCategory(categoryKey)}
              >
                <SidebarGroup>
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors rounded-md px-2 py-1.5">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-semibold">
                          {categoryLabels[categoryKey as keyof typeof categoryLabels]}
                        </span>
                        {open && (
                          <span className="text-[10px] font-normal text-muted-foreground">
                            {categoryDescriptions[categoryKey as keyof typeof categoryDescriptions]}
                          </span>
                        )}
                      </div>
                      {open && (
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {categoryFeatures.map(renderFeatureButton)}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          })}

          {/* No Results */}
          {searchQuery && filteredFeatures.length === 0 && open && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              <p>No features found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>

      {/* Footer with Stats */}
      {open && (
        <SidebarFooter className="border-t">
          <div className="px-3 py-2 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center justify-between">
              <span>Active</span>
              <Badge variant="outline" className="text-[10px] h-5">
                {features.find(f => f.id === activeTab)?.title || 'None'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Favorites</span>
              <span>{favorites.length}</span>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
