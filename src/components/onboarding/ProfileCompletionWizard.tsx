import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, User, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadAvatar } from "@/utils/avatarUpload";
import { toast } from "sonner";

interface ProfileCompletionWizardProps {
  userId: string;
  initialDisplayName?: string;
}

const ProfileCompletionWizard = ({ userId, initialDisplayName = "" }: ProfileCompletionWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form states
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  const navigate = useNavigate();
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    setError(null);
    
    if (currentStep === 1) {
      // Validate display name
      if (displayName.trim().length < 2) {
        setError("Display name must be at least 2 characters long");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      await handleComplete();
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    setError(null);

    try {
      // Upload avatar if selected
      let finalAvatarUrl = null;
      if (avatarFile) {
        finalAvatarUrl = await uploadAvatar(avatarFile, userId);
      }

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: displayName.trim(),
          bio: bio.trim() || null,
          avatar_url: finalAvatarUrl,
        })
        .eq('user_id', userId);

      if (updateError) {
        throw updateError;
      }

      toast.success("Profile completed successfully!");
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      toast.error("Failed to complete profile setup");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Let's set up your profile to get the most out of 3BI.AI
          </CardDescription>
          <div className="mt-4 space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Display Name */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Choose Your Display Name</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name *</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="How should we call you?"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  This is how other users will see you on the platform
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Avatar */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Add a Profile Picture</h3>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32 border-4 border-border">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback className="text-2xl">
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG, GIF or WebP. Max 5MB.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Bio */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Tell Us About Yourself</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Share a bit about yourself, your interests, or what you're working on..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={500}
                  rows={5}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {bio.length}/500 characters
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Display Name: {displayName}</span>
                </div>
                {avatarUrl && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Profile picture added</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={handleSkip}
              disabled={loading}
            >
              Skip for now
            </Button>
            
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={loading}
                >
                  Back
                </Button>
              )}
              
              <Button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="bg-gradient-hero text-white"
              >
                {loading ? "Saving..." : currentStep === totalSteps ? "Complete Profile" : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCompletionWizard;
