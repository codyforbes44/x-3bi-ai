import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { OG_IMAGE_CONFIGS, OGImageConfig } from '@/config/og-image-prompts';
import { Download, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GenerationResult {
  route: string;
  filename: string;
  status: 'pending' | 'generating' | 'success' | 'error';
  imageUrl?: string;
  error?: string;
}

export default function OGImageGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const generateImage = async (config: OGImageConfig): Promise<GenerationResult> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-og-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompt: config.prompt,
            route: config.route,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate image');
      }

      const data = await response.json();

      return {
        route: config.route,
        filename: config.filename,
        status: 'success',
        imageUrl: data.image,
      };
    } catch (error) {
      console.error(`Error generating image for ${config.route}:`, error);
      return {
        route: config.route,
        filename: config.filename,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateAllImages = async () => {
    setIsGenerating(true);
    setResults([]);
    setCurrentIndex(0);
    setProgress(0);

    const initialResults: GenerationResult[] = OG_IMAGE_CONFIGS.map((config) => ({
      route: config.route,
      filename: config.filename,
      status: 'pending',
    }));

    setResults(initialResults);

    for (let i = 0; i < OG_IMAGE_CONFIGS.length; i++) {
      const config = OG_IMAGE_CONFIGS[i];
      setCurrentIndex(i);

      // Update status to generating
      setResults((prev) =>
        prev.map((r, idx) => (idx === i ? { ...r, status: 'generating' as const } : r))
      );

      // Generate image
      const result = await generateImage(config);

      // Update with result
      setResults((prev) => prev.map((r, idx) => (idx === i ? result : r)));

      // Update progress
      setProgress(((i + 1) / OG_IMAGE_CONFIGS.length) * 100);

      // Small delay between requests to avoid rate limiting
      if (i < OG_IMAGE_CONFIGS.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    setIsGenerating(false);

    const successCount = results.filter((r) => r.status === 'success').length;
    toast({
      title: 'Generation Complete',
      description: `Successfully generated ${successCount} of ${OG_IMAGE_CONFIGS.length} images`,
    });
  };

  const downloadAll = () => {
    results
      .filter((r) => r.status === 'success' && r.imageUrl)
      .forEach((r) => {
        downloadImage(r.imageUrl!, r.filename);
      });

    toast({
      title: 'Downloading',
      description: 'All images are being downloaded',
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered OG Image Generation
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            OG Image Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate professional Open Graph images for all routes using AI. Images are 1200x630px
            with consistent branding.
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-8">
          <ImageIcon className="h-4 w-4" />
          <AlertDescription>
            This will generate {OG_IMAGE_CONFIGS.length} OG images using Lovable AI. Each image
            takes ~5-10 seconds. Total time: ~{Math.ceil((OG_IMAGE_CONFIGS.length * 7) / 60)}{' '}
            minutes.
          </AlertDescription>
        </Alert>

        {/* Control Panel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generation Controls</CardTitle>
            <CardDescription>
              Generate all OG images at once or download completed images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={generateAllImages}
                disabled={isGenerating}
                size="lg"
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating {currentIndex + 1}/{OG_IMAGE_CONFIGS.length}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate All Images
                  </>
                )}
              </Button>
              <Button
                onClick={downloadAll}
                disabled={results.filter((r) => r.status === 'success').length === 0}
                variant="outline"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OG_IMAGE_CONFIGS.map((config, index) => {
            const result = results[index];

            return (
              <Card key={config.route} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{config.title}</CardTitle>
                    {result?.status === 'success' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    {result?.status === 'error' && (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    )}
                    {result?.status === 'generating' && (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    )}
                  </div>
                  <CardDescription className="text-xs">
                    {config.route} → {config.filename}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Image Preview */}
                  <div className="aspect-[1200/630] bg-muted rounded-lg overflow-hidden">
                    {result?.imageUrl ? (
                      <img
                        src={result.imageUrl}
                        alt={config.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ImageIcon className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        result?.status === 'success'
                          ? 'default'
                          : result?.status === 'error'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {result?.status || 'pending'}
                    </Badge>
                    {result?.status === 'success' && result.imageUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => downloadImage(result.imageUrl!, config.filename)}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    )}
                  </div>

                  {/* Error Message */}
                  {result?.error && (
                    <p className="text-xs text-destructive">{result.error}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
