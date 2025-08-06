import Header from "@/components/Header";
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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Enterprise Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Powerful AI tools built for enterprise scale, security, and compliance. Transform your organization with custom AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-hero text-white">
                Schedule Demo
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Enterprise Benefits */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Enterprise?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get the full power of our AI platform with enterprise-grade features and support.
              </p>
            </div>
            
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
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
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
      </div>
    </div>
  );
};

export default Enterprise;