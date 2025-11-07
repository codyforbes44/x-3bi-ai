import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Share2, Users, Gift, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";

interface ReferralStats {
  referral_code: string;
  total_referrals: number;
  successful_referrals: number;
  pending_referrals: number;
  total_rewards: number;
}

export default function ReferralProgram() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [referralUrl, setReferralUrl] = useState("");

  useEffect(() => {
    if (user) {
      fetchReferralStats();
    }
  }, [user]);

  const fetchReferralStats = async () => {
    try {
      const { data, error } = await supabase
        .from("referral_stats")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (!data) {
        // Create initial referral code
        const code = generateReferralCode();
        const { data: newStats, error: createError } = await supabase
          .from("referral_stats")
          .insert({
            user_id: user?.id,
            referral_code: code,
          })
          .select()
          .single();

        if (createError) throw createError;
        setStats(newStats);
      } else {
        setStats(data);
      }

      setReferralUrl(`${window.location.origin}?ref=${data?.referral_code || ''}`);
    } catch (error: any) {
      console.error("Error fetching referral stats:", error);
      toast.error("Failed to load referral data");
    } finally {
      setLoading(false);
    }
  };

  const generateReferralCode = () => {
    return `REF${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralUrl);
    toast.success("Referral link copied to clipboard!");
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on this amazing platform!",
          text: "Use my referral code to get started",
          url: referralUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyReferralLink();
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Please sign in to access the referral program
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Referral Program"
        description="Earn rewards by referring friends and colleagues"
        keywords={['referral program', 'earn rewards', 'refer friends', 'affiliate']}
        ogImage="https://3bi.ai/og/referrals.png"
        canonical="https://3bi.ai/referrals"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Referral Program</h1>
          <p className="text-muted-foreground">
            Share the platform and earn rewards for every successful referral
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.total_referrals || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Successful
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                {stats?.successful_referrals || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-500" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">
                {stats?.pending_referrals || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Gift className="h-4 w-4 text-purple-500" />
                Total Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">
                ${stats?.total_rewards || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>
                Share this link with friends to earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Referral Code</label>
                <div className="flex items-center gap-2">
                  <Input value={stats?.referral_code || ""} readOnly />
                  <Badge variant="secondary">{stats?.referral_code}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Referral URL</label>
                <div className="flex gap-2">
                  <Input value={referralUrl} readOnly />
                  <Button onClick={copyReferralLink} variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={shareReferral} className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share Referral Link
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Earn rewards in 3 simple steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Share Your Link</h3>
                    <p className="text-sm text-muted-foreground">
                      Send your unique referral link to friends and colleagues
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">They Sign Up</h3>
                    <p className="text-sm text-muted-foreground">
                      Your referral creates an account using your link
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Earn Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Get $10 for each successful referral that upgrades
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
