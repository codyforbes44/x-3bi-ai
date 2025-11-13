import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardVoiceIndicatorProps {
  isListening: boolean;
  isAwaitingCommand: boolean;
  transcript: string;
  error: string | null;
  onToggle: () => void;
}

/**
 * Floating voice status indicator for the dashboard
 * Shows listening state, transcript, and errors
 */
export function DashboardVoiceIndicator({
  isListening,
  isAwaitingCommand,
  transcript,
  error,
  onToggle,
}: DashboardVoiceIndicatorProps) {
  const showTranscript = isListening && (transcript || isAwaitingCommand);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-lg max-w-xs"
          >
            {isAwaitingCommand ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Awaiting command...</span>
              </div>
            ) : (
              <p className="text-sm text-foreground">{transcript}</p>
            )}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2 shadow-lg max-w-xs"
          >
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all",
          isListening
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-card hover:bg-accent text-foreground border border-border"
        )}
      >
        {isListening ? (
          <>
            <Mic className="h-5 w-5" />
            <span className="text-sm font-medium">Listening</span>
          </>
        ) : (
          <>
            <MicOff className="h-5 w-5" />
            <span className="text-sm font-medium">Voice Off</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
