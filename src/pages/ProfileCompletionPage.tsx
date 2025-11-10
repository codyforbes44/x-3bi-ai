import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import ProfileCompletionWizard from "@/components/onboarding/ProfileCompletionWizard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ProfileCompletionPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [initialDisplayName, setInitialDisplayName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (authLoading) return;
      
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Check if profile already has bio or avatar (indicators of completion)
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name, bio, avatar_url')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          setInitialDisplayName(profile.display_name || '');
          
          // If profile is already complete, redirect to dashboard
          if (profile.bio || profile.avatar_url) {
            navigate('/dashboard');
            return;
          }
        }
      } catch (err) {
        console.error('Error checking profile:', err);
      } finally {
        setLoading(false);
      }
    };

    checkProfileCompletion();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <SEO
        title="Complete Your Profile - 3BI.AI"
        description="Set up your profile to get started with 3BI.AI"
        keywords={['profile setup', 'onboarding', 'account setup']}
      />
      <ProfileCompletionWizard 
        userId={user.id} 
        initialDisplayName={initialDisplayName}
      />
    </>
  );
};

export default ProfileCompletionPage;
