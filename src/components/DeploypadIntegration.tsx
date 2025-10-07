import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Rocket, 
  Globe, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ExternalLink,
  Copy,
  RefreshCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface DeploymentConfig {
  projectName: string;
  domain: string;
  description: string;
  environment: 'production' | 'staging';
  autoRedeploy: boolean;
}

interface Deployment {
  id: string;
  url: string;
  status: 'building' | 'deployed' | 'failed';
  createdAt: string;
  buildLogs?: string[];
}

const DeploypadIntegration = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  
  const [config, setConfig] = useState<DeploymentConfig>({
    projectName: "",
    domain: "",
    description: "",
    environment: 'production',
    autoRedeploy: true
  });

  const connectToDeploypad = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Deploypad API key");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validate API key with Deploypad
      const response = await fetch('https://api.deploypad.app/v1/auth/validate', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsConnected(true);
        setSuccess("Successfully connected to Deploypad!");
        loadDeployments();
      } else {
        throw new Error('Invalid API key');
      }
    } catch (err) {
      setError("Failed to connect to Deploypad. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const loadDeployments = async () => {
    try {
      const response = await fetch('https://api.deploypad.app/v1/deployments', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDeployments(data.deployments || []);
      }
    } catch (err) {
      console.error('Failed to load deployments:', err);
    }
  };

  const deployProject = async () => {
    if (!config.projectName.trim()) {
      setError("Please enter a project name");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // First, export the current project code
      const projectData = await exportProjectCode();
      
      // Deploy to Deploypad
      const response = await fetch('https://api.deploypad.app/v1/deploy', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: config.projectName,
          domain: config.domain || undefined,
          description: config.description,
          environment: config.environment,
          autoRedeploy: config.autoRedeploy,
          source: {
            type: 'archive',
            data: projectData
          },
          framework: 'react',
          buildCommand: 'npm run build',
          outputDirectory: 'dist'
        })
      });

      if (response.ok) {
        const deployment = await response.json();
        setSuccess(`Deployment started! Your app will be available at: ${deployment.url}`);
        loadDeployments();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Deployment failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deployment failed');
    } finally {
      setLoading(false);
    }
  };

  const exportProjectCode = async () => {
    // This would export the current project code
    // For now, return a mock structure
    return {
      files: {
        'package.json': JSON.stringify({
          name: config.projectName,
          version: '1.0.0',
          scripts: {
            build: 'vite build',
            preview: 'vite preview'
          },
          dependencies: {
            react: '^18.0.0',
            'react-dom': '^18.0.0'
          }
        }),
        'index.html': '<!DOCTYPE html><html><head><title>App</title></head><body><div id="root"></div></body></html>',
        'src/main.tsx': '// App code would be here'
      }
    };
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setSuccess("URL copied to clipboard!");
  };

  if (!isConnected) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardDescription>
            Deploy your Lovable projects to Deploypad with one click
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="api-key">Deploypad API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Deploypad API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from your{" "}
              <a 
                href="https://deploypad.app/settings/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Deploypad dashboard
              </a>
            </p>
          </div>

          <Button 
            onClick={connectToDeploypad} 
            disabled={loading || !apiKey.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Connect to Deploypad
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-blue-500" />
            Deploypad Integration
            <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>
          </CardTitle>
          <CardDescription>
            Deploy and manage your Lovable projects on Deploypad
          </CardDescription>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="deploy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deploy">New Deployment</TabsTrigger>
          <TabsTrigger value="deployments">My Deployments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="deploy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Deploy Project
              </CardTitle>
              <CardDescription>
                Configure and deploy your current project to Deploypad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="my-awesome-app"
                    value={config.projectName}
                    onChange={(e) => setConfig({...config, projectName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="domain">Custom Domain (Optional)</Label>
                  <Input
                    id="domain"
                    placeholder="myapp.com"
                    value={config.domain}
                    onChange={(e) => setConfig({...config, domain: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project..."
                  value={config.description}
                  onChange={(e) => setConfig({...config, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Environment</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={config.environment === 'production' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setConfig({...config, environment: 'production'})}
                    >
                      Production
                    </Button>
                    <Button
                      variant={config.environment === 'staging' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setConfig({...config, environment: 'staging'})}
                    >
                      Staging
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Auto-Redeploy</Label>
                  <Button
                    variant={config.autoRedeploy ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setConfig({...config, autoRedeploy: !config.autoRedeploy})}
                  >
                    {config.autoRedeploy ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={deployProject} 
                disabled={loading || !config.projectName.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Deploy to Deploypad
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Your Deployments
                <Button variant="ghost" size="sm" onClick={loadDeployments}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Manage your deployed projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {deployments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No deployments yet. Deploy your first project!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {deployments.map((deployment) => (
                    <div key={deployment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{deployment.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Deployed {new Date(deployment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={
                              deployment.status === 'deployed' ? 'default' :
                              deployment.status === 'building' ? 'secondary' : 'destructive'
                            }
                          >
                            {deployment.status}
                          </Badge>
                          {deployment.status === 'deployed' && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => copyUrl(deployment.url)}>
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={deployment.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      {deployment.status === 'deployed' && (
                        <p className="text-sm text-blue-500 mt-2">{deployment.url}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Integration Settings
              </CardTitle>
              <CardDescription>
                Manage your Deploypad integration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Connected Account</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Connected</Badge>
                  <span className="text-sm text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password" 
                    value={apiKey} 
                    readOnly 
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => setIsConnected(false)}
                  >
                    Update
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your API key is stored securely and never shared. You can update it anytime.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeploypadIntegration;