import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureGrid } from "@/components/layout/FeatureGrid";
import { CTASection } from "@/components/layout/CTASection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users, Settings, Lock, Cloud, Phone, Mail } from "lucide-react";

const Enterprise = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliance, SSO integration, and advanced data protection"
    },
    {
      icon: Zap,
      title: "Custom Performance",
      description: "Dedicated infrastructure with guaranteed uptime and processing speed"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Advanced user management, role-based access, and team analytics"
    },
    {
      icon: Settings,
      title: "Custom Integrations",
      description: "API access, webhook support, and custom workflow integrations"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "On-premise deployment options and complete data ownership"
    },
    {
      icon: Cloud,
      title: "Scalable Infrastructure",
      description: "Auto-scaling resources to handle any workload size"
    }
  ];

  return (
    <PageLayout>
      <PageHero
        title="Enterprise Solutions"
        description="Powerful AI tools built for enterprise scale, security, and compliance. Transform your organization with custom AI solutions."
        actions={
          <>
            <Button size="lg" className="bg-gradient-hero text-white">
              Schedule Demo
            </Button>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </>
        }
      />

      <div className="container mx-auto px-4 pb-16">

        {/* Features Grid */}
        <FeatureGrid features={features} className="mb-16" />

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
  );
};

export default Enterprise;