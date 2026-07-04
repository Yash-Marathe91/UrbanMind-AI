"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { SwarmAssistant } from "@/components/dashboard/SwarmAssistant";
import { useAppStore } from "@/store/useAppStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchData, simulateRealTimeData, subscribeToRealtime } = useAppStore();

  useEffect(() => {
    fetchData();
    const unsubscribe = subscribeToRealtime();
    
    // Simulate real-time updates every 3 seconds
    const interval = setInterval(() => {
      simulateRealTimeData();
    }, 3000);
    
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [fetchData, simulateRealTimeData, subscribeToRealtime]);

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
        
        {/* Global AI Assistant Overlay */}
        <SwarmAssistant />
      </div>
    </div>
  );
}
