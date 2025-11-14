import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CanvasControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function CanvasControls({ zoom, onZoomIn, onZoomOut, onReset }: CanvasControlsProps) {
  return (
    <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomOut}
        disabled={zoom <= 0.5}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <div className="text-sm font-medium min-w-16 text-center">
        {Math.round(zoom * 100)}%
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomIn}
        disabled={zoom >= 4}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
      >
        <Maximize className="h-4 w-4" />
      </Button>
    </div>
  );
}
