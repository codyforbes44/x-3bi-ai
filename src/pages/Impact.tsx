import { SEO } from "@/components/SEO";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { Card } from "@/components/ui/card";
import { Users, TrendingUp, Globe, Heart, Award, Target } from "lucide-react";

const Impact = () => {
  const metrics = [
    {
      icon: Users,
      value: "10,000+",
      label: "Enterprise Clients",
      description: "Businesses powered by 3BI.AI"
    },
    {
      icon: TrendingUp,
      value: "500M+",
      label: "AI Requests",
      description: "Processed monthly"
    },
    {
      icon: Globe,
      value: "150+",
      label: "Countries",
      description: "Serving customers worldwide"
    },
    {
      icon: Heart,
      value: "98%",
      label: "Client Satisfaction",
      description: "Customer satisfaction rate"
    }
  ];

  const successStories = [
    {
      icon: Award,
      title: "Marketing Agency Transformation",
      description: "A leading digital marketing agency implemented 3BI.AI, reducing content production time by 70% and scaling to 3x more clients while maintaining premium quality and increasing profit margins by 45%.",
      impact: "3x revenue growth"
    },
    {
      icon: Target,
      title: "Enterprise Research Excellence",
      description: "Fortune 500 pharmaceutical company leveraged our AI platform to analyze clinical trial data, accelerating drug discovery processes by 10x and reducing research costs by $2M annually.",
      impact: "$2M cost savings"
    },
    {
      icon: Heart,
      title: "E-Learning Platform Scale",
      description: "Ed-tech startup used 3BI.AI to personalize learning content at scale, serving 100K+ students with AI-generated courses, achieving 92% completion rates and $5M Series A funding.",
      impact: "100K+ students"
    }
  ];

  const initiatives = [
    {
      title: "Enterprise Innovation Lab",
      description: "Dedicated R&D facility developing cutting-edge AI solutions and providing early access to Fortune 500 clients for beta testing and feedback."
    },
    {
      title: "Strategic Partnerships",
      description: "Collaborating with industry leaders including Microsoft, Google Cloud, and AWS to deliver best-in-class AI infrastructure and integrations."
    },
    {
      title: "Carbon-Neutral Operations",
      description: "Committed to 100% carbon-neutral infrastructure through renewable energy partnerships and optimized AI compute efficiency."
    },
    {
      title: "Thought Leadership",
      description: "Publishing industry research, hosting enterprise AI summits, and contributing to AI safety and ethics standards worldwide."
    }
  ];

  return (
    <>
      <SEO
        title="Our Impact - Transforming Businesses"
        description="See how 3BI.AI impacts businesses worldwide. Real metrics, customer success stories, and global reach."
        keywords={['AI impact', 'business transformation', 'AI success', 'customer stories']}
        ogImage="https://3bi.ai/og/impact.png"
        canonical="https://3bi.ai/impact"
      />
      <PublicPageLayout maxWidth="7xl">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Customer Success Stories
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Measuring success through the exceptional results our clients achieve with 3BI.AI's premium platform.
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

        {/* Strategic Initiatives */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Strategic Initiatives</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">2026 Growth Roadmap</h2>
            <Card className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our ambitious growth targets for 2026:
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Scale to 50,000+ enterprise clients across 200+ countries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Process 1B+ AI requests monthly with 99.99% uptime SLA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Launch proprietary AI models optimized for enterprise workflows</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Achieve 100% carbon-neutral operations and industry-leading sustainability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Expand to 50+ regional data centers for optimal global performance</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Success Story</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Partner with 10,000+ leading organizations transforming their business with AI.
            </p>
            <a 
              href="/pricing"
              className="inline-block px-8 py-4 bg-gradient-hero text-white rounded-lg font-semibold hover-scale"
            >
              Get Started Today
            </a>
          </div>
        </section>
      </PublicPageLayout>
    </>
  );
};

export default Impact;
