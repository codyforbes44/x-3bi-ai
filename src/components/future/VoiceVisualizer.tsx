import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, AlertCircle, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface VoiceVisualizerProps {
  isListening: boolean;
  transcript?: string;
  error?: string | null;
  isAwaitingCommand?: boolean;
  isSupported?: boolean;
  onToggle: () => void;
  onShowCommands?: () => void;
}

export function VoiceVisualizer({ 
  isListening, 
  transcript = "", 
  error = null,
  isAwaitingCommand = false,
  isSupported = true,
  onToggle,
  onShowCommands
}: VoiceVisualizerProps) {
  return (
    <TooltipProvider>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
        {/* Help button to show commands */}
        {onShowCommands && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onShowCommands}
                className="w-10 h-10 rounded-full bg-background/95 backdrop-blur-sm border-border hover:bg-accent"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-xs">Show voice commands</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Main microphone button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={onToggle}
              disabled={!isSupported}
              className={cn(
                "relative w-16 h-16 rounded-full flex items-center justify-center transition-all",
                !isSupported && "opacity-50 cursor-not-allowed",
                isListening 
                  ? "bg-gradient-to-br from-red-500 to-pink-500" 
                  : "bg-gradient-to-br from-primary to-accent",
                isAwaitingCommand && "ring-4 ring-primary/50"
              )}
              whileHover={isSupported ? { scale: 1.1 } : {}}
              whileTap={isSupported ? { scale: 0.9 } : {}}
            >
              {!isSupported ? (
                <AlertCircle className="w-7 h-7 text-white" />
              ) : isListening ? (
                <Mic className="w-7 h-7 text-white" />
              ) : (
                <MicOff className="w-7 h-7 text-white" />
              )}

              {/* Pulsing ring when listening */}
              {isListening && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-red-500/50"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-pink-500/50"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                  />
                </>
              )}

              {/* Awaiting command indicator */}
              {isAwaitingCommand && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-xs">
              {!isSupported 
                ? "Not supported in this browser" 
                : isListening 
                ? "Stop voice commands" 
                : "Start voice commands"}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Transcript/Status display */}
        <AnimatePresence>
          {(transcript || error) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={cn(
                "bg-background/95 backdrop-blur-sm border rounded-lg p-3 max-w-xs shadow-lg",
                error ? "border-destructive" : "border-border"
              )}
            >
              {error ? (
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              ) : (
                <p className={cn(
                  "text-sm",
                  isAwaitingCommand ? "text-primary font-medium" : "text-foreground"
                )}>
                  {transcript}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
