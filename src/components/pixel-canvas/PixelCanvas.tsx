import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ColorPalette } from './ColorPalette';
import { CanvasControls } from './CanvasControls';
import { CooldownTimer } from './CooldownTimer';
import { toast } from 'sonner';

const CANVAS_SIZE = 100; // 100x100 grid
const PIXEL_SIZE = 10; // Base pixel size
const COOLDOWN_SECONDS = 5;

interface Pixel {
  x: number;
  y: number;
  color: string;
}

export function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [pixels, setPixels] = useState<Map<string, Pixel>>(new Map());
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPixelTime, setLastPixelTime] = useState<Date | null>(null);

  // Load initial pixels
  useEffect(() => {
    loadPixels();
  }, []);

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('pixel-canvas-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pixel_canvas',
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const pixel = payload.new as Pixel;
            setPixels((prev) => {
              const next = new Map(prev);
              next.set(`${pixel.x},${pixel.y}`, pixel);
              return next;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Load user's last pixel time
  useEffect(() => {
    if (!user) return;
    
    const loadCooldown = async () => {
      const { data } = await supabase
        .from('pixel_cooldowns')
        .select('last_pixel_at')
        .eq('user_id', user.id)
        .single();
      
      if (data?.last_pixel_at) {
        setLastPixelTime(new Date(data.last_pixel_at));
      }
    };
    
    loadCooldown();
  }, [user]);

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= CANVAS_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * PIXEL_SIZE, 0);
      ctx.lineTo(i * PIXEL_SIZE, CANVAS_SIZE * PIXEL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * PIXEL_SIZE);
      ctx.lineTo(CANVAS_SIZE * PIXEL_SIZE, i * PIXEL_SIZE);
      ctx.stroke();
    }

    // Draw pixels
    pixels.forEach((pixel) => {
      ctx.fillStyle = pixel.color;
      ctx.fillRect(
        pixel.x * PIXEL_SIZE,
        pixel.y * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE
      );
    });
  }, [pixels]);

  const loadPixels = async () => {
    const { data, error } = await supabase
      .from('pixel_canvas')
      .select('x, y, color');

    if (error) {
      toast.error('Failed to load canvas');
      return;
    }

    const pixelMap = new Map<string, Pixel>();
    data.forEach((pixel) => {
      pixelMap.set(`${pixel.x},${pixel.y}`, pixel);
    });
    setPixels(pixelMap);
  };

  const placePixel = async (x: number, y: number) => {
    if (!user) {
      toast.error('Please sign in to place pixels');
      return;
    }

    // Check cooldown
    if (lastPixelTime) {
      const elapsed = (Date.now() - lastPixelTime.getTime()) / 1000;
      if (elapsed < COOLDOWN_SECONDS) {
        toast.error(`Please wait ${(COOLDOWN_SECONDS - elapsed).toFixed(1)}s`);
        return;
      }
    }

    const { error } = await supabase
      .from('pixel_canvas')
      .upsert({
        x,
        y,
        color: selectedColor,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      toast.error('Failed to place pixel');
      return;
    }

    // Update cooldown
    const now = new Date();
    setLastPixelTime(now);
    
    await supabase
      .from('pixel_cooldowns')
      .upsert({
        user_id: user.id,
        last_pixel_at: now.toISOString(),
      });

    toast.success('Pixel placed!');
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left - pan.x) / (PIXEL_SIZE * zoom));
    const y = Math.floor((e.clientY - rect.top - pan.y) / (PIXEL_SIZE * zoom));

    if (x >= 0 && x < CANVAS_SIZE && y >= 0 && y < CANVAS_SIZE) {
      placePixel(x, y);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 2) { // Middle or right click
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.min(4, Math.max(0.5, prev + delta)));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <ColorPalette
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />
        <CanvasControls
          zoom={zoom}
          onZoomIn={() => setZoom((z) => Math.min(4, z + 0.2))}
          onZoomOut={() => setZoom((z) => Math.max(0.5, z - 0.2))}
          onReset={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
        />
        <CooldownTimer
          lastPixelTime={lastPixelTime}
          cooldownSeconds={COOLDOWN_SECONDS}
        />
      </div>

      <div
        ref={containerRef}
        className="border rounded-lg overflow-hidden bg-muted/20"
        style={{ cursor: isDragging ? 'grabbing' : 'crosshair' }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE * PIXEL_SIZE}
          height={CANVAS_SIZE * PIXEL_SIZE}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: '0 0',
            imageRendering: 'pixelated',
          }}
          className="block"
        />
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Click to place pixels • Middle/Right click + drag to pan • Scroll to zoom</p>
        <p>Canvas: {CANVAS_SIZE}x{CANVAS_SIZE} • Active pixels: {pixels.size}</p>
      </div>
    </div>
  );
}
