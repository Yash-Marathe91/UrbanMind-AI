"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Activity, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/50 shadow-[0_0_20px_rgba(0,194,255,0.6)] ring-2 ring-primary/20">
              <img src="/apple-touch-icon.png" alt="UrbanMind Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">UrbanMind AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#architecture" className="hover:text-white transition-colors">Architecture</Link>
            <Link href="#about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 hidden md:inline-flex">Operator Login</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,194,255,0.4)]">
                Launch System
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" 
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-medium text-white/80">Swarm Intelligence v2.0 Live</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
            Decision Intelligence for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Smarter Communities
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            UrbanMind AI operates an autonomous network of AI agents to optimize city infrastructure, reduce energy consumption, and manage crises in real-time.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-base shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all hover:scale-105">
                Access Platform <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 border-white/10 hover:bg-white/5 text-base">
              View Architecture
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-surface/50 border-y border-white/5">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise-Grade Infrastructure</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Powered by a scalable network of specialized AI models working in harmony.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BrainCircuit,
                title: "Multi-Agent Swarm",
                description: "Distributed intelligence network where specialized agents collaborate to solve complex urban challenges autonomously."
              },
              {
                icon: Activity,
                title: "Real-Time Processing",
                description: "Sub-millisecond data ingestion from IoT sensors enables instant reaction to traffic, energy, and security anomalies."
              },
              {
                icon: ShieldCheck,
                title: "Human-in-the-Loop",
                description: "Critical decisions require authorization. Transparent reasoning provided for every autonomous recommendation."
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* About & Team Section */}
      <section id="about" className="py-24 px-6 relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Behind UrbanMind AI</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This platform was engineered to simulate and manage autonomous decision intelligence 
              for modern smart cities, featuring real-time spatial networking, Python-driven swarm simulations, 
              and a cutting-edge React dashboard.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/30 transition-all flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                <span className="text-xl font-bold text-primary tracking-widest">YM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Yash Marathe (You)</h3>
                <p className="text-primary text-sm font-mono uppercase tracking-wider mb-1">Team Leader</p>
                <p className="text-xs text-muted-foreground">Architect & Lead Developer</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-card/40 backdrop-blur-md border border-white/5 hover:border-secondary/30 transition-all flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:scale-110 transition-transform">
                <span className="text-xl font-bold text-secondary tracking-widest">KP</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Krishna Patil Rajput</h3>
                <p className="text-secondary text-sm font-mono uppercase tracking-wider mb-1">Member</p>
                <p className="text-xs text-muted-foreground">Core Contributor</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="text-center">
            <a 
              href="https://github.com/Yash-Marathe91/UrbanMind-AI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white font-medium"
            >
              <GithubIcon className="w-5 h-5" />
              View Repository on GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
