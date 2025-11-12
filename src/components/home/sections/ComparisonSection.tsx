import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { PLATFORM_STATS } from "@/config/platform-capabilities";

export function ComparisonSection() {
  const navigate = useNavigate();

  const features = [
    { name: "Chat Models (Grok, Claude 4, GPT-5)", us: true, others: "Separate subscriptions" },
    { name: "Image Generation (DALL-E, Stable Diffusion)", us: true, others: "Additional cost" },
    { name: "Voice AI & Synthesis", us: true, others: "Third-party only" },
    { name: `${PLATFORM_STATS.totalFeatures} AI Features`, us: true, others: "Limited features" },
    { name: "Team Collaboration & Workspaces", us: true, others: false },
    { name: "Workflow Automation", us: true, others: false },
    { name: "Multi-Modal Memory System", us: true, others: false },
    { name: "Real-time Analytics", us: true, others: "Basic only" },
    { name: "API Access & Webhooks", us: true, others: "Enterprise only" },
    { name: "White-label Options", us: true, others: false },
    { name: "99.9% Uptime SLA", us: true, others: "Best effort" },
    { name: "All Models, One Price", us: true, others: "Pay per model" },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Why Choose 3BI.AI
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            One Platform vs. Multiple Subscriptions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop paying for OpenAI, Anthropic, Google AI, and more separately. Get everything in one place.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div></div>
              <div>
                <CardTitle className="text-xl bg-gradient-hero bg-clip-text text-transparent">
                  3BI.AI Platform
                </CardTitle>
                <CardDescription className="mt-2">All-in-one solution</CardDescription>
              </div>
              <div>
                <CardTitle className="text-xl">Individual Providers</CardTitle>
                <CardDescription className="mt-2">Multiple subscriptions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-4 p-4 items-center ${
                  index % 2 === 0 ? 'bg-muted/20' : ''
                }`}
              >
                <div className="font-medium text-sm">{feature.name}</div>
                <div className="text-center">
                  {feature.us === true ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-green-500/10 rounded-full">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">{feature.us}</span>
                  )}
                </div>
                <div className="text-center">
                  {feature.others === true ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-green-500/10 rounded-full">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  ) : feature.others === false ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                      <X className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">{feature.others}</span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <div className="mb-6">
            <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              Save 60%+
            </div>
            <p className="text-muted-foreground">
              Compared to individual AI subscriptions
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-hero text-primary-foreground"
            onClick={() => navigate(ROUTES.PRICING)}
          >
            View Pricing Plans
          </Button>
        </div>
      </div>
    </section>
  );
}