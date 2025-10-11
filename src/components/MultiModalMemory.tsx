import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Search, Image, Music, Video, FileText, Sparkles, Download, Database } from 'lucide-react';
import PruningDashboard from './PruningDashboard';

interface Session {
  id: string;
  alias: string;
  modality: string;
  data: any;
  image_url?: string;
  audio_url?: string;
  video_metadata?: any;
  tags?: string[];
  vision_analysis?: any;
  created_at: string;
}

export default function MultiModalMemory() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Upload state
  const [alias, setAlias] = useState('');
  const [parentAlias, setParentAlias] = useState('');
  const [modality, setModality] = useState<'text' | 'image' | 'audio' | 'video' | 'mixed'>('text');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [videoMetadata, setVideoMetadata] = useState('');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [modalityFilter, setModalityFilter] = useState('');
  const [searchResults, setSearchResults] = useState<Session[]>([]);

  const handleSaveSession = async () => {
    if (!alias) {
      toast({
        title: 'Error',
        description: 'Alias is required',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('save-multimodal-session', {
        body: {
          alias,
          parent_alias: parentAlias || null,
          modality,
          content,
          image_url: imageUrl || null,
          audio_url: audioUrl || null,
          video_metadata: videoMetadata ? JSON.parse(videoMetadata) : null,
        },
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Session "${alias}" saved successfully`,
      });

      // Reset form
      setAlias('');
      setParentAlias('');
      setContent('');
      setImageUrl('');
      setAudioUrl('');
      setVideoMetadata('');
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save session',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      toast({
        title: 'Error',
        description: 'Search query is required',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-multimodal-sessions', {
        body: {
          query: searchQuery,
          modality_filter: modalityFilter || null,
          limit: 20,
        },
      });

      if (error) throw error;

      setSearchResults(data.results || []);
      
      toast({
        title: 'Search Complete',
        description: `Found ${data.results?.length || 0} matching sessions`,
      });
    } catch (error: any) {
      console.error('Search error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Search failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeImage = async (sessionId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-multimodal-session', {
        body: { session_id: sessionId },
      });

      if (error) throw error;

      toast({
        title: 'Analysis Complete',
        description: 'Grok Vision analysis updated',
      });

      // Refresh search results
      if (searchQuery) {
        handleSearch();
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Analysis failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getModalityIcon = (mod: string) => {
    switch (mod) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Multi-Modal Memory System</h1>
          <p className="text-muted-foreground">TIMP-inspired storage with vector embeddings & Grok Vision</p>
        </div>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Session
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Sessions
          </TabsTrigger>
          <TabsTrigger value="pruning" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            AI Pruning
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Alias *</label>
                  <Input
                    placeholder="unique-session-name"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parent Alias (optional)</label>
                  <Input
                    placeholder="parent-session-name"
                    value={parentAlias}
                    onChange={(e) => setParentAlias(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Modality</label>
                <Select value={modality} onValueChange={(val: any) => setModality(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content / Description</label>
                <Textarea
                  placeholder="Enter text content or description..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
              </div>

              {(modality === 'image' || modality === 'mixed') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
              )}

              {(modality === 'audio' || modality === 'mixed') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Audio URL</label>
                  <Input
                    placeholder="https://example.com/audio.mp3"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                  />
                </div>
              )}

              {(modality === 'video' || modality === 'mixed') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Video Metadata (JSON)</label>
                  <Textarea
                    placeholder='{"url": "https://...", "duration": 120}'
                    value={videoMetadata}
                    onChange={(e) => setVideoMetadata(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              <Button 
                onClick={handleSaveSession} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Saving...' : 'Save Session'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Search Query</label>
                  <Input
                    placeholder="Describe what you're looking for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filter by Modality</label>
                  <Select value={modalityFilter} onValueChange={setModalityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSearch} disabled={loading} className="w-full">
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </Card>

          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((session) => (
                <Card key={session.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getModalityIcon(session.modality)}
                      <h3 className="font-semibold">{session.alias}</h3>
                    </div>
                    <Badge variant="outline">{session.modality}</Badge>
                  </div>

                  {session.image_url && (
                    <img 
                      src={session.image_url} 
                      alt={session.alias}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}

                  {session.audio_url && (
                    <audio controls className="w-full">
                      <source src={session.audio_url} />
                    </audio>
                  )}

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {session.data?.content || 'No description'}
                  </p>

                  {session.tags && session.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {session.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {session.image_url && !session.vision_analysis && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAnalyzeImage(session.id)}
                      className="w-full"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze with Grok Vision
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground">
                    {new Date(session.created_at).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pruning">
          <PruningDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
