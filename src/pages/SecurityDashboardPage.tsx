import { PageHero } from '@/components/layout/PageHero';
import { SecurityDashboard } from '@/components/SecurityDashboard';
import { ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { AuthenticatedPageLayout } from '@/components/layout/AuthenticatedPageLayout';

export default function SecurityDashboardPage() {
  return (
    <>
      <SEO
        title="Security Dashboard"
        description="Monitor security posture, run vulnerability scans, and track compliance"
        keywords={['security', 'vulnerability scanning', 'compliance', 'security dashboard']}
        ogImage="https://3bi.ai/og/security.png"
        canonical="https://3bi.ai/security-dashboard"
      />
      <AuthenticatedPageLayout maxWidth="2xl" showBreadcrumbs={false}>
        <PageHero
          title="Security Dashboard"
          description="Monitor and improve your security posture"
          badge={{
            icon: ShieldCheck,
            text: 'Security',
          }}
        />
        <div className="mt-8">
          <SecurityDashboard />
        </div>
      </AuthenticatedPageLayout>
    </>
  );
}
