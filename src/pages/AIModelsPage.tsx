import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AI_MODELS, getModelsByCategory, PLATFORM_STATS } from "@/config/platform-capabilities";
import { Brain, Sparkles, Check, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";

export default function AIModelsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = [
    { id: "chat", name: "Chat & Reasoning", count: AI_MODELS.filter(m => m.category === "chat").length },
    { id: "image", name: "Image Generation", count: AI_MODELS.filter(m => m.category === "image").length },
    { id: "voice", name: "Voice & Audio", count: AI_MODELS.filter(m => m.category === "voice").length },
    { id: "video", name: "Video Generation", count: AI_MODELS.filter(m => m.category === "video").length },
    { id: "audio", name: "Music & Audio", count: AI_MODELS.filter(m => m.category === "audio").length }
  ];

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title="AI Models - 12+ Latest AI Models"
        description="Access Grok 3, Claude Opus 4, GPT-5, Gemini 2.0, DALL-E 3, Stable Diffusion 3, ElevenLabs, and more. The most advanced AI models in one platform."
        keywords={['AI models', 'Grok 3', 'Claude Opus 4', 'GPT-5', 'Gemini 2.0', 'DALL-E 3', 'AI platform', 'latest AI models']}
        ogImage="https://3bi.ai/og/ai-tools.png"
        canonical="https://3bi.ai/ai-models"
      />
      <PageLayout>
        <PageHero
          title="AI Models"
          description={`Access ${PLATFORM_STATS.totalModels} cutting-edge AI models from leading providers. From chat to image, voice, and video generation.`}
          badge={{
            icon: Brain,
            text: `${PLATFORM_STATS.totalModels} Models`
          }}
          actions={
            <Button 
              size="lg" 
              className="bg-gradient-hero text-white"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              Try Models Free
            </Button>
          }
        />

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {isLoading ? (
            <div className="space-y-6">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-32" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-10 w-full mt-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <>
          {/* Model Categories Tabs */}
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getModelsByCategory(category.id).map((model) => (
                    <Card key={model.id} className="hover:shadow-elegant transition-spring">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <model.icon className={`w-6 h-6 text-${model.color}-500`} />
                          </div>
                          {model.verified && (
                            <Badge variant="secondary">
                              <Check className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <CardTitle>{model.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{model.provider}</span>
                          {'contextWindow' in model && model.contextWindow && (
                            <>
                              <span>•</span>
                              <span>{model.contextWindow}</span>
                            </>
                          )}
                        </div>
                        <CardDescription className="mt-2">
                          {model.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Features */}
                        <div className="space-y-2">
                          {model.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Capabilities */}
                        <div className="flex flex-wrap gap-2">
                          {model.capabilities.map((cap) => (
                            <Badge key={cap} variant="outline" className="text-xs">
                              {cap}
                            </Badge>
                          ))}
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate(ROUTES.DASHBOARD)}
                        >
                          Try {model.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Model Comparison Stats */}
          <div className="mt-16 bg-muted/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Platform Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                  {PLATFORM_STATS.totalModels}
                </div>
                <div className="text-sm text-muted-foreground">AI Models</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                  200K
                </div>
                <div className="text-sm text-muted-foreground">Max Context</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                  &lt;100ms
                </div>
                <div className="text-sm text-muted-foreground">Latency</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </PageLayout>
    </>
  );
}