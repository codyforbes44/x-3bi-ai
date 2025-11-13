import { useState } from "react";
import { Code, Zap, Bug, RefreshCw, Copy, Check } from "lucide-react";
import { IconButton } from "./IconButton";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const TASKS = [
  { id: 'explain', icon: Code, color: 'text-blue-500' },
  { id: 'optimize', icon: Zap, color: 'text-yellow-500' },
  { id: 'debug', icon: Bug, color: 'text-red-500' },
  { id: 'convert', icon: RefreshCw, color: 'text-green-500' },
];

const LANGUAGES = [
  { id: 'javascript', emoji: '🟨' },
  { id: 'typescript', emoji: '🔷' },
  { id: 'python', emoji: '🐍' },
  { id: 'java', emoji: '☕' },
  { id: 'cpp', emoji: '🔧' },
  { id: 'rust', emoji: '🦀' },
];

export function VisualCodeAssistant() {
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
        body: { code, language, task }
      });

      if (error) throw error;

      if (data.choices && data.choices[0]?.message?.content) {
        setResult(data.choices[0].message.content);
      } else {
        throw new Error('No response received');
      }
    } catch (error) {
      console.error('Code processing error:', error);
      toast({ description: "⚠️", variant: "destructive" });
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
    } catch (error) {
      toast({ description: "⚠️", variant: "destructive" });
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 p-6">
      {/* Language Selector - Icon Only */}
      <div className="flex gap-3 justify-center">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setLanguage(lang.id)}
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all",
              language === lang.id
                ? "bg-primary/20 scale-110 shadow-lg shadow-primary/20"
                : "bg-background/50 hover:bg-muted/50"
            )}
            aria-label={lang.id}
          >
            {lang.emoji}
          </button>
        ))}
      </div>

      {/* Task Selector - Icon Only */}
      <div className="flex gap-3 justify-center">
        {TASKS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTask(t.id)}
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                task === t.id
                  ? "bg-primary/20 scale-110 shadow-lg shadow-primary/20"
                  : "bg-background/50 hover:bg-muted/50"
              )}
              aria-label={t.id}
            >
              <Icon className={cn("w-6 h-6", t.color)} />
            </button>
          );
        })}
      </div>

      {/* Code Input */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={cn(
          "flex-1 min-h-[200px] px-4 py-3 rounded-xl bg-background/50 border border-border/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "font-mono text-sm resize-none"
        )}
        placeholder="// ..."
        disabled={isProcessing}
      />

      {/* Action Icon */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleProcess}
          disabled={!code.trim() || isProcessing}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all",
            !code.trim() || isProcessing
              ? "bg-muted/50 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:scale-110 shadow-lg shadow-primary/20"
          )}
          aria-label="Process"
        >
          <Zap className="w-8 h-8" />
        </button>
        {result && (
          <button
            onClick={handleCopy}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all",
              "bg-background/50 hover:bg-muted/50 hover:scale-110"
            )}
            aria-label="Copy"
          >
            {copied ? <Check className="w-8 h-8 text-green-500" /> : <Copy className="w-8 h-8" />}
          </button>
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div className={cn(
          "flex-1 min-h-[200px] px-4 py-3 rounded-xl bg-muted/50 border border-border/50",
          "font-mono text-sm overflow-auto whitespace-pre-wrap"
        )}>
          {result}
        </div>
      )}

      {/* Loading State */}
      {isProcessing && (
        <div className="flex items-center justify-center py-8">
          <Zap className="w-16 h-16 text-primary animate-pulse" />
        </div>
      )}
    </div>
  );
}
