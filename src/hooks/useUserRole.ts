import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'super_admin' | 'admin' | 'moderator' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .order('role', { ascending: false }) // super_admin > admin > moderator > user
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          setRole('user'); // Default to regular user if no role found
        } else {
          setRole(data?.role as AppRole || 'user');
        }
      } catch (error) {
        console.error('Error in useUserRole:', error);
        setRole('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return {
    role,
    loading,
    isUser: role === 'user',
    isModerator: role === 'moderator' || role === 'admin' || role === 'super_admin',
    isAdmin: role === 'admin' || role === 'super_admin',
    isSuperAdmin: role === 'super_admin',
    hasRole: (requiredRole: AppRole) => {
      if (!role) return false;
      
      const roleHierarchy = {
        'user': 0,
        'moderator': 1,
        'admin': 2,
        'super_admin': 3,
      };
      
      return roleHierarchy[role] >= roleHierarchy[requiredRole];
    },
  };
};
