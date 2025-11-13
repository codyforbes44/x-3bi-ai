import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { WhiteLabelSettings } from '@/components/WhiteLabelSettings';
import { Palette } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { RequireSuperAdmin } from '@/components/auth/RequireSuperAdmin';

export default function WhiteLabelPage() {
  return (
    <RequireSuperAdmin>
      <SEO
        title="White-Label Settings"
        description="Customize the platform with your brand - logos, colors, and custom domains"
        keywords={['white-label', 'branding', 'customization', 'custom domain']}
        ogImage="https://3bi.ai/og/enterprise.png"
        canonical="https://3bi.ai/enterprise/white-label"
      />
      <PageLayout>
        <PageHero
          title="White-Label Settings"
          description="Customize the platform with your brand"
          badge={{
            icon: Palette,
            text: 'Super Admin Only',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <WhiteLabelSettings />
        </div>
      </PageLayout>
    </RequireSuperAdmin>
  );
}
