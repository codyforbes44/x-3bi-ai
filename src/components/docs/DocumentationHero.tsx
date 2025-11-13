import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileCode, Search } from "lucide-react";

interface DocumentationHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DocumentationHero({ searchQuery, onSearchChange }: DocumentationHeroProps) {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <Badge variant="secondary" className="mb-6">
        <FileCode className="w-3 h-3 mr-1" />
        Advanced API Documentation
      </Badge>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
        API Documentation Center
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
        Comprehensive API reference with interactive testing, code examples, and detailed guides for seamless integration.
      </p>
      
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search endpoints, parameters, examples..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>
    </section>
  );
}
