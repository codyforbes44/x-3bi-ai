import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLATFORM_FEATURES, FEATURE_CATEGORIES, getFeaturesByCategory, PLATFORM_STATS } from "@/config/platform-capabilities";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Platform Features - 27 AI Features"
        description="Explore all 27 AI features: Grok, Claude 4, GPT-5, Image Gen, Voice AI, Workflows, Analytics, and more. Comprehensive AI platform for teams."
        keywords={['AI features', 'AI platform', 'AI tools', 'Grok', 'Claude 4', 'workflow automation', 'team collaboration']}
        ogImage="https://3bi.ai/og/ai-tools.png"
        canonical="https://3bi.ai/features"
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
          <Tabs defaultValue="all" className="w-full">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PLATFORM_FEATURES.map((feature) => (
                  <Card key={feature.id} className="hover:shadow-elegant transition-spring group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 bg-${feature.color}-500/10 rounded-lg group-hover:bg-${feature.color}-500/20 transition-smooth`}>
                          <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                        </div>
                        <Badge variant="secondary">{feature.badge}</Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-smooth">
                        {feature.name}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Capabilities */}
                      <div className="space-y-2">
                        {feature.capabilities.map((cap) => (
                          <div key={cap} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color}-500`} />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                        onClick={() => navigate(feature.route)}
                      >
                        Open {feature.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {FEATURE_CATEGORIES.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className={`w-6 h-6 text-${category.color}-500`} />
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFeaturesByCategory(category.id).map((feature) => (
                    <Card key={feature.id} className="hover:shadow-elegant transition-spring group">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 bg-${feature.color}-500/10 rounded-lg group-hover:bg-${feature.color}-500/20 transition-smooth`}>
                            <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                          </div>
                          <Badge variant="secondary">{feature.badge}</Badge>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-smooth">
                          {feature.name}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {feature.capabilities.map((cap) => (
                            <div key={cap} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color}-500`} />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                          onClick={() => navigate(feature.route)}
                        >
                          Open {feature.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </PageLayout>
    </>
  );
}