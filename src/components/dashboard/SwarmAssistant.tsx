"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Cpu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export function SwarmAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello Operator. I am the UrbanMind Core AI. How can I assist you with the swarm network today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input;
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: userText };
    
    // Create the updated messages array to pass to the API
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to communicate with Core AI');
      }

      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: data.text 
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      const errorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: `[SYSTEM ERROR]: ${error.message}. Please check connection to swarm network.` 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-[0_0_20px_rgba(0,194,255,0.4)] hover:shadow-[0_0_30px_rgba(0,194,255,0.6)] bg-primary text-primary-foreground transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center p-0"
      >
        <Bot className="w-6 h-6" />
      </Button>

      {/* Slide-out Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-surface/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(0,194,255,0.2)]">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Core AI</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs text-muted-foreground">Online & Listening</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-[0_5px_15px_rgba(0,194,255,0.2)]' 
                  : 'bg-surface border border-white/5 text-foreground rounded-tl-sm'
              }`}>
                {msg.sender === 'ai' && <Sparkles className="w-3 h-3 text-secondary mb-2 inline-block mr-2" />}
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-surface border border-white/5 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 bg-background">
          <div className="relative flex items-center">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Core AI..."
              className="pr-12 h-12 bg-surface/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl"
            />
            <Button 
              onClick={handleSend}
              size="icon"
              className="absolute right-1.5 h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-center mt-3">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">UrbanMind NLP Engine V2</span>
          </div>
        </div>

      </div>
      
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
