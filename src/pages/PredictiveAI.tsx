import { SEO } from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DigitalTwin } from '@/components/DigitalTwin';
import { MultiAgentCollaboration } from '@/components/MultiAgentCollaboration';
import { TemporalIntelligence } from '@/components/TemporalIntelligence';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';

const PredictiveAI = () => {
  return (
    <>
      <SEO
        title="Predictive AI Intelligence"
        description="Advanced AI features including Digital Twin, Multi-Agent Collaboration, Temporal Intelligence, and Knowledge Graph"
        keywords={["digital twin", "multi-agent AI", "predictive intelligence", "knowledge graph", "temporal analysis"]}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Predictive AI Intelligence</h1>
          <p className="text-xl text-muted-foreground">
            Next-generation AI that learns, predicts, and collaborates
          </p>
        </div>

        <Tabs defaultValue="twin" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="twin">Digital Twin</TabsTrigger>
            <TabsTrigger value="agents">Multi-Agent</TabsTrigger>
            <TabsTrigger value="temporal">Temporal</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Graph</TabsTrigger>
          </TabsList>

          <TabsContent value="twin" className="mt-6">
            <DigitalTwin />
          </TabsContent>

          <TabsContent value="agents" className="mt-6">
            <MultiAgentCollaboration />
          </TabsContent>

          <TabsContent value="temporal" className="mt-6">
            <TemporalIntelligence />
          </TabsContent>

          <TabsContent value="knowledge" className="mt-6">
            <KnowledgeGraph />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default PredictiveAI;
