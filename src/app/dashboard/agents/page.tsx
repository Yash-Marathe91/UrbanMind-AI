"use client";

import { useAppStore, Agent } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Shield, Zap, Droplets, Wind, Activity, CheckCircle2, AlertTriangle, AlertCircle, Power } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const getStatusDetails = (status: string) => {
  switch (status) {
    case 'optimal': 
      return { icon: CheckCircle2, color: 'text-secondary', border: 'border-secondary/30', bg: 'bg-secondary/10' };
    case 'warning': 
      return { icon: AlertTriangle, color: 'text-warning', border: 'border-warning/30', bg: 'bg-warning/10' };
    case 'critical': 
      return { icon: AlertCircle, color: 'text-danger', border: 'border-danger/30', bg: 'bg-danger/10' };
    default: 
      return { icon: Bot, color: 'text-muted-foreground', border: 'border-border', bg: 'bg-surface' };
  }
};

export default function AgentsPage() {
  const { agents } = useAppStore();

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">AI Agents Swarm</h2>
          <p className="text-muted-foreground mt-1">
            Manage and configure autonomous specialized agents.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border text-foreground hover:bg-surface">
            Global Override
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Deploy New Agent
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent: Agent) => {
          const Icon = getAgentIcon(agent.type);
          const status = getStatusDetails(agent.status);
          const StatusIcon = status.icon;
          
          return (
            <Card key={agent.id} className={`bg-card border-border shadow-lg transition-all duration-300 hover:border-primary/50 group relative overflow-hidden`}>
              {/* Animated background glow for critical agents */}
              {agent.status === 'critical' && (
                <div className="absolute inset-0 bg-danger/5 animate-pulse pointer-events-none" />
              )}
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg bg-surface border border-white/5 shadow-inner ${status.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className={`uppercase text-[10px] tracking-wider border ${status.border} ${status.color} ${status.bg} flex items-center gap-1`}>
                    <StatusIcon className="w-3 h-3" />
                    {agent.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{agent.name}</CardTitle>
                <CardDescription className="text-xs uppercase tracking-wider">{agent.id} • {agent.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-2">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Efficiency Core</span>
                      <span className="font-mono font-medium">{agent.efficiency}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          agent.efficiency >= 90 ? 'bg-secondary' : 
                          agent.efficiency >= 75 ? 'bg-warning' : 'bg-danger'
                        }`} 
                        style={{ width: `${agent.efficiency}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full text-xs h-8 bg-surface/50 hover:bg-surface border-white/5 hover:border-white/20">
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className={`w-8 p-0 h-8 bg-surface/50 hover:bg-surface border-white/5 hover:border-danger/50 hover:text-danger`}>
                      <Power className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
