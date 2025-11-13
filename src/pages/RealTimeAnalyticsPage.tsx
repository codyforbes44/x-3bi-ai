import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { RealTimeMonitoring } from '@/components/RealTimeMonitoring';
import { Activity } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { RequireRole } from '@/components/auth/RequireRole';

export default function RealTimeAnalyticsPage() {
  return (
    <RequireRole role="admin">
      <SEO
        title="Real-Time Analytics"
        description="Monitor system health, performance metrics, and live activity in real-time"
        keywords={['real-time analytics', 'system monitoring', 'performance metrics', 'live dashboard']}
        ogImage="https://3bi.ai/og/analytics.png"
        canonical="https://3bi.ai/analytics/realtime"
      />
      <PageLayout>
        <PageHero
          title="Real-Time Analytics"
          description="Live system monitoring and performance metrics"
          badge={{
            icon: Activity,
            text: 'Live Monitoring',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <RealTimeMonitoring />
        </div>
      </PageLayout>
    </RequireRole>
  );
}
