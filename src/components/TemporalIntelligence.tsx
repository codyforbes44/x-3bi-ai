import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, TrendingUp, Calendar, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TemporalIntelligence = () => {
  const { toast } = useToast();
  const [patterns, setPatterns] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [patternsRes, insightsRes] = await Promise.all([
        supabase.from('temporal_patterns').select('*').order('created_at', { ascending: false }),
        supabase.from('predictive_insights').select('*').order('predicted_for', { ascending: true }).limit(10),
      ]);

      setPatterns(patternsRes.data || []);
      setInsights(insightsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzePatterns = async () => {
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('temporal-analyzer', {
        body: { analyzeType: 'all' }
      });

      if (error) throw error;

      toast({
        title: "Analysis Complete",
        description: `Found ${data.patterns.length} patterns and ${data.predictions.length} predictions`,
      });

      loadData();
    } catch (error: any) {
      toast({
        title: "Analysis Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Clock className="h-8 w-8 text-primary" />
            Temporal Intelligence
          </h2>
          <p className="text-muted-foreground mt-1">
            AI learns from your past to predict your future needs
          </p>
        </div>
        <Button onClick={analyzePatterns} disabled={analyzing}>
          {analyzing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Analyze Patterns
        </Button>
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          {insights.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Predictions Yet</h3>
              <p className="text-muted-foreground mb-4">
                Use the platform more to generate temporal insights
              </p>
              <Button onClick={analyzePatterns}>
                Analyze My Patterns
              </Button>
            </Card>
          ) : (
            insights.map((insight) => (
              <Card key={insight.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{insight.title}</h3>
                      <Badge variant={
                        insight.confidence_score > 0.8 ? 'default' :
                        insight.confidence_score > 0.6 ? 'secondary' : 'outline'
                      }>
                        {Math.round(insight.confidence_score * 100)}% confident
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{insight.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(insight.predicted_for).toLocaleDateString()}
                      </div>
                      <Badge variant="outline">{insight.insight_type}</Badge>
                      <Badge variant={
                        insight.status === 'pending' ? 'secondary' :
                        insight.status === 'confirmed' ? 'default' : 'destructive'
                      }>
                        {insight.status}
                      </Badge>
                    </div>

                    {insight.action_suggestions && insight.action_suggestions.length > 0 && (
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm font-medium mb-2">Suggested Actions:</p>
                        <ul className="text-sm space-y-1">
                          {insight.action_suggestions.map((suggestion: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {insight.confidence_score > 0.8 && (
                    <AlertCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          {patterns.length === 0 ? (
            <Card className="p-8 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Patterns Detected</h3>
              <p className="text-muted-foreground mb-4">
                Start using the platform to detect behavioral patterns
              </p>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {patterns.map((pattern) => (
                <Card key={pattern.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{pattern.pattern_name}</h3>
                      <Badge variant="outline" className="mt-2">{pattern.pattern_type}</Badge>
                    </div>
                    <Badge variant="secondary">
                      {Math.round((pattern.confidence_level || 0) * 100)}%
                    </Badge>
                  </div>
                  
                  {pattern.recurrence_rule && (
                    <div className="text-sm text-muted-foreground mb-2">
                      <strong>Recurrence:</strong> {pattern.recurrence_rule}
                    </div>
                  )}
                  
                  {pattern.next_predicted_occurrence && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Next expected:</strong>{' '}
                      {new Date(pattern.next_predicted_occurrence).toLocaleString()}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
