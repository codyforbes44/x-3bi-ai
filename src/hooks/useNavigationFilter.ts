import { useUserRole, AppRole } from './useUserRole';

interface NavigationItem {
  requiredRole?: AppRole;
  [key: string]: any;
}

/**
 * Filter navigation items based on user's role
 * Only shows items the user has permission to access
 */
export function useNavigationFilter() {
  const { hasRole, loading } = useUserRole();

  const filterNavItems = <T extends NavigationItem>(items: T[]): T[] => {
    if (loading) return [];
    
    return items.filter(item => {
      // If no role required, show to everyone
      if (!item.requiredRole) return true;
      
      // Check if user has required role
      return hasRole(item.requiredRole);
    });
  };

  return {
    filterNavItems,
    loading,
  };
}
