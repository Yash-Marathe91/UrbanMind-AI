"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, LogOut, Settings, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { useAppStore } from "@/store/useAppStore";

interface UserProfile {
  full_name: string;
  email: string;
  role: string;
}

export function Topbar() {
  const router = useRouter();
  const { incidents } = useAppStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  // Filter active incidents for notifications
  const activeIncidents = incidents.filter(inc => inc.status === 'active');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch extended profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (data && !error) {
          setProfile(data);
        } else {
          // Fallback if profile trigger hasn't fired or was missed
          setProfile({
            full_name: user.user_metadata?.full_name || "Unknown Operator",
            email: user.email || "",
            role: "operator"
          });
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "OP";
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search agents, reports, analytics..." 
            className="pl-9 bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary/30 transition-all w-full rounded-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-transform hover:scale-105 outline-none cursor-pointer">
            <Bell className="w-5 h-5" />
            {activeIncidents.length > 0 && (
              <>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-danger animate-pulse" />
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-danger text-[9px] font-bold text-white flex items-center justify-center -mt-1 -mr-1 shadow-[0_0_10px_rgba(255,92,117,0.5)]">
                  {activeIncidents.length}
                </span>
              </>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-0 overflow-hidden border-white/10" align="end">
            <div className="p-4 bg-surface/50 border-b border-white/5 flex items-center justify-between">
              <span className="font-semibold text-sm">System Alerts</span>
              <span className="text-xs text-muted-foreground">{activeIncidents.length} Active</span>
            </div>
            <div className="max-h-64 overflow-y-auto custom-scrollbar p-2">
              {activeIncidents.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No active anomalies detected.</div>
              ) : (
                activeIncidents.slice(0, 5).map((inc) => (
                  <div key={inc.id} className="p-3 mb-1 rounded-md hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white truncate max-w-[200px]">{inc.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                        inc.severity === 'critical' ? 'bg-danger/20 text-danger' : 
                        inc.severity === 'high' ? 'bg-warning/20 text-warning' : 
                        'bg-secondary/20 text-secondary'
                      }`}>
                        {inc.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{inc.description}</p>
                  </div>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-10 w-10 rounded-full overflow-hidden border border-white/10 hover:border-primary/50 transition-colors outline-none ring-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer">
            <Avatar className="h-full w-full">
              <AvatarFallback className="bg-primary/10 text-primary font-bold tracking-wider">
                {profile ? getInitials(profile.full_name) : "OP"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 border-white/10 bg-background/95 backdrop-blur-xl p-2" align="end">
            <div className="p-3 bg-surface/30 rounded-lg mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <UserCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none text-white">
                    {profile?.full_name || "Loading..."}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile?.email || "Connecting..."}
                  </p>
                  {profile?.role && (
                    <span className="inline-block mt-1 text-[9px] uppercase tracking-widest text-primary font-mono">
                      {profile.role} Clearance
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <DropdownMenuSeparator className="bg-white/5" />
            
            <DropdownMenuItem className="py-2.5 cursor-pointer focus:bg-white/5">
              <UserCircle className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>Operator Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2.5 cursor-pointer focus:bg-white/5">
              <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>System Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-white/5" />
            
            <DropdownMenuItem 
              onClick={handleLogout}
              className="py-2.5 cursor-pointer text-danger focus:text-danger focus:bg-danger/10 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="font-medium">Disconnect Terminal</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
