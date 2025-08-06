import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, TrendingUp, Users, Award, CheckCircle } from "lucide-react";

const SocialProof = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      content: "This AI platform completely transformed our development workflow. The code generation is incredibly accurate and saves hours daily.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "DesignStudio",
      content: "The image generation capabilities are mind-blowing. We've created hundreds of unique visuals for our campaigns.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "AI Researcher",
      company: "University Lab",
      content: "The conversational AI is remarkably sophisticated. It understands context and provides nuanced responses consistently.",
      rating: 5,
      avatar: "EW"
    }
  ];

  const achievements = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Users",
      description: "Trusted by developers worldwide"
    },
    {
      icon: TrendingUp,
      value: "99.9%",
      label: "Uptime",
      description: "Enterprise-grade reliability"
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "User Rating",
      description: "Highest satisfaction scores"
    },
    {
      icon: CheckCircle,
      value: "1M+",
      label: "API Calls",
      description: "Processed this month"
    }
  ];

  const companies = [
    "TechCorp", "DesignStudio", "StartupLab", "DevCorp", "InnovateCo", "FutureTech"
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-card backdrop-blur-sm rounded-full px-6 py-3 mb-6">
          <Award className="w-5 h-5 text-primary" />
          <span className="text-foreground font-medium">Trusted by Thousands</span>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            Social Proof
          </Badge>
        </div>
        
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Join the AI Revolution
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Thousands of developers, designers, and businesses trust our platform for their AI needs
        </p>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {achievements.map((achievement, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm border-border text-center hover:bg-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{achievement.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{achievement.label}</div>
              <div className="text-xs text-muted-foreground">{achievement.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm border-border hover:bg-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">{testimonial.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="w-6 h-6 text-primary/30 mb-2" />
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trusted Companies */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-6">Trusted by teams at</div>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {companies.map((company, index) => (
            <div key={index} className="text-lg font-semibold text-foreground/70 hover:text-foreground transition-colors">
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;