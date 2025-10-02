import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { User, Settings, LogOut, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // Safely get auth context with fallback
  let user = null;
  let signOut = () => Promise.resolve();
  try {
    const auth = useAuth();
    user = auth.user;
    signOut = auth.signOut;
  } catch (error) {
    console.warn('AuthProvider not available');
  }
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form states
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Load user profile
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        setError('Failed to load profile: ' + error.message);
        return;
      }

      if (data) {
        setProfile(data);
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (err) {
      setError('An unexpected error occurred while loading your profile.');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setUpdating(true);
      setError(null);
      setSuccess(null);

      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName.trim() || null,
          bio: bio.trim() || null,
          avatar_url: avatarUrl.trim() || null,
        })
        .eq('user_id', user.id);

      if (error) {
        setError('Failed to update profile: ' + error.message);
        return;
      }

      setSuccess('Profile updated successfully!');
      loadProfile(); // Reload profile data
    } catch (err) {
      setError('An unexpected error occurred while updating your profile.');
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      setError('Failed to sign out. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Profile features are available for authenticated users. <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/auth')}>Sign in to continue</Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name: string | null) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || 'U';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
            <p className="text-muted-foreground">Manage your profile and account preferences</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your profile details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <div className="h-20 w-20 bg-muted rounded-full animate-pulse mx-auto"></div>
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                  </div>
                ) : (
                  <form onSubmit={updateProfile} className="space-y-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={avatarUrl} alt={displayName || user.email || ''} />
                        <AvatarFallback className="text-lg">
                          {getInitials(displayName)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="w-full space-y-2">
                        <Label htmlFor="avatar-url">Avatar URL</Label>
                        <Input
                          id="avatar-url"
                          type="url"
                          placeholder="https://example.com/avatar.jpg"
                          value={avatarUrl}
                          onChange={(e) => setAvatarUrl(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter a URL to an image for your profile picture
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input
                        id="display-name"
                        type="text"
                        placeholder="Your display name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        {bio.length}/500 characters
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-hero text-white"
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Information
                </CardTitle>
                <CardDescription>
                  Your account details and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input value={user.email || ''} disabled />
                  <p className="text-xs text-muted-foreground">
                    Contact support to change your email address
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Account Created</Label>
                  <Input 
                    value={new Date(user.created_at).toLocaleDateString()} 
                    disabled 
                  />
                </div>

                <div className="space-y-2">
                  <Label>User ID</Label>
                  <Input value={user.id} disabled />
                  <p className="text-xs text-muted-foreground">
                    This is your unique identifier
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <LogOut className="w-5 h-5" />
                  Account Actions
                </CardTitle>
                <CardDescription>
                  Manage your account access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Sign Out</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sign out of your account on this device
                    </p>
                    <Button variant="outline" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;