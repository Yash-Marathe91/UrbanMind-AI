"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { useAppStore } from "@/store/useAppStore";
import { CalendarDays, TrendingUp, TrendingDown, Shield } from "lucide-react";

// Mock data for analytics
const energyData = [
  { name: "Mon", consumption: 4000, optimized: 2400 },
  { name: "Tue", consumption: 3000, optimized: 1398 },
  { name: "Wed", consumption: 2000, optimized: 9800 },
  { name: "Thu", consumption: 2780, optimized: 3908 },
  { name: "Fri", consumption: 1890, optimized: 4800 },
  { name: "Sat", consumption: 2390, optimized: 3800 },
  { name: "Sun", consumption: 3490, optimized: 4300 },
];

const trafficData = [
  { name: "00:00", flow: 20, congestion: 5 },
  { name: "04:00", flow: 15, congestion: 2 },
  { name: "08:00", flow: 85, congestion: 60 },
  { name: "12:00", flow: 65, congestion: 40 },
  { name: "16:00", flow: 90, congestion: 75 },
  { name: "20:00", flow: 45, congestion: 20 },
];

export default function AnalyticsPage() {
  const { agents } = useAppStore();
  const avgEfficiency = agents.length > 0 ? (agents.reduce((acc, a) => acc + a.efficiency, 0) / agents.length).toFixed(1) : "0";

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Advanced Analytics</h2>
          <p className="text-muted-foreground mt-1">
            Historical data, predictive modeling, and system ROI.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-surface px-3 py-1.5 rounded-md border border-border">
          <CalendarDays className="w-4 h-4" />
          <span>Last 7 Days</span>
        </div>
      </div>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Global Efficiency</p>
                <h3 className="text-3xl font-bold mt-1 text-foreground">{avgEfficiency}%</h3>
              </div>
              <div className="p-2 bg-secondary/10 text-secondary rounded-md">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-secondary mt-4 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2.4% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Energy Saved (MWh)</p>
                <h3 className="text-3xl font-bold mt-1 text-foreground">1,284</h3>
              </div>
              <div className="p-2 bg-primary/10 text-primary rounded-md">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-primary mt-4 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.5% vs baseline
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Anomalies Prevented</p>
                <h3 className="text-3xl font-bold mt-1 text-foreground">342</h3>
              </div>
              <div className="p-2 bg-warning/10 text-warning rounded-md">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-warning mt-4 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Critical threshold avoided
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle>Energy Consumption vs Optimization</CardTitle>
            <CardDescription>AI-driven load balancing performance</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6F8BFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6F8BFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3EE6B0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3EE6B0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2D45" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#081120', borderColor: '#1A2D45', borderRadius: '8px' }}
                  itemStyle={{ color: '#E2E8F0' }}
                />
                <Legend />
                <Area type="monotone" dataKey="consumption" stroke="#6F8BFF" fillOpacity={1} fill="url(#colorConsumption)" name="Baseline" />
                <Area type="monotone" dataKey="optimized" stroke="#3EE6B0" fillOpacity={1} fill="url(#colorOptimized)" name="AI Optimized" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle>Traffic Flow Dynamics</CardTitle>
            <CardDescription>24-hour congestion vs throughput</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2D45" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#081120', borderColor: '#1A2D45', borderRadius: '8px', color: '#fff' }}
                  cursor={{fill: '#1A2D45'}}
                />
                <Legend />
                <Bar dataKey="flow" fill="#00C2FF" name="Vehicle Flow (k/h)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="congestion" fill="#FF5C75" name="Congestion Index" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
