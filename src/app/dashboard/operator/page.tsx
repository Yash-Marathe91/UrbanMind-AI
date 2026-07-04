"use client";

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Terminal, Cpu, ShieldAlert, Zap, Server } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'system' | 'user' | 'agent' | 'error' | 'success';
}

export default function OperatorTerminal() {
  const { agents, incidents } = useAppStore();
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: 'UrbanMind Swarm Intelligence v2.0', type: 'system' },
    { text: 'Establishing secure connection to core nodes...', type: 'system' },
    { text: 'Connection established. Type "help" for available commands.', type: 'success' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim();
      setLines(prev => [...prev, { text: `> ${cmd}`, type: 'user' }]);
      setInput('');
      processCommand(cmd.toLowerCase());
    }
  };

  const processCommand = (cmd: string) => {
    const args = cmd.split(' ');
    const baseCmd = args[0];

    setTimeout(() => {
      switch (baseCmd) {
        case 'help':
          setLines(prev => [...prev, 
            { text: 'Available Commands:', type: 'system' },
            { text: '  status       - View global swarm status', type: 'system' },
            { text: '  agents       - List all connected agents', type: 'system' },
            { text: '  incidents    - List active anomalies', type: 'system' },
            { text: '  override [id]- Force an agent into optimal state', type: 'system' },
            { text: '  clear        - Clear terminal', type: 'system' },
          ]);
          break;
        case 'status':
          const avgEff = agents.length > 0 ? (agents.reduce((a, b) => a + b.efficiency, 0) / agents.length).toFixed(1) : "0";
          setLines(prev => [...prev, { text: `[CORE] Swarm Efficiency: ${avgEff}% | Active Nodes: ${agents.length} | Anomalies: ${incidents.length}`, type: 'agent' }]);
          break;
        case 'agents':
          agents.forEach(agent => {
            setLines(prev => [...prev, { text: `[AGENT] ${agent.id} | ${agent.name} | Status: ${agent.status.toUpperCase()} | Eff: ${agent.efficiency}%`, type: agent.status === 'optimal' ? 'success' : agent.status === 'warning' ? 'system' : 'error' }]);
          });
          break;
        case 'incidents':
          if (incidents.length === 0) {
            setLines(prev => [...prev, { text: '[SYSTEM] No active incidents detected.', type: 'success' }]);
          } else {
            incidents.forEach(inc => {
              setLines(prev => [...prev, { text: `[ALERT] ${inc.id} | ${inc.title} | Severity: ${inc.severity.toUpperCase()}`, type: 'error' }]);
            });
          }
          break;
        case 'override':
          const target = args[1];
          if (!target) {
            setLines(prev => [...prev, { text: '[ERROR] Missing agent ID. Usage: override [id]', type: 'error' }]);
            break;
          }
          const agentExists = agents.find(a => a.id.toLowerCase() === target.toLowerCase());
          if (agentExists) {
            setLines(prev => [...prev, { text: `[SYSTEM] Initiating override sequence for ${agentExists.name}...`, type: 'system' }]);
            setTimeout(() => {
              setLines(prev => [...prev, { text: `[SUCCESS] ${agentExists.name} forced to OPTIMAL state. Subroutines realigned.`, type: 'success' }]);
            }, 1000);
          } else {
            setLines(prev => [...prev, { text: `[ERROR] Agent ${target} not found in swarm registry.`, type: 'error' }]);
          }
          break;
        case 'clear':
          setLines([]);
          break;
        default:
          setLines(prev => [...prev, { text: `[ERROR] Command not recognized: ${cmd}`, type: 'error' }]);
      }
    }, 400);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Terminal className="w-8 h-8 text-primary" /> Operator Terminal
          </h2>
          <p className="text-muted-foreground mt-1">
            Direct command-line interface to the Swarm Intelligence core.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-surface/50 border border-white/5 rounded-lg text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            CONNECTION SECURE
          </div>
        </div>
      </div>

      <div className="flex-1 bg-black border border-border shadow-2xl rounded-xl overflow-hidden flex flex-col font-mono text-sm relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none" />
        
        {/* Terminal Header */}
        <div className="bg-surface/80 border-b border-white/10 px-4 py-2 flex flex-row items-center gap-2 backdrop-blur-md z-10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger/80" />
            <div className="w-3 h-3 rounded-full bg-warning/80" />
            <div className="w-3 h-3 rounded-full bg-secondary/80" />
          </div>
          <span className="ml-4 text-xs text-muted-foreground opacity-50">root@urbanmind-core:~#</span>
        </div>

        {/* Output Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2 z-10 custom-scrollbar">
          {lines.map((line, i) => (
            <div key={i} className={`flex items-start ${
              line.type === 'system' ? 'text-primary/70' :
              line.type === 'user' ? 'text-white' :
              line.type === 'agent' ? 'text-secondary' :
              line.type === 'error' ? 'text-danger shadow-danger/20' :
              'text-primary shadow-primary/20'
            }`}>
              {line.type === 'user' ? null : <span className="mr-3 opacity-50 select-none">~</span>}
              <span className={line.type === 'error' || line.type === 'success' ? 'drop-shadow-md' : ''}>{line.text}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-black z-10 flex items-center">
          <span className="text-secondary mr-3 animate-pulse">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-white/20"
            placeholder="Enter command..."
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
