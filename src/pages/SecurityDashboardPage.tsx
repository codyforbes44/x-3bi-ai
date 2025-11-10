import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { SecurityDashboard } from '@/components/SecurityDashboard';
import { ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/SEO';

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
      <PageLayout>
        <PageHero
          title="Security Dashboard"
          description="Monitor and improve your security posture"
          badge={{
            icon: ShieldCheck,
            text: 'Security',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <SecurityDashboard />
        </div>
      </PageLayout>
    </>
  );
}
