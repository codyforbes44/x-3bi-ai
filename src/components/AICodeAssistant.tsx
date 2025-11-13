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
    <NeonCard variant="cyan" glass={true} glow={true} size="lg" className="h-[600px] flex flex-col">
      <div className="pb-4 flex items-center justify-between p-4 md:p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <AccentDot color="cyan" />
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
              <Code className="h-5 w-5 text-cyan-400" />
              AI Code Assistant
            </h3>
          </div>
        </div>
        <Badge variant="neon-cyan" className="text-xs">Gemini 2.5 Flash</Badge>
      </div>
      
      <div className="flex-1 flex flex-col space-y-4 p-4 md:p-6 min-h-0">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Code Input</label>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="min-h-[100px] font-mono text-sm"
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
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
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
                  {tasks.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleProcess} 
            disabled={!code.trim() || isProcessing}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-black"
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

        {result && (
          <div className="flex-1 min-h-0 glass-dark rounded-xl border border-white/10 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Result</h4>
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="h-8"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </NeonCard>
  );
};

export default AICodeAssistant;