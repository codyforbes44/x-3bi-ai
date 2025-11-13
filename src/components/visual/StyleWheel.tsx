import { useState } from "react";
import { cn } from "@/lib/utils";

interface StyleOption {
  id: string;
  label: string;
  preview: string;
  gradient: string;
}

const styles: StyleOption[] = [
  { id: 'realistic', label: '📸 Photo', preview: 'Realistic photography', gradient: 'from-blue-500 to-cyan-400' },
  { id: 'anime', label: '🎨 Anime', preview: 'Anime style art', gradient: 'from-pink-500 to-purple-600' },
  { id: 'painting', label: '🖼️ Paint', preview: 'Oil painting', gradient: 'from-orange-500 to-red-600' },
  { id: 'digital', label: '💻 Digital', preview: 'Digital illustration', gradient: 'from-purple-500 to-blue-600' },
  { id: '3d', label: '🎭 3D', preview: '3D rendered', gradient: 'from-teal-500 to-green-600' },
  { id: 'sketch', label: '✏️ Sketch', preview: 'Hand-drawn sketch', gradient: 'from-gray-600 to-gray-800' },
];

interface StyleWheelProps {
  onSelect: (style: string) => void;
  selected?: string;
}

export function StyleWheel({ onSelect, selected }: StyleWheelProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.preview)}
            onMouseEnter={() => setHoveredId(style.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              'aspect-square rounded-2xl transition-all duration-300',
              'flex flex-col items-center justify-center gap-1 md:gap-2',
              'bg-gradient-to-br shadow-lg',
              style.gradient,
              selected === style.preview && 'ring-4 ring-white ring-offset-2 ring-offset-background scale-105',
              hoveredId === style.id && 'scale-110 shadow-xl',
              'hover:scale-110 hover:shadow-xl'
            )}
          >
            <span className="text-2xl md:text-3xl">{style.label.split(' ')[0]}</span>
            <span className="text-xs md:text-sm font-medium text-white px-2">
              {style.label.split(' ')[1]}
            </span>
          </button>
        ))}
      </div>
      
      {/* Live preview hint */}
      {selected && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-semibold text-foreground">{selected}</span>
          </p>
        </div>
      )}
    </div>
  );
}
