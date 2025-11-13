export function AccentLinesLayer() {
  return (
    <>
      {/* Neural connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-5" aria-hidden="true">
        <defs>
          <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path 
          d="M 0 200 Q 400 100 800 200 T 1600 200" 
          stroke="url(#neural-gradient)" 
          strokeWidth="1" 
          fill="none"
          className="neural-pulse-layer"
        />
        <path 
          d="M 200 0 Q 300 400 200 800" 
          stroke="url(#neural-gradient)" 
          strokeWidth="1" 
          fill="none"
          className="neural-pulse-layer"
          style={{ animationDelay: '1s' }}
        />
        <path 
          d="M 1200 100 Q 900 400 1200 700" 
          stroke="url(#neural-gradient)" 
          strokeWidth="1" 
          fill="none"
          className="neural-pulse-layer"
          style={{ animationDelay: '2s' }}
        />
      </svg>

      {/* Diagonal light rays */}
      <div 
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-30"
        style={{ transform: 'rotate(15deg) translateY(-20%)', transformOrigin: 'top' }}
        aria-hidden="true"
      />
      <div 
        className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent opacity-30"
        style={{ transform: 'rotate(-15deg) translateY(-20%)', transformOrigin: 'top' }}
        aria-hidden="true"
      />

      {/* Electric currents (vertical flowing light streaks) */}
      <div 
        className="absolute left-1/4 top-0 w-0.5 h-96 bg-gradient-to-b from-transparent via-primary/40 to-transparent electric-current"
        style={{ animationDelay: '0s' }}
        aria-hidden="true"
      />
      <div 
        className="absolute left-2/3 top-0 w-0.5 h-96 bg-gradient-to-b from-transparent via-accent/40 to-transparent electric-current"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />
      <div 
        className="absolute left-1/2 top-0 w-0.5 h-96 bg-gradient-to-b from-transparent via-primary/30 to-transparent electric-current"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />
    </>
  );
}
