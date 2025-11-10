import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Search, Download, CheckCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// Placeholder - workspace context integration

interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  logo_url: string;
  pricing_model: string;
  install_count: number;
  is_verified: boolean;
}

export function IntegrationMarketplace() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [installedIds, setInstalledIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const currentWorkspace = { id: 'default' }; // TODO: Replace with actual workspace context

  useEffect(() => {
    fetchIntegrations();
    fetchInstalled();
  }, [currentWorkspace]);

  const fetchIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .order('install_count', { ascending: false });

      if (error) throw error;
      setIntegrations(data || []);
    } catch (error) {
      console.error('Error fetching integrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstalled = async () => {
    if (!currentWorkspace) return;

    try {
      const { data, error } = await supabase.functions.invoke('integration-install', {
        body: { action: 'list', workspace_id: currentWorkspace.id },
      });

      if (error) throw error;
      setInstalledIds(data?.data?.map((i: any) => i.integration_id) || []);
    } catch (error) {
      console.error('Error fetching installed integrations:', error);
    }
  };

  const installIntegration = async (integrationId: string) => {
    if (!currentWorkspace) {
      toast({
        title: 'Error',
        description: 'Please select a workspace first',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('integration-install', {
        body: {
          action: 'install',
          integration_id: integrationId,
          workspace_id: currentWorkspace.id,
          config: {},
        },
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Integration installed successfully',
      });

      fetchInstalled();
      fetchIntegrations();
    } catch (error: any) {
      console.error('Error installing integration:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to install integration',
        variant: 'destructive',
      });
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || integration.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(integrations.map(i => i.category))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integration Marketplace</h2>
        <p className="text-muted-foreground">Extend your platform with powerful integrations</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={category} onValueChange={setCategory}>
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={category} className="mt-6">
          {loading ? (
            <div className="text-center py-12">Loading integrations...</div>
          ) : filteredIntegrations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No integrations found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.map((integration) => {
                const isInstalled = installedIds.includes(integration.id);

                return (
                  <Card key={integration.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {integration.logo_url && (
                            <img
                              src={integration.logo_url}
                              alt={integration.name}
                              className="w-10 h-10 rounded"
                            />
                          )}
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {integration.category}
                            </CardDescription>
                          </div>
                        </div>
                        {integration.is_verified && (
                          <Badge variant="secondary" className="ml-auto">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <Badge variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          {integration.install_count}
                        </Badge>
                        <Badge variant="outline">{integration.pricing_model}</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {isInstalled ? (
                        <Button variant="outline" className="w-full" disabled>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Installed
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => installIntegration(integration.id)}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Install
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}