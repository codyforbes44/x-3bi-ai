import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NeonCard } from "@/components/ui/neon-card";
import { AccentDot } from "@/components/ui/accent-dot";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Code, Loader2, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AICodeAssistant = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [task, setTask] = useState('explain');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!code.trim() || isProcessing) return;

    setIsProcessing(true);
    setResult('');

    try {
      const { data, error } = await supabase.functions.invoke('ai-code', {
        body: {
          code,
          language,
          task
        }
      });

      if (error) throw error;

      if (data.choices && data.choices[0]?.message?.content) {
        setResult(data.choices[0].message.content);
        toast({
          title: "Success",
          description: "Code processed successfully!",
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

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied",
        description: "Result copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' }
  ];

  const tasks = [
    { value: 'explain', label: 'Explain Code' },
    { value: 'optimize', label: 'Optimize Code' },
    { value: 'debug', label: 'Debug Code' },
    { value: 'convert', label: 'Convert Language' }
  ];

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-4 flex-row items-center justify-end">
        <Badge variant="secondary">GPT-4o Mini</Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Code Input</label>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="min-h-[120px] font-mono text-sm"
              disabled={isProcessing}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select value={language} onValueChange={setLanguage} disabled={isProcessing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Task</label>
              <Select value={task} onValueChange={setTask} disabled={isProcessing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((taskOption) => (
                    <SelectItem key={taskOption.value} value={taskOption.value}>
                      {taskOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleProcess} 
            disabled={!code.trim() || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Code className="w-4 h-4 mr-2" />
                Process Code
              </>
            )}
          </Button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Result</label>
            {result && (
              <Button onClick={handleCopy} size="sm" variant="outline">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="flex-1 border border-border rounded-lg p-4 bg-muted/30">
            {result ? (
              <pre className="text-sm whitespace-pre-wrap font-mono overflow-auto h-full">
                {result}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Processed code will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICodeAssistant;