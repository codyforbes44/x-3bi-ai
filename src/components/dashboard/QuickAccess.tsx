import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ArrowRight, Star, TrendingUp, Zap } from "lucide-react";
import { getAllFeatures } from "./FeatureCategories";

interface QuickAccessProps {
  onFeatureSelect: (featureId: string) => void;
}

export const QuickAccess = ({ onFeatureSelect }: QuickAccessProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const features = getAllFeatures();

  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get featured/popular features
  const featuredFeatures = [
    features.find(f => f.id === 'multi-chat'),
    features.find(f => f.id === 'claude'),
    features.find(f => f.id === 'advanced-image'),
    features.find(f => f.id === 'enhanced-voice'),
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Quick Access
          </CardTitle>
          <CardDescription>
            Search and jump to any feature instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {searchQuery && (
            <ScrollArea className="h-[300px] mt-4">
              <div className="space-y-2">
                {filteredFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => onFeatureSelect(feature.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <div className={`p-2 rounded-lg bg-background`}>
                      <feature.icon className={`w-4 h-4 ${feature.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{feature.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {feature.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
                {filteredFeatures.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No features found
                  </p>
                )}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Featured Features */}
      {!searchQuery && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Featured
            </CardTitle>
            <CardDescription>
              Popular and powerful features to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredFeatures.map((feature) => feature && (
                <button
                  key={feature.id}
                  onClick={() => onFeatureSelect(feature.id)}
                  className="flex items-start gap-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all text-left group"
                >
                  <div className={`p-2.5 rounded-lg bg-muted`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </div>
                    <Badge variant="secondary" className="text-xs mb-2">
                      {feature.badge}
                    </Badge>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Getting Started Tips */}
      {!searchQuery && (
        <Card className="bg-gradient-subtle border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p className="text-sm">
                <strong>Use keyboard shortcuts:</strong> Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Shift + ?</kbd> to see all shortcuts
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p className="text-sm">
                <strong>Save favorites:</strong> Click the star icon on any feature to add it to your favorites for quick access
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <p className="text-sm">
                <strong>Search anywhere:</strong> Use the search bar in the sidebar to quickly find any feature
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
