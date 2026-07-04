"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Activity, Zap, Users, TrendingUp, ShieldAlert, Cpu } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export function DashboardKPIs() {
  const { agents, incidents, decisions } = useAppStore();

  const avgEfficiency = agents.length > 0 ? (agents.reduce((acc, a) => acc + a.efficiency, 0) / agents.length).toFixed(1) : "0";
  const activeIncidents = incidents.filter(i => i.status === 'active').length;
  const recentDecisions = decisions.length;

  const kpis = [
    {
      title: "Swarm Efficiency",
      value: `${avgEfficiency}%`,
      change: "+2.4%",
      trend: "up",
      icon: Cpu,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Agents",
      value: `${agents.length}`,
      change: "All online",
      trend: "neutral",
      icon: Activity,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Active Anomalies",
      value: `${activeIncidents}`,
      change: activeIncidents > 0 ? "Requires attention" : "Nominal",
      trend: activeIncidents > 0 ? "down" : "up",
      icon: ShieldAlert,
      color: activeIncidents > 0 ? "text-danger" : "text-primary",
      bgColor: activeIncidents > 0 ? "bg-danger/10" : "bg-primary/10",
    },
    {
      title: "Auto-Decisions",
      value: `${recentDecisions}`,
      change: "Last 24h",
      trend: "neutral",
      icon: Zap,
      color: "text-accent",
      bgColor: "bg-accent/10",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {kpis.map((kpi, index) => (
        <Card key={index} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </p>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold tracking-tight text-foreground">{kpi.value}</div>
              <span className={`text-xs font-medium ${kpi.trend === "down" ? "text-danger" : kpi.trend === "up" ? "text-secondary" : "text-muted-foreground"}`}>
                {kpi.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
