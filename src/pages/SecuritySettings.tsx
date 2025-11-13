import { OptimizedImage } from "@/components/ui/optimized-image";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Shield, ShieldCheck, AlertTriangle, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { logger } from "@/utils/logger";
import { AuthenticatedPageLayout } from "@/components/layout/AuthenticatedPageLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AuditLog {
  id: string;
  event_type: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export default function SecuritySettings() {
  const { user } = useAuth();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    if (user) {
      checkMfaStatus();
      fetchAuditLogs();
    }
  }, [user]);

  const checkMfaStatus = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      setMfaEnabled(data.totp.length > 0);
    } catch (error) {
      logger.error("Error checking MFA status", error);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setAuditLogs(data || []);
    } catch (error) {
      logger.error("Error fetching audit logs", error);
    }
  };

  const enableMfa = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Authenticator App",
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      toast.success("Scan the QR code with your authenticator app");
    } catch (error: any) {
      toast.error(error.message || "Failed to enable 2FA");
    } finally {
      setLoading(false);
    }
  };

  const verifyMfa = async () => {
    setLoading(true);
    try {
      const factors = await supabase.auth.mfa.listFactors();
      if (!factors.data) throw new Error("No factors found");

      const totp = factors.data.totp[0];
      if (!totp) throw new Error("No TOTP factor found");

      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId: totp.id,
        code: verifyCode,
      });

      if (error) throw error;

      setMfaEnabled(true);
      setQrCode(null);
      setVerifyCode("");
      toast.success("2FA enabled successfully");
      
      // Log the security event
      await logSecurityEvent("2fa_enabled");
    } catch (error: any) {
      toast.error(error.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const disableMfa = async () => {
    setLoading(true);
    try {
      const factors = await supabase.auth.mfa.listFactors();
      if (!factors.data) throw new Error("No factors found");

      const totp = factors.data.totp[0];
      if (!totp) throw new Error("No TOTP factor found");

      const { error } = await supabase.auth.mfa.unenroll({
        factorId: totp.id,
      });

      if (error) throw error;

      setMfaEnabled(false);
      toast.success("2FA disabled");
      
      // Log the security event
      await logSecurityEvent("2fa_disabled");
    } catch (error: any) {
      toast.error(error.message || "Failed to disable 2FA");
    } finally {
      setLoading(false);
    }
  };

  const logSecurityEvent = async (eventType: string) => {
    try {
      await supabase.from("audit_logs").insert({
        user_id: user?.id,
        event_type: eventType,
        ip_address: "unknown",
        user_agent: navigator.userAgent,
      });
      fetchAuditLogs();
    } catch (error) {
      logger.error("Error logging security event", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <SEO
        title="Security Settings"
        description="Manage your account security settings including two-factor authentication and audit logs"
        keywords={['security settings', '2FA', 'account security', 'audit logs']}
        ogImage="https://3bi.ai/og/security.png"
        canonical="https://3bi.ai/security"
      />
      
      <AuthenticatedPageLayout maxWidth="xl" showBreadcrumbs={true}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Security Settings</h1>
          <p className="text-muted-foreground">
            Manage your account security and monitor activity
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  {mfaEnabled ? (
                    <Badge variant="default" className="gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Enabled
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Disabled
                    </Badge>
                  )}
                </div>
              </div>

              {!mfaEnabled && !qrCode && (
                <Button onClick={enableMfa} disabled={loading} className="w-full">
                  Enable 2FA
                </Button>
              )}

              {qrCode && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <OptimizedImage src={qrCode} alt="QR Code" loading="eager" className="mx-auto" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verify-code">Verification Code</Label>
                    <Input
                      id="verify-code"
                      placeholder="Enter 6-digit code"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                  <Button onClick={verifyMfa} disabled={loading || verifyCode.length !== 6} className="w-full">
                    Verify and Enable
                  </Button>
                </div>
              )}

              {mfaEnabled && (
                <Button onClick={disableMfa} disabled={loading} variant="destructive" className="w-full">
                  Disable 2FA
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Security Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                  <span>Use a strong, unique password for your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                  <span>Enable two-factor authentication for added security</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                  <span>Review your audit logs regularly for suspicious activity</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                  <span>Keep your email address up to date</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                  <span>Don't share your account credentials with anyone</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Monitor your account security events
            </CardDescription>
          </CardHeader>
          <CardContent>
            {auditLogs.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Device</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">
                          {log.event_type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </TableCell>
                        <TableCell>{formatDate(log.created_at)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {log.user_agent.substring(0, 50)}...
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No security events recorded yet
              </div>
            )}
          </CardContent>
        </Card>
      </AuthenticatedPageLayout>
    </>
  );
}
