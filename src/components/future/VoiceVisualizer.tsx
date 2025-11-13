import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";

interface VoiceVisualizerProps {
  isListening: boolean;
  transcript?: string;
  onToggle: () => void;
}

export function VoiceVisualizer({ 
  isListening, 
  transcript = "", 
  onToggle 
}: VoiceVisualizerProps) {
  const [volume, setVolume] = useState(0);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onClick={onToggle}
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center",
          isListening 
            ? "bg-gradient-to-br from-red-500 to-pink-500" 
            : "bg-gradient-to-br from-primary to-accent"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isListening ? (
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
      </motion.button>

      {/* Transcript display */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 right-0 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 max-w-xs shadow-lg"
          >
            <p className="text-sm text-foreground">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
