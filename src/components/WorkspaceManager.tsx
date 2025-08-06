import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Users, Plus, Settings, Crown, UserPlus, Building2, BarChart3 } from "lucide-react";

interface Workspace {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  owner_id: string;
  settings: any;
  member_count?: number;
}

interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joined_at: string;
}

const WorkspaceManager = () => {
  const { toast } = useToast();
  const [workspaces] = useState<Workspace[]>([
    {
      id: 'ws-1',
      name: 'AI Research Team',
      description: 'Main workspace for AI research and development',
      created_at: new Date().toISOString(),
      owner_id: 'user-1',
      settings: {},
      member_count: 5
    },
    {
      id: 'ws-2',
      name: 'Marketing Analytics',
      description: 'Marketing team workspace for AI-powered analytics',
      created_at: new Date().toISOString(),
      owner_id: 'user-1',
      settings: {},
      member_count: 3
    }
  ]);
  const [members] = useState<WorkspaceMember[]>([
    {
      id: 'mem-1',
      workspace_id: 'ws-1',
      user_id: 'user-1',
      role: 'owner',
      joined_at: new Date().toISOString()
    },
    {
      id: 'mem-2',
      workspace_id: 'ws-1',
      user_id: 'user-2',
      role: 'admin',
      joined_at: new Date().toISOString()
    },
    {
      id: 'mem-3',
      workspace_id: 'ws-1',
      user_id: 'user-3',
      role: 'member',
      joined_at: new Date().toISOString()
    }
  ]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('ws-1');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({ name: '', description: '' });
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member' | 'viewer'>('member');

  const createWorkspace = async () => {
    if (!newWorkspace.name.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNewWorkspace({ name: '', description: '' });
      setShowCreateDialog(false);

      toast({
        title: "Success",
        description: "Workspace created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workspace",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inviteMember = async () => {
    if (!inviteEmail.trim() || !selectedWorkspace) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${inviteEmail}`,
      });

      setInviteEmail('');
      setShowInviteDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'admin':
        return <Settings className="w-4 h-4 text-blue-500" />;
      default:
        return <Users className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'default';
      case 'admin':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const selectedMembers = members.filter(m => m.workspace_id === selectedWorkspace);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Workspace Management
              </CardTitle>
              <CardDescription>
                Manage your collaborative AI workspaces and team members
              </CardDescription>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workspace
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Workspace</DialogTitle>
                  <DialogDescription>
                    Set up a new collaborative workspace for your team
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="workspace-name">Workspace Name</Label>
                    <Input
                      id="workspace-name"
                      value={newWorkspace.name}
                      onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                      placeholder="Enter workspace name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workspace-description">Description (Optional)</Label>
                    <Input
                      id="workspace-description"
                      value={newWorkspace.description}
                      onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                      placeholder="Describe your workspace"
                    />
                  </div>
                  <Button onClick={createWorkspace} disabled={isLoading} className="w-full">
                    {isLoading ? "Creating..." : "Create Workspace"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Your Workspaces</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedWorkspace === workspace.id
                    ? 'bg-primary/10 border-primary'
                    : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedWorkspace(workspace.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{workspace.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {workspace.member_count} member{workspace.member_count !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Owner
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {workspaces.find(w => w.id === selectedWorkspace)?.name || 'Select Workspace'}
              </CardTitle>
              {selectedWorkspace && (
                <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join this workspace
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="invite-email">Email Address</Label>
                        <Input
                          id="invite-email"
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="invite-role">Role</Label>
                        <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as any)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={inviteMember} disabled={isLoading} className="w-full">
                        {isLoading ? "Sending..." : "Send Invitation"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedWorkspace ? (
              <Tabs defaultValue="members" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="members" className="space-y-4">
                  {selectedMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {member.user_id.slice(-2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">User {member.user_id.slice(-4)}</div>
                          <div className="text-xs text-muted-foreground">
                            Joined {new Date(member.joined_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(member.role)}
                        <Badge variant={getRoleBadgeVariant(member.role) as any}>
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Workspace Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Workspace configuration and feature management will be available here.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Usage Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Detailed workspace analytics and usage insights will be displayed here.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Select a workspace to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkspaceManager;