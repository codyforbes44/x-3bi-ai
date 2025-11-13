import { motion, AnimatePresence } from "framer-motion";
import { X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceCommandListProps {
  isOpen: boolean;
  onClose: () => void;
  requireWakeWord?: boolean;
}

const COMMANDS = [
  { phrase: "Go to dashboard", description: "Navigate to dashboard" },
  { phrase: "Go to Grok / Open chat", description: "Open Grok AI chat" },
  { phrase: "Go to AI tools", description: "Navigate to AI tools" },
  { phrase: "Go to settings", description: "Open settings page" },
  { phrase: "Go home", description: "Return to homepage" },
];

export function VoiceCommandList({ isOpen, onClose, requireWakeWord = true }: VoiceCommandListProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Command List Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-8 z-50 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Voice Commands</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {requireWakeWord && (
              <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Wake word:</span> Say "Hey 3BI" first, then your command
                </p>
              </div>
            )}

            <div className="space-y-2">
              {COMMANDS.map((cmd, index) => (
                <div
                  key={index}
                  className="p-3 bg-muted/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <p className="font-medium text-foreground text-sm">{cmd.phrase}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cmd.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                💡 Tip: Speak clearly and wait for the listening indicator
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
