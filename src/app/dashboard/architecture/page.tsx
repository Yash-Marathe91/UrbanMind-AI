"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Server, Cpu, Database, Network, Workflow, Zap, Shield, Droplets, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const nodes = [
  { id: 1, type: "core", title: "UrbanMind Core Engine", icon: BrainCircuit, x: 50, y: 50, color: "text-primary" },
  { id: 2, type: "agent", title: "Traffic AI Swarm", icon: Activity, x: 20, y: 20, color: "text-secondary" },
  { id: 3, type: "agent", title: "Energy Grid AI", icon: Zap, x: 80, y: 20, color: "text-warning" },
  { id: 4, type: "agent", title: "Utility AI Swarm", icon: Droplets, x: 20, y: 80, color: "text-accent" },
  { id: 5, type: "agent", title: "Security AI Swarm", icon: Shield, x: 80, y: 80, color: "text-danger" },
  { id: 6, type: "data", title: "IoT Data Lake", icon: Database, x: 50, y: 85, color: "text-white" },
];

const lines = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 1, to: 5 },
  { from: 6, to: 1 },
];

export default function ArchitecturePage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">System Architecture</h2>
          <p className="text-muted-foreground mt-1">
            Visual topology of the UrbanMind AI infrastructure and data flow.
          </p>
        </div>
      </div>
      
      <Card className="bg-card border-border shadow-lg min-h-[600px] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.05)_0%,transparent_100%)] pointer-events-none" />
        <CardContent className="p-0 h-[600px] relative">
          
          {/* Render lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {lines.map((line, i) => {
              const fromNode = nodes.find(n => n.id === line.from);
              const toNode = nodes.find(n => n.id === line.to);
              if (!fromNode || !toNode) return null;
              return (
                <motion.line
                  key={i}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Render nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: i * 0.1 + 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className={`
                flex flex-col items-center justify-center gap-2 p-4 rounded-xl 
                bg-background border border-border shadow-xl backdrop-blur-md
                hover:border-primary/50 transition-colors
              `}>
                <div className={`p-3 rounded-lg bg-surface ${node.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] transition-shadow`}>
                  <node.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center w-24">
                  {node.title}
                </span>
                
                {/* Ping animation for active agents */}
                {node.type === "agent" && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                  </span>
                )}
                {node.type === "core" && (
                  <span className="absolute -inset-2 bg-primary/20 rounded-2xl blur-xl -z-10 animate-pulse"></span>
                )}
              </div>
            </motion.div>
          ))}
          
        </CardContent>
      </Card>
    </div>
  );
}
