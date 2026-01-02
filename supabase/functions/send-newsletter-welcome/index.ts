import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { logError, getErrorMessage, getErrorStatus } from '../_shared/errorHandling.ts';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterWelcomeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterWelcomeRequest = await req.json();

    console.log("Sending newsletter welcome email to:", email);

    const emailResponse = await resend.emails.send({
      from: "3BI.AI Newsletter <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to 3BI.AI - Your AI Journey Starts Here! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to 3BI.AI! 🎉</h1>
          </div>
          
          <div style="padding: 40px 20px;">
            <p style="font-size: 16px; line-height: 1.6;">
              Thank you for subscribing to our newsletter! You're now part of an exclusive community at the forefront of AI innovation.
            </p>

            <h2 style="color: #8b5cf6; margin-top: 30px;">What to Expect:</h2>
            <ul style="line-height: 1.8; color: #374151;">
              <li>🤖 <strong>Latest AI Updates:</strong> Stay informed about new features and AI model releases</li>
              <li>💡 <strong>Expert Insights:</strong> Learn best practices and tips from AI experts</li>
              <li>🎁 <strong>Exclusive Offers:</strong> Be the first to know about special promotions</li>
              <li>📚 <strong>Case Studies:</strong> Real-world examples of AI transforming businesses</li>
            </ul>

            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="margin-top: 0; color: #8b5cf6;">Get Started Today</h3>
              <p>Ready to experience the power of AI? Explore our platform and discover how 3BI.AI can transform your workflow.</p>
              <a href="https://3bi.io" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 10px;">
                Explore 3BI.AI
              </a>
            </div>

            <p style="margin-top: 30px; color: #6b7280;">
              Have questions? Just reply to this email - we're here to help!
            </p>

            <p style="margin-top: 30px;">
              Best regards,<br/>
              <strong>The 3BI.AI Team</strong>
            </p>
          </div>

          <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; margin-top: 40px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              You're receiving this email because you subscribed to our newsletter at 3bi.io
            </p>
            <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
              <a href="https://3bi.io" style="color: #8b5cf6; text-decoration: none;">Visit Website</a> • 
              <a href="#" style="color: #8b5cf6; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Newsletter welcome email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    logError(error, 'send-newsletter-welcome');
    return new Response(
      JSON.stringify({ error: getErrorMessage(error) }),
      {
        status: getErrorStatus(error),
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);