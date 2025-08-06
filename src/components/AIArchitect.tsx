import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code2, Loader2, Copy, Check, Wand2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AIArchitect = () => {
  const [prompt, setPrompt] = useState('');
  const [template, setTemplate] = useState('landing-page');
  const [style, setStyle] = useState('modern');
  const [colors, setColors] = useState('blue');
  const [industry, setIndustry] = useState('tech');
  const [features, setFeatures] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const templates = [
    { value: 'landing-page', label: 'Landing Page' },
    { value: 'dashboard', label: 'Admin Dashboard' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'portfolio', label: 'Portfolio Site' },
    { value: 'blog', label: 'Blog Platform' },
    { value: 'saas', label: 'SaaS Application' },
    { value: 'mobile-app', label: 'Mobile App UI' },
    { value: 'api-docs', label: 'API Documentation' }
  ];

  const styles = [
    { value: 'modern', label: 'Modern Minimalist' },
    { value: 'glassmorphism', label: 'Glassmorphism' },
    { value: 'neumorphism', label: 'Neumorphism' },
    { value: 'brutalist', label: 'Brutalist' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'creative', label: 'Creative/Artistic' }
  ];

  const colorSchemes = [
    { value: 'blue', label: 'Blue Ocean' },
    { value: 'purple', label: 'Purple Galaxy' },
    { value: 'green', label: 'Green Nature' },
    { value: 'orange', label: 'Orange Sunset' },
    { value: 'pink', label: 'Pink Blossom' },
    { value: 'monochrome', label: 'Monochrome' }
  ];

  const industries = [
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'creative', label: 'Creative Agency' },
    { value: 'consulting', label: 'Consulting' }
  ];

  const availableFeatures = [
    'responsive-design',
    'dark-mode',
    'animations',
    'forms',
    'charts',
    'authentication',
    'search',
    'notifications',
    'payment-integration',
    'social-media',
    'blog-cms',
    'user-profiles'
  ];

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFeatures([...features, feature]);
    } else {
      setFeatures(features.filter(f => f !== feature));
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedCode('');

    try {
      const { data, error } = await supabase.functions.invoke('ai-architect', {
        body: {
          prompt,
          template,
          style,
          colors,
          features,
          industry
        }
      });

      if (error) throw error;

      if (data.code) {
        setGeneratedCode(data.code);
        toast({
          title: "Success",
          description: `${data.componentName} generated successfully!`,
        });
      } else {
        throw new Error('No code generated');
      }
    } catch (error) {
      console.error('Code generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedCode) return;
    
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied",
        description: "Code copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          AI Code Architect
          <Badge variant="secondary" className="ml-auto flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            GPT-4o
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Project Description</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to build in detail..."
                className="min-h-[100px]"
                disabled={isGenerating}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Template</label>
                <Select value={template} onValueChange={setTemplate} disabled={isGenerating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Style</label>
                <Select value={style} onValueChange={setStyle} disabled={isGenerating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Colors</label>
                <Select value={colors} onValueChange={setColors} disabled={isGenerating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorSchemes.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Industry</label>
                <Select value={industry} onValueChange={setIndustry} disabled={isGenerating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((i) => (
                      <SelectItem key={i.value} value={i.value}>
                        {i.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Features</label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={features.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureChange(feature, !!checked)}
                      disabled={isGenerating}
                    />
                    <label htmlFor={feature} className="text-xs capitalize">
                      {feature.replace('-', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full h-12"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Architecting...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Code
                </>
              )}
            </Button>
          </div>

          {/* Code Output */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Generated Code</label>
              {generatedCode && (
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
            <ScrollArea className="flex-1 border border-border rounded-lg p-4 bg-muted/30">
              {generatedCode ? (
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {generatedCode}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Generated code will appear here</p>
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

export default AIArchitect;