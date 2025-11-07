import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Mic, Image, Zap, Building2, Handshake } from "lucide-react";

const Partners = () => {
  const technologyPartners = [
    {
      icon: Bot,
      name: "Anthropic Claude",
      category: "AI Language Models",
      description: "Powering our conversational AI, code generation, and advanced reasoning capabilities with Claude Sonnet 4 and Opus 4.",
      capabilities: ["Natural conversations", "Code generation", "Architecture design"]
    },
    {
      icon: Bot,
      name: "OpenAI GPT",
      category: "AI Image Generation",
      description: "Providing state-of-the-art image generation capabilities through GPT-Image-1 for creative visual content.",
      capabilities: ["Image generation", "Visual creativity", "Style transfer"]
    },
    {
      icon: Mic,
      name: "ElevenLabs",
      category: "Voice AI",
      description: "Delivering premium text-to-speech and voice cloning technology for natural-sounding voice interactions.",
      capabilities: ["Text-to-speech", "Voice cloning", "Multi-language support"]
    },
    {
      icon: Zap,
      name: "Supabase",
      category: "Backend Infrastructure",
      description: "Providing scalable, real-time database and authentication services for seamless user experiences.",
      capabilities: ["Real-time data", "Authentication", "Edge functions"]
    }
  ];

  const integrationPartners = [
    {
      name: "Deploypad",
      description: "Streamlined deployment and hosting solutions for production-ready applications.",
      badge: "Integration"
    },
    {
      name: "GitHub",
      description: "Version control and collaborative development platform integration.",
      badge: "Development"
    },
    {
      name: "Vercel",
      description: "High-performance hosting and deployment infrastructure.",
      badge: "Hosting"
    },
    {
      name: "Stripe",
      description: "Secure payment processing and subscription management.",
      badge: "Payments"
    }
  ];

  const benefits = [
    {
      icon: Building2,
      title: "Enterprise Partnerships",
      description: "Collaborate with us to integrate 3BI.AI capabilities into your enterprise workflows and applications."
    },
    {
      icon: Handshake,
      title: "Technology Partners",
      description: "Join our technology partner ecosystem to create integrated solutions that leverage the best of AI innovation."
    }
  ];

  return (
    <>
      <SEO
        title="Our Partners - AI Technology Leaders"
        description="Partnering with Anthropic, OpenAI, ElevenLabs, and leading AI companies to deliver the best AI platform."
        keywords={['AI partners', 'technology partners', 'integrations', 'partnerships']}
        ogImage="https://3bi.ai/og/partners.png"
        canonical="https://3bi.ai/partners"
      />
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Our Partners
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver best-in-class AI solutions powered by cutting-edge technology.
          </p>
        </section>

        {/* Technology Partners */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Technology Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {technologyPartners.map((partner, index) => (
              <Card key={index} className="p-8 hover-scale">
                <div className="flex items-start gap-4 mb-4">
                  <partner.icon className="w-12 h-12 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{partner.name}</h3>
                    <Badge variant="secondary" className="mb-3">{partner.category}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {partner.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {partner.capabilities.map((capability, i) => (
                    <Badge key={i} variant="outline">{capability}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Integration Partners */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Integration Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {integrationPartners.map((partner, index) => (
              <Card key={index} className="p-6 text-center hover-scale">
                <Badge className="mb-4">{partner.badge}</Badge>
                <h3 className="text-xl font-bold mb-3">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {partner.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Become a Partner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 hover-scale">
                <benefit.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="max-w-4xl mx-auto p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Partner Benefits</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">✓</span>
                <span>Access to cutting-edge AI technology and integration support</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">✓</span>
                <span>Co-marketing opportunities and joint go-to-market strategies</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">✓</span>
                <span>Dedicated technical support and partnership management</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">✓</span>
                <span>Early access to new features and beta programs</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">✓</span>
                <span>Revenue sharing opportunities for qualified partners</span>
              </li>
            </ul>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in Partnering?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's explore how we can work together to create innovative AI solutions.
            </p>
            <a 
              href="mailto:partnerships@3bi.ai"
              className="inline-block px-8 py-4 bg-gradient-hero text-white rounded-lg font-semibold hover-scale"
            >
              Contact Partnerships Team
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Partners;
