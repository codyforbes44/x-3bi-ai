import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceVisualizerProps {
  isListening: boolean;
  onToggle: () => void;
}

export function VoiceVisualizer({ isListening, onToggle }: VoiceVisualizerProps) {
  const [amplitude, setAmplitude] = useState(0);

  useEffect(() => {
    if (!isListening) {
      setAmplitude(0);
      return;
    }

    // Simulate voice amplitude for visual effect
    const interval = setInterval(() => {
      setAmplitude(Math.random() * 100);
    }, 100);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Voice waveform visualization */}
      <div className="flex items-center justify-center gap-1 h-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 rounded-full transition-all duration-100",
              isListening ? "bg-cyan-400" : "bg-white/20"
            )}
            style={{
              height: isListening 
                ? `${20 + (amplitude * Math.sin(i * 0.5))}%`
                : '20%',
              opacity: isListening ? 0.5 + (amplitude / 200) : 0.3,
            }}
          />
        ))}
      </div>

      {/* Microphone button */}
      <button
        onClick={onToggle}
        className={cn(
          "relative h-20 w-20 rounded-full transition-all duration-300",
          "flex items-center justify-center shadow-lg",
          isListening
            ? "bg-gradient-to-br from-cyan-500 to-cyan-600 scale-110 shadow-cyan-500/50"
            : "glass-card hover:glass-dark hover:scale-105"
        )}
      >
        {isListening ? (
          <Mic className="h-8 w-8 text-white" />
        ) : (
          <MicOff className="h-8 w-8 text-muted-foreground" />
        )}
        
        {/* Pulsing ring when active */}
        {isListening && (
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping" />
        )}
      </button>

      <p className="text-sm font-medium text-muted-foreground">
        {isListening ? "Listening..." : "Tap to speak"}
      </p>
    </div>
  );
}
