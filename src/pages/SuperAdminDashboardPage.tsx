import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/layout/PageHero';
import { ShieldCheck, Users, Database, Settings } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { RequireSuperAdmin } from '@/components/auth/RequireSuperAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SuperAdminDashboardPage() {
  const navigate = useNavigate();

  const adminFeatures = [
    {
      title: 'User Management',
      description: 'Manage user roles, permissions, and accounts',
      icon: Users,
      action: () => navigate('/admin/users'),
      available: false, // To be implemented
    },
    {
      title: 'Permission Management',
      description: 'Configure role-based access control',
      icon: ShieldCheck,
      action: () => navigate('/enterprise/permissions'),
      available: true,
    },
    {
      title: 'Security Dashboard',
      description: 'Monitor security posture and vulnerabilities',
      icon: Database,
      action: () => navigate('/security-dashboard'),
      available: true,
    },
    {
      title: 'White-Label Settings',
      description: 'Customize platform branding and appearance',
      icon: Settings,
      action: () => navigate('/enterprise/white-label'),
      available: true,
    },
  ];

  return (
    <RequireSuperAdmin>
      <SEO
        title="Super Admin Dashboard"
        description="Manage system-wide settings, users, and permissions"
        keywords={['admin', 'dashboard', 'management', 'permissions']}
      />
      <PageLayout>
        <PageHero
          title="Super Admin Dashboard"
          description="System-wide management and configuration"
          badge={{
            icon: ShieldCheck,
            text: 'Super Admin',
          }}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {adminFeatures.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      {!feature.available && (
                        <span className="text-xs text-muted-foreground">(Coming Soon)</span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button
                    onClick={feature.action}
                    disabled={!feature.available}
                    className="w-full"
                  >
                    {feature.available ? 'Open' : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageLayout>
    </RequireSuperAdmin>
  );
}
