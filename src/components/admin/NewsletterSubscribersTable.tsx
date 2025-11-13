import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, CheckCircle, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewsletterSubscriber {
  id: string;
  email: string;
  active: boolean;
  subscribed_at: string;
  interests: any;
}

interface NewsletterSubscribersTableProps {
  onUpdate: () => void;
}

export function NewsletterSubscribersTable({ onUpdate }: NewsletterSubscribersTableProps) {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubscriber, setSelectedSubscriber] = useState<NewsletterSubscriber | null>(null);

  useEffect(() => {
    loadSubscribers();
  }, []);

  useEffect(() => {
    filterSubscribers();
  }, [subscribers, searchQuery, statusFilter]);

  const loadSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data as any || []);
    } catch (error) {
      console.error('Error loading subscribers:', error);
      toast({
        title: "Error",
        description: "Failed to load newsletter subscribers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterSubscribers = () => {
    let filtered = [...subscribers];

    if (searchQuery) {
      filtered = filtered.filter(sub =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter(sub => sub.active === isActive);
    }

    setFilteredSubscribers(filtered);
  };

  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Subscriber ${!currentStatus ? 'activated' : 'deactivated'}`,
      });

      await loadSubscribers();
      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Status', 'Subscribed At', 'Interests'];
    const rows = filteredSubscribers.map(sub => [
      sub.email,
      sub.active ? 'Active' : 'Inactive',
      format(new Date(sub.subscribed_at), 'PPpp'),
      JSON.stringify(sub.interests || {})
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${filteredSubscribers.length} subscribers to CSV`,
    });
  };

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <Badge variant="default" className="flex items-center gap-1 w-fit">
        <CheckCircle className="w-3 h-3" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
        <XCircle className="w-3 h-3" />
        Inactive
      </Badge>
    );
  };

  if (loading) {
    return <Card><CardContent className="p-12 text-center">Loading...</CardContent></Card>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Newsletter Subscribers</CardTitle>
              <CardDescription>Manage newsletter subscriptions and contacts</CardDescription>
            </div>
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subscribers</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      No newsletter subscribers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>{getStatusBadge(subscriber.active)}</TableCell>
                      <TableCell>{format(new Date(subscriber.subscribed_at), 'PPp')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedSubscriber(subscriber)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleActiveStatus(subscriber.id, subscriber.active)}
                          >
                            {subscriber.active ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Total: {filteredSubscribers.length} subscribers ({filteredSubscribers.filter(s => s.active).length} active)
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSubscriber} onOpenChange={() => setSelectedSubscriber(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Subscriber Details</DialogTitle>
            <DialogDescription>Full information about this subscriber</DialogDescription>
          </DialogHeader>
          {selectedSubscriber && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{selectedSubscriber.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedSubscriber.active)}</div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Subscribed At</p>
                  <p className="text-sm">{format(new Date(selectedSubscriber.subscribed_at), 'PPpp')}</p>
                </div>
              </div>
              {selectedSubscriber.interests && Object.keys(selectedSubscriber.interests).length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Interests</p>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto">
                    {JSON.stringify(selectedSubscriber.interests, null, 2)}
                  </pre>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => toggleActiveStatus(selectedSubscriber.id, selectedSubscriber.active)}
                >
                  {selectedSubscriber.active ? 'Deactivate' : 'Activate'} Subscription
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
