import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, TrendingUp, Calendar, Sparkles, Loader2, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { useExport } from '@/hooks/useExport';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

export const TemporalIntelligence = () => {
  const { toast } = useToast();
  const { exportData } = useExport();
  const [patterns, setPatterns] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  useEffect(() => {
    loadData();
  }, [dateRange]);

  const loadData = async () => {
    try {
      let patternsQuery = supabase.from('temporal_patterns').select('*').order('created_at', { ascending: false });
      let insightsQuery = supabase.from('predictive_insights').select('*').order('predicted_for', { ascending: true });

      if (dateRange.from) {
        patternsQuery = patternsQuery.gte('created_at', dateRange.from.toISOString());
        insightsQuery = insightsQuery.gte('created_at', dateRange.from.toISOString());
      }
      if (dateRange.to) {
        patternsQuery = patternsQuery.lte('created_at', dateRange.to.toISOString());
        insightsQuery = insightsQuery.lte('created_at', dateRange.to.toISOString());
      }

      const [patternsRes, insightsRes] = await Promise.all([
        patternsQuery,
        insightsQuery.limit(50),
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

  const handleExport = (type: 'predictions' | 'patterns') => {
    const data = type === 'predictions' 
      ? insights.map((i) => ({
          prediction: i.prediction_text,
          confidence: i.confidence_score,
          type: i.insight_type,
          predicted_for: i.predicted_for ? format(new Date(i.predicted_for), 'PPP') : 'N/A',
          created: format(new Date(i.created_at), 'PPP'),
        }))
      : patterns.map((p) => ({
          pattern: p.pattern_type,
          frequency: p.frequency,
          time_window: p.time_window,
          detected: format(new Date(p.detected_at), 'PPP'),
        }));
    
    exportData(data, { filename: `temporal-${type}`, format: 'csv' });
    toast({ title: "Export Complete", description: `${type} exported successfully` });
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return { variant: 'default' as const, label: 'High', color: 'bg-green-500/10 text-green-600 border-green-500/20' };
    if (confidence >= 0.6) return { variant: 'secondary' as const, label: 'Medium', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' };
    return { variant: 'outline' as const, label: 'Low', color: 'bg-red-500/10 text-red-600 border-red-500/20' };
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            Temporal Intelligence
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            AI learns from your past to predict your future needs
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Calendar className="h-4 w-4 mr-2" />
                {dateRange.from ? format(dateRange.from, 'PP') : 'Filter dates'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => setDateRange(range || {})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={analyzePatterns} disabled={analyzing} size="sm" className="h-9">
            {analyzing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Analyze
          </Button>
        </div>
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('predictions')}
              disabled={insights.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
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
            <ResponsiveTable
              data={insights}
              columns={[
                {
                  key: 'prediction',
                  label: 'Prediction',
                  render: (item) => (
                    <div className="max-w-md">
                      <p className="text-sm font-medium">{item.prediction_text}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {item.insight_type?.replace('_', ' ')}
                      </Badge>
                    </div>
                  ),
                },
                {
                  key: 'confidence',
                  label: 'Confidence',
                  mobileLabel: 'Confidence',
                  render: (item) => {
                    const badge = getConfidenceBadge(item.confidence_score);
                    return (
                      <div className="flex flex-col gap-2">
                        <Badge className={badge.color}>{badge.label}</Badge>
                        <Progress value={item.confidence_score * 100} className="w-16 h-2" />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(item.confidence_score * 100)}%
                        </span>
                      </div>
                    );
                  },
                },
                {
                  key: 'predicted_for',
                  label: 'Predicted For',
                  hideOnMobile: true,
                  render: (item) => (
                    <span className="text-xs text-muted-foreground">
                      {item.predicted_for ? format(new Date(item.predicted_for), 'PP') : 'N/A'}
                    </span>
                  ),
                },
                {
                  key: 'created',
                  label: 'Created',
                  mobileLabel: 'Date',
                  render: (item) => (
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(item.created_at), 'PP')}
                    </span>
                  ),
                },
              ]}
              keyExtractor={(item) => item.id}
              emptyMessage="No predictions found for this date range"
            />
          )}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('patterns')}
              disabled={patterns.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          {patterns.length === 0 ? (
            <Card className="p-8 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Patterns Detected</h3>
              <p className="text-muted-foreground mb-4">
                Continue using the platform to detect behavioral patterns
              </p>
              <Button onClick={analyzePatterns}>
                Start Analysis
              </Button>
            </Card>
          ) : (
            <ResponsiveTable
              data={patterns}
              columns={[
                {
                  key: 'pattern',
                  label: 'Pattern Type',
                  render: (item) => (
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{item.pattern_type?.replace('_', ' ')}</span>
                      <Badge variant="outline" className="text-xs w-fit">
                        {item.time_window || 'General'}
                      </Badge>
                    </div>
                  ),
                },
                {
                  key: 'frequency',
                  label: 'Frequency',
                  render: (item) => (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-primary">{item.frequency || 0}</span>
                      <span className="text-xs text-muted-foreground">occurrences</span>
                    </div>
                  ),
                },
                {
                  key: 'detected',
                  label: 'Detected',
                  mobileLabel: 'Date',
                  render: (item) => (
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(item.detected_at || item.created_at), 'PP')}
                    </span>
                  ),
                },
              ]}
              keyExtractor={(item) => item.id}
              emptyMessage="No patterns found for this date range"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
