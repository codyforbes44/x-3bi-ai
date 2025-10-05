import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, TrendingUp, Lightbulb, Newspaper, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    productUpdates: true,
    aiNews: true,
    tutorials: false,
    caseStudies: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from("newsletter_subscriptions").insert({
        email,
        interests,
      });

      if (error) {
        // Handle duplicate email gracefully
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully Subscribed!",
          description: "Check your email for a confirmation link.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  const benefits = [
    {
      icon: Sparkles,
      title: "Exclusive Updates",
      description: "Be the first to know about new AI features and capabilities"
    },
    {
      icon: Lightbulb,
      title: "Expert Tips",
      description: "Learn best practices and pro tips from our AI experts"
    },
    {
      icon: TrendingUp,
      title: "Industry Insights",
      description: "Stay ahead with the latest AI trends and innovations"
    },
    {
      icon: Newspaper,
      title: "Case Studies",
      description: "Discover how others are succeeding with 3BI.AI"
    }
  ];

  const pastIssues = [
    {
      title: "GPT-4o Integration: What It Means for You",
      date: "March 15, 2025",
      description: "Exploring the new capabilities and performance improvements"
    },
    {
      title: "5 Ways to Automate Your Workflow with AI",
      date: "March 8, 2025",
      description: "Practical automation strategies that save hours every week"
    },
    {
      title: "Voice AI Revolution: ElevenLabs Deep Dive",
      date: "March 1, 2025",
      description: "Understanding the technology behind natural voice synthesis"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Mail className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Get weekly insights, tips, and updates about AI innovation delivered straight to your inbox.
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover-scale">
                <benefit.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Subscription Form */}
        <section className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Join 50,000+ Subscribers</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="text-lg"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">What interests you? (Optional)</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="productUpdates"
                      checked={interests.productUpdates}
                      onCheckedChange={(checked) =>
                        setInterests({ ...interests, productUpdates: checked as boolean })
                      }
                    />
                    <label htmlFor="productUpdates" className="text-sm cursor-pointer">
                      Product updates and new features
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aiNews"
                      checked={interests.aiNews}
                      onCheckedChange={(checked) =>
                        setInterests({ ...interests, aiNews: checked as boolean })
                      }
                    />
                    <label htmlFor="aiNews" className="text-sm cursor-pointer">
                      AI industry news and trends
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tutorials"
                      checked={interests.tutorials}
                      onCheckedChange={(checked) =>
                        setInterests({ ...interests, tutorials: checked as boolean })
                      }
                    />
                    <label htmlFor="tutorials" className="text-sm cursor-pointer">
                      Tutorials and how-to guides
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="caseStudies"
                      checked={interests.caseStudies}
                      onCheckedChange={(checked) =>
                        setInterests({ ...interests, caseStudies: checked as boolean })
                      }
                    />
                    <label htmlFor="caseStudies" className="text-sm cursor-pointer">
                      Case studies and success stories
                    </label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-hero text-white text-lg py-6">
                Subscribe Now
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
                We respect your privacy and will never share your information.
              </p>
            </form>
          </Card>
        </section>

        {/* Past Issues */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Recent Newsletter Issues</h2>
            <div className="space-y-4">
              {pastIssues.map((issue, index) => (
                <Card key={index} className="p-6 hover-scale cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{issue.title}</h3>
                      <p className="text-muted-foreground mb-2">{issue.description}</p>
                      <p className="text-sm text-primary font-medium">{issue.date}</p>
                    </div>
                    <Newspaper className="w-8 h-8 text-muted-foreground flex-shrink-0 ml-4" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <p className="text-muted-foreground">Active Subscribers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Open Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Weekly</div>
              <p className="text-muted-foreground">Delivered Every Thursday</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Newsletter;
