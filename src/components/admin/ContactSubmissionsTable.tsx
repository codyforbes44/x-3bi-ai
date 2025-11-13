import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

interface ContactSubmissionsTableProps {
  onUpdate: () => void;
}

export function ContactSubmissionsTable({ onUpdate }: ContactSubmissionsTableProps) {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchQuery, statusFilter]);

  const loadSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data as any || []);
    } catch (error) {
      console.error('Error loading contact submissions:', error);
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    if (searchQuery) {
      filtered = filtered.filter(sub =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.company && sub.company.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    setFilteredSubmissions(filtered);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Contact marked as ${newStatus}`,
      });

      await loadSubmissions();
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
    const headers = ['Name', 'Email', 'Company', 'Phone', 'Subject', 'Message', 'Status', 'Created At'];
    const rows = filteredSubmissions.map(sub => [
      sub.name,
      sub.email,
      sub.company || '',
      sub.phone || '',
      sub.subject,
      sub.message,
      sub.status,
      format(new Date(sub.created_at), 'PPpp')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${filteredSubmissions.length} contact submissions to CSV`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      pending: { variant: "secondary", icon: Clock },
      responded: { variant: "default", icon: CheckCircle },
      resolved: { variant: "default", icon: CheckCircle },
      closed: { variant: "destructive", icon: XCircle },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {status}
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
              <CardTitle>Contact Submissions</CardTitle>
              <CardDescription>Manage sales inquiries and contact requests</CardDescription>
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
                placeholder="Search by name, email, or company..."
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
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No contact submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>{submission.company || 'N/A'}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.subject}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell>{format(new Date(submission.created_at), 'PP')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {submission.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateStatus(submission.id, 'responded')}
                            >
                              Mark Responded
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
            <DialogDescription>Full information about this contact inquiry</DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-sm">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p className="text-sm">{selectedSubmission.company || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{selectedSubmission.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm">{selectedSubmission.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subject</p>
                  <p className="text-sm">{selectedSubmission.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedSubmission.status)}</div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                <p className="text-sm bg-muted p-3 rounded-lg whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selectedSubmission.id, 'responded')}
                  disabled={selectedSubmission.status !== 'pending'}
                >
                  Mark as Responded
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selectedSubmission.id, 'resolved')}
                  disabled={selectedSubmission.status === 'resolved'}
                >
                  Mark as Resolved
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selectedSubmission.id, 'closed')}
                  disabled={selectedSubmission.status === 'closed'}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
