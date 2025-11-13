import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SimpleFormField } from "@/components/forms/SimpleFormField";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { CharacterCounter } from "@/components/forms/CharacterCounter";
import { useFormValidation } from "@/hooks/useFormValidation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Mail, Loader2, Sparkles } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters")
});

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: "card" | "inline";
}

export function NewsletterSignup({ 
  title = "Stay Updated",
  description = "Get the latest AI insights, tutorials, and updates delivered to your inbox.",
  className = "",
  variant = "card"
}: NewsletterSignupProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { validate, errors, validateField } = useFormValidation(newsletterSchema);

  const handleChange = async (value: string) => {
    setEmail(value);
    if (errors.email) {
      await validateField("email", value);
    }
  };

  const handleBlur = async () => {
    await validateField("email", email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    const result = await validate({ email });
    if (!result.success) return;

    setIsSubmitting(true);
    
    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
        });
        setIsSubmitting(false);
        return;
      }

      // Insert newsletter subscription
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: email,
          active: true,
          interests: {}
        });

      if (error) throw error;

      // Send welcome email
      try {
        await supabase.functions.invoke('send-newsletter-welcome', {
          body: { email }
        });
      } catch (emailError) {
        console.error('Welcome email failed:', emailError);
        // Don't block the subscription if email fails
      }

      setSubmitSuccess(true);
      
      toast({
        title: "Successfully Subscribed!",
        description: "Check your email for a welcome message.",
      });
      
      // Reset form after success
      setTimeout(() => {
        setEmail("");
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="space-y-4">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <SimpleFormField error={errors.email}>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                value={email}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                placeholder="your@email.com"
                maxLength={255}
                className="w-full"
              />
              <CharacterCounter current={email.length} max={255} />
            </div>
            <Button
              type="submit"
              className="bg-gradient-hero text-white"
              disabled={isSubmitting || submitSuccess}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </div>
        </SimpleFormField>

        {submitSuccess && (
          <FormSuccess 
            message="Successfully subscribed! Check your email for confirmation." 
            variant="inline"
          />
        )}
      </form>

      <p className="text-xs text-muted-foreground text-center md:text-left">
        Join 10,000+ subscribers. Unsubscribe anytime. We respect your privacy.
      </p>
    </div>
  );

  if (variant === "inline") {
    return <div className={className}>{content}</div>;
  }

  return (
    <Card className={`p-6 md:p-8 ${className}`}>
      {content}
    </Card>
  );
}
