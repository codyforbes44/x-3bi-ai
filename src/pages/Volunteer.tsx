import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, Code, MessageSquare, BookOpen, Megaphone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Volunteer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    motivation: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("volunteer_applications").insert({
        user_id: user?.id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        experience: formData.experience,
        motivation: formData.motivation,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      setFormData({ name: "", email: "", role: "", experience: "", motivation: "" });
    } catch (error) {
      console.error("Volunteer application error:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const opportunities = [
    {
      icon: Code,
      title: "Technical Contributors",
      description: "Help improve our open-source tools, documentation, and code examples.",
      commitment: "5-10 hours/week"
    },
    {
      icon: MessageSquare,
      title: "Community Moderators",
      description: "Support our community forums, answer questions, and foster positive discussions.",
      commitment: "3-5 hours/week"
    },
    {
      icon: BookOpen,
      title: "Content Creators",
      description: "Write tutorials, create videos, or develop educational materials about AI.",
      commitment: "Flexible"
    },
    {
      icon: Users,
      title: "Event Organizers",
      description: "Help organize virtual meetups, webinars, and community events.",
      commitment: "5-8 hours/week"
    },
    {
      icon: Megaphone,
      title: "AI Advocates",
      description: "Share KALPESH with your network and help grow our community.",
      commitment: "Flexible"
    },
    {
      icon: Heart,
      title: "Beta Testers",
      description: "Test new features and provide feedback to improve the platform.",
      commitment: "2-3 hours/week"
    }
  ];

  const benefits = [
    "Early access to new features and beta programs",
    "Recognition in our community and on our website",
    "Networking with AI enthusiasts and professionals",
    "Free premium account for active volunteers",
    "Professional development and skill building",
    "Make a real impact on AI accessibility"
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Heart className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Volunteer With Us
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Join our global community of volunteers helping to democratize AI and make it accessible to everyone.
          </p>
        </section>

        {/* Opportunities Grid */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Volunteer Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="p-6 hover-scale">
                <opportunity.icon className="w-10 h-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {opportunity.commitment}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="container mx-auto px-4 py-16">
          <Card className="max-w-3xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Apply to Volunteer</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Preferred Role *</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a volunteer role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Contributor</SelectItem>
                    <SelectItem value="moderator">Community Moderator</SelectItem>
                    <SelectItem value="content">Content Creator</SelectItem>
                    <SelectItem value="events">Event Organizer</SelectItem>
                    <SelectItem value="advocate">AI Advocate</SelectItem>
                    <SelectItem value="tester">Beta Tester</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience *</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  required
                  placeholder="Tell us about your background and relevant skills..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to volunteer? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  required
                  placeholder="Share your motivation and what you hope to contribute..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-hero text-white">
                Submit Application
              </Button>
            </form>
          </Card>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Volunteer Benefits</h2>
            <Card className="p-8">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary font-bold mr-3 text-xl">✓</span>
                    <span className="text-muted-foreground text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Volunteer Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground text-lg">Active Volunteers</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground text-lg">Community Members Helped</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground text-lg">Resources Created</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Volunteer;
