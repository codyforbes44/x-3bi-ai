import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Camera, LogOut, Loader2 } from "lucide-react";
import { uploadAvatar, deleteAvatar } from "@/utils/avatarUpload";
import { SimpleFormField } from "@/components/forms/SimpleFormField";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { CharacterCounter } from "@/components/forms/CharacterCounter";
import { useFormValidation, commonSchemas } from "@/hooks/useFormValidation";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { z } from "zod";

const profileSchema = z.object({
  displayName: z.string().trim().min(2, "Display name must be at least 2 characters").max(50, "Display name must be less than 50 characters"),
  bio: z.string().trim().max(500, "Bio must be less than 500 characters").optional(),
  email: commonSchemas.email,
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [initialData, setInitialData] = useState<ProfileFormData | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const { validate, validateField, errors, clearFieldError, setError } = useFormValidation(profileSchema);

  const hasUnsavedChanges = initialData !== null && (
    displayName !== initialData.displayName ||
    bio !== (initialData.bio || "") ||
    email !== initialData.email
  );

  useUnsavedChanges({ hasUnsavedChanges });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUserId(user.id);
      setEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        const name = profile.display_name || "";
        const bioText = profile.bio || "";
        setDisplayName(name);
        setBio(bioText);
        setAvatarUrl(profile.avatar_url || "");
        
        const initialFormData = {
          displayName: name,
          bio: bioText,
          email: user.email || "",
        };
        setInitialData(initialFormData);
      }
    } catch (error: any) {
      setError("form", error.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setSuccessMessage("");
    
    const formData = {
      displayName: displayName.trim(),
      bio: bio.trim(),
      email: email.trim(),
    };

    const validation = await validate(formData);
    if (!validation.success) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim(),
          bio: bio.trim(),
        })
        .eq("id", userId);

      if (error) throw error;

      setInitialData(formData);
      setSuccessMessage("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      setError("form", error.message || "Failed to update profile");
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    setUploadingAvatar(true);
    setSuccessMessage("");
    
    try {
      if (avatarUrl) {
        await deleteAvatar(avatarUrl, userId);
      }

      const publicUrl = await uploadAvatar(file, userId);

      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (error) throw error;

      setAvatarUrl(publicUrl);
      toast.success("Avatar updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!avatarUrl || !userId) return;

    setUploadingAvatar(true);
    setSuccessMessage("");
    
    try {
      await deleteAvatar(avatarUrl, userId);

      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", userId);

      if (error) throw error;

      setAvatarUrl("");
      toast.success("Avatar removed successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Profile Settings"
        description="Manage your account profile and preferences"
        noIndex={true}
      />

      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your profile details and avatar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={uploadingAvatar}
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                >
                  {uploadingAvatar ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Avatar
                    </>
                  )}
                </Button>
                
                {avatarUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={uploadingAvatar}
                    onClick={handleDeleteAvatar}
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            <Separator />

            {/* Profile Form */}
            <div className="space-y-4">
              <SimpleFormField
                label="Display Name"
                error={errors.displayName}
                required
              >
                <Input
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    clearFieldError("displayName");
                  }}
                  onBlur={() => validateField("displayName", displayName.trim())}
                />
              </SimpleFormField>

              <SimpleFormField
                label="Bio"
                error={errors.bio}
                helper="Tell us a bit about yourself"
              >
                <Textarea
                  placeholder="Write a short bio..."
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                    clearFieldError("bio");
                  }}
                  onBlur={() => validateField("bio", bio.trim())}
                  rows={4}
                  maxLength={500}
                />
                <CharacterCounter current={bio.length} max={500} />
              </SimpleFormField>

              <SimpleFormField
                label="Email"
                error={errors.email}
                helper="Contact support to change your email address"
              >
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
              </SimpleFormField>

              {errors.form && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  {errors.form}
                </div>
              )}

              {successMessage && (
                <FormSuccess message={successMessage} variant="inline" />
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={updateProfile}
                  disabled={updating || !hasUnsavedChanges}
                  className="flex-1"
                >
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
