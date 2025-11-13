import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NeonCard } from "@/components/ui/neon-card";
import { AccentDot } from "@/components/ui/accent-dot";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { homeContent } from "@/config/home-content";

export function GrokSpotlightSection() {
  const navigate = useNavigate();
  const { grokSpotlight } = homeContent;

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-950/20 via-background to-purple-950/20 border-y border-border/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <Badge variant="neon-purple" className="mb-4">
              <grokSpotlight.badge.icon className="w-4 h-4 mr-2" />
              {grokSpotlight.badge.text}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {grokSpotlight.title}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              {grokSpotlight.description}
            </p>
            
            {/* Feature List */}
            <div className="space-y-4 mb-8">
              {grokSpotlight.features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className={`p-2 bg-${feature.color}-500/10 rounded-lg flex-shrink-0`}>
                    <feature.icon className={`w-5 h-5 text-${feature.color}-500`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              variant="neon-primary"
              className="w-full sm:w-auto group"
              onClick={() => navigate('/grok')}
            >
              Try Grok Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Visual Card */}
          <div className="relative">
            <NeonCard variant="purple" glass={true} glow={true} size="lg" className="overflow-hidden">
              <div className="p-8">
                <div className="space-y-6">
                  {/* Chat Example */}
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-sm">{grokSpotlight.chatExample.user}</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                        <div className="flex items-center gap-2 mb-2">
                          <grokSpotlight.badge.icon className="w-4 h-4 text-purple-500" />
                          <span className="text-xs font-semibold text-purple-500">Grok</span>
                        </div>
                        <p className="text-sm">{grokSpotlight.chatExample.grok}</p>
                      </div>
                    </div>
                  </div>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                    {grokSpotlight.featureBadges.map((badge) => (
                      <Badge 
                        key={badge.label}
                        variant="neon-purple" 
                        className="text-xs"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <AccentDot color="purple" />
            </NeonCard>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-xl animate-pulse-slow">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
