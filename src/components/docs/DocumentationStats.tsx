import { Card } from "@/components/ui/card";

interface DocumentationStatsProps {
  endpointsCount: number;
}

export function DocumentationStats({ endpointsCount }: DocumentationStatsProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">{endpointsCount}</div>
          <p className="text-sm text-muted-foreground">API Endpoints</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
          <p className="text-sm text-muted-foreground">Uptime SLA</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">&lt;500ms</div>
          <p className="text-sm text-muted-foreground">Avg Response</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">24/7</div>
          <p className="text-sm text-muted-foreground">Support</p>
        </Card>
      </div>
    </section>
  );
}
