import { useState } from "react";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket, ArrowRight } from "lucide-react";
import { generateFAQSchema, generateProductSchema } from "@/utils/structuredData";
import { PLATFORM_STATS, AI_MODELS } from "@/config/platform-capabilities";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { SEO_CONFIG, PAGE_SEO, BREADCRUMB_CONFIG } from "@/config/seo-config";
import { DemoSchedulerDialog } from "@/components/dialogs/DemoSchedulerDialog";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Suspense } from "react";

const Pricing = () => {
  const navigate = useNavigate();
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for individuals and small teams",
      icon: Zap,
      features: [
        `All ${PLATFORM_STATS.totalFeatures} AI features`,
        `Access to ${PLATFORM_STATS.totalModels} AI models`,
        "50,000 AI requests/month",
        "Grok, Claude 4, GPT-5, Gemini 2.0",
        "Image & voice generation",
        "Priority email support",
        "Basic analytics dashboard",
        "API access"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month",
      description: "For growing businesses and power users",
      icon: Crown,
      features: [
        `All ${PLATFORM_STATS.totalFeatures} AI features`,
        `Priority access to all ${PLATFORM_STATS.totalModels} models`,
        "250,000 AI requests/month",
        "Team workspaces (up to 10 members)",
        "Advanced workflow automation",
        "Custom integrations & webhooks",
        "24/7 priority support",
        "Advanced analytics & insights",
        "Multi-modal memory system",
        "White-label options"
      ],
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large teams and organizations",
      icon: Rocket,
      features: [
        `All ${PLATFORM_STATS.totalFeatures} features + custom`,
        "Unlimited AI requests",
        "Custom AI model fine-tuning",
        "Unlimited team members",
        "Dedicated account manager",
        "99.9% SLA guarantee",
        "Advanced security & compliance",
        "On-premise deployment options",
        "Custom integrations & white-label",
        "Priority model access",
        "Custom rate limits"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  const faqItems = [
    { question: "Can I change plans anytime?", answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and invoice billing for Enterprise customers." },
    { question: "Is there a free trial?", answer: "Yes, all paid plans include a 14-day free trial with full access to features. No credit card required to start." },
    { question: "What happens after I exceed my request limit?", answer: "You can purchase additional request packs or upgrade to a higher tier. We'll notify you before you reach your limit." }
  ];

  const structuredData = [
    generateFAQSchema(faqItems),
    generateProductSchema({
      name: "3BI.AI Professional Plan",
      price: "149",
      priceCurrency: "USD",
      description: "AI platform with Grok, Claude 4, GPT-5 access",
      features: plans[1].features
    })
  ];

  return (
    <>
      <SEO
        title={PAGE_SEO.pricing.title}
        description={PAGE_SEO.pricing.description}
        keywords={PAGE_SEO.pricing.keywords}
        ogImage={SEO_CONFIG.ogImages.pricing}
        canonical={`${SEO_CONFIG.siteUrl}/pricing`}
        structuredData={structuredData}
        breadcrumbs={[
          { name: BREADCRUMB_CONFIG.home.label, url: BREADCRUMB_CONFIG.home.url },
          { name: BREADCRUMB_CONFIG.pricing.label, url: BREADCRUMB_CONFIG.pricing.url }
        ]}
      />
      <PublicPageLayout maxWidth="7xl">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {PLATFORM_STATS.totalFeatures} Features • {PLATFORM_STATS.totalModels} AI Models
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Access all {PLATFORM_STATS.totalFeatures} AI features and {PLATFORM_STATS.totalModels} models. Start free and scale as you grow.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(ROUTES.FEATURES)}
              >
                View All Features
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(ROUTES.AI_MODELS)}
              >
                Explore Models
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-hero">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <plan.icon className={`w-12 h-12 mx-auto mb-4 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.buttonVariant} 
                    className={`w-full ${plan.popular ? 'bg-gradient-hero text-white' : ''}`}
                    onClick={() => {
                      if (plan.name === "Enterprise") {
                        setDemoDialogOpen(true);
                      } else {
                        navigate(ROUTES.DASHBOARD);
                      }
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Can I change plans anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-left">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-left">
                    We accept all major credit cards, PayPal, and invoice billing for Enterprise customers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-left">
                    Yes, all paid plans include a 14-day free trial with full access to features. No credit card required to start.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">What happens after I exceed my request limit?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-left">
                    You can purchase additional request packs or upgrade to a higher tier. We'll notify you before you reach your limit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <NewsletterSignup
              title="Stay Informed About New Features"
              description="Get updates on new AI models, features, and exclusive pricing offers."
            />
          </div>
        </div>

        <DemoSchedulerDialog open={demoDialogOpen} onOpenChange={setDemoDialogOpen} />
      </PublicPageLayout>
    </>
  );
};

const PricingWithSuspense = () => (
  <Suspense fallback={<PageSkeleton variant="card-grid" count={3} />}>
    <Pricing />
  </Suspense>
);

export default PricingWithSuspense;