import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, Loader2, TrendingUp, Brain, PieChart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AIInsights = () => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('analysis');
  const [context, setContext] = useState('general');
  const [data, setData] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState('');
  const { toast } = useToast();

  const analysisTypes = [
    { value: 'analysis', label: 'Data Analysis', icon: BarChart3 },
    { value: 'prediction', label: 'Predictive Analytics', icon: TrendingUp },
    { value: 'optimization', label: 'Optimization', icon: Brain },
    { value: 'visualization', label: 'Visualization Strategy', icon: PieChart },
    { value: 'report', label: 'Executive Report', icon: BarChart3 }
  ];

  const contexts = [
    { value: 'general', label: 'General Business' },
    { value: 'marketing', label: 'Marketing & Sales' },
    { value: 'finance', label: 'Financial' },
    { value: 'operations', label: 'Operations' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'product', label: 'Product Development' },
    { value: 'customer', label: 'Customer Analytics' },
    { value: 'competitive', label: 'Competitive Analysis' }
  ];

  const handleAnalyze = async () => {
    if (!description.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setInsights('');

    try {
      // Parse data if it's JSON, otherwise use as string
      let parsedData;
      try {
        parsedData = data ? JSON.parse(data) : null;
      } catch {
        parsedData = data;
      }

      const { data: result, error } = await supabase.functions.invoke('ai-insights', {
        body: {
          description,
          type,
          context,
          data: parsedData
        }
      });

      if (error) throw error;

      if (result.analysis) {
        setInsights(result.analysis);
        toast({
          title: "Analysis Complete",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} insights generated successfully!`,
        });
      } else {
        throw new Error('No insights generated');
      }
    } catch (error) {
      console.error('Insights generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate insights. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedType = analysisTypes.find(t => t.value === type);

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-4 flex-row items-center justify-end">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Brain className="w-3 h-3" />
          Advanced Analytics
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Analysis Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you want to analyze or understand..."
                className="min-h-[80px]"
                disabled={isAnalyzing}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Analysis Type</label>
                <Select value={type} onValueChange={setType} disabled={isAnalyzing}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {analysisTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        <div className="flex items-center gap-2">
                          <t.icon className="w-4 h-4" />
                          {t.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Context</label>
                <Select value={context} onValueChange={setContext} disabled={isAnalyzing}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contexts.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Data (JSON or Text)</label>
              <Textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Paste your data here (JSON, CSV, or plain text)..."
                className="min-h-[120px] font-mono text-sm"
                disabled={isAnalyzing}
              />
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={!description.trim() || isAnalyzing}
              className="w-full h-12"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  {selectedType && <selectedType.icon className="w-4 h-4 mr-2" />}
                  Generate Insights
                </>
              )}
            </Button>
          </div>

          {/* Results Panel */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">AI Insights</label>
              {insights && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  AI Generated
                </Badge>
              )}
            </div>
            <ScrollArea className="flex-1 border border-border rounded-lg p-4 bg-gradient-subtle">
              {insights ? (
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {insights}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">AI Insights Engine</p>
                    <p className="text-sm">Powerful analytics and predictions will appear here</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;