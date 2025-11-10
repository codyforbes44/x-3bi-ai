import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureGrid } from "@/components/layout/FeatureGrid";
import { CTASection } from "@/components/layout/CTASection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, Settings, Lock, Cloud, Phone, Mail, Database, Workflow } from "lucide-react";
import { generateOrganizationSchema } from "@/utils/structuredData";
import { PLATFORM_STATS, getFeaturesByCategory } from "@/config/platform-capabilities";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";

const Enterprise = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliance, SSO integration, row-level security, and advanced data protection"
    },
    {
      icon: Zap,
      title: "All Platform Features",
      description: `Full access to all ${PLATFORM_STATS.totalFeatures} AI features and ${PLATFORM_STATS.totalModels} models`
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Unlimited users, role-based access control, and advanced team analytics"
    },
    {
      icon: Settings,
      title: "Custom Integrations",
      description: "Dedicated API access, webhook support, and custom workflow integrations"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "On-premise deployment options, complete data ownership, and EU hosting"
    },
    {
      icon: Cloud,
      title: "Scalable Infrastructure",
      description: "Auto-scaling resources, 99.9% SLA, and dedicated infrastructure"
    },
    {
      icon: Database,
      title: "Advanced Analytics",
      description: "Real-time monitoring, usage analytics, cost optimization, and custom reports"
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Visual workflow builder, multi-agent orchestration, and conditional logic"
    }
  ];

  const enterpriseFeatures = getFeaturesByCategory('enterprise');

  const structuredData = generateOrganizationSchema({
    contactPoint: {
      "@type": "ContactPoint",
      email: "enterprise@3bi.ai",
      contactType: "Sales",
    }
  });

  return (
    <>
      <SEO
        title="Enterprise AI Solutions - Business-Grade AI Platform"
        description={`Enterprise AI solutions from 3BI.AI. ${PLATFORM_STATS.totalFeatures} features, ${PLATFORM_STATS.totalModels} models. SOC 2 compliant, dedicated infrastructure. Grok, Claude 4, GPT-5 for business.`}
        keywords={['enterprise AI', 'business AI platform', 'enterprise AI solutions', 'AI for business', 'custom AI', 'enterprise security', 'SOC 2 AI', 'dedicated AI infrastructure']}
        ogImage="https://3bi.ai/og/enterprise.png"
        canonical="https://3bi.ai/enterprise"
        structuredData={structuredData}
      />
      <PageLayout>
        <PageHero
          title="Enterprise Solutions"
          description={`Powerful AI platform built for enterprise scale. ${PLATFORM_STATS.totalFeatures} AI features, ${PLATFORM_STATS.totalModels} models, unlimited users, and dedicated support.`}
          badge={{
            icon: Shield,
            text: "Enterprise Grade"
          }}
          actions={
            <>
              <Button size="lg" className="bg-gradient-hero text-white">
                <Phone className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </>
          }
        />

      <div className="container mx-auto px-4 pb-16">

        {/* Features Grid */}
        <FeatureGrid features={features} className="mb-16" />

        {/* Platform Stats */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Enterprise Platform Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                {PLATFORM_STATS.totalFeatures}
              </div>
              <div className="text-sm text-muted-foreground">AI Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                {PLATFORM_STATS.totalModels}
              </div>
              <div className="text-sm text-muted-foreground">AI Models</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>

        {/* Enterprise Features Showcase */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseFeatures.map((feature) => (
              <Card key={feature.id} className="hover:shadow-elegant transition-spring">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${feature.color}-500/10 rounded-lg`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                    </div>
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

          {/* Enterprise Benefits */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12 mb-16">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Advanced Security</h3>
                    <p className="text-muted-foreground text-sm">
                      Bank-level encryption, compliance certifications, and security audits.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Dedicated Support</h3>
                    <p className="text-muted-foreground text-sm">
                      24/7 priority support with dedicated customer success manager.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Custom Solutions</h3>
                    <p className="text-muted-foreground text-sm">
                      Tailored AI models and workflows designed for your specific needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Guaranteed Performance</h3>
                    <p className="text-muted-foreground text-sm">
                      SLA guarantees with 99.9% uptime and priority processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Contact Section */}
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <Phone className="w-8 h-8 mx-auto text-primary mb-4" />
                <CardTitle>Schedule a Call</CardTitle>
                <CardDescription>
                  Speak with our enterprise team about your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-hero text-white">Book Demo</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Mail className="w-8 h-8 mx-auto text-primary mb-4" />
                <CardTitle>Contact Sales</CardTitle>
                <CardDescription>
                  Get a custom quote and implementation timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
    </>
  );
};

export default Enterprise;