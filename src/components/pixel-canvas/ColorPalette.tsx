import { cn } from '@/lib/utils';

const COLORS = [
  '#FF0000', '#FF8800', '#FFFF00', '#88FF00', '#00FF00', '#00FF88',
  '#00FFFF', '#0088FF', '#0000FF', '#8800FF', '#FF00FF', '#FF0088',
  '#FFFFFF', '#CCCCCC', '#888888', '#444444', '#000000', '#8B4513',
];

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function ColorPalette({ selectedColor, onColorSelect }: ColorPaletteProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-card rounded-lg border">
      {COLORS.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={cn(
            'w-10 h-10 rounded-md border-2 transition-all hover:scale-110',
            selectedColor === color ? 'border-foreground ring-2 ring-primary' : 'border-border'
          )}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  );
}
