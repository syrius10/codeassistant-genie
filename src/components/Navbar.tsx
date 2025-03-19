
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-ios py-4 px-6 md:px-10",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-subtle" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 animate-fade-in">
          <Cpu className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">CodePilot.AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 animate-fade-in">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#github" className="text-sm font-medium hover:text-primary transition-colors">Connect GitHub</a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4 animate-fade-in">
          <Button size="sm" variant="outline" className="gap-2">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Button>
          
          <Button size="sm" className="bg-primary hover:bg-primary/90 transition-colors">Get Started</Button>
        </div>
        
        <button 
          className="md:hidden text-foreground" 
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
        <div className="md:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-sm z-40 animate-fade-in">
          <div className="flex flex-col gap-6 p-6">
            <Link 
              to="/" 
              className="text-lg font-medium p-2" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="text-lg font-medium p-2" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <a 
              href="#features" 
              className="text-lg font-medium p-2" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#github" 
              className="text-lg font-medium p-2" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Connect GitHub
            </a>
            
            <div className="flex flex-col gap-4 mt-4">
              <Button variant="outline" className="gap-2 w-full justify-center">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
              
              <Button className="w-full justify-center">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
