import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Sparkles, TrendingUp } from "lucide-react";

export function PlatformRoadmap() {
  const timeline = [
    {
      quarter: "Q4 2024",
      status: "completed",
      title: "Foundation Launch",
      models: "15 Models",
      features: [
        "Grok AI Integration",
        "Claude 3.5 Sonnet",
        "GPT-4 Turbo",
        "DALL-E 3",
        "Basic Workflows"
      ]
    },
    {
      quarter: "Q1-Q2 2025",
      status: "completed",
      title: "Major Expansion",
      models: "20 Models",
      features: [
        "Claude Opus 4 (200K context)",
        "Gemini 2.0 Pro (1M context)",
        "Advanced Workflows",
        "Multi-Modal Memory",
        "Team Workspaces"
      ]
    },
    {
      quarter: "Q3-Q4 2025",
      status: "completed",
      title: "Current Platform",
      models: "27 Features",
      features: [
        "GPT-5 Launch",
        "Grok 3 Real-time",
        "FLUX Pro Image Gen",
        "ElevenLabs Turbo",
        "Enterprise Security"
      ]
    },
    {
      quarter: "Q1 2026",
      status: "upcoming",
      title: "Next Generation",
      models: "35+ Features",
      features: [
        "Custom Model Fine-tuning",
        "Advanced AI Agents",
        "Voice Cloning Studio",
        "Video Generation",
        "AutoML Platform"
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Platform Evolution
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Continuous Innovation & Growth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've grown from 15 models to 27+ features in under a year. See our journey and what's coming next.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeline.map((phase, index) => (
            <Card 
              key={phase.quarter} 
              className={`relative hover:shadow-elegant transition-spring ${
                phase.status === 'completed' ? 'border-success/50' : 
                phase.status === 'upcoming' ? 'border-primary/50 bg-primary/5' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge 
                    variant={phase.status === 'completed' ? 'default' : 'secondary'}
                    className={
                      phase.status === 'completed' 
                        ? 'bg-success text-success-foreground' 
                        : phase.status === 'upcoming'
                        ? 'bg-primary/10 text-primary'
                        : ''
                    }
                  >
                    {phase.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {phase.status === 'upcoming' && <Clock className="w-3 h-3 mr-1" />}
                    {phase.quarter}
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  {phase.title}
                </CardTitle>
                <CardDescription className="text-sm font-semibold text-primary">
                  {phase.models}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {phase.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              {/* Connector line for desktop */}
              {index < timeline.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">
            Join us on this journey of continuous innovation
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">80% growth in features year-over-year</span>
          </div>
        </div>
      </div>
    </section>
  );
}
