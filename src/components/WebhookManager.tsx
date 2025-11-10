import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Webhook, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// Placeholder - workspace context integration

interface WebhookData {
  id: string;
  url: string;
  events: string[];
  is_active: boolean;
  created_at: string;
}

const AVAILABLE_EVENTS = [
  { value: 'workflow.completed', label: 'Workflow Completed' },
  { value: 'workflow.failed', label: 'Workflow Failed' },
  { value: 'agent.created', label: 'Agent Created' },
  { value: 'user.upgraded', label: 'User Upgraded' },
  { value: 'insight.generated', label: 'Insight Generated' },
];

export function WebhookManager() {
  const [webhooks, setWebhooks] = useState<WebhookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const { toast } = useToast();
  const currentWorkspace = { id: 'default' }; // TODO: Replace with actual workspace context

  useEffect(() => {
    if (currentWorkspace) {
      fetchWebhooks();
    }
  }, [currentWorkspace]);

  const fetchWebhooks = async () => {
    try {
      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .eq('workspace_id', currentWorkspace?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebhooks(data || []);
    } catch (error) {
      console.error('Error fetching webhooks:', error);
      toast({
        title: 'Error',
        description: 'Failed to load webhooks',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createWebhook = async () => {
    if (!url || selectedEvents.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please provide a URL and select at least one event',
        variant: 'destructive',
      });
      return;
    }

    try {
      const secret = crypto.randomUUID();

      const { error } = await supabase
        .from('webhooks')
        .insert({
          url,
          events: selectedEvents,
          secret,
          is_active: true,
        } as any);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Webhook created successfully',
      });

      setOpen(false);
      setUrl('');
      setSelectedEvents([]);
      fetchWebhooks();
    } catch (error) {
      console.error('Error creating webhook:', error);
      toast({
        title: 'Error',
        description: 'Failed to create webhook',
        variant: 'destructive',
      });
    }
  };

  const deleteWebhook = async (id: string) => {
    try {
      const { error } = await supabase
        .from('webhooks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Webhook deleted successfully',
      });

      fetchWebhooks();
    } catch (error) {
      console.error('Error deleting webhook:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete webhook',
        variant: 'destructive',
      });
    }
  };

  const toggleWebhook = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('webhooks')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      fetchWebhooks();
    } catch (error) {
      console.error('Error toggling webhook:', error);
      toast({
        title: 'Error',
        description: 'Failed to update webhook',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Webhook Management</h2>
          <p className="text-muted-foreground">Configure webhooks for real-time event notifications</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Webhook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Webhook</DialogTitle>
              <DialogDescription>
                Set up a webhook to receive real-time notifications
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Webhook URL</Label>
                <Input
                  id="url"
                  placeholder="https://your-domain.com/webhook"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Events to Subscribe</Label>
                <div className="space-y-2">
                  {AVAILABLE_EVENTS.map((event) => (
                    <div key={event.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={event.value}
                        checked={selectedEvents.includes(event.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedEvents([...selectedEvents, event.value]);
                          } else {
                            setSelectedEvents(selectedEvents.filter(e => e !== event.value));
                          }
                        }}
                      />
                      <label htmlFor={event.value} className="text-sm cursor-pointer">
                        {event.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={createWebhook}>Create Webhook</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading webhooks...</div>
      ) : webhooks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Webhook className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No webhooks configured yet</p>
            <Button onClick={() => setOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Webhook
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <Card key={webhook.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Webhook className="w-4 h-4" />
                      {webhook.url}
                    </CardTitle>
                    <CardDescription>
                      Created {new Date(webhook.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={webhook.is_active ? 'default' : 'outline'}
                      onClick={() => toggleWebhook(webhook.id, webhook.is_active)}
                    >
                      {webhook.is_active ? (
                        <><CheckCircle className="w-4 h-4 mr-2" /> Active</>
                      ) : (
                        <><XCircle className="w-4 h-4 mr-2" /> Inactive</>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteWebhook(webhook.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="secondary">
                      {event}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}