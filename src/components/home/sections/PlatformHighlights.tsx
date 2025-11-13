import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { AccentDot } from "@/components/ui/accent-dot";
import { AI_MODELS } from "@/config/platform-capabilities";
import { CheckCircle2 } from "lucide-react";
import { getBentoSpan } from "@/config/neon-config";

export function PlatformHighlights() {
  const modelsByCategory = {
    chat: AI_MODELS.filter(m => m.category === 'chat'),
    image: AI_MODELS.filter(m => m.category === 'image'),
    voice: AI_MODELS.filter(m => m.category === 'voice'),
    other: AI_MODELS.filter(m => !['chat', 'image', 'voice'].includes(m.category))
  };

  const categories = [
    { key: 'chat', title: 'Chat Models', color: 'text-primary' },
    { key: 'image', title: 'Image Models', color: 'text-pink-500' },
    { key: 'voice', title: 'Voice Models', color: 'text-cyan-500' },
    { key: 'other', title: 'Video & Audio', color: 'text-orange-500' }
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="neon-purple" className="mb-4">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            12 Premium AI Models
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            All Leading AI Models in One Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access the latest and most powerful AI models from OpenAI, Anthropic, Google, xAI, and more—all with a single subscription.
          </p>
        </div>

        {/* Models by category */}
        <div className="space-y-12">
          {categories.map(category => {
            const models = modelsByCategory[category.key as keyof typeof modelsByCategory];
            if (models.length === 0) return null;

            return (
              <div key={category.key}>
                <h3 className={`text-2xl font-bold mb-6 ${category.color}`}>
                  {category.title}
                </h3>
                <BentoGrid>
                  {models.map((model, index) => (
                    <BentoItem key={model.id} span={getBentoSpan(index, models.length)}>
                      <Card 
                        variant={index === 0 ? 'neon-purple' : 'default'} 
                        glass={true}
                        glow={model.verified}
                        className="h-full hover:shadow-elegant transition-spring group"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 bg-${model.color}-500/10 rounded-lg group-hover:bg-${model.color}-500/20 transition-smooth`}>
                              <model.icon className={`w-6 h-6 text-${model.color}-500`} />
                            </div>
                            {model.verified && (
                              <>
                                <AccentDot color="cyan" />
                                <Badge variant="neon-cyan" className="text-xs">
                                  Verified
                                </Badge>
                              </>
                            )}
                          </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                          {model.name}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground mb-2">{model.provider}</div>
                        <CardDescription className="text-sm">
                          {model.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {model.contextWindow && (
                          <div className="mb-3">
                            <Badge variant="outline" className="text-xs">
                              {model.contextWindow}
                            </Badge>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {model.features.slice(0, 3).map(feature => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      </Card>
                    </BentoItem>
                  ))}
                </BentoGrid>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
