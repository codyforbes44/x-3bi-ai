import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Cpu, 
  Download, 
  Image as ImageIcon, 
  MessageSquare, 
  Mic, 
  Eye,
  Zap,
  Brain,
  Upload
} from 'lucide-react';

const LocalAI: React.FC = () => {
  const { toast } = useToast();
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set());
  const [selectedTask, setSelectedTask] = useState('text-classification');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  const tasks = [
    {
      id: 'text-classification',
      name: 'Text Classification',
      description: 'Classify text into categories',
      icon: MessageSquare,
      model: 'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
      example: 'I love this new AI platform!'
    },
    {
      id: 'sentiment-analysis',
      name: 'Sentiment Analysis',
      description: 'Analyze sentiment of text',
      icon: Brain,
      model: 'Xenova/bert-base-multilingual-uncased-sentiment',
      example: 'This product is amazing and works perfectly!'
    },
    {
      id: 'feature-extraction',
      name: 'Text Embeddings',
      description: 'Generate text embeddings',
      icon: Cpu,
      model: 'mixedbread-ai/mxbai-embed-xsmall-v1',
      example: 'Generate embeddings for this text'
    },
    {
      id: 'image-classification',
      name: 'Image Classification',
      description: 'Classify uploaded images',
      icon: ImageIcon,
      model: 'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k',
      example: 'Upload an image to classify'
    },
    {
      id: 'automatic-speech-recognition',
      name: 'Speech Recognition',
      description: 'Convert speech to text',
      icon: Mic,
      model: 'onnx-community/whisper-tiny.en',
      example: 'Upload an audio file'
    },
    {
      id: 'object-detection',
      name: 'Object Detection',
      description: 'Detect objects in images',
      icon: Eye,
      model: 'onnx-community/yolov8n',
      example: 'Upload an image to detect objects'
    }
  ];

  useEffect(() => {
    checkWebGPUSupport();
  }, []);

  const checkWebGPUSupport = async () => {
    try {
      if ('gpu' in navigator) {
        const adapter = await (navigator as any).gpu.requestAdapter();
        if (adapter) {
          setIsSupported(true);
          toast({
            title: "WebGPU Supported",
            description: "Local AI models can run with hardware acceleration",
          });
        }
      } else {
        setIsSupported(false);
        toast({
          title: "WebGPU Not Available",
          description: "Local AI will run on CPU (slower performance)",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('WebGPU check failed:', error);
      setIsSupported(false);
    }
  };

  const loadModel = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || loadedModels.has(taskId)) return;

    setIsLoading(true);
    try {
      // Dynamic import of HuggingFace transformers
      const { pipeline } = await import('@huggingface/transformers');
      
      console.log(`Loading model for ${task.name}...`);
      
      const device = isSupported ? 'webgpu' : 'cpu';
      const model = await pipeline(
        taskId as any,
        task.model,
        { device }
      );

      // Store the model in a global registry for reuse
      (window as any).localModels = (window as any).localModels || {};
      (window as any).localModels[taskId] = model;

      setLoadedModels(prev => new Set([...prev, taskId]));
      
      toast({
        title: "Model Loaded",
        description: `${task.name} model ready for use`,
      });

    } catch (error) {
      console.error('Failed to load model:', error);
      toast({
        title: "Model Load Failed",
        description: `Failed to load ${task.name} model`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runInference = async () => {
    const task = tasks.find(t => t.id === selectedTask);
    if (!task || !input.trim()) return;

    if (!loadedModels.has(selectedTask)) {
      await loadModel(selectedTask);
      return;
    }

    setIsLoading(true);
    try {
      const model = (window as any).localModels[selectedTask];
      
      let output;
      
      if (selectedTask === 'text-classification' || selectedTask === 'sentiment-analysis') {
        output = await model(input);
      } else if (selectedTask === 'feature-extraction') {
        output = await model(input, { pooling: 'mean', normalize: true });
        // Convert tensor to array for display
        output = {
          embeddings: output.tolist()[0].slice(0, 10), // Show first 10 dimensions
          dimensions: output.dims[1],
          magnitude: Math.sqrt(output.tolist()[0].reduce((sum: number, val: number) => sum + val * val, 0))
        };
      } else if (selectedTask === 'image-classification') {
        // Handle image upload
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            output = await model(file);
            setResult(output);
          }
        };
        fileInput.click();
        setIsLoading(false);
        return;
      } else if (selectedTask === 'automatic-speech-recognition') {
        // Handle audio upload
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'audio/*';
        fileInput.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            output = await model(file);
            setResult(output);
          }
        };
        fileInput.click();
        setIsLoading(false);
        return;
      } else if (selectedTask === 'object-detection') {
        // Handle image upload for object detection
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            output = await model(file);
            setResult(output);
          }
        };
        fileInput.click();
        setIsLoading(false);
        return;
      }

      setResult(output);
      
      toast({
        title: "Inference Complete",
        description: `${task.name} completed successfully`,
      });

    } catch (error) {
      console.error('Inference failed:', error);
      toast({
        title: "Inference Failed",
        description: `Failed to run ${task.name}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTaskData = tasks.find(t => t.id === selectedTask);
  const isModelLoaded = loadedModels.has(selectedTask);

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardDescription>
            Run AI models locally in your browser with privacy and offline capabilities. No data leaves your device.
          </CardDescription>
          <Badge variant="secondary" className={isSupported ? "bg-green-500/20 text-green-500 border-green-500/30" : "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"}>
            {isSupported ? "WebGPU" : "CPU"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* Task Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">AI Task</label>
          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((task) => (
                <SelectItem key={task.id} value={task.id}>
                  <div className="flex items-center gap-2">
                    <task.icon className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{task.name}</div>
                      <div className="text-xs text-muted-foreground">{task.description}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Info */}
        {selectedTaskData && (
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <selectedTaskData.icon className="w-4 h-4 text-primary" />
                  <span className="font-medium">{selectedTaskData.name}</span>
                </div>
                <Badge variant={isModelLoaded ? "default" : "secondary"}>
                  {isModelLoaded ? "Loaded" : "Not Loaded"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{selectedTaskData.description}</p>
              <p className="text-xs text-muted-foreground">Model: {selectedTaskData.model}</p>
            </CardContent>
          </Card>
        )}

        {/* Input */}
        {selectedTaskData && !['image-classification', 'automatic-speech-recognition', 'object-detection'].includes(selectedTask) && (
          <div>
            <label className="text-sm font-medium mb-2 block">Input Text</label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedTaskData.example}
              className="w-full"
            />
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2">
          {!isModelLoaded ? (
            <Button
              onClick={() => loadModel(selectedTask)}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Download className="w-4 h-4 mr-2 animate-spin" />
                  Loading Model...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Load Model
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={runInference}
              disabled={isLoading || (!input.trim() && !['image-classification', 'automatic-speech-recognition', 'object-detection'].includes(selectedTask))}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  {['image-classification', 'automatic-speech-recognition', 'object-detection'].includes(selectedTask) ? 'Upload & Process' : 'Run Inference'}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Results</label>
            <Card className="h-full">
              <CardContent className="p-4 h-full overflow-auto">
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Model List */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Models loaded: {loadedModels.size} / {tasks.length}</p>
          <p>Acceleration: {isSupported ? 'WebGPU Hardware' : 'CPU Software'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalAI;