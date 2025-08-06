import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap, Gift, Crown, Star } from "lucide-react";

const CtaSection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const benefits = [
    "No credit card required",
    "Instant access to all features", 
    "10 free API calls daily",
    "Premium support included"
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out our AI capabilities",
      features: [
        "10 AI requests/day",
        "Basic chat & image generation",
        "Standard response time",
        "Community support"
      ],
      badge: "Get Started",
      badgeColor: "bg-green-500/20 text-green-500 border-green-500/30",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For professionals who need reliable AI access",
      features: [
        "1,000 AI requests/day",
        "All AI models access",
        "Priority response time",
        "Email support",
        "Advanced features"
      ],
      badge: "Most Popular",
      badgeColor: "bg-primary/20 text-primary border-primary/30",
      buttonVariant: "default" as const,
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams and businesses with high-volume needs",
      features: [
        "Unlimited AI requests",
        "Custom model fine-tuning",
        "Sub-second response time",
        "24/7 priority support",
        "Advanced analytics",
        "Custom integrations"
      ],
      badge: "Best Value",
      badgeColor: "bg-purple-500/20 text-purple-500 border-purple-500/30",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <div className="w-full">
      {/* Main CTA */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-card backdrop-blur-sm rounded-full px-6 py-3 mb-8">
          <Gift className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-foreground font-medium">Limited Time Offer</span>
          <Badge variant="secondary" className="bg-red-500/20 text-red-500 border-red-500/30">
            Free Access
          </Badge>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Start Building with AI
          <span className="block text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            In Under 30 Seconds
          </span>
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Join thousands of developers, designers, and businesses who are already using our AI platform to accelerate their work.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="min-w-[250px] h-16 text-lg bg-primary hover:bg-primary/90 shadow-glow"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Start Free Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            Instant activation • No setup required
          </div>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Plan
          </h3>
          <p className="text-muted-foreground">
            Start free, upgrade when you need more power
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index}
              className={`bg-card/80 backdrop-blur-sm border-border relative overflow-hidden hover:bg-card transition-all duration-300 ${
                tier.highlighted ? 'ring-2 ring-primary/50 scale-105' : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-glow"></div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h4 className="text-xl font-bold text-foreground">{tier.name}</h4>
                    <Badge variant="secondary" className={tier.badgeColor}>
                      {tier.badge}
                    </Badge>
                  </div>
                  
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={tier.buttonVariant}
                  className="w-full h-12"
                  onClick={handleGetStarted}
                >
                  {tier.highlighted && <Crown className="w-4 h-4 mr-2" />}
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Email Signup */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20 max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Stay Updated</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Get notified about new AI models, features, and exclusive access to beta releases.
          </p>
          
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background/50"
            />
            <Button onClick={handleGetStarted} className="bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CtaSection;