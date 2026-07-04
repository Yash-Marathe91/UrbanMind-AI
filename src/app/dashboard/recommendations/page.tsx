"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, TrendingUp, Cpu, Battery, Map } from "lucide-react";
import { motion } from "framer-motion";

const recommendations = [
  {
    id: 1,
    title: "Deploy Micro-Grid in Sector 7",
    description: "Historical data indicates a 40% probability of power constraints during upcoming heatwave. Deploying localized micro-grid sharing will stabilize supply.",
    impact: "High Impact",
    confidence: "94%",
    category: "Energy",
    icon: Battery,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 2,
    title: "Reroute Commercial Transit",
    description: "Current traffic models suggest altering the commercial transit corridor to Highway 9. This will reduce inner-city congestion by 18% during peak hours.",
    impact: "Medium Impact",
    confidence: "88%",
    category: "Mobility",
    icon: Map,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    id: 3,
    title: "Upgrade IoT Sensor Firmware",
    description: "Water quality sensors in the Northern District are reporting 3% data packet loss. A firmware upgrade is recommended to maintain optimal predictive maintenance.",
    impact: "Low Impact",
    confidence: "99%",
    category: "Infrastructure",
    icon: Cpu,
    color: "text-accent",
    bg: "bg-accent/10",
  }
];

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Strategic Recommendations</h2>
          <p className="text-muted-foreground mt-1">
            AI-generated insights and actionable strategies for urban optimization.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Lightbulb className="w-4 h-4 mr-2" />
          Generate New Insights
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border shadow-lg hover:border-primary/30 transition-colors group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className={`p-4 rounded-xl shrink-0 ${rec.bg} ${rec.color}`}>
                    <rec.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{rec.title}</h3>
                      <Badge variant="outline" className="border-border bg-surface text-muted-foreground uppercase tracking-wider text-[10px]">
                        {rec.category}
                      </Badge>
                      <Badge variant="outline" className={`uppercase tracking-wider text-[10px] border-none ${
                        rec.impact.includes('High') ? 'bg-danger/20 text-danger' :
                        rec.impact.includes('Medium') ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                      }`}>
                        {rec.impact}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-sm text-secondary">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-semibold">AI Confidence: {rec.confidence}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                    <Button className="w-full md:w-32 bg-primary text-primary-foreground hover:bg-primary/90">
                      Execute
                    </Button>
                    <Button variant="outline" className="w-full md:w-32 border-border text-foreground hover:bg-surface">
                      Review Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
