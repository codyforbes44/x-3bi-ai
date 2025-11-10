import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { PLATFORM_STATS, AI_MODELS } from "@/config/platform-capabilities";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const navigate = useNavigate();

  const faqs: FAQItem[] = [
    {
      question: "What AI models are included in the platform?",
      answer: `You get access to all ${PLATFORM_STATS.totalModels} leading AI models including Grok 3 (X's latest AI with real-time knowledge), Claude Opus 4 and Sonnet 4.5 (Anthropic's most capable models with 200K context), GPT-5 and GPT-5 Mini (OpenAI's latest multimodal models), Gemini 2.0 Pro (Google's advanced AI with 1M context), DALL-E 3, Stable Diffusion 3, FLUX Pro for image generation, ElevenLabs Turbo for voice synthesis, and more. All models are included in your subscription—no need for separate accounts or API keys.`
    },
    {
      question: "How is this different from subscribing to OpenAI, Anthropic, or Google separately?",
      answer: "Instead of managing multiple subscriptions, API keys, and billing across different providers, you get everything unified in one platform. You save 60%+ compared to individual subscriptions, get team collaboration features, workflow automation, multi-modal memory system, real-time analytics, and enterprise security—all included. Plus, you can switch between models seamlessly without changing your code or workflows."
    },
    {
      question: "What's included in the free trial?",
      answer: `Full access to all ${PLATFORM_STATS.totalFeatures} AI features and ${PLATFORM_STATS.totalModels} models for 14 days. No credit card required to start. You can use Grok, Claude 4, GPT-5, image generation, voice AI, workflows, team workspaces, analytics, and all platform features. The trial includes generous usage limits so you can properly evaluate the platform with real workloads.`
    },
    {
      question: "Can I use this for my team or company?",
      answer: "Absolutely! The platform is designed for teams of all sizes. Professional plans support up to 10 team members with shared workspaces, role-based access control, and team analytics. Enterprise plans offer unlimited users, SSO integration, advanced security, custom integrations, dedicated support, and 99.9% SLA. You can collaborate on AI workflows, share memory contexts, and manage team usage from a central dashboard."
    },
    {
      question: "How does pricing work compared to individual AI services?",
      answer: "Starter plans begin at $49/month for 50,000 AI requests across all models. Professional is $149/month for 250,000 requests with team features. Enterprise offers unlimited usage with custom pricing. Compare this to OpenAI ($20/month just for ChatGPT Plus), Anthropic Claude ($20/month for Claude Pro), plus separate costs for DALL-E, API usage, and other services. Most teams save 60-70% by consolidating to our platform."
    },
    {
      question: "Do you offer API access?",
      answer: "Yes! All paid plans include full REST API access to all AI models and features. You get comprehensive documentation, SDKs for popular languages, webhook support, and the ability to integrate our AI capabilities into your applications. Professional and Enterprise plans include higher rate limits and dedicated API support. You can use our unified API instead of managing multiple provider APIs."
    },
    {
      question: "What integrations do you support?",
      answer: "We integrate with 50+ popular services including Slack, Zapier, Make, Microsoft Teams, Google Workspace, Notion, Airtable, and more. Enterprise customers can build custom integrations using our API and webhooks. All integrations work across all AI models, so you can use Grok in Slack, Claude in Notion, or GPT-5 in your custom apps seamlessly."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes. We implement enterprise-grade security with encryption at rest and in transit, SOC 2 compliance, row-level security, audit logging, and GDPR compliance. Your data is never used to train AI models. Enterprise plans offer additional security features including SSO, custom data retention policies, on-premise deployment options, and dedicated infrastructure. All API keys and credentials are encrypted and never exposed."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties or fees. Your access continues until the end of your billing period. You can also upgrade or downgrade plans anytime, and changes take effect at your next billing cycle. We also offer annual billing with a 20% discount if you prefer."
    },
    {
      question: "What kind of support do you provide?",
      answer: "All plans include email support with response times under 24 hours. Professional plans get priority 24/7 support via email and chat. Enterprise customers receive dedicated account managers, priority phone support, custom onboarding, and SLA guarantees. We also provide comprehensive documentation, video tutorials, API guides, and an active community forum."
    },
    {
      question: "How does the workflow automation work?",
      answer: "Our visual workflow builder lets you chain multiple AI operations together with conditional logic, data transformations, and integrations. For example, you can create a workflow that analyzes customer emails with Claude, generates responses with GPT-5, creates images with DALL-E, and sends results to Slack—all automatically. Workflows can be triggered via API, webhooks, schedules, or manual runs."
    },
    {
      question: "What's the multi-modal memory system?",
      answer: "Our advanced memory system stores conversations, images, voice interactions, and context across all AI models. When you chat with Grok, generate an image with DALL-E, or create voice with ElevenLabs, the system remembers the context. This enables truly persistent AI assistants that understand your history, preferences, and past interactions across all features and models."
    }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Common questions about our platform, models, pricing, and features
          </p>
        </div>

        <Card className="p-6 mb-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Still have questions? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline"
              onClick={() => navigate(ROUTES.CONTACT)}
            >
              Contact Support
            </Button>
            <Button 
              onClick={() => navigate(ROUTES.DOCUMENTATION)}
            >
              View Documentation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export FAQ data for schema markup
export const getFAQs = (): FAQItem[] => [
  {
    question: "What AI models are included in the platform?",
    answer: `You get access to all ${PLATFORM_STATS.totalModels} leading AI models including Grok 3, Claude Opus 4, GPT-5, Gemini 2.0 Pro, DALL-E 3, Stable Diffusion 3, FLUX Pro, ElevenLabs Turbo, and more.`
  },
  {
    question: "How is this different from subscribing to OpenAI, Anthropic, or Google separately?",
    answer: "You get everything unified in one platform, save 60%+ compared to individual subscriptions, plus team collaboration, workflow automation, multi-modal memory, analytics, and enterprise security—all included."
  },
  {
    question: "What's included in the free trial?",
    answer: `Full access to all ${PLATFORM_STATS.totalFeatures} AI features and ${PLATFORM_STATS.totalModels} models for 14 days with no credit card required.`
  },
  {
    question: "Can I use this for my team or company?",
    answer: "Yes! Professional plans support up to 10 team members, and Enterprise plans offer unlimited users with SSO, advanced security, and dedicated support."
  },
  {
    question: "How does pricing work?",
    answer: "Starter plans begin at $49/month for 50,000 requests. Professional is $149/month for 250,000 requests. Enterprise offers unlimited usage. Most teams save 60-70% compared to individual AI subscriptions."
  },
  {
    question: "Do you offer API access?",
    answer: "Yes! All paid plans include full REST API access to all models, comprehensive documentation, SDKs, and webhook support."
  },
  {
    question: "What integrations do you support?",
    answer: "We integrate with 50+ services including Slack, Zapier, Make, Microsoft Teams, Google Workspace, Notion, and more. Enterprise customers can build custom integrations."
  },
  {
    question: "Is my data secure and private?",
    answer: "Yes. Enterprise-grade security with encryption, SOC 2 compliance, audit logging, GDPR compliance. Your data is never used to train AI models."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, cancel anytime with no penalties. Access continues until the end of your billing period. Upgrade or downgrade plans as needed."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Email support for all plans, priority 24/7 support for Professional, and dedicated account managers for Enterprise with SLA guarantees."
  }
];