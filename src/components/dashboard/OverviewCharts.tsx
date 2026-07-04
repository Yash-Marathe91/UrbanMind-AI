"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const areaData = [
  { time: '00:00', decisions: 120, alerts: 10 },
  { time: '04:00', decisions: 80, alerts: 5 },
  { time: '08:00', decisions: 250, alerts: 45 },
  { time: '12:00', decisions: 380, alerts: 30 },
  { time: '16:00', decisions: 410, alerts: 60 },
  { time: '20:00', decisions: 190, alerts: 15 },
  { time: '23:59', decisions: 150, alerts: 8 },
];

const barData = [
  { category: 'Traffic', value: 450 },
  { category: 'Energy', value: 380 },
  { category: 'Waste', value: 290 },
  { category: 'Security', value: 520 },
  { category: 'Health', value: 310 },
];

export function OverviewCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <Card className="lg:col-span-2 bg-card border-border shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <CardHeader>
          <CardTitle className="text-xl">System Activity Matrix</CardTitle>
          <CardDescription>Real-time autonomous decisions vs alerts over 24h</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDecisions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00C2FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5C75" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF5C75" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2D45" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#132238', borderColor: '#1A2D45', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="decisions" stroke="#00C2FF" strokeWidth={2} fillOpacity={1} fill="url(#colorDecisions)" />
                <Area type="monotone" dataKey="alerts" stroke="#FF5C75" strokeWidth={2} fillOpacity={1} fill="url(#colorAlerts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <CardHeader>
          <CardTitle className="text-xl">Action Distribution</CardTitle>
          <CardDescription>Volume by urban sector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2D45" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="category" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: '#132238' }}
                  contentStyle={{ backgroundColor: '#1A2D45', borderColor: '#3EE6B0', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#3EE6B0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
