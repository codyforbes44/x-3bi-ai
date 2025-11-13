import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { FilterPanel, FilterGroup } from "@/components/ui/filter-panel";
import { PLATFORM_FEATURES, FEATURE_CATEGORIES, getFeaturesByCategory, PLATFORM_STATS } from "@/config/platform-capabilities";
import { Sparkles, History, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO_CONFIG, PAGE_SEO, BREADCRUMB_CONFIG } from "@/config/seo-config";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { usePersonalization } from "@/hooks/usePersonalization";
import { cn } from "@/lib/utils";

export default function FeaturesPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  
  const { recentItems, addRecentItem } = useRecentlyViewed("features");
  const { preferences, trackFeatureUsage, toggleFavorite } = usePersonalization();

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Build filter groups from categories
  const filterGroups: FilterGroup[] = [
    {
      id: "category",
      label: "Category",
      options: FEATURE_CATEGORIES.map(cat => ({
        id: cat.id,
        label: cat.name,
        count: getFeaturesByCategory(cat.id).length
      })),
      defaultOpen: true
    },
    {
      id: "badge",
      label: "Type",
      options: [
        { id: "free", label: "Free", count: PLATFORM_FEATURES.filter(f => f.badge.toLowerCase() === "free").length },
        { id: "beta", label: "Beta", count: PLATFORM_FEATURES.filter(f => f.badge.toLowerCase() === "beta").length },
        { id: "premium", label: "Premium", count: PLATFORM_FEATURES.filter(f => f.badge.toLowerCase() === "premium").length },
        { id: "new", label: "New", count: PLATFORM_FEATURES.filter(f => f.badge.toLowerCase() === "new").length },
      ],
      defaultOpen: true
    }
  ];

  // Filter features based on search and selected filters
  const getFilteredFeatures = () => {
    let features = [...PLATFORM_FEATURES];
    
    // Apply category filters
    if (selectedFilters.category && selectedFilters.category.length > 0) {
      features = features.filter(f => 
        selectedFilters.category.includes(f.category)
      );
    }
    
    // Apply badge filters
    if (selectedFilters.badge && selectedFilters.badge.length > 0) {
      features = features.filter(f => 
        selectedFilters.badge.some(b => f.badge.toLowerCase() === b)
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      features = features.filter(
        (feature) =>
          feature.name.toLowerCase().includes(query) ||
          feature.description.toLowerCase().includes(query) ||
          feature.badge.toLowerCase().includes(query) ||
          feature.capabilities.some(cap => cap.toLowerCase().includes(query))
      );
    }
    
    return features;
  };

  const filteredFeatures = getFilteredFeatures();
  
  // Get favorite features
  const favoriteFeatures = [...PLATFORM_FEATURES].filter(f => 
    preferences.favoriteFeatures.includes(f.id)
  );

  // Get recent features
  const recentFeatures = recentItems
    .map(item => PLATFORM_FEATURES.find(f => f.id === item.id))
    .filter(Boolean)
    .slice(0, 3);

  const handleFeatureClick = (feature: any) => {
    // Track feature usage
    trackFeatureUsage(feature.id);
    
    // Add to recently viewed
    addRecentItem({
      id: feature.id,
      title: feature.name,
      path: feature.route,
      metadata: { badge: feature.badge, category: feature.category }
    });

    // Navigate to feature
    navigate(feature.route);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const groupFilters = prev[groupId] || [];
      return {
        ...prev,
        [groupId]: checked
          ? [...groupFilters, optionId]
          : groupFilters.filter(id => id !== optionId)
      };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  const handleToggleFavorite = (featureId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(featureId);
  };

  const renderFeatureCard = (feature: any) => {
    const isFavorite = preferences.favoriteFeatures.includes(feature.id);
    
    return (
      <Card 
        key={feature.id} 
        className="hover:shadow-lg transition-all cursor-pointer group"
        onClick={() => handleFeatureClick(feature)}
      >
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{feature.badge}</Badge>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity",
                  isFavorite && "opacity-100"
                )}
                onClick={(e) => handleToggleFavorite(feature.id, e)}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star className={cn(
                  "h-4 w-4",
                  isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                )} />
              </Button>
            </div>
          </div>
          <CardTitle>{feature.name}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Capabilities:</p>
          <div className="flex flex-wrap gap-2">
            {feature.capabilities.map((cap: string, idx: number) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {cap}
              </Badge>
            ))}
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={(e) => {
            e.stopPropagation();
            handleFeatureClick(feature);
          }}
        >
          {feature.id.includes('chat') ? 'Try AI Chat' :
           feature.id.includes('image') ? 'Generate Images' :
           feature.id.includes('code') ? 'Start Coding' :
           feature.id.includes('voice') ? 'Try Voice AI' :
           feature.id.includes('workflow') ? 'Build Workflow' :
           'Explore Feature'}
        </Button>
      </CardContent>
    </Card>
    );
  };

  return (
    <>
      <SEO
        title={PAGE_SEO.features.title}
        description={PAGE_SEO.features.description}
        keywords={PAGE_SEO.features.keywords}
        ogImage={SEO_CONFIG.ogImages.aiTools}
        canonical={`${SEO_CONFIG.siteUrl}/features`}
        breadcrumbs={[
          { name: BREADCRUMB_CONFIG.home.label, url: BREADCRUMB_CONFIG.home.url },
          { name: BREADCRUMB_CONFIG.features.label, url: BREADCRUMB_CONFIG.features.url }
        ]}
      />
      <PageLayout>
        <PageHero
          title="Platform Features"
          description={`${PLATFORM_STATS.totalFeatures} powerful AI features designed to transform your workflow. From basic chat to advanced automation.`}
          badge={{
            icon: Sparkles,
            text: `${PLATFORM_STATS.totalFeatures} Features`
          }}
        />

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {isLoading ? (
            <PageSkeleton variant="card-grid" count={9} />
          ) : (
            <>
              {/* Search Bar */}
              <div className="mb-8">
                <SearchBar
                  placeholder="Search features by name, description, or capability..."
                  onSearch={handleSearch}
                  showRecentSearches
                  autoFocus={false}
                />
              </div>

              {/* Favorites Section */}
              {favoriteFeatures.length > 0 && !searchQuery && Object.keys(selectedFilters).length === 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <h2 className="text-xl font-semibold">Your Favorites</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteFeatures.slice(0, 3).map((feature: any) => (
                      <Card 
                        key={feature.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleFeatureClick(feature)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <feature.icon className="w-5 h-5 text-primary" />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {feature.badge}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg mt-2">{feature.name}</CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Recently Viewed Features */}
              {recentFeatures.length > 0 && !searchQuery && Object.keys(selectedFilters).length === 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <History className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Recently Viewed</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentFeatures.map((feature: any) => (
                      <Card 
                        key={feature.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleFeatureClick(feature)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <feature.icon className="w-5 h-5 text-primary" />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {feature.badge}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg mt-2">{feature.name}</CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Content: Filter Panel + Features Grid */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filter Panel - Mobile: Below search, Desktop: Left sidebar */}
                <div className="w-full lg:w-auto">
                  <FilterPanel
                    groups={filterGroups}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onClearAll={handleClearFilters}
                    className="lg:sticky lg:top-4"
                  />
                </div>

                {/* Features Grid */}
                <div className="flex-1">
                  {filteredFeatures.length === 0 ? (
                    <EmptyState
                      icon={Sparkles}
                      title="No features found"
                      description={
                        searchQuery 
                          ? "Try adjusting your search query or filters"
                          : Object.keys(selectedFilters).length > 0
                            ? "No features match your selected filters"
                            : "No features available"
                      }
                      action={
                        (searchQuery || Object.keys(selectedFilters).length > 0) && (
                          <Button onClick={() => {
                            setSearchQuery("");
                            handleClearFilters();
                          }}>
                            Clear All
                          </Button>
                        )
                      }
                    />
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-muted-foreground">
                          Showing {filteredFeatures.length} of {PLATFORM_STATS.totalFeatures} features
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredFeatures.map(renderFeatureCard)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </PageLayout>
    </>
  );
}
