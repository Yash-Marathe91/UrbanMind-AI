"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Key, ShieldAlert, Sliders, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-6 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Platform Settings</h2>
          <p className="text-muted-foreground mt-1">
            Configure system preferences, API keys, and autonomous agent parameters.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* API Credentials */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              API Integrations
            </CardTitle>
            <CardDescription>Manage credentials for external services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supabase-url">Supabase Project URL</Label>
              <Input id="supabase-url" defaultValue="https://azksgmvtyqzrecbezxyr.supabase.co" className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supabase-key">Supabase Anon Key</Label>
              <Input id="supabase-key" type="password" defaultValue="sb_publishable_wbku4ygYEGY_XJu_BtKaDQ_lmQNIHN9" className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mapbox-key">Mapbox Access Token</Label>
              <Input id="mapbox-key" type="password" placeholder="pk.eyJ1... (Required for Live Map)" className="bg-background border-border text-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Global Agent Thresholds */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Sliders className="w-5 h-5 text-secondary" />
              Swarm Autonomy Limits
            </CardTitle>
            <CardDescription>Set operational boundaries for AI decisions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold text-foreground">Critical Action Approval</Label>
                <p className="text-sm text-muted-foreground">Require human authorization for actions with high public impact.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold text-foreground">Aggressive Energy Balancing</Label>
                <p className="text-sm text-muted-foreground">Allow AI to shut down non-essential municipal grids during severe shortages.</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2 pt-2">
              <Label htmlFor="confidence-threshold">Execution Confidence Threshold (%)</Label>
              <Input id="confidence-threshold" type="number" defaultValue="85" className="bg-background border-border text-foreground w-24" />
              <p className="text-xs text-muted-foreground">Agents will only auto-execute strategies scoring above this confidence level.</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Notifications */}
        <Card className="bg-card border-border shadow-lg md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Bell className="w-5 h-5 text-warning" />
              Alerting & Notifications
            </CardTitle>
            <CardDescription>Configure how and when the system escalates anomalies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between max-w-2xl">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold text-foreground">SMS Alerts for Critical Incidents</Label>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between max-w-2xl">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold text-foreground">Weekly Performance Digest</Label>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
