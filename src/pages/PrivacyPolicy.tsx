import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { SEO } from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy - 3BI.AI"
        description="Learn how 3BI.AI collects, uses, and protects your personal data. GDPR and CCPA compliant privacy practices."
        canonical="https://3bi.ai/privacy"
      />
      <PublicPageLayout maxWidth="7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
          <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Effective Date: January 1, 2025</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
              <p className="text-foreground/90 leading-relaxed">
                Welcome to 3BI.AI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information. This Privacy Policy applies to our web application, mobile applications (iOS and Android), and all related services (collectively, the "Services").
              </p>
              <p className="text-foreground/90 leading-relaxed">
                By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Account Information:</strong> Email address, password (encrypted), display name, and profile picture</li>
                <li><strong>User Content:</strong> Text inputs, voice recordings, images uploaded for AI processing, and generated content</li>
                <li><strong>Communication Data:</strong> Messages, feedback, and support inquiries</li>
                <li><strong>Payment Information:</strong> Processed securely through third-party payment providers (we do not store credit card details)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Usage Data:</strong> Features accessed, interactions, session duration, and frequency of use</li>
                <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address, and device identifiers</li>
                <li><strong>Location Data:</strong> Approximate location based on IP address (not precise GPS location)</li>
                <li><strong>Cookies and Similar Technologies:</strong> Session cookies, preferences, and analytics data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">2.3 Mobile App Permissions</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Camera:</strong> To capture photos for AI image generation (optional)</li>
                <li><strong>Photo Library:</strong> To save AI-generated images and upload photos (optional)</li>
                <li><strong>Microphone:</strong> For voice AI conversations and speech-to-text (optional)</li>
                <li><strong>Notifications:</strong> To send usage alerts and updates (optional)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Service Delivery:</strong> To provide, maintain, and improve AI-powered features</li>
                <li><strong>Personalization:</strong> To customize your experience and remember your preferences</li>
                <li><strong>AI Processing:</strong> To generate responses, images, code, and voice outputs using third-party AI services</li>
                <li><strong>Analytics:</strong> To understand usage patterns and optimize performance</li>
                <li><strong>Communication:</strong> To send service updates, security alerts, and respond to inquiries</li>
                <li><strong>Security:</strong> To detect fraud, prevent abuse, and protect user accounts</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our Terms of Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Third-Party Services and Data Sharing</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                We use the following third-party services to deliver our AI-powered features. Your data may be shared with these providers as necessary:
              </p>

              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">OpenAI (ChatGPT, GPT-4, DALL-E)</h4>
                  <p className="text-sm text-foreground/80">Used for: Text generation, code assistance, and image generation</p>
                  <p className="text-sm text-foreground/80">Privacy Policy: <a href="https://openai.com/policies/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">openai.com/policies/privacy-policy</a></p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Anthropic (Claude)</h4>
                  <p className="text-sm text-foreground/80">Used for: Advanced AI conversations and text analysis</p>
                  <p className="text-sm text-foreground/80">Privacy Policy: <a href="https://www.anthropic.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">anthropic.com/privacy</a></p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">xAI (Grok)</h4>
                  <p className="text-sm text-foreground/80">Used for: Real-time AI chat and multi-modal conversations</p>
                  <p className="text-sm text-foreground/80">Privacy Policy: <a href="https://x.ai/legal/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">x.ai/legal/privacy-policy</a></p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">ElevenLabs</h4>
                  <p className="text-sm text-foreground/80">Used for: Voice synthesis and text-to-speech features</p>
                  <p className="text-sm text-foreground/80">Privacy Policy: <a href="https://elevenlabs.io/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">elevenlabs.io/privacy</a></p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Google (Gemini AI)</h4>
                  <p className="text-sm text-foreground/80">Used for: Multi-modal AI processing and analysis</p>
                  <p className="text-sm text-foreground/80">Privacy Policy: <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Supabase</h4>
                  <p className="text-sm text-foreground/80">Used for: Database, authentication, and file storage</p>
                  <p className="text-sm text-foreground/80">Privacy Policy: <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">supabase.com/privacy</a></p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Stability AI</h4>
                  <p className="text-sm text-foreground/80">Used for: Advanced image generation</p>
                  <p className="text-sm text-foreground/80">Privacy Policy: <a href="https://stability.ai/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">stability.ai/privacy-policy</a></p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Replicate</h4>
                  <p className="text-sm text-foreground/80">Used for: AI model hosting and execution</p>
                  <p className="text-sm text-foreground/80">Privacy Policy: <a href="https://replicate.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">replicate.com/privacy</a></p>
                </div>
              </div>

              <p className="text-foreground/90 leading-relaxed mt-6">
                <strong>Important:</strong> When you use AI features, your prompts and inputs are sent to these third-party AI providers for processing. We recommend not sharing sensitive personal information in AI conversations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Account Data:</strong> Retained until you delete your account</li>
                <li><strong>Conversation History:</strong> Stored for 90 days by default (configurable in settings)</li>
                <li><strong>Generated Content:</strong> Retained until you delete it or close your account</li>
                <li><strong>Analytics Data:</strong> Anonymized and retained for up to 2 years for service improvement</li>
                <li><strong>Legal Compliance:</strong> Some data may be retained longer if required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Your Rights (GDPR & CCPA)</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Depending on your location, you have the following rights:
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">GDPR Rights (EU/EEA Users)</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Delete your account and associated data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Revoke consent for data processing at any time</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">CCPA Rights (California Residents)</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Right to Know:</strong> What personal information we collect and how it's used</li>
                <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell data)</li>
                <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
              </ul>

              <p className="text-foreground/90 leading-relaxed mt-6">
                To exercise these rights, contact us at <a href="mailto:privacy@3bi.ai" className="text-primary hover:underline">privacy@3bi.ai</a>. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Data Security</h2>
              <p className="text-foreground/90 leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
                <li>End-to-end encryption for data in transit (TLS 1.3)</li>
                <li>Encrypted storage for sensitive data at rest</li>
                <li>Secure authentication with bcrypt password hashing</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and least-privilege principles</li>
                <li>Multi-factor authentication (MFA) support</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to improve our safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Cookies and Tracking</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">We use the following types of cookies:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
                <li><strong>Preference Cookies:</strong> Remember your settings (theme, language)</li>
                <li><strong>Analytics Cookies:</strong> Track usage patterns to improve our Services (anonymized)</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                You can control cookies through your browser settings. Disabling essential cookies may affect functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Children's Privacy</h2>
              <p className="text-foreground/90 leading-relaxed">
                Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected data from a child under 13, please contact us immediately at <a href="mailto:privacy@3bi.ai" className="text-primary hover:underline">privacy@3bi.ai</a>, and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. International Data Transfers</h2>
              <p className="text-foreground/90 leading-relaxed">
                Your data may be transferred to and processed in countries other than your country of residence. We ensure adequate safeguards are in place, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
                <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                <li>Compliance with Privacy Shield principles where applicable</li>
                <li>Data processing agreements with third-party providers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Changes to This Privacy Policy</h2>
              <p className="text-foreground/90 leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or in-app notification. Continued use of our Services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Contact Us</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-6 space-y-2">
                <p className="text-foreground"><strong>3BI.AI Privacy Team</strong></p>
                <p className="text-foreground/90">Email: <a href="mailto:privacy@3bi.ai" className="text-primary hover:underline">privacy@3bi.ai</a></p>
                <p className="text-foreground/90">Support: <a href="mailto:support@3bi.ai" className="text-primary hover:underline">support@3bi.ai</a></p>
                <p className="text-foreground/90">Website: <a href="https://3bi.ai" className="text-primary hover:underline">3bi.ai</a></p>
              </div>
            </section>

            <section>
              <p className="text-sm text-muted-foreground mt-12 pt-6 border-t border-border">
                Last Updated: January 1, 2025 | <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
              </p>
            </section>
          </div>
        </div>

          {/* Table of Contents - Desktop only */}
          <aside className="hidden lg:block">
            <TableOfContents selector="h2" />
          </aside>
        </div>
      </PublicPageLayout>
    </>
  );
}
