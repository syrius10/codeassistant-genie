
import { ArrowRight, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, 4000); // Match with typewriter animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 pt-24 pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] opacity-20 blur-3xl bg-gradient-radial from-primary to-transparent transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] opacity-20 blur-3xl bg-gradient-radial from-primary to-transparent transform -translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Icon animation */}
      <div className="relative mb-8 animate-fade-in animate-pulse-slow">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl transform scale-125" />
        <div className="relative glass rounded-full p-5">
          <Cpu className="h-10 w-10 text-primary" />
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-center leading-tight mb-6 max-w-4xl animate-fade-up">
        <span className="typewriter-container">
          <span className="typewriter">AI-Powered Development Assistant</span>
        </span>
        <br />
        <span className={`transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
          Revolutionize Your <span className="text-primary">DevOps</span> Workflow
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-secondary max-w-2xl text-center mb-10 animate-fade-up animation-delay-200">
        CodePilot.AI analyzes, optimizes, and deploys your code with the precision and elegance of advanced artificial intelligence.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
        <Button size="lg" className="bg-primary hover:bg-primary/90 transition-colors">
          Start Your Project
        </Button>
        <Button size="lg" variant="outline" className="group">
          <span>Explore Features</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl w-full animate-fade-up animation-delay-400">
        <div className="glass-card p-6 text-center">
          <p className="text-4xl font-bold text-primary mb-2">95%+</p>
          <p className="text-sm text-secondary">Code Coverage</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-4xl font-bold text-primary mb-2">100%</p>
          <p className="text-sm text-secondary">Automated Testing</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-4xl font-bold text-primary mb-2">24/7</p>
          <p className="text-sm text-secondary">Development Support</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-muted-foreground/60 rounded-full animate-pulse-slow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
