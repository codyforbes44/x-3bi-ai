import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NeuralNode {
  id: number;
  x: number;
  y: number;
  connections: number[];
  active: boolean;
}

export function NeuralHero() {
  const [nodes, setNodes] = useState<NeuralNode[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Create 24 AI model nodes in a circular pattern
    const nodeCount = 24;
    const radius = 40; // percentage
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

    // Activation wave animation
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node, i) => ({
          ...node,
          active: Math.random() > 0.7,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      className="relative w-full h-[400px] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
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
        const pullStrength = Math.max(0, (30 - distance) / 30);

        return (
          <motion.div
            key={node.id}
            className="absolute w-4 h-4 rounded-full"
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
              className={`w-full h-full rounded-full ${
                node.active
                  ? "bg-primary shadow-[0_0_20px_hsl(var(--primary))]"
                  : "bg-primary/50"
              }`}
            />
          </motion.div>
        );
      })}

      {/* Center "24" indicator */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div 
          className="text-8xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent animate-pulse"
          aria-label="3BI.AI phonetic spelling"
        >
          Ʒbɪ
        </div>
      </motion.div>
    </div>
  );
}
