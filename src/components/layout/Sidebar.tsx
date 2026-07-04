"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Activity, 
  Map as MapIcon, 
  Settings, 
  Bot, 
  Cpu,
  BarChart3,
  Lightbulb,
  FileText,
  TerminalSquare
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Live Monitoring", href: "/dashboard/monitoring", icon: Activity },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Community Map", href: "/dashboard/map", icon: MapIcon },
  { name: "AI Agents", href: "/dashboard/agents", icon: Bot },
  { name: "Operator Terminal", href: "/dashboard/operator", icon: TerminalSquare },
  { name: "Recommendations", href: "/dashboard/recommendations", icon: Lightbulb },
  { name: "Architecture", href: "/dashboard/architecture", icon: Cpu },
  { name: "Documentation", href: "/docs", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-sidebar h-full flex flex-col shrink-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,194,255,0.4)] border border-primary/30 overflow-hidden">
          <img src="/apple-touch-icon.png" alt="UrbanMind Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          UrbanMind AI
        </span>
      </div>
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1 h-4 rounded-full bg-primary shadow-[0_0_8px_rgba(0,194,255,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="rounded-xl bg-card border border-border p-4 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          <h4 className="text-sm font-medium text-foreground mb-1">System Status</h4>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(62,230,176,0.8)]" />
            <span className="text-xs text-muted-foreground">All systems nominal</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
