import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Code, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const MiniCodeAssistant = () => {
  const [code, setCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProcess = async () => {
    if (!code.trim() || isProcessing) return;

    setIsProcessing(true);
    setResult('');

    try {
      const { data, error } = await supabase.functions.invoke('ai-code', {
        body: {
          code,
          language: 'javascript',
          task: 'explain'
        }
      });

      if (error) throw error;

      if (data.choices && data.choices[0]?.message?.content) {
        setResult(data.choices[0].message.content);
        toast({
          title: "Success",
          description: "Code analyzed!",
        });
      } else {
        throw new Error('No response received');
      }
    } catch (error) {
      console.error('Code processing error:', error);
      toast({
        title: "Error",
        description: "Failed to process code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code className="w-5 h-5 text-primary" />
            Code Assistant
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard?feature=ai-code')}
            className="gap-1 text-xs"
          >
            Full Version
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
        <Badge variant="secondary" className="w-fit text-xs">GPT-4o Mini</Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 pt-0 gap-3">
        <div className="space-y-3">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste code to analyze..."
            className="min-h-[60px] font-mono text-xs"
            disabled={isProcessing}
          />
          <Button 
            onClick={handleProcess} 
            disabled={!code.trim() || isProcessing}
            className="w-full"
            size="sm"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Code className="w-4 h-4 mr-2" />
                Explain Code
              </>
            )}
          </Button>
        </div>

        <div className="flex-1 border border-border rounded-lg p-3 bg-muted/30 overflow-auto min-h-0">
          {result ? (
            <pre className="text-xs whitespace-pre-wrap">
              {result}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Code className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Analysis appears here</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniCodeAssistant;
