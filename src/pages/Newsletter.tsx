import { SEO } from "@/components/SEO";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, TrendingUp, Lightbulb, Newspaper, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { newsletterSchema } from "@/utils/formValidation";
import { logger } from "@/utils/logger";
import { SimpleFormField } from "@/components/forms/SimpleFormField";
import { InlineError } from "@/components/forms/InlineError";
import { FormSuccess } from "@/components/forms/FormSuccess";

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    productUpdates: true,
    aiNews: true,
    tutorials: false,
    caseStudies: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const interestArray = Object.entries(interests).filter(([_, value]) => value).map(([key]) => key);
      if (interestArray.length === 0) {
        setError("Please select at least one interest");
        setLoading(false);
        return;
      }
      
      const validatedData = newsletterSchema.parse({ email, interests: interestArray });
      const { error: dbError } = await supabase.from("newsletter_subscriptions").insert({
        email: validatedData.email,
        interests: validatedData.interests,
      });

      if (dbError) {
        if (dbError.code === '23505') {
          setError("This email is already subscribed");
        } else {
          throw dbError;
        }
      } else {
        setSuccess(true);
        setEmail("");
        toast({ title: "Successfully Subscribed!", description: "Check your email for confirmation." });
      }
    } catch (error: any) {
      if (error.name === 'ZodError') {
        setError(error.errors[0].message);
      } else {
        logger.error("Newsletter subscription failed", error);
        setError("Failed to subscribe. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedInterests = Object.entries(interests)
    .filter(([_, value]) => value)
    .map(([key]) => {
      const labels: Record<string, string> = {
        productUpdates: 'Product updates',
        aiNews: 'AI news',
        tutorials: 'Tutorials',
        caseStudies: 'Case studies'
      };
      return labels[key];
    });

  const benefits = [
    { icon: Sparkles, title: "Exclusive Updates", description: "First to know about new AI features" },
    { icon: Lightbulb, title: "Expert Tips", description: "Best practices from our AI experts" },
    { icon: TrendingUp, title: "Industry Insights", description: "Latest AI trends and innovations" },
    { icon: Newspaper, title: "Case Studies", description: "See how others succeed with 3BI.AI" }
  ];

  return (
    <>
      <SEO
        title="Subscribe to AI Newsletter"
        description="Stay updated with AI news, product updates, tutorials, and case studies."
        keywords={['AI newsletter', 'AI updates', 'AI insights']}
        ogImage="https://3bi.ai/og/newsletter.png"
        canonical="https://3bi.ai/newsletter"
      />
      <PublicPageLayout maxWidth="7xl">
        <section className="container mx-auto px-4 py-16 text-center">
          <Mail className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Get weekly insights, tips, and updates about AI innovation.
          </p>
        </section>

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

        <section className="container mx-auto px-4 py-8">
          <Card className="p-8 max-w-2xl mx-auto">
            {success ? (
              <FormSuccess 
                message="Successfully subscribed! Check your inbox for confirmation."
                action={{ label: "Subscribe another email", onClick: () => setSuccess(false) }}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <SimpleFormField
                  label="Email Address"
                  error={error && email.length === 0 ? "Email is required" : undefined}
                  helper="We'll never share your email"
                  required
                >
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                    disabled={loading}
                    autoFocus
                  />
                </SimpleFormField>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">What interests you?</span>
                    {selectedInterests.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        You'll receive: {selectedInterests.join(', ')}
                      </span>
                    )}
                  </div>
                  {error && error.includes("interest") && <InlineError message={error} />}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="productUpdates" checked={interests.productUpdates} onCheckedChange={(checked) => setInterests({ ...interests, productUpdates: checked as boolean })} />
                      <label htmlFor="productUpdates" className="text-sm cursor-pointer">Product updates and new features</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="aiNews" checked={interests.aiNews} onCheckedChange={(checked) => setInterests({ ...interests, aiNews: checked as boolean })} />
                      <label htmlFor="aiNews" className="text-sm cursor-pointer">AI industry news and trends</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tutorials" checked={interests.tutorials} onCheckedChange={(checked) => setInterests({ ...interests, tutorials: checked as boolean })} />
                      <label htmlFor="tutorials" className="text-sm cursor-pointer">Tutorials and how-to guides</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="caseStudies" checked={interests.caseStudies} onCheckedChange={(checked) => setInterests({ ...interests, caseStudies: checked as boolean })} />
                      <label htmlFor="caseStudies" className="text-sm cursor-pointer">Case studies and success stories</label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  <Mail className="w-4 h-4 mr-2" />
                  {loading ? "Subscribing..." : "Subscribe to Newsletter"}
                </Button>
              </form>
            )}
          </Card>
        </section>
      </PublicPageLayout>
    </>
  );
};

export default Newsletter;
