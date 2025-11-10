import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      company: "Series B Startup",
      content: "Switching to 3BI.AI cut our AI costs by 65% while giving us access to more models. The unified platform is a game-changer for our engineering team.",
      rating: 5,
      initials: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Lead",
      company: "Fortune 500 Company",
      content: "We were managing 5 different AI subscriptions. Now everything is in one place with better performance and enterprise security. ROI was immediate.",
      rating: 5,
      initials: "MR"
    },
    {
      name: "Emily Watson",
      role: "AI Research Lead",
      company: "University Lab",
      content: "Having Grok, Claude 4, and GPT-5 in one platform with unified memory and workflows has accelerated our research by 10x. The team collaboration features are incredible.",
      rating: 5,
      initials: "EW"
    },
    {
      name: "David Kim",
      role: "Founder & CEO",
      company: "AI-First Startup",
      content: "The workflow automation and multi-agent capabilities are beyond anything we've seen. We've built complex AI systems in days instead of months.",
      rating: 5,
      initials: "DK"
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "E-commerce Platform",
      content: "From content generation to image creation to voice synthesis—all in one platform. Our content team's productivity has tripled.",
      rating: 5,
      initials: "LT"
    },
    {
      name: "James Parker",
      role: "DevOps Engineer",
      company: "SaaS Company",
      content: "The API access and webhook integrations make it trivial to add AI to our product. Superior to managing multiple vendor APIs.",
      rating: 5,
      initials: "JP"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by Leading Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers, researchers, and businesses transforming their workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-elegant transition-spring">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12 bg-gradient-hero">
                    <AvatarFallback className="bg-gradient-hero text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <CardDescription className="text-xs">{testimonial.role}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  "{testimonial.content}"
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  {testimonial.company}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.9/5</span>
            <span>from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}