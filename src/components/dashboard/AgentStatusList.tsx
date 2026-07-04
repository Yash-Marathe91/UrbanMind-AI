"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Shield, Zap, Droplets, Wind, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const getAgentIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'mobility': return Activity;
    case 'energy': return Zap;
    case 'utilities': return Droplets;
    case 'environment': return Wind;
    case 'security': return Shield;
    default: return Bot;
  }
};

const getAgentColor = (status: string) => {
  switch (status) {
    case 'optimal': return 'text-primary';
    case 'warning': return 'text-warning';
    case 'critical': return 'text-danger';
    default: return 'text-muted-foreground';
  }
};

export function AgentStatusList() {
  const { agents } = useAppStore();

  return (
    <Card className="bg-card border-border shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Active Agent Swarm
        </CardTitle>
        <CardDescription>Real-time status of autonomous instances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent) => {
            const Icon = getAgentIcon(agent.type);
            const colorClass = getAgentColor(agent.status);
            
            return (
              <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer hover:bg-surface hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-md bg-background border border-border shadow-sm transition-colors", colorClass)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{agent.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{agent.id}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-1.5 py-0.5 rounded-sm bg-background border border-border">{agent.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs border transition-colors",
                      agent.status === "optimal" && "text-secondary border-secondary/30 bg-secondary/10",
                      agent.status === "warning" && "text-warning border-warning/30 bg-warning/10",
                      agent.status === "critical" && "text-danger border-danger/30 bg-danger/10 shadow-[0_0_10px_rgba(255,92,117,0.4)] animate-pulse"
                    )}
                  >
                    {agent.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground transition-all">Eff: {agent.efficiency}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
