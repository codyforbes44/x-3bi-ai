import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Globe, Loader2, Copy, Check, Download, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ScrapedData {
  url: string;
  title: string;
  description: string;
  headings: string[];
  links: { url: string; text: string }[];
  textContent: string;
  timestamp: string;
  wordCount: number;
}

const WebScraper = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleScrape = async () => {
    if (!url.trim() || isLoading) return;

    setIsLoading(true);
    setScrapedData(null);

    try {
      const { data, error } = await supabase.functions.invoke('web-scraper', {
        body: { url }
      });

      if (error) throw error;

      if (data.success) {
        setScrapedData(data.data);
        toast({
          title: "Success",
          description: "Website scraped successfully!",
        });
      } else {
        throw new Error(data.error || 'Failed to scrape website');
      }
    } catch (error) {
      console.error('Scraping error:', error);
      toast({
        title: "Error",
        description: "Failed to scrape website. Please check the URL and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied",
        description: "Content copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const downloadData = () => {
    if (!scrapedData) return;

    const dataStr = JSON.stringify(scrapedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `scraped-data-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader className="pb-4 flex-row items-center justify-end">
        <Badge variant="secondary">Advanced Extraction</Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Website URL</label>
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleScrape} 
                disabled={!url.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 mr-2" />
                    Scrape
                  </>
                )}
              </Button>
            </div>
          </div>

          {scrapedData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Scraped Data</h3>
                <div className="flex gap-2">
                  <Button onClick={() => handleCopy(JSON.stringify(scrapedData, null, 2))} size="sm" variant="outline">
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy JSON
                      </>
                    )}
                  </Button>
                  <Button onClick={downloadData} size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[400px] border border-border rounded-lg p-4 bg-muted/30">
                <div className="space-y-6">
                  {/* Website Info */}
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">WEBSITE INFO</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        <a href={scrapedData.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {scrapedData.url}
                        </a>
                      </div>
                      <div>
                        <span className="font-medium">Title:</span> {scrapedData.title}
                      </div>
                      <div>
                        <span className="font-medium">Description:</span> {scrapedData.description}
                      </div>
                      <div>
                        <span className="font-medium">Word Count:</span> {scrapedData.wordCount}
                      </div>
                      <div>
                        <span className="font-medium">Scraped:</span> {new Date(scrapedData.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Headings */}
                  {scrapedData.headings.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">HEADINGS</h4>
                      <ul className="space-y-1">
                        {scrapedData.headings.map((heading, index) => (
                          <li key={index} className="text-sm">• {heading}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Links */}
                  {scrapedData.links.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">LINKS</h4>
                      <ul className="space-y-1">
                        {scrapedData.links.map((link, index) => (
                          <li key={index} className="text-sm">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {link.text || link.url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Text Content */}
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">TEXT CONTENT</h4>
                    <div className="text-sm bg-background rounded-lg p-3 border">
                      {scrapedData.textContent}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {!scrapedData && !isLoading && (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
            <div className="text-center text-muted-foreground">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Advanced Web Scraper</p>
              <p className="text-sm">Extract data from any website with AI-powered analysis</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebScraper;