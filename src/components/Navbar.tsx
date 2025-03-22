
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github, Cpu, ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ['features', 'github'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          return;
        }
      }
      
      setActiveSection('home');
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-ios py-4 px-6 md:px-10",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-subtle" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 animate-fade-in group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Cpu className="h-6 w-6 text-primary relative z-10 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="font-bold text-xl relative">
            <span className="absolute -inset-1 rounded-lg group-hover:bg-primary/10 transition-colors duration-300" />
            <span className="relative">CodePilot.AI</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 animate-fade-in">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium relative group overflow-hidden",
              activeSection === 'home' ? "text-primary" : "text-foreground/70 hover:text-foreground transition-colors duration-300"
            )}
          >
            <span className="relative z-10">Home</span>
            {activeSection === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-fade-in" />
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
          
          <Link 
            to="/dashboard" 
            className="text-sm font-medium relative group overflow-hidden text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            <span className="relative z-10">Dashboard</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
          
          <Link 
            to="/pricing" 
            className="text-sm font-medium relative group overflow-hidden text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            <span className="relative z-10">Pricing</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
          
          <a 
            href="#features" 
            className={cn(
              "text-sm font-medium relative group overflow-hidden",
              activeSection === 'features' ? "text-primary" : "text-foreground/70 hover:text-foreground transition-colors duration-300"
            )}
          >
            <span className="relative z-10">Features</span>
            {activeSection === 'features' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-fade-in" />
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          
          <a 
            href="#github" 
            className={cn(
              "text-sm font-medium relative group overflow-hidden",
              activeSection === 'github' ? "text-primary" : "text-foreground/70 hover:text-foreground transition-colors duration-300"
            )}
          >
            <span className="relative z-10">Connect GitHub</span>
            {activeSection === 'github' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-fade-in" />
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4 animate-fade-in">
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button size="sm" variant="outline" className="gap-2 group">
                <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 text-foreground/50" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="glass-card w-80 p-4">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Connect with GitHub</h4>
                  <p className="text-xs text-foreground/70">
                    Link your GitHub account to enable repository analysis, PR automation, and CI/CD integration.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          <Link to="/pricing">
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 transition-colors duration-300 button-glow group"
            >
              <Sparkles className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-12" />
              <span>Get Started</span>
            </Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden text-foreground p-1 rounded-md hover:bg-foreground/10 transition-colors duration-300" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-md z-40 animate-fade-in">
          <div className="flex flex-col gap-2 p-6">
            <Link 
              to="/" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-primary/10 transition-colors duration-300 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative">
                <span className={activeSection === 'home' ? "text-primary font-semibold" : ""}>Home</span>
                {activeSection === 'home' && (
                  <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-full" />
                )}
              </span>
            </Link>
            
            <Link 
              to="/dashboard" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-primary/10 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            
            <Link 
              to="/pricing" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-primary/10 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            <a 
              href="#features" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-primary/10 transition-colors duration-300 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative">
                <span className={activeSection === 'features' ? "text-primary font-semibold" : ""}>Features</span>
                {activeSection === 'features' && (
                  <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-full" />
                )}
              </span>
            </a>
            
            <a 
              href="#github" 
              className="text-lg font-medium p-3 rounded-lg hover:bg-primary/10 transition-colors duration-300 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative">
                <span className={activeSection === 'github' ? "text-primary font-semibold" : ""}>Connect GitHub</span>
                {activeSection === 'github' && (
                  <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-full" />
                )}
              </span>
            </a>
            
            <div className="flex flex-col gap-4 mt-4">
              <Button variant="outline" className="gap-2 w-full justify-center">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
              
              <Button className="w-full justify-center">
                <Sparkles className="h-4 w-4 mr-1" />
                <span>Get Started</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
