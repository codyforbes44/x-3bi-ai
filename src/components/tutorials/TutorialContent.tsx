import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Play, Code2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TutorialStep {
  title: string;
  description: string;
  code?: string;
  tips?: string[];
}

interface TutorialContentProps {
  title: string;
  description: string;
  duration: string;
  level: string;
  steps: TutorialStep[];
  demoUrl?: string;
}

export function TutorialContent({ 
  title, 
  description, 
  duration, 
  level, 
  steps,
  demoUrl 
}: TutorialContentProps) {
  const navigate = useNavigate();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <PageLayout>
      {/* Tutorial Header */}
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/tutorials')} className="mb-6">
          ← Back to Tutorials
        </Button>
        
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Badge variant="outline">{level}</Badge>
            <Badge variant="secondary">{duration}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{description}</p>
          
          {demoUrl && (
            <Button 
              className="bg-gradient-hero text-white"
              onClick={() => navigate(demoUrl)}
            >
              <Play className="w-4 h-4 mr-2" />
              Try Live Demo
            </Button>
          )}
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {steps.map((step, index) => (
              <AccordionItem key={index} value={`step-${index}`} className="border rounded-lg">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-left font-semibold">{step.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pl-12 space-y-4">
                    <p className="text-muted-foreground">{step.description}</p>
                    
                    {step.code && (
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{step.code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyCode(step.code!)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    
                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="font-semibold text-sm mb-2">💡 Pro Tips:</p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
              <CardDescription>
                Continue your learning journey with these related tutorials
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/tutorials')}>
                Browse More Tutorials
              </Button>
              <Button className="bg-gradient-hero text-white" onClick={() => navigate('/dashboard')}>
                Try It Yourself
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
