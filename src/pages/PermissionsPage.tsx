import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { PermissionManager } from '@/components/PermissionManager';
import { Shield } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { RequireRole } from '@/components/auth/RequireRole';

export default function PermissionsPage() {
  return (
    <RequireRole role="admin">
      <SEO
        title="Permission Management"
        description="Configure role-based access control and manage team permissions"
        keywords={['permissions', 'RBAC', 'access control', 'team management']}
        ogImage="https://3bi.ai/og/enterprise.png"
        canonical="https://3bi.ai/enterprise/permissions"
      />
      <PageLayout>
        <PageHero
          title="Permission Management"
          description="Configure role-based access control for your team"
          badge={{
            icon: Shield,
            text: 'Admin Only',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <PermissionManager />
        </div>
      </PageLayout>
    </RequireRole>
  );
}
