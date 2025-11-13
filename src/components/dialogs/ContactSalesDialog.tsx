import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SimpleFormField } from "@/components/forms/SimpleFormField";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { CharacterCounter } from "@/components/forms/CharacterCounter";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { z } from "zod";
import { Mail, Loader2 } from "lucide-react";

const contactSalesSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().min(1, "Company is required").max(100, "Company must be less than 100 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  message: z.string().trim().min(10, "Please provide more details (at least 10 characters)").max(500, "Message must be less than 500 characters")
});

interface ContactSalesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactSalesDialog({ open, onOpenChange }: ContactSalesDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { validate, errors, clearErrors, validateField, clearFieldError } = useFormValidation(contactSalesSchema);
  
  const hasUnsavedChanges = Object.values(formData).some(value => value.trim() !== "") && !submitSuccess;
  useUnsavedChanges({ hasUnsavedChanges });

  const handleChange = async (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      await validateField(field, value);
    }
  };

  const handleBlur = async (field: keyof typeof formData) => {
    await validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    const result = await validate(formData);
    if (!result.success) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      clearErrors();
      setSubmitSuccess(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleClose = (open: boolean) => {
    if (!open && hasUnsavedChanges && !submitSuccess) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (!confirmed) return;
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Sales</DialogTitle>
          <DialogDescription>
            Have questions about our enterprise plans or need a custom solution? We're here to help.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <SimpleFormField
            label="Full Name"
            error={errors.name}
            required
          >
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="John Doe"
              maxLength={100}
            />
            <CharacterCounter current={formData.name.length} max={100} />
          </SimpleFormField>

          <SimpleFormField
            label="Work Email"
            error={errors.email}
            required
          >
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="john@company.com"
              maxLength={255}
            />
            <CharacterCounter current={formData.email.length} max={255} />
          </SimpleFormField>

          <SimpleFormField
            label="Company"
            error={errors.company}
            required
          >
            <Input
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              onBlur={() => handleBlur("company")}
              placeholder="Acme Inc."
              maxLength={100}
            />
            <CharacterCounter current={formData.company.length} max={100} />
          </SimpleFormField>

          <SimpleFormField
            label="Phone Number"
            error={errors.phone}
            helper="Optional - Preferred contact number"
          >
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              placeholder="+1 (555) 123-4567"
              maxLength={20}
            />
            <CharacterCounter current={formData.phone.length} max={20} />
          </SimpleFormField>

          <SimpleFormField
            label="How can we help?"
            error={errors.message}
            required
          >
            <Textarea
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              placeholder="Tell us about your needs, team size, specific requirements..."
              maxLength={500}
              rows={4}
            />
            <CharacterCounter current={formData.message.length} max={500} />
          </SimpleFormField>

          {submitSuccess && (
            <FormSuccess 
              message="Message sent! Our sales team will contact you within 24 hours." 
              variant="alert"
            />
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-hero text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
