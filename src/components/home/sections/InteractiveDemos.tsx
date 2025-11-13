import { DemoChatSection } from './DemoChatSection';
import { DemoImageSection } from './DemoImageSection';
import { DemoVoiceSection } from './DemoVoiceSection';
import { NeonCard } from '@/components/ui/neon-card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export function InteractiveDemos() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="neon-cyan" className="mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Try It Free</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Experience AI in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test our AI capabilities instantly—no signup required. See why thousands choose 3BI.AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <DemoChatSection />
          <DemoImageSection />
          <DemoVoiceSection />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Ready for unlimited access? <a href="/auth" className="text-primary hover:underline font-medium">Create a free account</a>
          </p>
        </div>
      </div>
    </section>
  );
}
