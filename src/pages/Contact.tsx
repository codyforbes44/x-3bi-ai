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
import { SimpleFormField } from "@/components/forms/SimpleFormField";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { CharacterCounter } from "@/components/forms/CharacterCounter";
import { useFormValidation } from "@/hooks/useFormValidation";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { errors, validate } = useFormValidation(contactSchema);
  const MAX_MESSAGE_LENGTH = 500;

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
    const validationResult = await validate(formData);
    if (!validationResult.success) return;

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
      toast({ title: "Message Sent!", description: "We'll respond within 24 hours." });
    } catch (error: any) {
      logger.error("Contact form failed", error);
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, title: "Email", content: "support@3bi.ai", link: "mailto:support@3bi.ai" },
    { icon: Phone, title: "Phone", content: "+1 (555) 123-4567", link: "tel:+15551234567" },
    { icon: MapPin, title: "Address", content: "123 AI Avenue, Tech City, TC 12345", link: null }
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get Support"
        description="Get in touch with 3BI.AI support team."
        keywords={['contact support', 'AI support', 'help']}
        ogImage="https://3bi.ai/og/contact.png"
        canonical="https://3bi.ai/contact"
      />
      <PublicPageLayout maxWidth="7xl">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </section>

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

        <section className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Send us a Message</h2>
            {success ? (
              <FormSuccess 
                message={`Message sent! We'll respond within 24 hours to: ${formData.email}`}
                action={{ label: "Send another message", onClick: () => {
                  setSuccess(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <SimpleFormField label="Your Name" error={errors.name} helper="How should we address you?" required>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                  />
                </SimpleFormField>

                <SimpleFormField label="Your Email" error={errors.email} helper={formData.email && !errors.email ? "Using profile" : undefined} required>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                </SimpleFormField>

                <SimpleFormField label="Subject" error={errors.subject} required>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })} disabled={loading}>
                    <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical Support">Technical Support</SelectItem>
                      <SelectItem value="Billing Question">Billing Question</SelectItem>
                      <SelectItem value="Feature Request">Feature Request</SelectItem>
                      <SelectItem value="Partnership Inquiry">Partnership Inquiry</SelectItem>
                      <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </SimpleFormField>

                <SimpleFormField label="Message" error={errors.message} required>
                  <Textarea
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                        setFormData({ ...formData, message: e.target.value });
                      }
                    }}
                    rows={5}
                    disabled={loading}
                  />
                  <CharacterCounter current={formData.message.length} max={MAX_MESSAGE_LENGTH} />
                </SimpleFormField>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">Average response time: 4 hours</p>
              </form>
            )}
          </Card>
        </section>
      </PublicPageLayout>
    </>
  );
};

export default Contact;
