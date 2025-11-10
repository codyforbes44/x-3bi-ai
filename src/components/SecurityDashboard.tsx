import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { Shield, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// Placeholder - workspace context integration

interface SecurityScan {
  id: string;
  scan_type: string;
  status: string;
  findings: any[];
  score: number;
  started_at: string;
  completed_at: string;
}

export function SecurityDashboard() {
  const [latestScan, setLatestScan] = useState<SecurityScan | null>(null);
  const [scanning, setScanning] = useState(false);
  const { toast } = useToast();
  const currentWorkspace = { id: 'default' }; // TODO: Replace with actual workspace context

  useEffect(() => {
    if (currentWorkspace) {
      fetchLatestScan();
    }
  }, [currentWorkspace]);

  const fetchLatestScan = async () => {
    try {
      const { data, error } = await supabase
        .from('security_scans')
        .select('*')
        .eq('workspace_id', currentWorkspace?.id)
        .order('started_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setLatestScan(data as SecurityScan);
    } catch (error) {
      console.error('Error fetching scan:', error);
    }
  };

  const runSecurityScan = async () => {
    if (!currentWorkspace) return;

    setScanning(true);
    try {
      const { data, error } = await supabase.functions.invoke('security-scan', {
        body: {
          workspace_id: currentWorkspace.id,
          scan_type: 'full',
        },
      });

      if (error) throw error;

      toast({
        title: 'Security Scan Complete',
        description: `Security score: ${data.score}/100`,
      });

      fetchLatestScan();
    } catch (error) {
      console.error('Error running scan:', error);
      toast({
        title: 'Error',
        description: 'Failed to run security scan',
        variant: 'destructive',
      });
    } finally {
      setScanning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-yellow-600';
    return 'text-destructive';
  };

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, any> = {
      high: 'destructive',
      medium: 'secondary',
      low: 'outline',
    };
    return variants[severity] || 'outline';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Dashboard</h2>
          <p className="text-muted-foreground">Monitor and improve your security posture</p>
        </div>
        <Button onClick={runSecurityScan} disabled={scanning}>
          <RefreshCw className={`w-4 h-4 mr-2 ${scanning ? 'animate-spin' : ''}`} />
          Run Security Scan
        </Button>
      </div>

      {latestScan ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Security Score</CardDescription>
                <CardTitle className={`text-4xl ${getScoreColor(latestScan.score)}`}>
                  {latestScan.score}/100
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={latestScan.score} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Findings</CardDescription>
                <CardTitle className="text-4xl">{latestScan.findings.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last scan: {new Date(latestScan.completed_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Status</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  {latestScan.score >= 80 ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <span>Healthy</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                      <span>Needs Attention</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Findings
              </CardTitle>
              <CardDescription>Issues detected during the last scan</CardDescription>
            </CardHeader>
            <CardContent>
              {latestScan.findings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p>No security issues found!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {latestScan.findings.map((finding, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityBadge(finding.severity)}>
                              {finding.severity}
                            </Badge>
                            <span className="font-semibold">{finding.category}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{finding.message}</p>
                        </div>
                      </div>
                      {finding.recommendation && (
                        <div className="mt-2 p-2 bg-muted rounded text-sm">
                          <strong>Recommendation:</strong> {finding.recommendation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No security scans run yet</p>
            <Button onClick={runSecurityScan} disabled={scanning}>
              <Shield className="w-4 h-4 mr-2" />
              Run First Security Scan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}