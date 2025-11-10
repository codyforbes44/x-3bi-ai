import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Brain, TrendingUp, Target, Sparkles, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DigitalTwin = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('digital_twin_profiles')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const trainTwin = async (interaction: any) => {
    setTraining(true);
    try {
      const { data, error } = await supabase.functions.invoke('digital-twin-train', {
        body: { interaction }
      });

      if (error) throw error;

      toast({
        title: "Digital Twin Updated",
        description: "Your AI clone is learning from your behavior",
      });

      loadProfile();
    } catch (error: any) {
      toast({
        title: "Training Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setTraining(false);
    }
  };

  const testPrediction = async (scenario: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('digital-twin-predict', {
        body: { scenario, context: {} }
      });

      if (error) throw error;

      toast({
        title: "Digital Twin Prediction",
        description: data.prediction,
      });
    } catch (error: any) {
      toast({
        title: "Prediction Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Digital Twin
          </h2>
          <p className="text-muted-foreground mt-1">
            Your AI clone that learns your patterns and makes decisions in your style
          </p>
        </div>
        <Button onClick={() => trainTwin({
          type: 'manual',
          input: 'User testing the system',
          decision: 'Explore features',
          context: { source: 'dashboard' }
        })} disabled={training}>
          {training ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Train Twin
        </Button>
      </div>

      {!profile ? (
        <Card className="p-8 text-center">
          <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Digital Twin Yet</h3>
          <p className="text-muted-foreground mb-4">
            Start training your AI clone by using the platform
          </p>
          <Button onClick={() => trainTwin({
            type: 'initialization',
            input: 'First interaction',
            decision: 'Create digital twin',
            context: {}
          })}>
            Initialize Digital Twin
          </Button>
        </Card>
      ) : (
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="test">Test Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Twin Intelligence</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Confidence Score</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((profile.confidence_score || 0) * 100)}%
                        </span>
                      </div>
                      <Progress value={(profile.confidence_score || 0) * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Interactions</span>
                        <Badge variant="secondary">{profile.total_interactions || 0}</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Last Trained</span>
                        <span className="text-sm text-muted-foreground">
                          {profile.last_trained_at 
                            ? new Date(profile.last_trained_at).toLocaleDateString()
                            : 'Never'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Expertise Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.expertise_areas?.length > 0 ? (
                      profile.expertise_areas.map((area: string, idx: number) => (
                        <Badge key={idx} variant="outline">{area}</Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No expertise areas yet</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Communication Style
                </h3>
                <pre className="text-sm bg-muted p-4 rounded overflow-auto">
                  {JSON.stringify(profile.communication_style, null, 2)}
                </pre>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Behavior Patterns
                </h3>
                <pre className="text-sm bg-muted p-4 rounded overflow-auto">
                  {JSON.stringify(profile.behavior_patterns, null, 2)}
                </pre>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <pre className="text-sm bg-muted p-4 rounded overflow-auto">
                  {JSON.stringify(profile.preferences, null, 2)}
                </pre>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Decision Patterns</h3>
                <pre className="text-sm bg-muted p-4 rounded overflow-auto">
                  {JSON.stringify(profile.decision_patterns, null, 2)}
                </pre>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="test" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Test Predictions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => testPrediction("Should I approve this feature request?")}
                  className="w-full justify-start"
                  variant="outline"
                >
                  "Should I approve this feature request?"
                </Button>
                <Button 
                  onClick={() => testPrediction("What time should I schedule the team meeting?")}
                  className="w-full justify-start"
                  variant="outline"
                >
                  "What time should I schedule the team meeting?"
                </Button>
                <Button 
                  onClick={() => testPrediction("Which technology stack should I use for this project?")}
                  className="w-full justify-start"
                  variant="outline"
                >
                  "Which technology stack should I use?"
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
