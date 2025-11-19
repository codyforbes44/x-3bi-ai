import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface NeuralNode {
  id: number;
  x: number;
  y: number;
  connections: number[];
  active: boolean;
}

export function NeuralVisualization() {
  const [nodes, setNodes] = useState<NeuralNode[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Create 24 AI model nodes in a circular pattern
    const nodeCount = 24;
    const radius = 35;
    const centerX = 50;
    const centerY = 50;

    const initialNodes: NeuralNode[] = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      return {
        id: i,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        connections: [
          (i + 1) % nodeCount,
          (i + 5) % nodeCount,
          (i + 11) % nodeCount,
        ],
        active: false,
      };
    });

    setNodes(initialNodes);

    if (prefersReducedMotion) return;

    // Activation wave animation
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          active: Math.random() > 0.7,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Draw connections */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes[targetId];
            if (!target) return null;

            const isActive = node.active || target.active;

            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="url(#neural-gradient)"
                strokeWidth={isActive ? "2" : "1"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: node.id * 0.05 }}
              />
            );
          })
        )}
      </svg>

      {/* Neural nodes */}
      {nodes.map((node) => {
        const dx = mousePos.x - node.x;
        const dy = mousePos.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const pullStrength = prefersReducedMotion ? 0 : Math.max(0, (30 - distance) / 30);

        return (
          <motion.div
            key={node.id}
            className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: node.active ? 1.5 : 1,
              x: dx * pullStrength * 2,
              y: dy * pullStrength * 2,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <div
              className={`w-full h-full rounded-full transition-colors ${
                node.active
                  ? "bg-primary shadow-lg shadow-primary/50"
                  : "bg-primary/40"
              }`}
            />
          </motion.div>
        );
      })}

      {/* Center brand text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent animate-pulse"
          aria-label="3BI.AI phonetic spelling"
        >
          Ʒbɪ
        </div>
      </div>
    </div>
  );
}
