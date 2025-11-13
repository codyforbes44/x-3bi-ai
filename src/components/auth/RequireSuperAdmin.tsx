import { ReactNode } from 'react';
import { RequireRole } from './RequireRole';

interface RequireSuperAdminProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export function RequireSuperAdmin({ 
  children, 
  fallback,
  redirectTo = '/'
}: RequireSuperAdminProps) {
  return (
    <RequireRole role="super_admin" fallback={fallback} redirectTo={redirectTo}>
      {children}
    </RequireRole>
  );
}
