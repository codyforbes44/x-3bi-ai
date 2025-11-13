import { PublicPageLayout } from "@/components/layout/PublicPageLayout";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { SEO } from "@/components/SEO";

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service - 3BI.AI"
        description="Terms and conditions for using 3BI.AI's AI-powered platform, including usage limits, acceptable use policy, and legal agreements."
        canonical="https://3bi.ai/terms"
      />
      <PublicPageLayout maxWidth="7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
          <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Effective Date: January 1, 2025</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-foreground/90 leading-relaxed">
                Welcome to 3BI.AI ("Company," "we," "our," or "us"). By accessing or using our web application, mobile applications (iOS and Android), or any related services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms").
              </p>
              <p className="text-foreground/90 leading-relaxed">
                If you do not agree to these Terms, you may not access or use our Services. We reserve the right to modify these Terms at any time. Continued use of the Services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Eligibility</h2>
              <p className="text-foreground/90 leading-relaxed">
                You must be at least 13 years old to use our Services. If you are between 13 and 18 years old, you must have parental or guardian consent. By using our Services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
                <li>You meet the minimum age requirement</li>
                <li>You have the legal capacity to enter into binding agreements</li>
                <li>You will comply with all applicable laws and regulations</li>
                <li>All information you provide is accurate and up-to-date</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Account Registration and Security</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">3.1 Account Creation</h3>
              <p className="text-foreground/90 leading-relaxed">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as necessary</li>
                <li>Keep your password confidential and secure</li>
                <li>Notify us immediately of any unauthorized account access</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">3.2 Account Responsibility</h3>
              <p className="text-foreground/90 leading-relaxed">
                You are solely responsible for all activities that occur under your account. We are not liable for any loss or damage arising from your failure to maintain account security.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">3.3 Account Termination</h3>
              <p className="text-foreground/90 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violations of these Terms, illegal activity, or other reasons at our sole discretion. You may delete your account at any time through the account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Acceptable Use Policy</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                You agree NOT to use our Services to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Violate Laws:</strong> Engage in illegal activities or violate any local, state, national, or international law</li>
                <li><strong>Harm Others:</strong> Generate content that harasses, threatens, defames, or harms others</li>
                <li><strong>Spread Misinformation:</strong> Create or distribute false, misleading, or deceptive content</li>
                <li><strong>Generate Harmful Content:</strong> Create content promoting violence, terrorism, hate speech, or discrimination</li>
                <li><strong>Infringe Rights:</strong> Violate intellectual property, privacy, or other rights of third parties</li>
                <li><strong>Distribute Malware:</strong> Upload viruses, malware, or any malicious code</li>
                <li><strong>Abuse Systems:</strong> Attempt to reverse engineer, hack, or bypass security measures</li>
                <li><strong>Spam or Bot Activity:</strong> Use automated systems to access the Services excessively</li>
                <li><strong>Resell Services:</strong> Resell, redistribute, or commercially exploit our Services without authorization</li>
                <li><strong>Impersonate Others:</strong> Impersonate any person or entity, or misrepresent your affiliation</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Violations may result in immediate account suspension or termination, and we may report illegal activities to law enforcement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. AI-Generated Content and Usage Limits</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">5.1 Fair Use Policy</h3>
              <p className="text-foreground/90 leading-relaxed">
                Our Services include AI-powered features with usage limits based on your subscription plan:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li><strong>Free Tier:</strong> Limited monthly requests with rate limiting</li>
                <li><strong>Pro Tier:</strong> Higher limits with priority processing</li>
                <li><strong>Enterprise Tier:</strong> Custom limits and dedicated support</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Excessive or abusive usage may result in throttling, temporary suspension, or additional charges.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">5.2 AI Content Disclaimer</h3>
              <p className="text-foreground/90 leading-relaxed">
                AI-generated content is provided "as-is" and may contain errors, inaccuracies, or biases. You are solely responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li>Reviewing and verifying AI-generated content before use</li>
                <li>Ensuring compliance with applicable laws and regulations</li>
                <li>Not relying on AI outputs for critical decisions without human oversight</li>
                <li>Understanding that AI models may produce inconsistent results</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">5.3 Content Ownership</h3>
              <p className="text-foreground/90 leading-relaxed">
                You retain ownership of your input data and prompts. AI-generated content is provided under a non-exclusive license for your use. However, you acknowledge that similar outputs may be generated for other users, and you do not have exclusive rights to AI-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">6.1 Our Intellectual Property</h3>
              <p className="text-foreground/90 leading-relaxed">
                The Services, including all software, designs, text, graphics, logos, and other content (excluding user-generated content), are owned by 3BI.AI and protected by copyright, trademark, and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li>Copy, modify, or create derivative works of our platform</li>
                <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                <li>Use our trademarks or branding without written permission</li>
                <li>Reverse engineer or decompile any part of the Services</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">6.2 User Content License</h3>
              <p className="text-foreground/90 leading-relaxed">
                By uploading content to our Services, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and process your content solely to provide and improve the Services. We do not claim ownership of your content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Subscription Plans and Payments</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">7.1 Pricing</h3>
              <p className="text-foreground/90 leading-relaxed">
                We offer free and paid subscription plans. Pricing is subject to change with 30 days' notice. Current pricing is available at <a href="https://3bi.ai/pricing" className="text-primary hover:underline">3bi.ai/pricing</a>.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">7.2 Billing and Renewals</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Subscriptions renew automatically unless canceled before the renewal date</li>
                <li>Charges are non-refundable except as required by law or at our discretion</li>
                <li>You are responsible for all applicable taxes</li>
                <li>Failed payments may result in service suspension</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">7.3 Cancellations and Refunds</h3>
              <p className="text-foreground/90 leading-relaxed">
                You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period. We do not provide refunds for partial months or unused credits, except in cases of service unavailability exceeding our SLA commitments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Third-Party Services</h2>
              <p className="text-foreground/90 leading-relaxed">
                Our Services integrate with third-party AI providers (OpenAI, Anthropic, xAI, Google, ElevenLabs, Stability AI, Replicate) and infrastructure providers (Supabase). By using our Services, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
                <li>Third-party services have their own terms and privacy policies</li>
                <li>We are not responsible for third-party service outages or data practices</li>
                <li>Your data may be processed by these third parties as described in our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a></li>
                <li>Service availability depends on third-party infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Disclaimers and Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">9.1 Service Availability</h3>
              <p className="text-foreground/90 leading-relaxed">
                We strive for 99.9% uptime but cannot guarantee uninterrupted service. The Services are provided "AS-IS" and "AS-AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Guarantees of accuracy, reliability, or completeness of AI outputs</li>
                <li>Warranties of non-infringement or title</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">9.2 Limitation of Liability</h3>
              <p className="text-foreground/90 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, 3BI.AI SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Damages arising from use or inability to use the Services</li>
                <li>Unauthorized access, data breaches, or service interruptions</li>
                <li>Content, actions, or inactions of third parties or other users</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim, or $100 USD, whichever is greater.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">9.3 Indemnification</h3>
              <p className="text-foreground/90 leading-relaxed">
                You agree to indemnify, defend, and hold harmless 3BI.AI, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li>Your use or misuse of the Services</li>
                <li>Violations of these Terms or applicable laws</li>
                <li>Infringement of third-party rights</li>
                <li>Your user-generated content or AI outputs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">10.1 Informal Resolution</h3>
              <p className="text-foreground/90 leading-relaxed">
                Before filing a legal claim, you agree to contact us at <a href="mailto:legal@3bi.ai" className="text-primary hover:underline">legal@3bi.ai</a> and attempt to resolve the dispute informally for at least 30 days.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">10.2 Arbitration Agreement</h3>
              <p className="text-foreground/90 leading-relaxed">
                Any disputes arising from these Terms or the Services shall be resolved through binding arbitration in accordance with the American Arbitration Association (AAA) rules, except where prohibited by law. You waive the right to participate in class actions or class arbitrations.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">10.3 Governing Law</h3>
              <p className="text-foreground/90 leading-relaxed">
                These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Exclusive jurisdiction for any disputes lies in the state or federal courts located in Delaware.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Data Privacy and Security</h2>
              <p className="text-foreground/90 leading-relaxed">
                We take data privacy seriously. Please review our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your information. By using the Services, you consent to our data practices as described in the Privacy Policy.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                While we implement industry-standard security measures, you acknowledge that no system is completely secure, and you use the Services at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Mobile App Terms (iOS & Android)</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">12.1 App Store Terms</h3>
              <p className="text-foreground/90 leading-relaxed">
                If you download our mobile app from the Apple App Store or Google Play Store, you agree to their respective terms and conditions in addition to these Terms.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">12.2 Device Permissions</h3>
              <p className="text-foreground/90 leading-relaxed">
                Our mobile app may request permissions for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li><strong>Camera:</strong> To capture photos for AI image generation (optional)</li>
                <li><strong>Photo Library:</strong> To save AI-generated images (optional)</li>
                <li><strong>Microphone:</strong> For voice AI features (optional)</li>
                <li><strong>Notifications:</strong> To send updates and alerts (optional)</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                You can manage permissions in your device settings. Denying permissions may limit functionality.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">12.3 Updates and Compatibility</h3>
              <p className="text-foreground/90 leading-relaxed">
                We may release updates to improve functionality, security, or compatibility. You agree to install updates to continue using the app. We are not responsible for issues arising from outdated app versions or unsupported devices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">13. API Access and Developer Terms</h2>
              <p className="text-foreground/90 leading-relaxed">
                If you access our Services via API, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li>Comply with API rate limits and usage policies</li>
                <li>Not circumvent technical limitations or security measures</li>
                <li>Properly attribute 3BI.AI when required</li>
                <li>Respect API keys as confidential credentials</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                We reserve the right to revoke API access for violations or abuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">14. Modifications to Services and Terms</h2>
              <p className="text-foreground/90 leading-relaxed">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-2">
                <li>Modify, suspend, or discontinue any part of the Services at any time</li>
                <li>Update these Terms with notice via email or in-app notification</li>
                <li>Change pricing with 30 days' advance notice for existing subscribers</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Continued use after changes constitutes acceptance. If you do not agree to modifications, you must stop using the Services and cancel your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">15. Miscellaneous</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">15.1 Entire Agreement</h3>
              <p className="text-foreground/90 leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and 3BI.AI regarding the Services.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">15.2 Severability</h3>
              <p className="text-foreground/90 leading-relaxed">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">15.3 No Waiver</h3>
              <p className="text-foreground/90 leading-relaxed">
                Our failure to enforce any right or provision of these Terms does not constitute a waiver of such right or provision.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">15.4 Assignment</h3>
              <p className="text-foreground/90 leading-relaxed">
                You may not assign or transfer these Terms without our written consent. We may assign our rights and obligations without restriction.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">15.5 Survival</h3>
              <p className="text-foreground/90 leading-relaxed">
                Provisions that by their nature should survive termination (including disclaimers, limitations of liability, and indemnification) will continue after these Terms end.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">16. Contact Information</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                For questions, concerns, or legal inquiries regarding these Terms, contact us:
              </p>
              <div className="bg-muted rounded-lg p-6 space-y-2">
                <p className="text-foreground"><strong>3BI.AI Legal Department</strong></p>
                <p className="text-foreground/90">Email: <a href="mailto:legal@3bi.ai" className="text-primary hover:underline">legal@3bi.ai</a></p>
                <p className="text-foreground/90">Support: <a href="mailto:support@3bi.ai" className="text-primary hover:underline">support@3bi.ai</a></p>
                <p className="text-foreground/90">Website: <a href="https://3bi.ai" className="text-primary hover:underline">3bi.ai</a></p>
              </div>
            </section>

            <section>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
                <p className="text-foreground font-semibold mb-2">By using 3BI.AI, you acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-1 text-foreground/90">
                  <li>You have read, understood, and agree to these Terms of Service</li>
                  <li>You have reviewed our Privacy Policy</li>
                  <li>You understand the limitations and disclaimers outlined above</li>
                  <li>You will use the Services responsibly and in compliance with all laws</li>
                </ul>
              </div>
            </section>

            <section>
              <p className="text-sm text-muted-foreground mt-12 pt-6 border-t border-border">
                Last Updated: January 1, 2025 | <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
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
