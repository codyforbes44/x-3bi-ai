import { ReactNode } from 'react';
import { useUserRole, AppRole } from '@/hooks/useUserRole';

interface RoleGuardProps {
  children: ReactNode;
  role: AppRole;
  fallback?: ReactNode;
}

/**
 * Conditionally renders children based on user role without redirecting.
 * Use this for hiding/showing UI elements based on permissions.
 */
export function RoleGuard({ children, role, fallback = null }: RoleGuardProps) {
  const { hasRole, loading } = useUserRole();

  if (loading) {
    return null;
  }

  if (!hasRole(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
