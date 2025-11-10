import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Palette, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// Placeholder - workspace context integration

export function WhiteLabelSettings() {
  const [loading, setLoading] = useState(false);
  const [customization, setCustomization] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    accentColor: '#10b981',
    logoLight: '',
    logoDark: '',
    customDomain: '',
  });
  const { toast } = useToast();
  const currentWorkspace = { id: 'default' }; // TODO: Replace with actual workspace context

  useEffect(() => {
    if (currentWorkspace) {
      fetchCustomization();
    }
  }, [currentWorkspace]);

  const fetchCustomization = async () => {
    try {
      const { data, error } = await supabase
        .from('tenant_customization')
        .select('*')
        .eq('workspace_id', currentWorkspace?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        const brandColors = data.brand_colors as any;
        const logoUrls = data.logo_urls as any;
        setCustomization({
          primaryColor: brandColors?.primary || '#3b82f6',
          secondaryColor: brandColors?.secondary || '#8b5cf6',
          accentColor: brandColors?.accent || '#10b981',
          logoLight: logoUrls?.light || '',
          logoDark: logoUrls?.dark || '',
          customDomain: data.custom_domain || '',
        });
      }
    } catch (error) {
      console.error('Error fetching customization:', error);
    }
  };

  const saveCustomization = async () => {
    if (!currentWorkspace) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('tenant_customization')
        .upsert({
          workspace_id: currentWorkspace.id,
          brand_colors: {
            primary: customization.primaryColor,
            secondary: customization.secondaryColor,
            accent: customization.accentColor,
          },
          logo_urls: {
            light: customization.logoLight,
            dark: customization.logoDark,
          },
          custom_domain: customization.customDomain,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'White-label settings saved successfully',
      });
    } catch (error) {
      console.error('Error saving customization:', error);
      toast({
        title: 'Error',
        description: 'Failed to save customization',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">White-Label Settings</h2>
        <p className="text-muted-foreground">Customize the platform with your brand</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Brand Colors
          </CardTitle>
          <CardDescription>Customize your brand colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary"
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => setCustomization({ ...customization, primaryColor: e.target.value })}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={customization.primaryColor}
                  onChange={(e) => setCustomization({ ...customization, primaryColor: e.target.value })}
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary"
                  type="color"
                  value={customization.secondaryColor}
                  onChange={(e) => setCustomization({ ...customization, secondaryColor: e.target.value })}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={customization.secondaryColor}
                  onChange={(e) => setCustomization({ ...customization, secondaryColor: e.target.value })}
                  placeholder="#8b5cf6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="accent"
                  type="color"
                  value={customization.accentColor}
                  onChange={(e) => setCustomization({ ...customization, accentColor: e.target.value })}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={customization.accentColor}
                  onChange={(e) => setCustomization({ ...customization, accentColor: e.target.value })}
                  placeholder="#10b981"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo URLs</CardTitle>
          <CardDescription>Provide URLs for your light and dark mode logos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logoLight">Light Mode Logo URL</Label>
            <Input
              id="logoLight"
              value={customization.logoLight}
              onChange={(e) => setCustomization({ ...customization, logoLight: e.target.value })}
              placeholder="https://your-domain.com/logo-light.png"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoDark">Dark Mode Logo URL</Label>
            <Input
              id="logoDark"
              value={customization.logoDark}
              onChange={(e) => setCustomization({ ...customization, logoDark: e.target.value })}
              placeholder="https://your-domain.com/logo-dark.png"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>Connect your own domain (Enterprise plan required)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              value={customization.customDomain}
              onChange={(e) => setCustomization({ ...customization, customDomain: e.target.value })}
              placeholder="app.your-domain.com"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveCustomization} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}