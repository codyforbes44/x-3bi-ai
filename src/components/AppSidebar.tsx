import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllFeatures, Feature } from "@/components/dashboard/FeatureCategories";
import { Search, Star, Clock, Sparkles, X, ChevronDown } from "lucide-react";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { open, isMobile, setOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteFeatures");
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentFeatures");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Track which category is open (accordion - only one at a time)
  const [openCategory, setOpenCategory] = useState<string>('ai-tools');

  const features = getAllFeatures();

  // Track feature usage
  const handleFeatureClick = (featureId: string) => {
    onTabChange(featureId);
    
    // Update recently used
    const updated = [featureId, ...recentlyUsed.filter(id => id !== featureId)].slice(0, 5);
    setRecentlyUsed(updated);
    localStorage.setItem("recentFeatures", JSON.stringify(updated));
    
    // Auto-collapse sidebar on mobile after selection
    if (isMobile) {
      setOpen(false);
    }
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

  // Filter features based on search
  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group features by category
  const categories = {
    enterprise: filteredFeatures.filter(f => f.category === 'enterprise'),
    'advanced-ai': filteredFeatures.filter(f => f.category === 'advanced-ai'),
    'ai-tools': filteredFeatures.filter(f => f.category === 'ai-tools'),
    utilities: filteredFeatures.filter(f => f.category === 'utilities'),
  };

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

  // Get features for quick access sections
  const favoriteFeatures = features.filter(f => favorites.includes(f.id));
  const recentFeatures = recentlyUsed
    .map(id => features.find(f => f.id === id))
    .filter(Boolean) as Feature[];

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
    <Sidebar 
      collapsible="icon"
      className="border-r bg-sidebar shadow-sm"
      style={isMobile && !open ? { 
        position: 'fixed',
        left: 0,
        top: 56,
        bottom: 0,
        width: '56px',
        zIndex: 40
      } : undefined}
    >
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
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 hover:bg-accent rounded-sm p-0.5 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        )}
        {!open && (
          <div className="flex items-center justify-center py-3">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto scrollbar-hide">
        <div className="space-y-2 py-2">
          {/* Recently Used - Only show when not searching */}
          {!searchQuery && recentFeatures.length > 0 && (
            <>
              <Collapsible open={openCategory === 'recent'} onOpenChange={(isOpen) => isOpen && setOpenCategory('recent')}>
                <SidebarGroup>
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors rounded-md group">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      {open && (
                        <>
                          <span className="flex-1">Recent</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openCategory === 'recent' ? '' : '-rotate-90'}`} />
                        </>
                      )}
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {recentFeatures.map(renderFeatureButton)}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
              <Separator className="my-2" />
            </>
          )}

          {/* Favorites - Only show when not searching */}
          {!searchQuery && favoriteFeatures.length > 0 && (
            <>
              <Collapsible open={openCategory === 'favorites'} onOpenChange={(isOpen) => isOpen && setOpenCategory('favorites')}>
                <SidebarGroup>
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors rounded-md group">
                      <Star className="w-3.5 h-3.5 flex-shrink-0" />
                      {open && (
                        <>
                          <span className="flex-1">Favorites</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openCategory === 'favorites' ? '' : '-rotate-90'}`} />
                        </>
                      )}
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {favoriteFeatures.map(renderFeatureButton)}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
              <Separator className="my-2" />
            </>
          )}

          {/* All Features by Category */}
          {Object.entries(categories).map(([categoryKey, categoryFeatures]) => {
            if (categoryFeatures.length === 0) return null;

            return (
              <Collapsible 
                key={categoryKey}
                open={openCategory === categoryKey}
                onOpenChange={(isOpen) => isOpen && setOpenCategory(categoryKey)}
              >
                <SidebarGroup>
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors rounded-md group">
                      {open ? (
                        <>
                          <div className="flex-1 flex flex-col items-start gap-0.5">
                            <span className="font-semibold">
                              {categoryLabels[categoryKey as keyof typeof categoryLabels]}
                            </span>
                            <span className="text-[10px] font-normal text-muted-foreground">
                              {categoryDescriptions[categoryKey as keyof typeof categoryDescriptions]}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${openCategory === categoryKey ? '' : '-rotate-90'}`} />
                        </>
                      ) : (
                        <span className="text-xs font-semibold">
                          {categoryLabels[categoryKey as keyof typeof categoryLabels].charAt(0)}
                        </span>
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
          {searchQuery && filteredFeatures.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              {open ? (
                <>
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No features found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </>
              ) : (
                <Search className="w-5 h-5 mx-auto opacity-50" />
              )}
            </div>
          )}
        </div>
      </SidebarContent>

      {/* Footer with Stats */}
      <SidebarFooter className="border-t">
        {open ? (
          <div className="px-3 py-2 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center justify-between">
              <span>Active</span>
              <Badge variant="outline" className="text-[10px] h-5 max-w-[120px] truncate">
                {features.find(f => f.id === activeTab)?.title || 'Overview'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Favorites</span>
              <span className="font-medium">{favorites.length}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-2">
            <Badge variant="outline" className="w-7 h-7 rounded-full p-0 flex items-center justify-center text-xs">
              {favorites.length}
            </Badge>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
