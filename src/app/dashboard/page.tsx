import { DashboardKPIs } from "@/components/dashboard/DashboardKPIs";
import { OverviewCharts } from "@/components/dashboard/OverviewCharts";
import { AgentStatusList } from "@/components/dashboard/AgentStatusList";
import { RecentDecisions } from "@/components/dashboard/RecentDecisions";
import { SwarmGlobe } from "@/components/dashboard/SwarmGlobe";

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Swarm Command Center</h2>
          <p className="text-muted-foreground mt-1">
            Real-time urban intelligence and autonomous agent network status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-xs font-medium text-secondary">Swarm Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Global Swarm View */}
        <div className="col-span-1 lg:col-span-3 h-[400px] bg-card border border-border rounded-xl shadow-lg overflow-hidden relative group">
          <div className="absolute top-4 left-4 z-20">
            <h3 className="text-sm font-semibold text-white tracking-widest uppercase">Global Swarm Topology</h3>
            <p className="text-xs text-muted-foreground">3D Interactive Map</p>
          </div>
          <SwarmGlobe />
          {/* Scanning line animation overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/30 shadow-[0_0_20px_rgba(0,194,255,1)] animate-scan pointer-events-none z-20" />
        </div>
      </div>

      <DashboardKPIs />
      
      <OverviewCharts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentStatusList />
        <RecentDecisions />
      </div>
    </div>
  );
}
