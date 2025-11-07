import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MiniAIChat from "@/components/home/MiniAIChat";
import MiniImageGenerator from "@/components/home/MiniImageGenerator";
import MiniCodeAssistant from "@/components/home/MiniCodeAssistant";
import MiniVoiceInterface from "@/components/home/MiniVoiceInterface";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { homeContent } from "@/config/home-content";

export function QuickStartSection() {
  const navigate = useNavigate();
  const { quickStart } = homeContent;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            <quickStart.badge.icon className="w-4 h-4 mr-2" />
            {quickStart.badge.text}
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{quickStart.title}</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto px-4">
            {quickStart.description}
          </p>
        </div>
        
        {/* Working Mini Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
          <div className="h-[500px]">
            <MiniAIChat />
          </div>
          <div className="h-[500px]">
            <MiniImageGenerator />
          </div>
          <div className="h-[500px]">
            <MiniCodeAssistant />
          </div>
          <div className="h-[500px]">
            <MiniVoiceInterface />
          </div>
        </div>

        <div className="text-center px-4">
          <Button 
            size="lg" 
            className="bg-gradient-hero text-white w-full sm:w-auto min-w-[250px] h-12 sm:h-14 text-base sm:text-lg touch-target"
            onClick={() => navigate(ROUTES.PRICING)}
          >
            View Pricing & Plans →
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
