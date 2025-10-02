import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, TrendingUp, Globe, Heart, Award, Target } from "lucide-react";

const Impact = () => {
  const metrics = [
    {
      icon: Users,
      value: "50,000+",
      label: "Active Users",
      description: "Growing community worldwide"
    },
    {
      icon: TrendingUp,
      value: "1M+",
      label: "AI Requests",
      description: "Processed monthly"
    },
    {
      icon: Globe,
      value: "150+",
      label: "Countries",
      description: "Using our platform"
    },
    {
      icon: Heart,
      value: "95%",
      label: "Satisfaction",
      description: "User satisfaction rate"
    }
  ];

  const successStories = [
    {
      icon: Award,
      title: "Empowering Small Businesses",
      description: "A boutique marketing agency used KALPESH to automate content creation, reducing production time by 70% and allowing them to take on 3x more clients.",
      impact: "70% time saved"
    },
    {
      icon: Target,
      title: "Accelerating Research",
      description: "University researchers leveraged our AI tools to analyze thousands of documents, accelerating their literature review process from months to days.",
      impact: "10x faster analysis"
    },
    {
      icon: Heart,
      title: "Supporting Education",
      description: "Educators created personalized learning materials with AI assistance, helping students with diverse learning needs achieve better outcomes.",
      impact: "40% improved engagement"
    }
  ];

  const initiatives = [
    {
      title: "AI for Good Program",
      description: "Providing free access to nonprofit organizations working on social and environmental challenges."
    },
    {
      title: "Educational Partnerships",
      description: "Collaborating with universities to integrate AI literacy into curricula and support academic research."
    },
    {
      title: "Sustainability Commitment",
      description: "Working with eco-conscious cloud providers and optimizing our infrastructure for minimal environmental impact."
    },
    {
      title: "Open Knowledge",
      description: "Contributing to the AI community through open-source tools, research publications, and educational content."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Our Impact
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Measuring success through the positive change we create for our users and communities worldwide.
          </p>
        </section>

        {/* Metrics Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {metrics.map((metric, index) => (
              <Card key={index} className="p-6 text-center hover-scale">
                <metric.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={index} className="p-8 hover-scale">
                <story.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-4">{story.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {story.description}
                </p>
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  {story.impact}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Social Impact Initiatives */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Social Impact Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initiatives.map((initiative, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">{initiative.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {initiative.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Future Goals */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Looking Ahead</h2>
            <Card className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our impact journey is just beginning. By 2025, we aim to:
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Reach 500,000 active users across 200+ countries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Provide free AI access to 10,000+ nonprofit organizations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Achieve carbon-neutral operations across all infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Launch AI education programs in 100 schools worldwide</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of Our Impact</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users creating positive change with AI technology.
            </p>
            <a 
              href="/auth"
              className="inline-block px-8 py-4 bg-gradient-hero text-white rounded-lg font-semibold hover-scale"
            >
              Start Your Journey
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Impact;
