import { SEO } from "@/components/SEO";
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Phone, Send, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema } from "@/utils/formValidation";
import { logger } from "@/utils/logger";
import { SimpleFormField } from "@/components/forms/SimpleFormField";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { CharacterCounter } from "@/components/forms/CharacterCounter";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [autoFilled, setAutoFilled] = useState({ name: false, email: false });
  const { errors, validate, validateField, clearFieldError } = useFormValidation(contactSchema);
  const MAX_MESSAGE_LENGTH = 5000;
  
  // Track unsaved changes
  const hasUnsavedChanges = !success && (
    formData.name.length > 0 || 
    formData.email.length > 0 || 
    formData.subject.length > 0 || 
    formData.message.length > 0
  );
  useUnsavedChanges({ hasUnsavedChanges });

  useEffect(() => {
    const loadUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.display_name || user.email) {
          setFormData(prev => ({
            ...prev,
            name: profile?.display_name || prev.name,
            email: user.email || prev.email
          }));
          setAutoFilled({
            name: !!profile?.display_name,
            email: !!user.email
          });
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
      
      // Clear form and reset states
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setAutoFilled({ name: false, email: false });
      
      toast({ 
        title: "Message Sent!", 
        description: "We'll respond within 24 hours." 
      });
    } catch (error: any) {
      logger.error("Contact form failed", error);
      toast({ 
        title: "Error", 
        description: "Failed to send. Please try again.", 
        variant: "destructive" 
      });
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
        <section className="container mx-auto px-4 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </section>

        <section className="container mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-4 sm:p-6 text-center hover-scale touch-target">
                <info.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4 text-primary" />
                <h3 className="font-bold mb-2 text-sm sm:text-base">{info.title}</h3>
                {info.link ? (
                  <a 
                    href={info.link} 
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-smooth break-all"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-sm sm:text-base text-muted-foreground">{info.content}</p>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-6 sm:py-8 pb-16">
          <Card className="max-w-3xl mx-auto p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Send us a Message</h2>
            {success ? (
              <FormSuccess 
                variant="alert"
                message="Message sent successfully! We'll respond within 24 hours."
                action={{ 
                  label: "Send another message", 
                  onClick: () => {
                    setSuccess(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                    setAutoFilled({ name: false, email: false });
                  }
                }}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <SimpleFormField 
                  label="Your Name" 
                  error={errors.name} 
                  helper={autoFilled.name ? "Auto-filled from profile" : "How should we address you?"} 
                  required
                >
                  <div className="relative">
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        clearFieldError("name");
                        setAutoFilled(prev => ({ ...prev, name: false }));
                      }}
                      onBlur={() => validateField("name", formData.name)}
                      disabled={loading}
                      maxLength={100}
                      className={autoFilled.name ? "pr-10" : ""}
                    />
                    {autoFilled.name && (
                      <UserCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                    )}
                  </div>
                </SimpleFormField>

                <SimpleFormField 
                  label="Your Email" 
                  error={errors.email} 
                  helper={autoFilled.email ? "Auto-filled from profile" : "We'll send our reply here"} 
                  required
                >
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        clearFieldError("email");
                        setAutoFilled(prev => ({ ...prev, email: false }));
                      }}
                      onBlur={() => validateField("email", formData.email)}
                      disabled={loading}
                      maxLength={255}
                      autoComplete="email"
                      className={autoFilled.email ? "pr-10" : ""}
                    />
                    {autoFilled.email && (
                      <UserCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                    )}
                  </div>
                </SimpleFormField>

                <SimpleFormField label="Subject" error={errors.subject} helper="Choose the topic that best matches your inquiry" required>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => {
                      setFormData({ ...formData, subject: value });
                      clearFieldError("subject");
                    }} 
                    disabled={loading}
                  >
                    <SelectTrigger className="h-12 sm:h-10">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      <SelectItem value="Technical Support">Technical Support</SelectItem>
                      <SelectItem value="Billing Question">Billing Question</SelectItem>
                      <SelectItem value="Feature Request">Feature Request</SelectItem>
                      <SelectItem value="Partnership Inquiry">Partnership Inquiry</SelectItem>
                      <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </SimpleFormField>

                <SimpleFormField label="Message" error={errors.message} helper="Provide as much detail as possible" required>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                        setFormData({ ...formData, message: e.target.value });
                        clearFieldError("message");
                      }
                    }}
                    onBlur={() => validateField("message", formData.message)}
                    rows={6}
                    disabled={loading}
                    className="resize-none min-h-[120px] sm:min-h-[150px]"
                  />
                  <CharacterCounter current={formData.message.length} max={MAX_MESSAGE_LENGTH} />
                </SimpleFormField>

                <Button 
                  type="submit" 
                  className="w-full h-12 sm:h-11 text-base sm:text-sm touch-target" 
                  size="lg" 
                  disabled={loading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-center text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    Avg. response: 4 hours
                  </Badge>
                </div>
              </form>
            )}
          </Card>
        </section>
      </PublicPageLayout>
    </>
  );
};

export default Contact;
