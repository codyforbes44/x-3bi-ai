import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Trash2, 
  Archive, 
  CheckCircle, 
  TrendingUp, 
  Database,
  AlertTriangle,
  Sparkles,
  Brain,
  BarChart3
} from 'lucide-react';

interface SessionAnalysis {
  session_id: string;
  alias: string;
  relevance_score: number;
  usage_count: number;
  days_since_access: number;
  recommendation: 'keep' | 'archive' | 'delete';
  reasoning: string;
}

interface PruningStats {
  total: number;
  analyzed: number;
  to_delete: number;
  deleted: number;
  to_keep: number;
  to_archive: number;
  avg_relevance: number;
}

export default function PruningDashboard() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SessionAnalysis[]>([]);
  const [geminiAnalysis, setGeminiAnalysis] = useState('');
  const [stats, setStats] = useState<PruningStats | null>(null);
  const [autoDelete, setAutoDelete] = useState(false);

  const handleAnalyze = async (executeDelete = false) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('prune-multimodal-sessions', {
        body: {
          action: 'analyze',
          auto_delete: executeDelete,
          min_relevance_threshold: 0.3,
          days_inactive_threshold: 90,
        },
      });

      if (error) throw error;

      setAnalysis(data.session_analysis || []);
      setGeminiAnalysis(data.gemini_analysis || '');
      setStats(data.stats || null);

      toast({
        title: executeDelete ? 'Pruning Complete' : 'Analysis Complete',
        description: executeDelete 
          ? `Deleted ${data.stats.deleted} low-relevance sessions`
          : `Analyzed ${data.stats.analyzed} sessions`,
      });
    } catch (error: any) {
      console.error('Pruning error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to analyze sessions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'delete': return 'destructive';
      case 'archive': return 'secondary';
      case 'keep': return 'default';
      default: return 'outline';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'archive': return <Archive className="w-4 h-4" />;
      case 'keep': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-violet-500/10 rounded-lg">
            <Database className="w-6 h-6 text-violet-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Session Pruning Dashboard</h2>
            <p className="text-muted-foreground">AI-powered memory optimization with Gemini & Claude 4</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => handleAnalyze(false)}
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Analyzing...' : 'Analyze Sessions'}
          </Button>
          <Button
            onClick={() => handleAnalyze(true)}
            disabled={loading}
            variant="destructive"
          >
            {loading ? 'Pruning...' : 'Analyze & Prune'}
          </Button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                Total Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Analyzed: {stats.analyzed}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Keep
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.to_keep}</div>
              <Progress value={(stats.to_keep / stats.analyzed) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Archive className="w-4 h-4 text-yellow-500" />
                Archive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{stats.to_archive}</div>
              <Progress value={(stats.to_archive / stats.analyzed) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                Delete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.to_delete}</div>
              {stats.deleted > 0 && (
                <p className="text-xs text-muted-foreground mt-1">Deleted: {stats.deleted}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="sessions" className="w-full">
        <TabsList>
          <TabsTrigger value="sessions">Session Analysis</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          {analysis.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No analysis yet. Click "Analyze Sessions" to start.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.map((item) => (
                <Card key={item.session_id} className="relative overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 w-24 h-24 opacity-10"
                    style={{
                      background: `radial-gradient(circle, ${
                        item.recommendation === 'keep' ? 'rgb(34, 197, 94)' :
                        item.recommendation === 'archive' ? 'rgb(234, 179, 8)' :
                        'rgb(239, 68, 68)'
                      } 0%, transparent 70%)`
                    }}
                  />
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{item.alias}</CardTitle>
                      <Badge variant={getRecommendationColor(item.recommendation)}>
                        {getRecommendationIcon(item.recommendation)}
                        <span className="ml-1">{item.recommendation}</span>
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Relevance Score</span>
                        <span className="font-semibold">{(item.relevance_score * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={item.relevance_score * 100} className="h-2" />
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Days since access:</span>
                        <span className="font-medium">{item.days_since_access}</span>
                      </div>
                    </div>

                    <Alert>
                      <Brain className="w-4 h-4" />
                      <AlertDescription className="text-xs">
                        {item.reasoning}
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights">
          {geminiAnalysis ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                  Gemini Pattern Analysis
                </CardTitle>
                <CardDescription>
                  Overall usage patterns and recommendations from Google Gemini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="whitespace-pre-wrap">{geminiAnalysis}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No insights yet. Run an analysis first.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {stats && stats.avg_relevance < 0.5 && (
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>
            Average session relevance is low ({(stats.avg_relevance * 100).toFixed(0)}%). 
            Consider running pruning to optimize your memory system.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
