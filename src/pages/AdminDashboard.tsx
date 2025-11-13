import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { DemoRequestsTable } from "@/components/admin/DemoRequestsTable";
import { ContactSubmissionsTable } from "@/components/admin/ContactSubmissionsTable";
import { NewsletterSubscribersTable } from "@/components/admin/NewsletterSubscribersTable";
import { Shield, Users, Mail, Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    pendingDemos: 0,
    pendingContacts: 0,
    totalSubscribers: 0,
    activeSubscribers: 0
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      // Check if user has admin role using the has_role function
      const { data: hasAdminRole, error } = await supabase
        .rpc('has_role', { 
          _user_id: user.id, 
          _role: 'admin' 
        });

      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      if (!hasAdminRole) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      await loadStats();
      setLoading(false);
    } catch (error) {
      console.error('Error in admin check:', error);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Get pending demo requests count
      const { count: demosCount } = await supabase
        .from('demo_requests' as any)
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Get pending contact submissions count
      const { count: contactsCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Get total subscribers count
      const { count: totalSubs } = await supabase
        .from('newsletter_subscriptions')
        .select('*', { count: 'exact', head: true });

      // Get active subscribers count
      const { count: activeSubs } = await supabase
        .from('newsletter_subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('active', true);

      setStats({
        pendingDemos: demosCount || 0,
        pendingContacts: contactsCount || 0,
        totalSubscribers: totalSubs || 0,
        activeSubscribers: activeSubs || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  if (loading) {
    return <PageSkeleton variant="card-grid" count={4} />;
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16">
        <SEO
          title="Access Denied - Admin Dashboard"
          description="Admin access required"
          noIndex={true}
        />
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access the admin dashboard. This area is restricted to administrators only.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Admin Dashboard - Manage Leads & Subscribers"
        description="Admin dashboard for managing demo requests, contact inquiries, and newsletter subscribers"
        noIndex={true}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage leads, inquiries, and subscribers</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Demos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDemos}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Contacts</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingContacts}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSubscribers}</div>
              <p className="text-xs text-muted-foreground">Out of {stats.totalSubscribers} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Badge variant="secondary">{stats.pendingDemos + stats.pendingContacts}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.pendingDemos + stats.pendingContacts}
              </div>
              <p className="text-xs text-muted-foreground">Requiring attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tables */}
        <Tabs defaultValue="demos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="demos">
              Demo Requests
              {stats.pendingDemos > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {stats.pendingDemos}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts">
              Contact Inquiries
              {stats.pendingContacts > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {stats.pendingContacts}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="subscribers">
              Newsletter Subscribers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demos">
            <DemoRequestsTable onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactSubmissionsTable onUpdate={loadStats} />
          </TabsContent>

          <TabsContent value="subscribers">
            <NewsletterSubscribersTable onUpdate={loadStats} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
