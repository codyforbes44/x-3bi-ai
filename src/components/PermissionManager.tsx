import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Users, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

interface RolePermission {
  role: string;
  permissions: string[];
}

export function PermissionManager() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const roles = ['admin', 'member', 'viewer'];

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const { data: perms, error } = await supabase
        .from('permissions')
        .select('*')
        .order('resource');

      if (error) throw error;

      setPermissions(perms || []);

      // Fetch role permissions
      const rolePermsMap: RolePermission[] = [];
      for (const role of roles) {
        const { data: rp } = await supabase
          .from('role_permissions')
          .select('permission_id')
          .eq('role', role);

        rolePermsMap.push({
          role,
          permissions: rp?.map(p => p.permission_id) || [],
        });
      }

      setRolePermissions(rolePermsMap);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load permissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = async (role: string, permissionId: string) => {
    const rolePerms = rolePermissions.find(rp => rp.role === role);
    const hasPermission = rolePerms?.permissions.includes(permissionId);

    try {
      if (hasPermission) {
        // Remove permission
        await supabase
          .from('role_permissions')
          .delete()
          .eq('role', role)
          .eq('permission_id', permissionId);
      } else {
        // Add permission
        await supabase
          .from('role_permissions')
          .insert({ role, permission_id: permissionId });
      }

      await fetchPermissions();

      toast({
        title: 'Success',
        description: `Permission ${hasPermission ? 'removed' : 'added'} successfully`,
      });
    } catch (error) {
      console.error('Error toggling permission:', error);
      toast({
        title: 'Error',
        description: 'Failed to update permission',
        variant: 'destructive',
      });
    }
  };

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.resource]) {
      acc[perm.resource] = [];
    }
    acc[perm.resource].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  if (loading) {
    return <div className="text-center py-8">Loading permissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Permission Management</h2>
          <p className="text-muted-foreground">Configure role-based access control</p>
        </div>
        <Badge variant="outline">
          <Shield className="w-4 h-4 mr-2" />
          {permissions.length} Permissions
        </Badge>
      </div>

      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="member">Member</TabsTrigger>
          <TabsTrigger value="viewer">Viewer</TabsTrigger>
        </TabsList>

        {roles.map(role => (
          <TabsContent key={role} value={role} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {role.charAt(0).toUpperCase() + role.slice(1)} Permissions
                </CardTitle>
                <CardDescription>
                  Configure what {role}s can access and perform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedPermissions).map(([resource, perms]) => (
                    <div key={resource} className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4" />
                        <h3 className="font-semibold capitalize">{resource}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                        {perms.map(perm => {
                          const rolePerms = rolePermissions.find(rp => rp.role === role);
                          const isChecked = rolePerms?.permissions.includes(perm.id) || false;

                          return (
                            <div key={perm.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                              <Checkbox
                                id={`${role}-${perm.id}`}
                                checked={isChecked}
                                onCheckedChange={() => togglePermission(role, perm.id)}
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor={`${role}-${perm.id}`}
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  {perm.name}
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {perm.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}