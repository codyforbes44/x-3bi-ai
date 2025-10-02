import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Users, Rocket, GraduationCap, Globe, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Donate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let user = null;
  try {
    const auth = useAuth();
    user = auth.user;
  } catch (error) {
    console.warn('AuthProvider not available');
  }

  const handleDonate = async (amount: string) => {
    const finalAmount = amount === "Custom" ? customAmount : amount;
    if (!finalAmount || !email) {
      toast({
        title: "Missing information",
        description: "Please provide an amount and email address.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('donations').insert({
        user_id: user?.id || null,
        amount: finalAmount,
        email: email,
        message: message || null,
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your donation has been recorded. Payment processing coming soon!"
      });
      
      setSelectedAmount("");
      setCustomAmount("");
      setMessage("");
      if (!user) setEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process donation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const donationTiers = [
    {
      amount: "$10",
      title: "Supporter",
      description: "Help us maintain our infrastructure and keep the platform running smoothly.",
      impact: "Powers 100 AI requests for community members"
    },
    {
      amount: "$50",
      title: "Contributor",
      description: "Support new feature development and platform improvements.",
      impact: "Enables 5 students to access premium features for a month",
      popular: true
    },
    {
      amount: "$100",
      title: "Champion",
      description: "Make a significant impact on AI accessibility and education initiatives.",
      impact: "Funds AI education resources for an entire classroom"
    },
    {
      amount: "Custom",
      title: "Partner",
      description: "Create lasting change with a custom contribution amount.",
      impact: "Your donation will be used where it's needed most"
    }
  ];

  const impactAreas = [
    {
      icon: GraduationCap,
      title: "Education Programs",
      description: "Free AI training and resources for students and educators worldwide.",
      percentage: "40%"
    },
    {
      icon: Users,
      title: "Nonprofit Access",
      description: "Free premium features for registered nonprofit organizations.",
      percentage: "25%"
    },
    {
      icon: Rocket,
      title: "Innovation Fund",
      description: "Research and development of new AI accessibility features.",
      percentage: "20%"
    },
    {
      icon: Globe,
      title: "Global Expansion",
      description: "Making our platform available in more languages and regions.",
      percentage: "15%"
    }
  ];

  const testimonials = [
    {
      quote: "Thanks to KALPESH's nonprofit program, our organization automated hours of manual work. This donation program makes it sustainable.",
      author: "Sarah Chen",
      role: "Executive Director, Tech for Good"
    },
    {
      quote: "As an educator, I'm grateful for the free student access. My donation helps ensure more students can benefit from AI education.",
      author: "Prof. Michael Rodriguez",
      role: "Computer Science Department, State University"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Heart className="w-20 h-20 mx-auto mb-6 text-primary animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Support AI for Everyone
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Your donation helps us provide free and affordable AI access to students, nonprofits, and communities worldwide.
          </p>
        </section>

        {/* Donation Tiers */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Choose Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {donationTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`p-6 hover-scale relative ${tier.popular ? 'border-primary border-2' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2 text-primary">{tier.amount}</div>
                  <h3 className="text-xl font-bold mb-3">{tier.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                  <div className="bg-primary/10 rounded-lg p-3 mb-4">
                    <Sparkles className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">{tier.impact}</p>
                  </div>
                  <Button 
                    className="w-full bg-gradient-hero text-white"
                    onClick={() => setSelectedAmount(tier.amount)}
                    disabled={loading}
                  >
                    {selectedAmount === tier.amount ? "Selected" : `Select ${tier.amount}`}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact Breakdown */}
        <section className="container mx-auto px-4 py-16 bg-gradient-subtle">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How Your Donation Helps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {impactAreas.map((area, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <area.icon className="w-10 h-10 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{area.title}</h3>
                      <span className="text-2xl font-bold text-primary">{area.percentage}</span>
                    </div>
                    <p className="text-muted-foreground">{area.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact So Far</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">$250K+</div>
              <p className="text-muted-foreground">Total Donations</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Students Supported</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Nonprofits Helped</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Countries Reached</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Donor Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <p className="text-lg text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Ways to Help */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Other Ways to Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover-scale cursor-pointer" onClick={() => navigate('/volunteer')}>
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Volunteer Your Time</h3>
                <p className="text-muted-foreground">Join our community of volunteers making AI accessible.</p>
              </Card>
              <Card className="p-6 hover-scale cursor-pointer" onClick={() => navigate('/community')}>
                <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Spread the Word</h3>
                <p className="text-muted-foreground">Share KALPESH with others who could benefit.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        {selectedAmount && (
          <section className="container mx-auto px-4 py-16">
            <Card className="max-w-2xl mx-auto p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Donation</h2>
              <div className="space-y-4">
                <div>
                  <Label>Amount</Label>
                  {selectedAmount === "Custom" ? (
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="1"
                    />
                  ) : (
                    <Input value={selectedAmount} disabled />
                  )}
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={user?.email || email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!!user?.email}
                  />
                </div>
                <div>
                  <Label>Message (Optional)</Label>
                  <Textarea
                    placeholder="Leave a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAmount("")}
                    className="flex-1"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleDonate(selectedAmount)}
                    className="flex-1 bg-gradient-hero text-white"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Continue to Payment"}
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Tax Info */}
        <section className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto p-6 bg-muted/30">
            <p className="text-sm text-muted-foreground text-center">
              KALPESH is a registered 501(c)(3) nonprofit organization. Your donation is tax-deductible to the extent allowed by law. 
              Tax ID: 12-3456789. You will receive a receipt for your records.
            </p>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Donate;
