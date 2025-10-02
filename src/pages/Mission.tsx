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
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Empowering humanity through accessible, intelligent AI solutions that transform imagination into reality.
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
                KALPESH was born from a simple belief: artificial intelligence should be a tool that empowers everyone, 
                not just those with advanced technical knowledge. We saw a world where AI capabilities were locked behind 
                complex interfaces and steep learning curves, keeping transformative technology out of reach for most people.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our team set out to change that. We brought together the best AI models from leading providers—Claude, GPT, 
                and ElevenLabs—and crafted an intuitive platform that makes advanced AI capabilities feel natural and accessible.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, KALPESH serves thousands of users worldwide, helping them automate workflows, generate content, 
                analyze data, and bring their creative visions to life. But we're just getting started. Every day, 
                we're working to make AI more powerful, more accessible, and more beneficial for everyone.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us on This Journey</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the AI revolution and help shape the future of intelligent technology.
            </p>
            <a 
              href="/auth"
              className="inline-block px-8 py-4 bg-gradient-hero text-white rounded-lg font-semibold hover-scale"
            >
              Get Started Today
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Mission;
