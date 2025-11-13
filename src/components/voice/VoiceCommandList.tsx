import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, Sparkles, Zap, Wrench } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VoiceCommandListProps {
  isOpen: boolean;
  onClose: () => void;
  requireWakeWord?: boolean;
}

type CommandCategory = 'all' | 'navigation' | 'enterprise' | 'ai-tools' | 'utilities';

const COMMANDS = [
  // Navigation
  { phrase: "Go to dashboard", description: "Navigate to main dashboard", category: 'navigation' as const },
  { phrase: "Open Grok", description: "Start Grok AI chat", category: 'navigation' as const },
  { phrase: "Go to AI tools", description: "Open AI tools page", category: 'navigation' as const },
  { phrase: "Go to settings", description: "Open settings", category: 'navigation' as const },
  { phrase: "Go home", description: "Return to homepage", category: 'navigation' as const },
  
  // Enterprise Features
  { phrase: "Show analytics", description: "Open analytics dashboard", category: 'enterprise' as const },
  { phrase: "Show workspaces", description: "Manage team workspaces", category: 'enterprise' as const },
  { phrase: "Show workflows", description: "Open workflow automation", category: 'enterprise' as const },
  
  // AI Tools
  { phrase: "Open Claude", description: "Chat with Claude 4", category: 'ai-tools' as const },
  { phrase: "Generate image", description: "Create images with DALL-E", category: 'ai-tools' as const },
  { phrase: "Text to speech", description: "Premium voice synthesis", category: 'ai-tools' as const },
  { phrase: "Voice conversation", description: "Start voice AI conversation", category: 'ai-tools' as const },
  { phrase: "Multi-model chat", description: "Compare AI models", category: 'ai-tools' as const },
  { phrase: "Show vision", description: "Grok vision analysis", category: 'ai-tools' as const },
  { phrase: "Local AI", description: "Privacy-first AI", category: 'ai-tools' as const },
  
  // Utilities
  { phrase: "Web scraper", description: "Extract website data", category: 'utilities' as const },
  { phrase: "Code generator", description: "Generate code snippets", category: 'utilities' as const },
  { phrase: "Deploy", description: "Deploy application", category: 'utilities' as const },
  { phrase: "Insights", description: "AI-powered insights", category: 'utilities' as const },
];

export function VoiceCommandList({ isOpen, onClose, requireWakeWord = true }: VoiceCommandListProps) {
  const [activeCategory, setActiveCategory] = useState<CommandCategory>('all');

  const filteredCommands = activeCategory === 'all' 
    ? COMMANDS 
    : COMMANDS.filter(cmd => cmd.category === activeCategory);

  const categories = [
    { id: 'all' as const, label: 'All', icon: Mic },
    { id: 'navigation' as const, label: 'Navigation', icon: Zap },
    { id: 'enterprise' as const, label: 'Enterprise', icon: Sparkles },
    { id: 'ai-tools' as const, label: 'AI Tools', icon: Sparkles },
    { id: 'utilities' as const, label: 'Utilities', icon: Wrench },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Command List Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded-lg shadow-2xl z-50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Voice Commands</h2>
                  {requireWakeWord && (
                    <p className="text-sm text-muted-foreground">
                      Say "Hey 3BI" followed by any command
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent/50 text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {filteredCommands.map((command, index) => (
                <div
                  key={index}
                  className="p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-semibold text-foreground">{command.phrase}</div>
                  <div className="text-sm text-muted-foreground">{command.description}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
