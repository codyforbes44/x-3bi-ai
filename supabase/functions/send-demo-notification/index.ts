import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DemoNotificationRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  preferredDate: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, phone, preferredDate, message }: DemoNotificationRequest = await req.json();

    console.log("Processing demo request notification for:", email);

    // Send notification to admin team
    const adminEmailResponse = await resend.emails.send({
      from: "3BI.AI Demo Requests <onboarding@resend.dev>",
      to: ["admin@3bi.io"], // Replace with actual admin email
      subject: `New Demo Request from ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8b5cf6;">New Demo Request</h1>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ''}
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Please respond to this request within 24 hours.
          </p>
        </div>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Send confirmation to user
    const userEmailResponse = await resend.emails.send({
      from: "3BI.AI <onboarding@resend.dev>",
      to: [email],
      subject: "We received your demo request!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8b5cf6;">Thank you for your interest, ${name}!</h1>
          <p>We've received your demo request and will get back to you within 24 hours to schedule your personalized demo of 3BI.AI.</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Your Request Details:</h2>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            ${message ? `<p><strong>Your Message:</strong><br/>${message}</p>` : ''}
          </div>

          <p>In the meantime, feel free to explore our <a href="https://3bi.io/features" style="color: #8b5cf6;">features page</a> to learn more about what 3BI.AI can do for your business.</p>
          
          <p style="margin-top: 30px;">Best regards,<br/>The 3BI.AI Team</p>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            If you didn't request this demo, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    console.log("User confirmation email sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmailId: adminEmailResponse.data?.id,
        userEmailId: userEmailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-demo-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);