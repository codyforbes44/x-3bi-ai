import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Twitter } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former AI researcher at leading tech companies. Passionate about making AI accessible to everyone.",
      initials: "AC",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Sarah Johnson",
      role: "CTO & Co-Founder",
      bio: "Full-stack engineer with expertise in ML infrastructure and scalable systems.",
      initials: "SJ",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of AI",
      bio: "PhD in Machine Learning. Leads our AI model integration and optimization efforts.",
      initials: "MR",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Emily Wang",
      role: "Head of Product",
      bio: "Product strategist focused on user experience and turning complex AI into simple, delightful interactions.",
      initials: "EW",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "David Kim",
      role: "Lead Engineer",
      bio: "Backend specialist ensuring our platform scales seamlessly as we grow.",
      initials: "DK",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Lisa Thompson",
      role: "Head of Community",
      bio: "Dedicated to building an engaged community and ensuring every user finds success with 3BI.AI.",
      initials: "LT",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <>
      <SEO
        title="Meet Our Team - AI Experts"
        description="Meet the team behind 3BI.AI. AI researchers, engineers, and innovators building the future of AI."
        keywords={['AI team', 'company team', 'AI experts', 'leadership']}
        ogImage="https://3bi.ai/og/team.png"
        canonical="https://3bi.ai/team"
      />
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            A diverse group of innovators, engineers, and dreamers united by a common mission: 
            making AI accessible to everyone.
          </p>
        </section>

        {/* Team Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 hover-scale text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-smooth">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-smooth">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-muted-foreground hover:text-primary transition-smooth">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Culture Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Culture</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Innovation First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We encourage experimentation and embrace failure as a learning opportunity. 
                    Our team is empowered to push boundaries and explore new possibilities in AI.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">User-Centric</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every decision we make is guided by one question: "How does this benefit our users?" 
                    We obsess over details to create the best possible experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Collaborative Spirit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe the best ideas come from diverse perspectives working together. 
                    Our team culture promotes open communication and mutual respect.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Join CTA */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for talented individuals who share our passion for AI and innovation.
            </p>
            <a 
              href="mailto:careers@3bi.ai"
              className="inline-block px-8 py-4 bg-gradient-hero text-white rounded-lg font-semibold hover-scale"
            >
              View Open Positions
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Team;
