import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_STATS, AI_MODELS } from "@/config/platform-capabilities";
import { Brain, Sparkles, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

export function PlatformStatsSection() {
  const topModels = [
    AI_MODELS.find(m => m.id === 'grok-3'),
    AI_MODELS.find(m => m.id === 'claude-opus-4'),
    AI_MODELS.find(m => m.id === 'gpt-5'),
    AI_MODELS.find(m => m.id === 'gemini-2-pro'),
  ].filter(Boolean);

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Platform Overview
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop juggling multiple AI subscriptions. Get access to all the leading models and features in one unified platform.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-elegant transition-spring">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                {PLATFORM_STATS.totalModels}
              </CardTitle>
              <CardDescription>AI Models</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-elegant transition-spring">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                {PLATFORM_STATS.totalFeatures}
              </CardTitle>
              <CardDescription>AI Features</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-elegant transition-spring">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                &lt;100ms
              </CardTitle>
              <CardDescription>Average Latency</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-elegant transition-spring">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                99.9%
              </CardTitle>
              <CardDescription>Uptime SLA</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Top Models Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topModels.map((model) => {
            if (!model) return null;
            return (
              <Card key={model.id} className="hover:shadow-elegant transition-spring group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${model.color}-500/10 rounded-lg group-hover:bg-${model.color}-500/20 transition-smooth`}>
                      <model.icon className={`w-6 h-6 text-${model.color}-500`} />
                    </div>
                    {model.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                    {model.name}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground mb-2">{model.provider}</div>
                  <CardDescription className="text-sm line-clamp-2">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {model.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}