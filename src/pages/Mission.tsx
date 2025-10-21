import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Sparkles } from "lucide-react";

const Mission = () => {
  const values = [
    {
      icon: Target,
      title: "Our Purpose",
      description: "To democratize AI technology and make advanced artificial intelligence accessible to everyone, regardless of technical expertise."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "A world where AI empowers every individual and organization to achieve their full potential through intelligent automation and insights."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Innovation, accessibility, transparency, and user-centric design guide everything we build and every decision we make."
    },
    {
      icon: Sparkles,
      title: "Our Promise",
      description: "To continuously push the boundaries of what's possible with AI while keeping the user experience simple, intuitive, and delightful."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            About 3BI.AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Building the future of AI-powered productivity with enterprise-grade tools designed for professionals and teams.
          </p>
        </section>

        {/* Values Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-8 hover-scale">
                <value.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            <Card className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                3BI.AI was founded with a vision to create the most powerful and comprehensive AI platform for businesses 
                and professionals. We recognized that while AI technology was advancing rapidly, professionals needed a unified, 
                enterprise-grade solution that could handle their complex workflows without compromise.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our team of AI experts and engineers brought together the world's leading AI models—Grok, Claude 4, GPT-5, 
                Gemini 2.0, and more—into a single, powerful platform. We've integrated advanced features like multi-modal 
                memory, workflow automation, and team collaboration tools to create a truly professional AI solution.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, 3BI.AI powers thousands of businesses worldwide, from startups to Fortune 500 companies. Our clients 
                rely on us for mission-critical AI operations, achieving unprecedented productivity gains and business outcomes. 
                We're continuously innovating, adding cutting-edge AI capabilities, and setting new standards for what's possible 
                with enterprise AI technology.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join leading organizations using 3BI.AI to drive innovation and achieve breakthrough results with AI.
            </p>
            <a 
              href="/pricing"
              className="inline-block px-8 py-4 bg-gradient-hero text-white rounded-lg font-semibold hover-scale"
            >
              View Pricing Plans
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Mission;
