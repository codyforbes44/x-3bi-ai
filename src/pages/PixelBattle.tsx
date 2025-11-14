import { PixelCanvas } from '@/components/pixel-canvas/PixelCanvas';

export default function PixelBattle() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Pixel Battle
          </h1>
          <p className="text-muted-foreground">
            Collaborate in real-time to create pixel art
          </p>
        </div>

        <PixelCanvas />
      </div>
    </div>
  );
}
