
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border z-40 py-4 px-6 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">CodePilot.AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">Dashboard</Link>
            <Link to="#" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Projects</Link>
            <Link to="#" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Analytics</Link>
            <Link to="/pricing" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Pricing</Link>
            <Link to="#" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Settings</Link>
          </nav>
        </div>
        
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
