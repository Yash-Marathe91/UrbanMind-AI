"use client";

import { useAppStore } from "@/store/useAppStore";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Zap, Droplets, Shield, MapPin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";

const getIncidentIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'energy': return Zap;
    case 'water': return Droplets;
    case 'security': return Shield;
    case 'traffic': return AlertTriangle;
    default: return AlertTriangle;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return 'text-secondary border-secondary bg-secondary/10';
    case 'medium': return 'text-warning border-warning bg-warning/10';
    case 'high': return 'text-danger border-danger bg-danger/10 shadow-[0_0_8px_rgba(255,92,117,0.4)] animate-pulse';
    case 'critical': return 'text-danger border-danger bg-danger/20 shadow-[0_0_15px_rgba(255,92,117,0.8)] animate-pulse font-bold';
    default: return 'text-primary border-primary bg-primary/10';
  }
};

export default function MonitoringPage() {
  const { incidents } = useAppStore();

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Live Monitoring</h2>
          <p className="text-muted-foreground mt-1">
            Real-time feed of city sensors and infrastructure health.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <span className="text-xs font-medium text-secondary">Live Feed Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Active Infrastructure Incidents</CardTitle>
            <CardDescription>Anomalies detected across all city sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="w-[100px]">Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Incident</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {incidents.map((incident) => {
                      const Icon = getIncidentIcon(incident.type);
                      return (
                        <motion.tr 
                          key={incident.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="border-border hover:bg-surface/50 transition-colors group cursor-pointer"
                        >
                          <TableCell className="font-medium text-muted-foreground text-xs">
                            {formatDistanceToNow(new Date(incident.created_at), { addSuffix: true })}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-md bg-background border border-border">
                                <Icon className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <span className="uppercase text-[10px] font-semibold tracking-wider text-muted-foreground">{incident.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{incident.title}</span>
                              <span className="text-xs text-muted-foreground truncate max-w-[200px] lg:max-w-[300px]">{incident.description}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{incident.latitude.toFixed(4)}, {incident.longitude.toFixed(4)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`uppercase text-[10px] tracking-wider ${getSeverityColor(incident.severity)}`}>
                              {incident.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className={`uppercase text-[10px] tracking-wider border ${
                              incident.status === 'active' ? 'text-warning border-warning/50 bg-warning/5' :
                              incident.status === 'monitoring' ? 'text-primary border-primary/50 bg-primary/5' :
                              'text-secondary border-secondary/50 bg-secondary/5'
                            }`}>
                              {incident.status}
                            </Badge>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                  {incidents.length === 0 && (
                    <TableRow className="border-border hover:bg-transparent">
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        No active incidents. City systems nominal.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
