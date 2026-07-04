"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, AlertTriangle, CheckCircle2, Zap, Droplets, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { formatDistanceToNow } from "date-fns";

const getDecisionIcon = (type?: string) => {
  if (!type) return CheckCircle2;
  switch (type.toLowerCase()) {
    case 'energy': return Zap;
    case 'water': return Droplets;
    case 'security': return Shield;
    case 'traffic': return AlertTriangle;
    default: return CheckCircle2;
  }
};

const getDecisionColor = (status: string) => {
  switch (status) {
    case 'executed': return 'text-secondary';
    case 'requires_auth': return 'text-warning';
    case 'rejected': return 'text-danger';
    default: return 'text-primary';
  }
};

export function RecentDecisions() {
  const { decisions } = useAppStore();

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Recent Autonomous Decisions</CardTitle>
          <CardDescription>Actions taken by the AI swarm in the last 24h</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
          View All <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-border ml-3 space-y-6">
          {decisions.map((decision) => {
            const Icon = getDecisionIcon(decision.agent?.type);
            const colorClass = getDecisionColor(decision.status);
            
            return (
              <div key={decision.id} className="relative pl-6 group">
                <div className="absolute left-[-11px] top-1 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className={`w-3 h-3 ${colorClass}`} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{decision.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(decision.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{decision.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Agent: {decision.agent?.name || 'Unknown'}</span>
                    {decision.status === "requires_auth" && (
                      <Button size="sm" variant="outline" className="h-6 text-[10px] border-warning/50 text-warning hover:bg-warning/10 ml-auto">
                        Authorize Action
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
