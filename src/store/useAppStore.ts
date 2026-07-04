import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

// Define Types
export type Agent = {
  id: string;
  name: string;
  type: string;
  status: 'optimal' | 'warning' | 'critical' | 'offline';
  efficiency: number;
};

export type Incident = {
  id: string;
  title: string;
  description: string;
  type: 'traffic' | 'energy' | 'water' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  latitude: number;
  longitude: number;
  status: 'active' | 'resolved' | 'monitoring';
  created_at: string;
};

export type Decision = {
  id: string;
  agent_id: string;
  incident_id: string;
  title: string;
  description: string;
  status: 'executed' | 'requires_auth' | 'rejected';
  created_at: string;
  agent?: Agent; // Joined data
};

interface AppState {
  agents: Agent[];
  incidents: Incident[];
  decisions: Decision[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  simulateRealTimeData: () => void;
  subscribeToRealtime: () => () => void;
}

// Initial mock data if Supabase isn't connected yet
const initialAgents: Agent[] = [
  { id: "AGT-001", name: "TrafficGrid Core", type: "Mobility", status: "optimal", efficiency: 98.2 },
  { id: "AGT-002", name: "PowerFlow AI", type: "Energy", status: "warning", efficiency: 82.4 },
  { id: "AGT-003", name: "AquaGuard Pro", type: "Utilities", status: "optimal", efficiency: 99.1 },
  { id: "AGT-004", name: "AeroSense Network", type: "Environment", status: "optimal", efficiency: 95.5 },
  { id: "AGT-005", name: "SecureNet Prime", type: "Security", status: "critical", efficiency: 64.0 },
];

const initialIncidents: Incident[] = [
  { id: "INC-001", title: "Sector 4 Gridlock", description: "Major traffic jam detected.", type: "traffic", severity: "high", latitude: 40.7128, longitude: -74.0060, status: "active", created_at: new Date().toISOString() },
  { id: "INC-002", title: "Power Fluctuation", description: "Grid instability detected.", type: "energy", severity: "medium", latitude: 40.7282, longitude: -73.9942, status: "active", created_at: new Date().toISOString() },
];

const initialDecisions: Decision[] = [
  { id: "DEC-8492", agent_id: "AGT-001", incident_id: "INC-001", title: "Rerouted Traffic from Sector 4", description: "Detected anomaly in traffic flow. Autonomous rerouting improved flow by 14%.", status: "executed", created_at: new Date().toISOString(), agent: initialAgents[0] },
];

export const useAppStore = create<AppState>((set, get) => ({
  agents: initialAgents,
  incidents: initialIncidents,
  decisions: initialDecisions,
  isLoading: false,
  error: null,
  
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Attempt to fetch from Supabase
      const { data: agentsData, error: agentsError } = await supabase.from('agents').select('*');
      
      // If we successfully get data, use it. Otherwise, fallback to initial mock data.
      if (agentsData && agentsData.length > 0) {
        set({ agents: agentsData as Agent[] });
        
        const { data: incidentsData } = await supabase.from('incidents').select('*');
        if (incidentsData) set({ incidents: incidentsData as Incident[] });
        
        const { data: decisionsData } = await supabase.from('decisions').select('*, agent:agents(*)');
        if (decisionsData) set({ decisions: decisionsData as Decision[] });
      }
    } catch (err: any) {
      console.warn("Supabase connection failed, using mock data:", err.message);
      // Fallback already in place
    } finally {
      set({ isLoading: false });
    }
  },
  
  simulateRealTimeData: () => {
    // Add some random fluctuations to agent efficiency
    const { agents } = get();
    const updatedAgents = agents.map(agent => {
      // Fluctuate efficiency by +/- 1%
      const fluctuation = (Math.random() * 2 - 1);
      const newEfficiency = Math.max(0, Math.min(100, agent.efficiency + fluctuation));
      
      // Randomly change status based on efficiency
      let newStatus = agent.status;
      if (newEfficiency < 70) newStatus = 'critical';
      else if (newEfficiency < 85) newStatus = 'warning';
      else newStatus = 'optimal';
      
      return { ...agent, efficiency: Number(newEfficiency.toFixed(1)), status: newStatus };
    });
    
    set({ agents: updatedAgents });
  },

  subscribeToRealtime: () => {
    // Subscribe to agents changes
    const agentsSubscription = supabase.channel('custom-agents-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'agents' },
        (payload) => {
          const { agents } = get();
          if (payload.eventType === 'INSERT') {
            set({ agents: [...agents, payload.new as Agent] });
          } else if (payload.eventType === 'UPDATE') {
            set({ agents: agents.map(a => a.id === payload.new.id ? payload.new as Agent : a) });
          } else if (payload.eventType === 'DELETE') {
            set({ agents: agents.filter(a => a.id !== payload.old.id) });
          }
        }
      )
      .subscribe();

    // Subscribe to incidents changes
    const incidentsSubscription = supabase.channel('custom-incidents-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'incidents' },
        (payload) => {
          const { incidents } = get();
          if (payload.eventType === 'INSERT') {
            set({ incidents: [payload.new as Incident, ...incidents] });
          } else if (payload.eventType === 'UPDATE') {
            set({ incidents: incidents.map(i => i.id === payload.new.id ? payload.new as Incident : i) });
          } else if (payload.eventType === 'DELETE') {
            set({ incidents: incidents.filter(i => i.id !== payload.old.id) });
          }
        }
      )
      .subscribe();

    // Subscribe to decisions changes
    const decisionsSubscription = supabase.channel('custom-decisions-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'decisions' },
        (payload) => {
          const { decisions } = get();
          if (payload.eventType === 'INSERT') {
            // Note: relations might not be auto-joined on realtime payloads, so we might need to fetch the agent or just use what we have
            set({ decisions: [payload.new as Decision, ...decisions] });
          } else if (payload.eventType === 'UPDATE') {
            set({ decisions: decisions.map(d => d.id === payload.new.id ? { ...d, ...payload.new } as Decision : d) });
          } else if (payload.eventType === 'DELETE') {
            set({ decisions: decisions.filter(d => d.id !== payload.old.id) });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(agentsSubscription);
      supabase.removeChannel(incidentsSubscription);
      supabase.removeChannel(decisionsSubscription);
    };
  }
}));
