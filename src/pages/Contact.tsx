import { SEO } from "@/components/SEO";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema } from "@/utils/formValidation";
import { logger } from "@/utils/logger";
import { FormField } from "@/components/forms/FormField";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { CharacterCounter } from "@/components/forms/CharacterCounter";
import { useFormValidation } from "@/hooks/useFormValidation";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { errors, validate } = useFormValidation(contactSchema);

  const MAX_MESSAGE_LENGTH = 500;

  // Auto-fill from user profile if logged in
  useEffect(() => {
    const loadUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('user_id', user.id)
          .single();
        
        if (profile || user.email) {
          setFormData(prev => ({
            ...prev,
            name: profile?.display_name || prev.name,
            email: user.email || prev.email
          }));
        }
      }
    };
    loadUserProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = validate(formData);
    if (!validationResult.success) {
      return;
    }

    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("contact_submissions").insert({
        user_id: user?.id,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error: any) {
      logger.error("Contact form submission failed", error);
      validate(formData, "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@3bi.ai",
      link: "mailto:support@3bi.ai"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 AI Avenue, Tech City, TC 12345",
      link: null
    }
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get Support"
        description="Get in touch with 3BI.AI support team. Questions about features, pricing, or enterprise solutions? We're here to help."
        keywords={['contact support', 'AI support', 'customer service', 'help']}
        ogImage="https://3bi.ai/og/contact.png"
        canonical="https://3bi.ai/contact"
      />
      <PublicPageLayout maxWidth="7xl">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </section>

        {/* Contact Info Cards */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center hover-scale">
                <info.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="text-muted-foreground hover:text-primary transition-smooth">
                    {info.content}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{info.content}</p>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
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
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-hero text-white">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-bold mb-2">What's your response time?</h3>
                <p className="text-muted-foreground">We typically respond to all inquiries within 24 hours during business days.</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-2">Do you offer technical support?</h3>
                <p className="text-muted-foreground">Yes! Our support team is available to help with technical issues, integrations, and platform questions.</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-2">Can I schedule a demo?</h3>
                <p className="text-muted-foreground">Absolutely! Mention "demo request" in your message and we'll set up a time that works for you.</p>
              </Card>
            </div>
          </div>
        </section>
      </PublicPageLayout>
    </>
  );
};

export default Contact;
