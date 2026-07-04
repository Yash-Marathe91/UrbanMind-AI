"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cpu, Lock, ShieldCheck, Activity, User, Mail } from "lucide-react";
import gsap from "gsap";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStatus, setAuthStatus] = useState("AWAITING CREDENTIALS");
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsAuthenticating(true);
    setAuthStatus("VERIFYING ENCRYPTION KEYS...");
    
    try {
      if (activeTab === 'register') {
        setAuthStatus("REGISTERING NEW OPERATOR...");
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        
        if (error) throw error;
        setAuthStatus("REGISTRATION SUCCESSFUL. PLEASE LOG IN.");
        setIsAuthenticating(false);
        setActiveTab('login');
      } else {
        setAuthStatus("AUTHENTICATING...");
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        setAuthStatus("SYNCING WITH SWARM NETWORK...");
        setTimeout(() => setAuthStatus("AUTHORIZATION GRANTED"), 1000);
        
        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      setAuthStatus("AUTHORIZATION FAILED");
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative selection:bg-primary/30">
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse pointer-events-none delay-1000" />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Main Login Card */}
      <div ref={formRef} className="relative z-10 w-full max-w-md p-8 md:p-12 bg-card/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Glow Top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <div className="text-center mb-8 relative">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,194,255,0.4)] border border-primary/50 overflow-hidden ring-4 ring-primary/10">
            <img src="/apple-touch-icon.png" alt="UrbanMind Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">UrbanMind AI</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-mono">
            Security Gateway
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-black/40 p-1 rounded-xl mb-8 border border-white/5">
          <button 
            onClick={() => { setActiveTab('login'); setError(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'login' ? 'bg-primary/20 text-primary shadow-sm' : 'text-muted-foreground hover:text-white'}`}
          >
            Log In
          </button>
          <button 
            onClick={() => { setActiveTab('register'); setError(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'register' ? 'bg-secondary/20 text-secondary shadow-sm' : 'text-muted-foreground hover:text-white'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            
            {activeTab === 'register' && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                </div>
                <Input
                  type="text"
                  placeholder="Full Name (Operator Alias)"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-12 h-14 bg-black/40 border-white/10 text-white focus:border-secondary/50 focus:ring-secondary/20 rounded-xl"
                  disabled={isAuthenticating}
                />
              </div>
            )}

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 text-muted-foreground transition-colors ${activeTab === 'register' ? 'group-focus-within:text-secondary' : 'group-focus-within:text-primary'}`} />
              </div>
              <Input
                type="email"
                placeholder="Operator Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-12 h-14 bg-black/40 border-white/10 text-white rounded-xl ${activeTab === 'register' ? 'focus:border-secondary/50 focus:ring-secondary/20' : 'focus:border-primary/50 focus:ring-primary/20'}`}
                disabled={isAuthenticating}
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShieldCheck className={`h-5 w-5 text-muted-foreground transition-colors ${activeTab === 'register' ? 'group-focus-within:text-secondary' : 'group-focus-within:text-primary'}`} />
              </div>
              <Input
                type="password"
                placeholder="Security Clearance Key (Password)"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-12 h-14 bg-black/40 border-white/10 text-white rounded-xl ${activeTab === 'register' ? 'focus:border-secondary/50 focus:ring-secondary/20' : 'focus:border-primary/50 focus:ring-primary/20'}`}
                disabled={isAuthenticating}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-mono text-center">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isAuthenticating}
            className={`w-full h-14 text-base font-semibold rounded-xl transition-all overflow-hidden relative group ${
              activeTab === 'register' 
                ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_20px_rgba(62,230,176,0.3)] hover:shadow-[0_0_30px_rgba(62,230,176,0.5)]'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)]'
            }`}
          >
            {isAuthenticating ? (
              <span className="flex items-center gap-2">
                <Activity className="w-5 h-5 animate-pulse" />
                {activeTab === 'register' ? 'REGISTERING...' : 'AUTHENTICATING...'}
              </span>
            ) : (
              activeTab === 'register' ? "REQUEST CLEARANCE" : "INITIALIZE CONNECTION"
            )}
            
            {/* Button Shine Effect */}
            <div className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shine" />
          </Button>
        </form>

        {/* Terminal Status Output */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span className="uppercase tracking-wider">System Status:</span>
            <span className={isAuthenticating ? "text-primary animate-pulse" : (error ? "text-danger" : "text-secondary")}>
              {authStatus}
            </span>
          </div>
          <div className="w-full h-1 bg-black/50 rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-[2000ms] ease-in-out ${activeTab === 'register' ? 'bg-gradient-to-r from-secondary to-primary' : 'bg-gradient-to-r from-primary to-secondary'}`}
              style={{ width: isAuthenticating ? '100%' : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
