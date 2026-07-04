import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Learn how to integrate and operate the UrbanMind AI Platform.
        </p>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-card border border-border rounded-xl p-8 mb-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Getting Started</h2>
            <p className="text-muted-foreground leading-relaxed">
              UrbanMind AI uses a distributed node architecture to ingest real-time data from city infrastructure. 
              To begin, you must authenticate your nodes using the platform API keys.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">API Reference</h2>
            <p className="text-muted-foreground leading-relaxed">
              Full API documentation is available for enterprise customers. Contact your account manager for access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
