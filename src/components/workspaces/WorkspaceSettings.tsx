import { useState, useEffect } from "react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, UserPlus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function WorkspaceSettings() {
  const {
    currentWorkspace,
    members,
    updateWorkspace,
    deleteWorkspace,
    addMember,
    removeMember,
    updateMemberRole,
    leaveWorkspace,
  } = useWorkspace();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<"admin" | "member" | "viewer">("member");
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    if (currentWorkspace) {
      setName(currentWorkspace.name);
      setDescription(currentWorkspace.description || "");
    }
  }, [currentWorkspace]);

  useEffect(() => {
    fetchProfiles();
  }, [members]);

  const fetchProfiles = async () => {
    if (members.length === 0) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .in("user_id", members.map(m => m.user_id));

    if (!error && data) {
      setProfiles(data);
    }
  };

  const handleUpdateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace) return;

    setLoading(true);
    await updateWorkspace(currentWorkspace.id, name, description);
    setLoading(false);
  };

  const handleDeleteWorkspace = async () => {
    if (!currentWorkspace) return;
    await deleteWorkspace(currentWorkspace.id);
  };

  const handleAddMember = async () => {
    if (!currentWorkspace || !newMemberEmail.trim()) return;

    // Find user by email
    const { data: authData, error: authError } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("display_name", newMemberEmail)
      .single();

    if (authError || !authData) {
      toast.error("User not found");
      return;
    }

    await addMember(currentWorkspace.id, authData.user_id, newMemberRole);
    setNewMemberEmail("");
    setNewMemberRole("member");
  };

  const handleLeaveWorkspace = async () => {
    if (!currentWorkspace) return;
    await leaveWorkspace(currentWorkspace.id);
  };

  const getProfileForMember = (userId: string) => {
    return profiles.find(p => p.user_id === userId);
  };

  const currentUserMember = members.find(m => m.user_id === (supabase.auth.getUser() as any)?.data?.user?.id);
  const isAdmin = currentUserMember?.role === "admin" || currentUserMember?.role === "owner";
  const isOwner = currentUserMember?.role === "owner";

  if (!currentWorkspace) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">No workspace selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">Workspace Settings</h2>
        <p className="text-muted-foreground">Manage your workspace settings and members</p>
      </div>

      <Separator />

      {/* Workspace Details */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Details</CardTitle>
          <CardDescription>Update your workspace information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateWorkspace} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Name</Label>
              <Input
                id="workspace-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isAdmin}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspace-description">Description</Label>
              <Textarea
                id="workspace-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!isAdmin}
                rows={3}
              />
            </div>
            {isAdmin && (
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>Manage workspace members and permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAdmin && (
            <div className="flex gap-2">
              <Input
                placeholder="User email or name"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <Select value={newMemberRole} onValueChange={(value: any) => setNewMemberRole(value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddMember} size="icon">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="space-y-2">
            {members.map((member) => {
              const profile = getProfileForMember(member.user_id);
              return (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{profile?.display_name || "Unknown User"}</p>
                      <Badge variant="secondary" className="mt-1">
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                  {isAdmin && member.role !== "owner" && (
                    <div className="flex items-center gap-2">
                      <Select
                        value={member.role}
                        onValueChange={(value: any) => updateMemberRole(member.id, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMember(member.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible workspace actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isOwner && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Leave Workspace
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Leave workspace?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will lose access to this workspace and all its resources.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveWorkspace}>
                    Leave
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {isOwner && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Workspace
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the workspace
                    and remove all members.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteWorkspace} className="bg-destructive">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
