interface GridPatternLayerProps {
  opacity?: number;
}

export function GridPatternLayer({ opacity = 0.1 }: GridPatternLayerProps) {
  return (
    <div 
      className="absolute inset-0 dark-pattern-grid neural-pulse-layer" 
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
