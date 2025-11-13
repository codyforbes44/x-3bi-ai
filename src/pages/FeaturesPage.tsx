import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBar } from "@/components/ui/search-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { PLATFORM_FEATURES, FEATURE_CATEGORIES, getFeaturesByCategory, PLATFORM_STATS } from "@/config/platform-capabilities";
import { Sparkles, History, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO_CONFIG, PAGE_SEO, BREADCRUMB_CONFIG } from "@/config/seo-config";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { usePersonalization } from "@/hooks/usePersonalization";

export default function FeaturesPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const { recentItems, addRecentItem } = useRecentlyViewed("features");
  const { trackFeatureUsage } = usePersonalization();

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter features based on search and active tab
  const getFilteredFeatures = () => {
    let features = activeTab === "all" 
      ? PLATFORM_FEATURES 
      : getFeaturesByCategory(activeTab);
    
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

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const renderFeatureCard = (feature: any) => (
    <Card 
      key={feature.id} 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => handleFeatureClick(feature)}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <feature.icon className="w-6 h-6 text-primary" />
          </div>
          <Badge variant="outline">{feature.badge}</Badge>
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

              {/* Recently Viewed Features */}
              {recentFeatures.length > 0 && !searchQuery && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <History className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Recently Viewed</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* Features Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
                  <TabsTrigger value="all">
                    All ({PLATFORM_STATS.totalFeatures})
                  </TabsTrigger>
                  {FEATURE_CATEGORIES.map((cat) => (
                    <TabsTrigger key={cat.id} value={cat.id}>
                      {cat.name} ({getFeaturesByCategory(cat.id).length})
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  {filteredFeatures.length === 0 ? (
                    <EmptyState
                      icon={SearchIcon}
                      title="No features found"
                      description={`No features match "${searchQuery}". Try a different search term.`}
                      action={
                        <Button onClick={handleClearSearch}>
                          Clear Search
                        </Button>
                      }
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredFeatures.map(renderFeatureCard)}
                    </div>
                  )}
                </TabsContent>

                {FEATURE_CATEGORIES.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="space-y-6">
                    {filteredFeatures.length === 0 ? (
                      <EmptyState
                        icon={SearchIcon}
                        title="No features found"
                        description={`No ${category.name.toLowerCase()} features match "${searchQuery}". Try a different search term.`}
                        action={
                          <Button onClick={handleClearSearch}>
                            Clear Search
                          </Button>
                        }
                      />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFeatures.map(renderFeatureCard)}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </div>
      </PageLayout>
    </>
  );
}
