import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Key, Plus, Trash2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { SEO } from "@/components/SEO";
import { AuthenticatedPageLayout } from "@/components/layout/AuthenticatedPageLayout";

interface APIKey {
  id: string;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used_at: string | null;
  expires_at: string | null;
  is_active: boolean;
}

export default function APIKeys() {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchAPIKeys();
    }
  }, [user]);

  const fetchAPIKeys = async () => {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error("Error fetching API keys:", error);
      toast.error("Failed to load API keys");
    } finally {
      setLoading(false);
    }
  };

  const generateAPIKey = () => {
    const prefix = "sk";
    const randomPart = Array.from({ length: 32 }, () =>
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
        Math.floor(Math.random() * 62)
      )
    ).join("");
    return `${prefix}_${randomPart}`;
  };

  const hashKey = async (key: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(key);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const createAPIKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name");
      return;
    }

    try {
      const apiKey = generateAPIKey();
      const keyHash = await hashKey(apiKey);
      const keyPrefix = apiKey.substring(0, 10) + "...";

      const { error } = await supabase.from("api_keys").insert({
        user_id: user?.id,
        name: newKeyName,
        key_hash: keyHash,
        key_prefix: keyPrefix,
      });

      if (error) throw error;

      setNewKeyValue(apiKey);
      setNewKeyName("");
      await fetchAPIKeys();
      toast.success("API key created successfully");
    } catch (error) {
      console.error("Error creating API key:", error);
      toast.error("Failed to create API key");
    }
  };

  const deleteAPIKey = async (id: string) => {
    try {
      const { error } = await supabase.from("api_keys").delete().eq("id", id);

      if (error) throw error;

      await fetchAPIKeys();
      toast.success("API key deleted");
    } catch (error) {
      console.error("Error deleting API key:", error);
      toast.error("Failed to delete API key");
    }
  };

  const toggleAPIKey = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("api_keys")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      await fetchAPIKeys();
      toast.success(`API key ${!currentStatus ? "enabled" : "disabled"}`);
    } catch (error) {
      console.error("Error updating API key:", error);
      toast.error("Failed to update API key");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <SEO
        title="API Keys - Manage Your API Access"
        description="Create and manage API keys for third-party integrations and programmatic access to your account."
        keywords={['API keys', 'API management', 'developer tools', 'access tokens']}
        ogImage="https://3bi.ai/og/api-keys.png"
        canonical="https://3bi.ai/api-keys"
      />
      <AuthenticatedPageLayout maxWidth="xl" showBreadcrumbs={false}>
        <div className="space-y-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">API Keys</h1>
            <p className="text-muted-foreground">
              Manage your API keys for third-party integrations
            </p>
          </div>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setNewKeyValue(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  {newKeyValue
                    ? "Save this API key securely. You won't be able to see it again."
                    : "Give your API key a descriptive name to identify its purpose."}
                </DialogDescription>
              </DialogHeader>

              {newKeyValue ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-sm break-all">{newKeyValue}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(newKeyValue)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-amber-600 dark:text-amber-500">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Make sure to copy your API key now. You won't be able to see it again!
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setCreateDialogOpen(false)}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Production API"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && createAPIKey()}
                    />
                  </div>
                  <Button onClick={createAPIKey} className="w-full">
                    Create Key
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>
              Use these keys to authenticate API requests from your applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-muted-foreground">Loading...</p>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-12">
                <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No API keys yet</p>
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First API Key
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <code className="text-sm">{key.key_prefix}</code>
                      </TableCell>
                      <TableCell>
                        <Badge variant={key.is_active ? "default" : "secondary"}>
                          {key.is_active ? "Active" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(key.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {key.last_used_at
                          ? format(new Date(key.last_used_at), "MMM d, yyyy")
                          : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleAPIKey(key.id, key.is_active)}
                          >
                            {key.is_active ? "Disable" : "Enable"}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{key.name}"? This action
                                  cannot be undone and will break any integrations using this
                                  key.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteAPIKey(key.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        </div>
      </AuthenticatedPageLayout>
    </>
  );
}
