import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Image, Globe, Brain, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const STEP_TYPES = [
  { value: 'ai_agent', label: 'AI Agent', icon: Brain, description: 'Execute AI-powered decision making' },
  { value: 'vision_analysis', label: 'Vision Analysis', icon: Image, description: 'Analyze images with AI' },
  { value: 'web_action', label: 'Web Action', icon: Globe, description: 'Perform web automation' },
  { value: 'http_request', label: 'HTTP Request', icon: Database, description: 'Make API calls' },
  { value: 'condition', label: 'Condition', icon: Brain, description: 'Conditional branching' },
  { value: 'data_transform', label: 'Transform Data', icon: Database, description: 'Transform data' },
];

export const EnhancedWorkflowBuilder = () => {
  const [steps, setSteps] = useState<any[]>([]);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDesc, setWorkflowDesc] = useState('');
  const { toast } = useToast();

  const addStep = () => {
    setSteps([...steps, {
      id: Date.now().toString(),
      type: 'ai_agent',
      name: `Step ${steps.length + 1}`,
      config: {},
      step_order: steps.length,
    }]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const updateStep = (id: string, field: string, value: any) => {
    setSteps(steps.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updateStepConfig = (id: string, configField: string, value: any) => {
    setSteps(steps.map(s => 
      s.id === id ? { ...s, config: { ...s.config, [configField]: value } } : s
    ));
  };

  const renderStepConfig = (step: any) => {
    switch (step.type) {
      case 'vision_analysis':
        return (
          <div className="space-y-3 mt-3">
            <div>
              <Label>Image URL</Label>
              <Input
                placeholder="https://example.com/image.jpg or use {imageUrl} from previous step"
                value={step.config.imageUrl || ''}
                onChange={(e) => updateStepConfig(step.id, 'imageUrl', e.target.value)}
              />
            </div>
            <div>
              <Label>Analysis Type</Label>
              <Select
                value={step.config.analysisType || 'describe'}
                onValueChange={(v) => updateStepConfig(step.id, 'analysisType', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="describe">Describe Image</SelectItem>
                  <SelectItem value="extract_text">Extract Text (OCR)</SelectItem>
                  <SelectItem value="identify_objects">Identify Objects</SelectItem>
                  <SelectItem value="analyze_sentiment">Analyze Sentiment</SelectItem>
                  <SelectItem value="custom">Custom Prompt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {step.config.analysisType === 'custom' && (
              <div>
                <Label>Custom Prompt</Label>
                <Textarea
                  placeholder="What would you like to know about this image?"
                  value={step.config.customPrompt || ''}
                  onChange={(e) => updateStepConfig(step.id, 'customPrompt', e.target.value)}
                />
              </div>
            )}
          </div>
        );

      case 'web_action':
        return (
          <div className="space-y-3 mt-3">
            <div>
              <Label>Action Type</Label>
              <Select
                value={step.config.actionType || 'click'}
                onValueChange={(v) => updateStepConfig(step.id, 'actionType', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="click">Click Element</SelectItem>
                  <SelectItem value="type">Type Text</SelectItem>
                  <SelectItem value="screenshot">Take Screenshot</SelectItem>
                  <SelectItem value="extract">Extract Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>CSS Selector</Label>
              <Input
                placeholder="#submit-button or .form-input"
                value={step.config.selector || ''}
                onChange={(e) => updateStepConfig(step.id, 'selector', e.target.value)}
              />
            </div>
            {(step.config.actionType === 'type') && (
              <div>
                <Label>Value to Type</Label>
                <Input
                  placeholder="Text to enter"
                  value={step.config.value || ''}
                  onChange={(e) => updateStepConfig(step.id, 'value', e.target.value)}
                />
              </div>
            )}
          </div>
        );

      case 'ai_agent':
        return (
          <div className="space-y-3 mt-3">
            <div>
              <Label>Agent Task</Label>
              <Select
                value={step.config.stepType || 'ai_decision'}
                onValueChange={(v) => updateStepConfig(step.id, 'stepType', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai_decision">Make Decision</SelectItem>
                  <SelectItem value="data_analysis">Analyze Data</SelectItem>
                  <SelectItem value="content_generation">Generate Content</SelectItem>
                  <SelectItem value="api_orchestration">Orchestrate APIs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Instructions</Label>
              <Textarea
                placeholder="What should the AI agent do?"
                value={step.config.instructions || ''}
                onChange={(e) => updateStepConfig(step.id, 'instructions', e.target.value)}
              />
            </div>
          </div>
        );

      case 'http_request':
        return (
          <div className="space-y-3 mt-3">
            <div>
              <Label>URL</Label>
              <Input
                placeholder="https://api.example.com/endpoint"
                value={step.config.url || ''}
                onChange={(e) => updateStepConfig(step.id, 'url', e.target.value)}
              />
            </div>
            <div>
              <Label>Method</Label>
              <Select
                value={step.config.method || 'GET'}
                onValueChange={(v) => updateStepConfig(step.id, 'method', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'condition':
        return (
          <div className="space-y-3 mt-3">
            <div>
              <Label>Field to Check</Label>
              <Input
                placeholder="field_name"
                value={step.config.field || ''}
                onChange={(e) => updateStepConfig(step.id, 'field', e.target.value)}
              />
            </div>
            <div>
              <Label>Operator</Label>
              <Select
                value={step.config.operator || 'equals'}
                onValueChange={(v) => updateStepConfig(step.id, 'operator', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="not_equals">Not Equals</SelectItem>
                  <SelectItem value="greater_than">Greater Than</SelectItem>
                  <SelectItem value="less_than">Less Than</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Value</Label>
              <Input
                placeholder="comparison value"
                value={step.config.value || ''}
                onChange={(e) => updateStepConfig(step.id, 'value', e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Workflow Builder</CardTitle>
          <CardDescription>Build workflows with vision analysis and web automation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Workflow Name</Label>
            <Input
              placeholder="My Workflow"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="What does this workflow do?"
              value={workflowDesc}
              onChange={(e) => setWorkflowDesc(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const StepIcon = STEP_TYPES.find(t => t.value === step.type)?.icon || Brain;
          return (
            <Card key={step.id}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <StepIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">Step {idx + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStep(step.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <Label>Step Name</Label>
                  <Input
                    placeholder="Step name"
                    value={step.name}
                    onChange={(e) => updateStep(step.id, 'name', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Step Type</Label>
                  <Select
                    value={step.type}
                    onValueChange={(v) => updateStep(step.id, 'type', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STEP_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {renderStepConfig(step)}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button onClick={addStep} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Step
      </Button>
    </div>
  );
};
