import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Network, Search, Link as LinkIcon, Loader2, Database } from 'lucide-react';

export const KnowledgeGraph = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [building, setBuilding] = useState(false);

  const semanticSearch = async () => {
    if (!query) return;
    
    setSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke('semantic-search', {
        body: { query, limit: 10 }
      });

      if (error) throw error;

      setResults(data.results || []);
      
      toast({
        title: "Search Complete",
        description: `Found ${data.results?.length || 0} results`,
      });
    } catch (error: any) {
      toast({
        title: "Search Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  };

  const buildGraph = async (content: string) => {
    setBuilding(true);
    try {
      const { data, error } = await supabase.functions.invoke('knowledge-graph-builder', {
        body: {
          content,
          sourceApp: 'manual',
          contentType: 'text',
        }
      });

      if (error) throw error;

      toast({
        title: "Knowledge Graph Updated",
        description: `Added ${data.entities} entities and ${data.relationships} relationships`,
      });
    } catch (error: any) {
      toast({
        title: "Build Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setBuilding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Network className="h-8 w-8 text-primary" />
            Knowledge Graph
          </h2>
          <p className="text-muted-foreground mt-1">
            Cross-app memory connecting all your digital information
          </p>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Search className="h-5 w-5" />
          Semantic Search
        </h3>
        <div className="flex gap-2">
          <Input
            placeholder="Ask anything about your knowledge graph..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && semanticSearch()}
          />
          <Button onClick={semanticSearch} disabled={searching || !query}>
            {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          {results.map((result) => (
            <Card key={result.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{result.entity_name}</h4>
                  <Badge variant="outline" className="mt-1">{result.entity_type}</Badge>
                </div>
                {result.similarity && (
                  <Badge variant="secondary">
                    {Math.round(result.similarity * 100)}% match
                  </Badge>
                )}
              </div>

              {result.properties && Object.keys(result.properties).length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Properties:</p>
                  <div className="bg-muted p-3 rounded text-sm">
                    {Object.entries(result.properties).map(([key, value]: any) => (
                      <div key={key} className="flex gap-2">
                        <span className="font-medium">{key}:</span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.source_apps && result.source_apps.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Sources:</span>
                  {result.source_apps.map((app: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {app}
                    </Badge>
                  ))}
                </div>
              )}

              {result.related && result.related.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Related Entities:
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {result.related.map((rel: any, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {rel.to_entity?.entity_name} ({rel.relationship_type})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Database className="h-5 w-5" />
          Build Knowledge
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add content to your knowledge graph. The AI will extract entities and relationships automatically.
        </p>
        <Button onClick={() => buildGraph("Sample content for knowledge graph")} disabled={building}>
          {building ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Build from Current Context
        </Button>
      </Card>
    </div>
  );
};
